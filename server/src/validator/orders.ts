import { param, body } from "express-validator";

export const sessionIdValidator = [
  param("sessionId")
    .isString()
    .withMessage("Session ID must be a string")
    .bail()
    .matches(/^cs_/)
    .withMessage("Invalid Stripe session ID"),
];

export const orderIdValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),
];

export const updateOrderValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),

  body("status")
    .optional()
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled"])
    .withMessage("Invalid order status"),

  body("payment_status")
    .optional()
    .isIn(["pending", "paid", "failed", "refunded"])
    .withMessage("Invalid payment status"),

  body("shipping_address")
    .optional()
    .isString()
    .withMessage("Shipping address must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Shipping address cannot be empty"),

  body("phone")
    .optional()
    .isString()
    .withMessage("Phone must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Phone cannot be empty"),
];
