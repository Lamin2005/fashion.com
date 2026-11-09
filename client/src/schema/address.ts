import { z } from "zod";

export const addressSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s()-]{7,20}$/, "Please provide a valid phone number"),

  address: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .max(250, "Address cannot exceed 250 characters"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City cannot exceed 100 characters"),

  township: z
    .string()
    .trim()
    .min(1, "Township is required")
    .max(100, "Township cannot exceed 100 characters"),

  postalCode: z
    .string()
    .trim()
    .max(20, "Postal code cannot exceed 20 characters"),

  type: z.enum(["Home", "Office"]),
});

export type AddressFormInput = z.infer<typeof addressSchema>;
