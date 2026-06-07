import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/user";
import { Types } from "mongoose";
import asyncHandler from "../utils/asyncHandler";

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: "customer" | "admin";
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not included Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found Unauthorized",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "User token not accessible Unauthorized",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const isAdmin = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Admin access required" });
    }
  },
);
