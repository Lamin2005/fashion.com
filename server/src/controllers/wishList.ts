import { Request, Response } from "express";
import mongoose from "mongoose";

import Wishlist from "../model/wishList";
import Product from "../model/product";

import { AuthenticatedRequest } from "../middlewares/authmiddleware";

export const getWishlist = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(404);
      throw new Error("User not found");
    }

    const wishlist = await Wishlist.findOne({
      user_id: userId,
    }).populate({
      path: "products",
      select: "name price images category rating_count sizes colors",
    });

    res.status(200).json({
      success: true,
      wishlist: wishlist?.products ?? [],
    });
  } catch (error) {
    console.error("Get wishlist error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist.",
    });
  }
};

// POST /api/wishlist/add
export const addWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
      return;
    }

    if (!userId) {
      res.status(404);
      throw new Error("User not found");
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        $addToSet: {
          products: product._id,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    ).populate({
      path: "products",
      select: "name price images category rating_count sizes colors",
    });

    res.status(200).json({
      success: true,
      message: "Product added to wishlist.",
      wishlist: wishlist.products,
    });
  } catch (error) {
    console.error("Add wishlist error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist.",
    });
  }
};

// DELETE /api/wishlist/:productId
export const removeWishlistItem = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;

    if (!userId) {
      res.status(404);
      throw new Error("User not found");
    }

    if (typeof productId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
      return;
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        $pull: {
          products: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        new: true,
      },
    ).populate({
      path: "products",
      select: "name price images category rating_count sizes colors",
    });

    if (!wishlist) {
      res.status(404).json({
        success: false,
        message: "Wishlist not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
      wishlist: wishlist.products,
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist.",
    });
  }
};

// DELETE /api/wishlist/clear
export const clearWishlist = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first",
      });
      return;
    }

    await Wishlist.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        $set: {
          products: [],
        },
      },
    );

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully.",
      wishlist: [],
    });
  } catch (error) {
    console.error("Clear wishlist error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear wishlist.",
    });
  }
};
