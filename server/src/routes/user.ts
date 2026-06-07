import { Router } from "express";
import { register, login, logout } from "../controllers/auth";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(logout));

export default router;
