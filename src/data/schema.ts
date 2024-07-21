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
