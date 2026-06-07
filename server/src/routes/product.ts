import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product";
import asyncHandler from "../utils/asyncHandler";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware";
import { createProductvalidator } from "../validator/products";
import { validateRequest } from "../middlewares/validatorRequest";

const router = Router();

router.get("/", authMiddleware, isAdmin, asyncHandler(getAllProducts));
router.post(
  "/create",
  authMiddleware,
  isAdmin,
  createProductvalidator,
  validateRequest,
  asyncHandler(createProduct),
);
router.put("/update/:id", authMiddleware, isAdmin, asyncHandler(updateProduct));
router.delete(
  "/delete/:id",
  authMiddleware,
  isAdmin,
  asyncHandler(deleteProduct),
);
router.get("/:id", authMiddleware, isAdmin, asyncHandler(getProductById));

export default router;
