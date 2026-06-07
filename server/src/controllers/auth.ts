import { Request, Response } from "express";
import User from "../model/user";
import { generateToken } from "../utils/generateToken";

//@route POST /api/auth/register
//@desc Register a new user
//@access Public

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
};

// @route POST /api/auth/login
// @desc Login user and return token
// @access Public

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user,
    token,
  });
};

// @route POST /api/auth/logout
// @desc Logout user and clear token
// @access Public

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.status(200).json({ message: "Logout successful" });
};
