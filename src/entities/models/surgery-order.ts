import { z } from "zod"

export const surgeryOrderSchema = z.object({
  id: z.bigint(),
  created_at: z.date(),
  patient_name: z.string(),
  surgical_assistant: z.string().nullable(),
  insurance_status: z.bigint(), 
  clearance_status: z.bigint(),
  comm_status: z.bigint(),
  provider: z.string(),
  facility: z.string(),
  supplies: z.string(),
  length: z.string(),
  classification: z.string(),
  anesthesia_type: z.string(),
  surgery_date: z.date(),
  procedure: z.string(),
  clearance: z.string().nullable(),
  pre_op_labs: z.string().nullable(),
  pre_op_diagnosis: z.string(),
  pre_op_visit_dme: z.string().nullable(),
  post_op_visit: z.string().nullable(),
  first_assist: z.string().nullable(),
  vendor: z.string().nullable(),
  insurance_auth: z.string().nullable(),
  patient_cost: z.number().nullable(),
  surgery_orders_faxed: z.boolean(),
  surgery_instructions: z.string().nullable(),
  notes: z.string().nullable(),
})

export type SurgeryOrder = z.infer<typeof surgeryOrderSchema>
