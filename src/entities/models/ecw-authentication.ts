import { z } from "zod"

export const ecwAuthenticationSchema = z.object({
  access_token: z.string(),
  patient: z.string(),
  scope: z.string(),
  need_patient_banner: z.string(),
  id_token: z.string(),
  smart_style_url: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional()
})

export type EcwAuthentication = z.infer<typeof ecwAuthenticationSchema>
