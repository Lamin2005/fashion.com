import express from "express";

import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearWishlist,
} from "../controllers/wishList";

import {
  addWishlistValidation,
  removeWishlistValidation,
} from "../validator/wishlist";

import { authMiddleware } from "../middlewares/authmiddleware";
import { validateRequest } from "../middlewares/validatorRequest";

const router = express.Router();

// GET Wishlist
router.get("/", authMiddleware, getWishlist);

// ADD Wishlist
router.post(
  "/add",
  authMiddleware,
  addWishlistValidation,
  validateRequest,
  addWishlistItem,
);

// REMOVE Wishlist Item
router.delete(
  "/:productId",
  authMiddleware,
  removeWishlistValidation,
  validateRequest,
  removeWishlistItem,
);

// CLEAR Wishlist
router.delete("/clear", authMiddleware, clearWishlist);

export default router;
