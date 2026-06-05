import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
  return token;
};
