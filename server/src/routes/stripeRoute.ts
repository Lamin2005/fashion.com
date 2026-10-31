import { Router } from "express";
import {
  createCheckoutSession,
  stripewebhook,
} from "../controllers/stripeController";
import { authMiddleware } from "../middlewares/authmiddleware";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post(
  "/create-checkout-session",
  authMiddleware,
  asyncHandler(createCheckoutSession),
);
router.post("/webhook", asyncHandler(stripewebhook));

export default router;
