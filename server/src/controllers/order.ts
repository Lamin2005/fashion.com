import type { Response } from "express";
import mongoose from "mongoose";

import Order from "../model/order";
import type { AuthenticatedRequest } from "../middlewares/authmiddleware";

export const getOrderBySession = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;
    const { sessionId } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first",
      });
      return;
    }

    if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
      res.status(400).json({
        success: false,
        message: "Invalid Stripe session ID",
      });
      return;
    }

    const order = await Order.findOne({
      stripe_session_id: sessionId,
      user_id: new mongoose.Types.ObjectId(userId),
    }).lean();

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order has not been created yet",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get confirmed order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
    });
  }
};
