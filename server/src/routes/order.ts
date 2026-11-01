import { Router } from "express";

import {
  getOrderBySession,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/order";

import { authMiddleware, isAdmin } from "../middlewares/authmiddleware";
import asyncHandler from "../utils/asyncHandler";
import { validateRequest } from "../middlewares/validatorRequest";

import {
  sessionIdValidator,
  orderIdValidator,
  updateOrderValidator,
} from "../validator/orders";

const router = Router();

// User routes
router.get(
  "/session/:sessionId",
  authMiddleware,
  sessionIdValidator,
  validateRequest,
  getOrderBySession,
);

router.get("/my-orders", authMiddleware, getMyOrders);

router.get(
  "/:id",
  authMiddleware,
  orderIdValidator,
  validateRequest,
  getOrderById,
);

// isAdmin routes
router.get("/", authMiddleware, isAdmin, getAllOrders);

router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  updateOrderValidator,
  validateRequest,
  updateOrder,
);

router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  orderIdValidator,
  validateRequest,
  deleteOrder,
);

export default router;
