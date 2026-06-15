import { Router } from "express";
import { register, login, logout, uploadAvatar } from "../controllers/auth";
import asyncHandler from "../utils/asyncHandler";
import {
  userRegisterValidator,
  userLoginValidator,
  uploadImageValidator,
} from "../validator/users";
import { validateRequest } from "../middlewares/validatorRequest";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post(
  "/register",
  userRegisterValidator,
  validateRequest,
  asyncHandler(register),
);
router.post("/login", userLoginValidator, validateRequest, asyncHandler(login));
router.post("/logout", asyncHandler(logout));
router.post(
  "/upload",
  uploadImageValidator,
  validateRequest,
  authMiddleware,
  asyncHandler(uploadAvatar),
);

export default router;
