import { Request, Response } from "express";
import Product from "../model/product";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";

//@route POST /api/product/create
//@desc Create a new product
//@access Private

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

// @route GET /api/product
// @desc Get all products
// @access Public

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find().populate("user", "name email");
  res.status(200).json({ products });
};

// @route GET /api/product/:id
// @desc Get product by id
// @access Public

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("user", "name email");
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json({ product });
};

// @route DELETE /api/product/:id
// @desc Delete product by id
// @access Private

export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const id = req.params.id;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (product.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized user...");
  }
  await product.deleteOne();

  res.status(200).json({ message: "Product removed successfully" });
};

// @route PUT /api/product/:id
// @desc Update product by id
// @access Private

export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized user...");
  }

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

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.instock_count = instock_count || product.instock_count;
  product.category = category || product.category;
  product.sizes = sizes || product.sizes;
  product.colors = colors || product.colors;
  product.images = images || product.images;
  product.is_new_arrival = is_new_arrival || product.is_new_arrival;
  product.is_feature = is_feature || product.is_feature;
  product.rating_count = rating_count || product.rating_count;

  await product.save();

  res.status(200).json({ message: "Product updated successfully", product });
};
