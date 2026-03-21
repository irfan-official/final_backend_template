import { z } from "zod";

export const getServeFileSchema = z.object({
  query: z.object({}).optional(),
});