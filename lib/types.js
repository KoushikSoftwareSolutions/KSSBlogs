import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({ message: "Please enter a valid email address" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

export const UserData = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),

    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),

    email: emailSchema,

    password: passwordSchema,

    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const UserLoginData = z.object({
  email: emailSchema,
  password: passwordSchema,
});
