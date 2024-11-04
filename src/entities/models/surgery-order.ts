import { z } from "zod"

export const surgeryOrderSchema = z.object({
  id: z.bigint(),
  created_at: z.date(),
  patient_name: z.string(),
  insurance_auth: z.string().nullable(),
  surgical_assistant: z.string().nullable(),
  insurance_status: z.bigint(), 
  clearance_status: z.bigint(),
  comm_status: z.bigint(),
  provider: z.string(),
  location: z.string(),
  other_location: z.string().nullable(),
  surgery_date: z.date(),
  procedure: z.string(),
  pre_op_labs: z.string().nullable(),
  clearance: z.string().nullable(),
  pre_op_visit_dme: z.string().nullable(),
  post_op_visit: z.string().nullable(),
  first_assist: z.string().nullable(),
  hardware_rep: z.string().nullable(),
  patient_cost: z.number().nullable(),
  surgery_orders_faxed: z.boolean(),
  surgery_instructions: z.string().nullable(),
  notes: z.string().nullable(),
})

export type SurgeryOrder = z.infer<typeof surgeryOrderSchema>
