import { body } from "express-validator";

export const createProductvalidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isNumeric().withMessage("Price is required and must be a number"),
  body("instock_count").isInt().withMessage("Instock count is required and must be a number"),
  body("category").notEmpty().withMessage("Category is required"),
  body("sizes").isArray({ min: 1 }).withMessage("Sizes must be an array"),
  body("colors").isArray({ min: 1 }).withMessage("Colors must be an array"),
  body("images").isArray({ min: 1 }).withMessage("Images must be an array"),
  body("images.*.file").notEmpty().withMessage("Image file is required"),
  body("is_new_arrival")
    .isBoolean()
    .withMessage("Is new arrival must be a boolean"),
  body("is_feature").isBoolean().withMessage("Is feature must be a boolean"),
  body("rating_count").isNumeric().withMessage("Rating count must be a number"),
];
