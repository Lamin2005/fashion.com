import { Router } from "express";
import {
  createCheckoutSession,
  stripewebhook,
} from "../controllers/stripeController";

const router = Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/webhook", stripewebhook);

export default router;
