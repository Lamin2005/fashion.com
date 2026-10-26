import { Router } from "express";

import {
  getMyCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearMyCart,
} from "../controllers/cart";

import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getMyCart);
router.post("/items", addCartItem);
router.patch("/items/:key", updateCartItem);
router.delete("/items/:key", removeCartItem);
router.delete("/", clearMyCart);

export default router;
