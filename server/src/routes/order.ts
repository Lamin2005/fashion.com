import { Router } from "express";

import {
  getOrderBySession,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrder,
  // deleteOrder,
  getRecentOrders,
  getOrderStats,
  exportOrders,
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

// isAdmin routes
router.get("/", authMiddleware, isAdmin, asyncHandler(getAllOrders));

router.get("/recent", authMiddleware, asyncHandler(getRecentOrders));

router.get("/stats", authMiddleware, isAdmin, asyncHandler(getOrderStats));

router.get("/export", authMiddleware, isAdmin, asyncHandler(exportOrders));

router.get(
  "/:id",
  authMiddleware,
  orderIdValidator,
  validateRequest,
  getOrderById,
);

router.patch(
  "/:id",
  authMiddleware,
  isAdmin,
  updateOrderValidator,
  validateRequest,
  asyncHandler(updateOrder),
);

// router.delete(
//   "/:id",
//   authMiddleware,
//   isAdmin,
//   orderIdValidator,
//   validateRequest,
//   deleteOrder,
// );

export default router;
