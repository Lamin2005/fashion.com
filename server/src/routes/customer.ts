import { Router } from "express";

import {
  getAllCustomers,
  getCustomerStats,
  getCustomerById,
} from "../controllers/customer";

import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/stats", getCustomerStats);

router.get("/", getAllCustomers);

router.get("/:id", getCustomerById);

export default router;
