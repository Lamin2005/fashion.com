import { Router } from "express";
import { register, login, logout } from "../controllers/auth";
import asyncHandler from "../utils/asyncHandler";
import { userRegisterValidator, userLoginValidator } from "../validator/users";
import { validateRequest } from "../middlewares/validatorRequest";

const router = Router();

router.post("/register", userRegisterValidator, validateRequest ,asyncHandler(register));
router.post("/login", userLoginValidator, validateRequest, asyncHandler(login));
router.post("/logout", asyncHandler(logout));

export default router;
