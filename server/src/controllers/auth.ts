import { Request, Response } from "express";
import User from "../model/user";
import { generateToken } from "../utils/generateToken";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";
import { deleteImage, uploadsigleImage } from "../utils/cloudinary";

//@route POST /api/auth/register
//@desc Register a new user
//@access Public
const isProduction = process.env.NODE_ENV === "production";

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
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
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
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};

// @route POST /api/auth/upload
// @desc Upload user avatar
// @access Private

export const uploadAvatar = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const user = req.user?._id;
  const { image_url } = req.body;

  const existingUser = await User.findById(user);

  if (existingUser?.avatar?.public_id) {
    await deleteImage(existingUser?.avatar?.public_id);
  }

  const upload = await uploadsigleImage(image_url, "fashion.com/avatar");

  const uploadImage = await User.findByIdAndUpdate(user, {
    avatar: {
      image_url: upload.image_url,
      public_id: upload.public_id,
    },
  });

  res.status(200).json({ message: "Successfully Uploaded Avatar..." });
};

// @route POST /api/auth/me
// @desc get user data
// @access Private

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user?._id;

  const userdata = await User.findById(user).select("-password");

  res.status(200).json({ message: "Successfully get Data...", user: userdata });
};

// @route POST /api/auth/email-update
// @desc update user's email
// @access Private

export const emailUpdate = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user?._id;
  const { email } = req.body;
  const oldemail = req.user?.email;

  if (oldemail === email) {
    res.status(400);
    throw new Error("Use Different Email to Update.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const emailupdate = await User.findByIdAndUpdate(id, { email });

  res.status(200).json({ message: "Email Update Successfully." });
};

// @route POST /api/auth/name-update
// @desc update user's name
// @access Private

export const nameUpdate = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user?._id;
  const { name } = req.body;
  const oldname = req.user?.name;

  if (oldname === name) {
    res.status(400);
    throw new Error("Use Different Name to Update.");
  }

  const emailupdate = await User.findByIdAndUpdate(id, { name });

  res.status(200).json({ message: "Name Update Successfully." });
};

// @route POST /api/auth/password-update
// @desc update user's password
// @access Private

export const passwordUpdate = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const id = req.user?._id;
  const { oldPassword, password } = req.body;

  const existingUser = await User.findById(id);

  if (!existingUser) {
    res.status(400);
    throw new Error("User Not Found.");
  }

  const isMatched = await existingUser.comparePassword(oldPassword);

  if (!isMatched) {
    res.status(400);
    throw new Error("Invalid Old Password.");
  }

  if (oldPassword === password) {
    res.status(400);
    throw new Error("New password must be different from old password.");
  }

  existingUser.password = password;

  await existingUser.save();

  res.status(200).json({ message: "Password Update Successfully." });
};
