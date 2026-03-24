import { z } from "zod";
import { UserRole } from "@prisma/client";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    role: z.enum([UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN]).default(UserRole.USER),
  })
});

export const checkUserIdSchema = z.object({
  params: z.object({
    userId: z
      .string()
      .min(1, "User ID is required")
      .max(30, "User ID must be at most 30 characters"),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z
    .object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      oldPassword: z.string().min(6).optional(),
      newPassword: z.string().min(6).optional(),
    })
    .refine(
      (data) => !(data.newPassword && !data.oldPassword),
      {
        message: "Old password is required to set a new password",
        path: ["oldPassword"], // ✅ cleaner
      }
    ),
});