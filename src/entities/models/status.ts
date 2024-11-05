import { z } from "zod"

export const selectStatusSchema = z.object({
  id: z.bigint(),
  created_at: z.date(),
  name: z.string(),
  description: z.string().nullable(),
  org_code: z.string(),
  category: z.string(),
  next_status_id: z.bigint().optional(),
  label: z.string(),
  style_variant: z.string(),
})

export const categorizedStatusesSchema = z.record(z.string(), z.array(selectStatusSchema))

export type Status = z.infer<typeof selectStatusSchema>
export type CategorizedStatuses = z.infer<typeof categorizedStatusesSchema>
