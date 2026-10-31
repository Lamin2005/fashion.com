import { Router } from "express";

import { getOrderBySession } from "../controllers/order";
import { authMiddleware } from "../middlewares/authmiddleware";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.get(
  "/session/:sessionId",
  authMiddleware,
  asyncHandler(getOrderBySession),
);

export default router;
