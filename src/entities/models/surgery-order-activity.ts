import { z } from "zod"

export const surgeryOrderActivitySchema = z.object({
  id: z.bigint(),
  created_at: z.date(),
  activity_type: z.string(),
  previous_value: z.string().nullable(),
  new_value: z.string().nullable(),
  created_by_user_id: z.string().uuid(),
  surgery_order_id: z.string().uuid(),
  metadata: z.record(z.unknown()).optional(),
  description: z.string().nullable()
})

export type SurgeryOrderActivity = z.infer<typeof surgeryOrderActivitySchema>
