import { body, param } from "express-validator";

export const addWishlistValidation = [
  body("productId")
    .trim()
    .notEmpty()
    .withMessage("Product ID is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid product ID."),
];

export const removeWishlistValidation = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid product ID."),
];
