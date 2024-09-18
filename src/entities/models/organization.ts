import { z } from "zod"

export const organizationSchema = z.object({
  id: z.bigint(),
  created_at: z.string().datetime(),
  name: z.string(),
  org_code: z.string(),
  npi: z.number().int(),
  phone: z.number().int(),
  fax: z.number().int(),
  website: z.string().url().optional(),
  locations: z.array(z.object({
  })).optional(),
})

export type Organization = z.infer<typeof organizationSchema>
