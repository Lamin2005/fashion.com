import type { Request, Response } from "express";
import Product from "../model/product";
import stripe from "../config/stripe";
import Stripe from "stripe";
import Order from "../model/order";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";
import mongoose from "mongoose";
import Cart from "../model/cart";

interface CheckoutItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const createCheckoutSession = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ message: "Please login first." });
      return;
    }

    const items = req.body.items as CheckoutItem[];
    const clientUrl = process.env.CLIENT_URL;

    if (!clientUrl) {
      res.status(500).json({ message: "CLIENT_URL is missing" });
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Your cart is empty" });
      return;
    }

    const validItems = items.every(
      (item) =>
        typeof item.productId === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        typeof item.size === "string" &&
        typeof item.color === "string",
    );

    if (!validItems) {
      res.status(400).json({ message: "Invalid checkout items" });
      return;
    }

    const productIds = [...new Set(items.map((item) => item.productId))];

    const databaseProducts = await Product.find({
      _id: { $in: productIds },
    });

    if (databaseProducts.length !== productIds.length) {
      res.status(400).json({
        message: "One or more products could not be found",
      });
      return;
    }

    const productMap = new Map(
      databaseProducts.map((product) => [product._id.toString(), product]),
    );

    const lineItems = items.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      if (!Number.isFinite(product.price) || product.price <= 0) {
        throw new Error(`Invalid price for ${product.name}`);
      }

      if (item.quantity > product.instock_count) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      return {
        price_data: {
          currency: "usd",

          product_data: {
            name: String(product.name),
            description: `Size: ${item.size} | Color: ${item.color}`,
            images: product.images
              .map((image) => (typeof image === "string" ? image : image.url))
              .filter(
                (url) => typeof url === "string" && url.startsWith("https://"),
              )
              .slice(0, 8),

            metadata: {
              productId: product._id.toString(),
              size: String(item.size),
              color: String(item.color),
            },
          },

          unit_amount: Math.round(Number(product.price) * 100),
        },

        quantity: Number(item.quantity),
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted_page",
      line_items: lineItems,
      metadata: {
        userId: userId.toString(),
      },
      success_url: `${clientUrl}/stripe-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/stripe-cancel`,
    });

    res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: unknown) {
    console.error("Checkout error:", error);

    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create checkout session",
    });
  }
};

export const stripewebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    res.status(400).send("Missing Stripe signature");
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    res.status(400).send("Invalid webhook signature");
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status !== "paid") {
          break;
        }

        const userId = session.metadata?.userId;

        if (!userId || !mongoose.isValidObjectId(userId) || !session.id) {
          console.error("Invalid checkout session metadata:", session.id);
          res.status(400).send("Invalid checkout metadata");
          return;
        }

        console.log("STEP 1: Checkout session completed");
        console.log("Session ID:", session.id);
        console.log("User ID:", userId);

        // Prevent duplicate orders if Stripe retries this event.
        const existingOrder = await Order.findOne({
          stripe_session_id: session.id,
        });

        if (existingOrder) {
          break;
        }

        // Retrieve the purchased line items from Stripe.
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            expand: ["data.price.product"],
          },
        );

        const orderItems = [];

        for (const lineItem of lineItems.data) {
          const stripeProduct = lineItem.price?.product;

          if (
            !stripeProduct ||
            typeof stripeProduct === "string" ||
            "deleted" in stripeProduct ||
            !lineItem.quantity
          ) {
            throw new Error("Missing Stripe product information");
          }

          console.log("STEP 2: Line items retrieved");
          console.log("Line items:", JSON.stringify(lineItems.data, null, 2));
          const { productId, size, color } = stripeProduct.metadata;

          if (
            !productId ||
            !mongoose.isValidObjectId(productId) ||
            !size ||
            !color
          ) {
            throw new Error("Missing product, size, or color metadata");
          }
          console.log("STEP 3: Stripe product metadata");
          console.log("Metadata:", stripeProduct.metadata);
          const product = await Product.findById(productId);

          if (!product) {
            throw new Error(`Product not found: ${productId}`);
          }
          console.log("STEP 4: MongoDB product found:", product._id);
          if (
            !Number.isInteger(lineItem.quantity) ||
            lineItem.quantity < 1 ||
            !Number.isFinite(lineItem.price?.unit_amount)
          ) {
            throw new Error("Invalid purchased quantity or price");
          }

          orderItems.push({
            product_id: product._id,
            name: product.name,
            quantity: lineItem.quantity,
            price: lineItem.price!.unit_amount! / 100,
            size,
            color,
            image: product.images?.map((img) => img.url) ?? [],
          });
        }

        if (orderItems.length === 0) {
          throw new Error("No purchased items found");
        }

        const order = await Order.findOneAndUpdate(
          { stripe_session_id: session.id },
          {
            $setOnInsert: {
              user_id: new mongoose.Types.ObjectId(userId),
              items: orderItems,
              total_price: (session.amount_total ?? 0) / 100,
              status: "pending",
              payment_method: "card",
              payment_status: "paid",
              stripe_session_id: session.id,
            },
          },
          {
            upsert: true,
            new: true,
            runValidators: true,
          },
        );

        console.log("Order created/confirmed:", order?._id);

        await Cart.deleteOne({ user_id: userId });
        const deletedCart = await Cart.deleteOne({ user_id: userId });

        console.log("STEP 6: Cart deletion result:", deletedCart);

        console.log("Cart deleted for user:", userId);
        break;
      }

      default:
        console.log("Unhandled event:", event.type);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack:", error.stack);
    }

    res.status(500).json({
      message: "Webhook processing failed",
    });
  }
};
