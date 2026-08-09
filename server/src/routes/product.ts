import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  // getAllProducts,
  getProductById,
  getProductwithFilter,
  getnewProduct,
  getfeaturedProduct,
} from "../controllers/product";
import asyncHandler from "../utils/asyncHandler";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware";
import { createProductvalidator } from "../validator/products";
import { validateRequest } from "../middlewares/validatorRequest";
import { getMetaProduct } from "../controllers/product";

const router = Router();

// router.get("/", authMiddleware, isAdmin, asyncHandler(getAllProducts));

router.get("/", asyncHandler(getProductwithFilter));

router.post(
  "/create",
  authMiddleware,
  isAdmin,
  createProductvalidator,
  validateRequest,
  asyncHandler(createProduct),
);

router.get("/new", asyncHandler(getnewProduct));

router.get("/featured", asyncHandler(getfeaturedProduct));
router.get("/filters/meta", asyncHandler(getMetaProduct));

router.put("/update/:id", authMiddleware, isAdmin, asyncHandler(updateProduct));
router.delete(
  "/delete/:id",
  authMiddleware,
  isAdmin,
  asyncHandler(deleteProduct),
);
router.get("/:id", asyncHandler(getProductById));

export default router;
