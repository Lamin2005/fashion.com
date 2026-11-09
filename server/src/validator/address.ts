import { body, param } from "express-validator";

export const addressValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone("any")
    .withMessage("Please provide a valid phone number."),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Street address is required.")
    .isLength({ max: 250 })
    .withMessage("Address cannot exceed 250 characters."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required.")
    .isLength({ max: 100 })
    .withMessage("City cannot exceed 100 characters."),

  body("township")
    .trim()
    .notEmpty()
    .withMessage("Township is required.")
    .isLength({ max: 100 })
    .withMessage("Township cannot exceed 100 characters."),

  body("postalCode")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 20 })
    .withMessage("Postal code cannot exceed 20 characters."),

  body("type")
    .optional()
    .isIn(["Home", "Office"])
    .withMessage("Address type must be Home or Office."),
];

export const addressIdValidation = [
  param("id").isMongoId().withMessage("Invalid address ID."),
];
