import { Request, Response } from "express";
import User from "../model/user";
import { generateToken } from "../utils/generateToken";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";
import { deleteImage, uploadsigleImage } from "../utils/cloudinary";
import { sendingEmail } from "../utils/sendingEmail";

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

export const sendEmailltoUser = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const id = req.user?._id;
  const user_email = req.user?.email;

  const existingUser = await User.findById(id);

  if (!existingUser) {
    res.status(400);
    throw new Error("User Not Found.");
  }

  const token = await existingUser.generateResetToken();
  await existingUser.save();

  const reset_Url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const mailbody = `
<div style="background-color:#f4f7fb;padding:40px 20px;">
  <div
    style="
      max-width:600px;
      margin:auto;
      background:#ffffff;
      border-radius:20px;
      overflow:hidden;
      box-shadow:0 10px 30px rgba(0,0,0,.08);
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    "
  >

    <!-- Header -->
    <div
      style="
        background:linear-gradient(135deg,#2563eb,#4f46e5);
        padding:40px;
        text-align:center;
      "
    >
      <h1
        style="
          color:white;
          margin:0;
          font-size:28px;
          font-weight:700;
        "
      >
        Password Reset
      </h1>

      <p
        style="
          color:#dbeafe;
          margin-top:10px;
          font-size:15px;
        "
      >
        Secure account recovery
      </p>
    </div>

    <!-- Body -->
    <div style="padding:40px">

      <h2
        style="
          margin-top:0;
          color:#111827;
          font-size:24px;
        "
      >
        Hello ${existingUser.name} 👋
      </h2>

      <p
        style="
          color:#6b7280;
          line-height:1.8;
          font-size:15px;
        "
      >
        We received a request to reset your password.
        Click the button below to create a new password and regain access to your account.
      </p>

      <div style="text-align:center;margin:40px 0;">
        <a
          href="${reset_Url}"
          style="
            background:linear-gradient(135deg,#2563eb,#4f46e5);
            color:#ffffff;
            text-decoration:none;
            padding:16px 34px;
            border-radius:12px;
            font-size:16px;
            font-weight:600;
            display:inline-block;
          "
        >
          Reset Password →
        </a>
      </div>

      <div
        style="
          background:#f9fafb;
          border:1px solid #e5e7eb;
          border-radius:12px;
          padding:20px;
        "
      >
        <p
          style="
            margin:0 0 12px;
            color:#374151;
            font-weight:600;
          "
        >
          Or use this link:
        </p>

        <p
          style="
            word-break:break-all;
            color:#2563eb;
            font-size:14px;
            margin:0;
          "
        >
          ${reset_Url}
        </p>
      </div>

      <div
        style="
          margin-top:30px;
          padding:18px;
          background:#fff7ed;
          border-radius:12px;
          border:1px solid #fed7aa;
        "
      >
        <p
          style="
            margin:0;
            color:#9a3412;
            font-size:14px;
            line-height:1.7;
          "
        >
          ⏳ This password reset link will expire in <strong>1 minute</strong>.
        </p>
      </div>

      <hr
        style="
          margin:40px 0;
          border:none;
          border-top:1px solid #e5e7eb;
        "
      />

      <p
        style="
          color:#9ca3af;
          font-size:14px;
          line-height:1.8;
        "
      >
        If you didn't request a password reset, you can safely ignore this email.
        Your password will remain unchanged.
      </p>

    </div>

    <!-- Footer -->
    <div
      style="
        background:#111827;
        padding:30px;
        text-align:center;
      "
    >
      <h3
        style="
          color:white;
          margin:0;
          font-size:18px;
        "
      >
        FASHION.com
      </h3>

      <p
        style="
          color:#9ca3af;
          margin-top:10px;
          font-size:13px;
        "
      >
        Secure • Reliable • Trusted
      </p>
    </div>

  </div>
</div>
`;

  try {
    await sendingEmail({
      receiver_email: user_email!,
      subject: "Password Reset FROM - Fashion.com",
      html: mailbody,
    });

    res.status(200).json({ message: "Reset Password Email Send." });
  } catch (error) {
    console.log("Email Sending Error : ", error);
    existingUser.resetToken = undefined;
    existingUser.tokenExpire = undefined;
  }
};
