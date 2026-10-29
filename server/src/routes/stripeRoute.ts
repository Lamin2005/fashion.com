import { Router } from "express";
import {
  createCheckoutSession,
  stripewebhook,
} from "../controllers/stripeController";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post("/create-checkout-session", authMiddleware ,createCheckoutSession);
router.post("/webhook", stripewebhook);

export default router;
