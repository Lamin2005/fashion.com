import { Router } from "express";
import {
  register,
  login,
  logout,
  uploadAvatar,
  getProfile,
  emailUpdate,
  nameUpdate,
  passwordUpdate,
  sendEmailltoUser,
  resetPassword,
} from "../controllers/auth";
import asyncHandler from "../utils/asyncHandler";
import {
  userRegisterValidator,
  userLoginValidator,
  uploadImageValidator,
  emailUpdateValidator,
  nameUpdateValidator,
  passwordUpdateValidator,
  forgetEmailValidator,
  resetPasswordValidator,
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
router.get("/me", authMiddleware, asyncHandler(getProfile));
router.post(
  "/email-update",
  emailUpdateValidator,
  validateRequest,
  authMiddleware,
  asyncHandler(emailUpdate),
);
router.post(
  "/name-update",
  nameUpdateValidator,
  validateRequest,
  authMiddleware,
  asyncHandler(nameUpdate),
);
router.post(
  "/password-update",
  passwordUpdateValidator,
  validateRequest,
  authMiddleware,
  asyncHandler(passwordUpdate),
);
router.post(
  "/forgot-password",
  forgetEmailValidator,
  validateRequest,
  asyncHandler(sendEmailltoUser),
);
router.post(
  "/reset-password/:token",
  resetPasswordValidator,
  validateRequest,
  asyncHandler(resetPassword),
);

export default router;
