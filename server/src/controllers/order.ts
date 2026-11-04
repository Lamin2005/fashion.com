import type { Response } from "express";
import mongoose from "mongoose";

import Order from "../model/order";
import type { AuthenticatedRequest } from "../middlewares/authmiddleware";
import User from "../model/user";

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
      return;
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

export const getMyOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first",
      });
      return;
    }

    const orders = await Order.find({
      user_id: userId,
    })
      .sort({ createdAt: -1 })
      .populate("products.product_id", "name price")
      .lean();

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve your orders",
    });
  }
};

export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);

    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const skip = (page - 1) * limit;

    const { status, payment_status, keyword, sort } = req.query;

    const filter: Record<string, any> = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (payment_status && payment_status !== "all") {
      filter.payment_status = payment_status;
    }

    if (keyword && typeof keyword === "string") {
      const searchRegex = new RegExp(
        keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );

      const users = await User.find({
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { phone: searchRegex },
        ],
      }).select("_id");

      const userIds = users.map((user) => user._id);

      filter.$or = [
        { stripe_session_id: searchRegex },
        { user_id: { $in: userIds } },
      ];
    }

    const sortOrder = sort === "oldest" ? 1 : -1;

    const [orders, totalOrders] = await Promise.all([
      Order.find(filter)
        .populate("user_id", "name email phone avatar")
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),

      Order.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        limit,
        totalOrders,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get orders",
    });
  }
};

export const getOrderStats = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,

          totalOrders: { $sum: 1 },

          pendingOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },

          processingOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "processing"] }, 1, 0],
            },
          },

          completedOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "shipped"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalOrders: 1,
          pendingOrders: 1,
          processingOrders: 1,
          completedOrders: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0] ?? {
        totalOrders: 0,
        pendingOrders: 0,
        processingOrders: 0,
        completedOrders: 0,
      },
    });
  } catch (error) {
    console.error("Get order stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get order statistics",
    });
  }
};

export const getRecentOrders = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user_id", "name email phone")
      .lean();

    res.status(200).json({
      success: true,
      orders: recentOrders,
    });
  } catch (error) {
    console.error("Get recent orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get recent orders",
    });
  }
};

export const getOrderById = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Please login first",
      });
      return;
    }

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
      return;
    }

    const isAdmin = req.user?.role === "admin";

    const filter = isAdmin ? { _id: id } : { _id: id, user_id: userId };

    const order = await Order.findOne(filter)
      .populate("user_id", "name email phone")
      .lean();

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
    });
  }
};

export const updateOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, shipping_address, phone, payment_status } = req.body;

    const updates: {
      status?: string;
      shipping_address?: string;
      phone?: string;
      payment_status?: string;
    } = {};

    if (status !== undefined) {
      updates.status = status;
    }

    if (payment_status !== undefined) {
      updates.payment_status = payment_status;
    }

    if (shipping_address !== undefined) {
      updates.shipping_address = shipping_address;
    }

    if (phone !== undefined) {
      updates.phone = phone;
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        success: false,
        message: "Please provide fields to update",
      });
      return;
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};

// export const deleteOrder = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const { id } = req.params;

//     if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
//       res.status(400).json({
//         success: false,
//         message: "Invalid order ID",
//       });
//       return;
//     }

//     const order = await Order.findByIdAndDelete(id);

//     if (!order) {
//       res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Order deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete order error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to delete order",
//     });
//   }
// };
