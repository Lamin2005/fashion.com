import { body } from "express-validator";

export const userRegisterValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const userLoginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const uploadImageValidator = [
  body("image_url").notEmpty().withMessage("Image is required"),
];

export const emailUpdateValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
];

export const nameUpdateValidator = [
  body("name").notEmpty().withMessage("Name is required"),
];

export const passwordUpdateValidator = [
  body("oldPassword").notEmpty().withMessage("Password is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
