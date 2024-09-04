import { z } from "zod";

export const selectStatusSchema = z.object({
  id: z.number(),
  created_at: z.date(),
  name: z.string(),
  description: z.string().nullable(),
  org_code: z.string(),
  category: z.string(),
  next_status_id: z.number().optional(),
  label: z.string(),
  style_variant: z.string(),
});

export type Status = z.infer<typeof selectStatusSchema>;