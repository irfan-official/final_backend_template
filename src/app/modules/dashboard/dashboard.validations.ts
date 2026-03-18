import { z } from "zod";
import { UserRole, UserStatus } from "@prisma/client";

export const getDashboardSchema = z.object({
  query: z.object({}).optional(),
});

export const getUserManagementsZodSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 1))
      .refine((val) => val > 0, {
        message: "page must be greater than 0",
      }),

    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 25))
      .refine((val) => val > 0 && val <= 25, {
        message: "limit cannot be greater than 25",
      }),

    search: z.string().optional(),

    role: z
      .enum([
        UserRole.ADMIN,
        UserRole.SUPER_ADMIN,
      ])
      .optional(),

    status: z
      .enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED])
      .optional(),
  }),
});