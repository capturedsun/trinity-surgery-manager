import { z } from "zod"

export const surgeryOrderActivitySchema = z.object({
  id: z.bigint(),
  created_at: z.date(),
  surgery_order_id: z.bigint(),
  activity_type: z.enum([
    'insurance_status_change',
    'clearance_status_change', 
    'communication_status_change',
    'comment'
  ]),
  previous_value: z.string().nullable(),
  new_value: z.string().nullable(),
  created_by_user_id: z.bigint(),
  metadata: z.record(z.unknown()).optional(),
  description: z.string().nullable()
})

export type SurgeryOrderActivity = z.infer<typeof surgeryOrderActivitySchema>
