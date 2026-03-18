import { z } from "zod";

export const createWaitingListZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),

    // phone: z
    //   .string({ required_error: "Phone number is required" })
    //   .min(6,  "Phone number must be at least 6 characters")
    //   .max(20, "Phone number cannot exceed 20 characters"),
  }),
});

export const getWaitingListZodSchema = z.object({
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
      .transform((val) => (val ? Number(val) : 10))
      .refine((val) => val > 0, {
        message: "limit must be greater than 0",
      }),

    search: z.string().optional(),
  }),
});

export const updateWaitingListZodSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "ID is required" }).min(1, "ID is required"),
  }),

  body: z
    .object({
      email: z.string().email("Invalid email address").optional(),
      phone: z
        .string()
        .min(6,  "Phone number must be at least 6 characters")
        .max(20, "Phone number cannot exceed 20 characters")
        .optional(),
    })
    .refine((data) => data.email || data.phone, {
      message: "At least one field (email or phone) must be provided to update",
    }),
});

export const deleteWaitingListZodSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "ID is required" }).min(1, "ID is required"),
  }),
});
