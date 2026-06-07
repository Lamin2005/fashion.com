import { Request, Response } from "express";
import Product from "../model/product";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const {
    name,
    description,
    price,
    instock_count,
    category,
    sizes,
    colors,
    images,
    is_new_arrival,
    is_feature,
    rating_count,
  } = req.body;

  const user = req.user?._id;

  if (
    !name &&
    !description &&
    !price &&
    !instock_count &&
    !category &&
    !sizes &&
    !colors &&
    !images &&
    !is_new_arrival &&
    !is_feature &&
    !rating_count
  ) {
    res.status(400);
    throw new Error("Please Fill all filed...");
  }

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized user...");
  }

  const product = await Product.create({
    name,
    description,
    price,
    instock_count,
    category,
    sizes,
    colors,
    images,
    is_new_arrival,
    is_feature,
    rating_count,
    user,
  });

  res.status(201).json({ messsage: "Successfully create Product.", product });
};
