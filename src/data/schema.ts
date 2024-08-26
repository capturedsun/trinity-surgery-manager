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

export interface Status {
  id: number
  created_at: Date
  name: string
  description: string
  org_code: string
  category: string // e.g., "communication", "insurance", "clearance"
  next_status_id?: number // Optional, if it can be null
  label: string
  style_variant: string
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
  role: string // e.g., "admin", "user", etc.
}