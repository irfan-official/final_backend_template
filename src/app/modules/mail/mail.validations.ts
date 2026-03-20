import { z } from "zod";

export const getMailSchema = z.object({
  query: z.object({}).optional(),
});