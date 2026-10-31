import type { Response } from "express";
import mongoose from "mongoose";

import Cart from "../model/cart";
import Product from "../model/product";
import type { AuthenticatedRequest } from "../middlewares/authmiddleware";

const getUserId = (req: AuthenticatedRequest) => {
  return req.user?._id;
};

const makeKey = (productId: string, size: string, color: string) =>
  `${productId}-${size}-${color}`;

const formatCart = (cart: any) => ({
  _id: cart._id,
  user_id: cart.user_id,
  items: cart.items
    .filter((item: any) => item.product_id)
    .map((item: any) => ({
      key: item.key,
      product: item.product_id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    })),
  createdAt: cart.createdAt,
  updatedAt: cart.updatedAt,
});

// GET /api/cart
export const getMyCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({ message: "Please login first." });
      return;
    }

    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
        items: [],
      });
    }

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product_id")
      .lean();

    res.status(200).json({
      cart: formatCart(populatedCart),
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Failed to get cart." });
  }
};

// POST /api/cart/items
export const addCartItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        message: "Please login first.",
      });
      return;
    }

    const { product_id, quantity = 1, size, color } = req.body;

    if (
      !mongoose.isValidObjectId(product_id) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      typeof size !== "string" ||
      !size.trim() ||
      typeof color !== "string" ||
      !color.trim()
    ) {
      res.status(400).json({
        message: "Invalid product, quantity, size, or color.",
      });
      return;
    }

    const product = await Product.findById(product_id);

    if (!product) {
      res.status(404).json({
        message: "Product not found.",
      });
      return;
    }

    if (!product.sizes?.includes(size) || !product.colors?.includes(color)) {
      res.status(400).json({
        message: "Selected size or color is unavailable.",
      });
      return;
    }

    const stock = Number(product.instock_count);

    if (!Number.isFinite(stock) || stock < 0) {
      res.status(400).json({
        message: "Invalid product stock.",
      });
      return;
    }

    let cart = await Cart.findOne({
      user_id: userId,
    });

    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
        items: [],
      });
    }

    const totalProductQuantity = cart.items
      .filter((item) => item.product_id.toString() === product_id)
      .reduce((total, item) => total + item.quantity, 0);

    const key = makeKey(product_id, size, color);

    const existingItem = cart.items.find((item) => item.key === key);

    const quantityToAdd = Math.min(
      quantity,
      Math.max(0, stock - totalProductQuantity),
    );

    if (quantityToAdd < 1) {
      res.status(400).json({
        message: "Not enough stock available.",
      });
      return;
    }

    if (existingItem) {
      existingItem.quantity += quantityToAdd;
    } else {
      cart.items.push({
        key,
        product_id: product._id,
        quantity: quantityToAdd,
        size,
        color,
      });
    }

    cart.expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product_id")
      .lean();

    res.status(200).json({
      message: "Product added to cart.",
      cart: formatCart(populatedCart),
    });
  } catch (error) {
    console.error("Add cart item error:", error);

    res.status(500).json({
      message: "Failed to add item.",
    });
  }
};

// PATCH /api/cart/items/:key
export const updateCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({ message: "Please login first." });
      return;
    }

    const { quantity } = req.body;
    const key = req.params.key;

    if (!Number.isInteger(quantity) || quantity < 1) {
      res.status(400).json({
        message: "Quantity must be a positive integer.",
      });
      return;
    }

    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }

    const item = cart.items.find((cartItem) => cartItem.key === key);

    if (!item) {
      res.status(404).json({ message: "Cart item not found." });
      return;
    }

    const product = await Product.findById(item.product_id);

    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    const otherQuantity = cart.items
      .filter(
        (cartItem) =>
          cartItem.product_id.toString() === item.product_id.toString() &&
          cartItem.key !== key,
      )
      .reduce((total, cartItem) => total + cartItem.quantity, 0);

    if (otherQuantity + quantity > Number(product.instock_count)) {
      res.status(400).json({
        message: "Not enough stock available.",
      });
      return;
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product_id")
      .lean();

    res.status(200).json({
      message: "Cart quantity updated.",
      cart: formatCart(populatedCart),
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: "Failed to update cart." });
  }
};

// DELETE /api/cart/items/:key
export const removeCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({ message: "Please login first." });
      return;
    }

    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }

    const key = req.params.key;
    const oldLength = cart.items.length;

    cart.items = cart.items.filter((item) => item.key !== key);

    if (cart.items.length === oldLength) {
      res.status(404).json({ message: "Cart item not found." });
      return;
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product_id")
      .lean();

    res.status(200).json({
      message: "Item removed from cart.",
      cart: formatCart(populatedCart),
    });
  } catch (error) {
    console.error("Remove cart item error:", error);
    res.status(500).json({ message: "Failed to remove item." });
  }
};

// DELETE /api/cart
export const clearMyCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({ message: "Please login first." });
      return;
    }

    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $set: { items: [] } },
      { new: true },
    );

    if (!cart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }

    res.status(200).json({
      message: "Cart cleared.",
      cart: formatCart({ ...cart.toObject(), items: [] }),
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Failed to clear cart." });
  }
};
