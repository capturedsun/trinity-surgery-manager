// **************************************************
// DEPRECATED, WILL MOVE OVER TO /SRC/ENTITIES/MODELS/
// **************************************************

export type Usage = {
  surgeryOrder: string
  status: string
  insuranceStatus: string
  clearanceStatus: string
  costs: number
  surgery: string
  facility: number
  date: string
}

export type OverviewData = {
  date: string
  "Rows written": number
  "Rows read": number
  Queries: number
  "Payments completed": number
  "Sign ups": number
  Logins: number
  "Sign outs": number
  "Support calls": number
}

export type NetworkProviders = {
  organization_practice_name: string
  network_tags: string[]
  hub_tags: string[]
  phone: string
  fax: string
  website: string
  providers: string[] // Assuming providers are represented by names or IDs
  locations: string[]
  referrals_received: number
  referrals_sent: number
  status: string
}

export interface Organization {
  id: number
  created_at: Date
  name: string
  org_code: string
  phone: string
  fax: string
  website: string
  npi: string
  locations: string // Assuming locations is a string; adjust if it's a more complex type
}

export interface StatusTag {
  id: number
  created_at: Date
  name: string
  description: string | null
  org_code: string
  category: string
  next_status_id?: number
  label: string
  style_variant: string
}

export interface CategorizedTags {
  category: string
  tags: StatusTag[]
}

export interface SurgeryOrder {
  id: number
  created_at: Date
  patient_name: string
  date_of_birth: Date
  surgeon: string
  surgical_procedure: string
  length_of_surgery: string // Adjust type if it's a number or duration
  classification: string
  pre_op_diagnosis: string
  anesthesia_type: string
  pre_admission_testing: string
  facility: string
  post_surgical_dme: string
  special_equipment: string
  date_scheduled: Date
  insurance_auth: string
  surgical_assistant: string
  txt: string // Assuming this is a text field; adjust if necessary
}

export interface User {
  id: number
  created_at: Date
  first_name: string
  last_name: string
  org_code: string
  role: string
}