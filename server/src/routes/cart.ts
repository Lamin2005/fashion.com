import { Router } from "express";

import {
  getMyCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearMyCart,
} from "../controllers/cart";

import { authMiddleware } from "../middlewares/authmiddleware";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(authMiddleware);

router.get("/", asyncHandler(getMyCart));
router.post("/items", asyncHandler(addCartItem));
router.patch("/items/:key", asyncHandler(updateCartItem));
router.delete("/items/:key", asyncHandler(removeCartItem));
router.delete("/", asyncHandler(clearMyCart));

export default router;
