import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

export const uploadsigleImage = async (image: string, folder_name: string) => {
  const response = await cloudinary.uploader.upload(image, {
    folder: folder_name,
  });

  return {
    image_url: response.secure_url,
    public_id: response.public_id,
  };
};

export const deleteImage = async (public_id: string) => {
  const response = await cloudinary.uploader.destroy(public_id);

  return response?.result === "ok";
};

