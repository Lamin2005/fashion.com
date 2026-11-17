import type { Request, Response } from "express";

import User from "../model/user";
import Order from "../model/order";
import Address from "../model/address";

// ==========================================
// GET CUSTOMER DATA
// ==========================================

const getCustomers = async () => {
  // 1. Get all users except admin
  const users = await User.find({ role: { $ne: "admin" } })
    .select("-password")
    .sort({ createdAt: -1 });

  // 2. Get order and address for each user
  const customers = await Promise.all(
    users.map(async (user) => {
      // Get customer's orders
      const orders = await Order.find({
        user_id: user._id,
      });

      // Get customer's default address
      const address = await Address.findOne({
        user_id: user._id,
        isDefault: true,
      });

      // If no default address, get the latest address
      const customerAddress =
        address ||
        (await Address.findOne({
          user_id: user._id,
        }).sort({ createdAt: -1 }));

      // Calculate total spent
      const totalSpent = orders
        .filter((order) => order.payment_status === "paid")
        .reduce((total, order) => total + order.total_price, 0);

      // Get last order
      const lastOrder = orders.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      )[0];

      // Active status: ordered within 30 days
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      const isActive = lastOrder
        ? Date.now() - lastOrder.createdAt.getTime() <= thirtyDays
        : false;

      // Return customer data
      return {
        _id: user._id,
        name: user.name,
        email: user.email,

        // Phone comes from Address database
        phone: customerAddress?.phone || "",

        location: customerAddress
          ? `${customerAddress.city}, ${customerAddress.township}`
          : "No address",

        totalOrders: orders.length,
        totalSpent,

        status: isActive ? "Active" : "Inactive",

        joinedAt: user.createdAt,
      };
    }),
  );

  return customers;
};

// ==========================================
// GET ALL CUSTOMERS
// GET /api/customers
// ==========================================

export const getAllCustomers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const keyword = String(req.query.keyword || "")
      .toLowerCase()
      .trim();

    const status = String(req.query.status || "all");
    const sort = String(req.query.sort || "newest");

    // Get all customer data
    let customers = await getCustomers();

    // Search customers
    if (keyword) {
      customers = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(keyword) ||
          customer.email.toLowerCase().includes(keyword) ||
          customer.phone.toLowerCase().includes(keyword) ||
          customer._id.toString().includes(keyword),
      );
    }

    // Filter status
    if (status !== "all") {
      customers = customers.filter((customer) => customer.status === status);
    }

    // Sort customers
    if (sort === "newest") {
      customers.sort(
        (a, b) =>
          new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
      );
    } else if (sort === "oldest") {
      customers.sort(
        (a, b) =>
          new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime(),
      );
    } else if (sort === "orders") {
      customers.sort((a, b) => b.totalOrders - a.totalOrders);
    } else if (sort === "spent") {
      customers.sort((a, b) => b.totalSpent - a.totalSpent);
    }

    // Pagination
    const totalCustomers = customers.length;
    const totalPages = Math.ceil(totalCustomers / limit);

    const startIndex = (page - 1) * limit;

    const paginatedCustomers = customers.slice(startIndex, startIndex + limit);

    res.status(200).json({
      success: true,
      customers: paginatedCustomers,
      pagination: {
        currentPage: page,
        limit,
        totalCustomers,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get customers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

// ==========================================
// GET CUSTOMER STATS
// GET /api/customers/stats
// ==========================================

export const getCustomerStats = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const customers = await getCustomers();

    const totalCustomers = customers.length;

    const activeCustomers = customers.filter(
      (customer) => customer.status === "Active",
    ).length;

    const inactiveCustomers = customers.filter(
      (customer) => customer.status === "Inactive",
    ).length;

    // Customers registered within 30 days
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    const newCustomers = customers.filter((customer) => {
      const joinedDate = new Date(customer.joinedAt);

      return Date.now() - joinedDate.getTime() <= thirtyDays;
    }).length;

    res.status(200).json({
      success: true,
      stats: {
        totalCustomers,
        activeCustomers,
        inactiveCustomers,
        newCustomers,
      },
    });
  } catch (error) {
    console.error("Customer stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customer statistics",
    });
  }
};

// ==========================================
// GET CUSTOMER DETAILS
// GET /api/customers/:id
// ==========================================

export const getCustomerById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find customer
    const customer = await User.findById(id).select("-password");

    if (!customer || customer.role === "admin") {
      res.status(404).json({
        success: false,
        message: "Customer not found",
      });
      return;
    }

    // Get addresses
    const addresses = await Address.find({
      user_id: customer._id,
    }).sort({ isDefault: -1, createdAt: -1 });

    // Get orders
    const orders = await Order.find({
      user_id: customer._id,
    }).sort({ createdAt: -1 });

    // Calculate total spent
    const totalSpent = orders
      .filter((order) => order.payment_status === "paid")
      .reduce((total, order) => total + order.total_price, 0);

    // Get default address
    const defaultAddress =
      addresses.find((address) => address.isDefault) || addresses[0];

    // Get last order
    const lastOrder = orders[0];

    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    const isActive = lastOrder
      ? Date.now() - lastOrder.createdAt.getTime() <= thirtyDays
      : false;

    res.status(200).json({
      success: true,

      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: defaultAddress?.phone || "",

        location: defaultAddress
          ? `${defaultAddress.city}, ${defaultAddress.township}`
          : "No address",

        totalOrders: orders.length,
        totalSpent,

        status: isActive ? "Active" : "Inactive",
        joinedAt: customer.createdAt,
      },

      addresses,
      orders,
    });
  } catch (error) {
    console.error("Get customer details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customer details",
    });
  }
};
