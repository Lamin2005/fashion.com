import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const emailSchma = z.object({
  email: z
    .string()
    .nonempty("Email is required to update")
    .email("Invalid email address"),
});

export const nameSchma = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

export const passwordSchma = z.object({
  oldPassword: z.string().nonempty("Old Password is required"),
  password: z
    .string()
    .nonempty("Password is required to update")
    .min(6, "Password must be at least 6 characters long"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
