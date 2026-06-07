import { Router } from "express";
import { createProduct } from "../controllers/product";
import asyncHandler from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post("/create", authMiddleware, asyncHandler(createProduct));

export default router;
