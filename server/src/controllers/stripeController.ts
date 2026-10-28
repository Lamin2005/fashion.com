import type { Request, Response } from "express";
import Product from "../model/product";
import stripe from "../config/stripe";
import Stripe from "stripe";
interface CheckoutItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const createCheckoutSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
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
            name: product.name,
            description: `Size: ${item.size} | Color: ${item.color}`,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted_page",
      line_items: lineItems,
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

export const stripewebhook = (req: Request, res: Response) => {
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

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Checkout completed:", session.id);
      console.log("Payment status:", session.payment_status);

      if (session.payment_status === "paid") {
        console.log("Payment successful");
      }

      break;
    }

    default:
      console.log("Unhandled event:", event.type);
  }

  res.status(200).json({ received: true });
};
