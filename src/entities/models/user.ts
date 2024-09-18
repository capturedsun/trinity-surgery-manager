import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  first_name: z.string(),
  last_name: z.string(),
  org_code: z.string(),
  role: z.string(),
});

export type User = z.infer<typeof userSchema>;
