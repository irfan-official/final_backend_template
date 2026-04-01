import { z } from "zod";

export const getPaymentsSchema = z.object({
  query: z.object({}).optional(),
});