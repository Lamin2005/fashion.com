import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const imageSchema = z.object({
  file: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG, PNG, and WEBP files are allowed",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Image size must be less than 5MB",
    }),

  preview: z.string().min(1, "Image preview is required"),
  public_id: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),

  category: z.string().min(1, "Category is required"),

  price: z
    .number({
      message: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  sizes: z
    .array(z.enum(["XS", "S", "M", "L", "XL", "XXL"]))
    .min(1, "At least one size is required"),

  colors: z.array(z.string()).min(1, "At least one color is required"),
  instock_count: z
    .number({
      message: "In Stock Count must be a number",
    })
    .positive("In Stock Count must be greater than 0"),
  rating_count: z.string(),

  images: z.array(imageSchema).min(1, "At least one image is required"),

  is_new_arrival: z.boolean().optional(),

  is_feature: z.boolean().optional(),
});

export type ProductFormInput = z.infer<typeof productSchema>;
