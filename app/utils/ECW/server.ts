import { cookies } from 'next/headers'



export function validateECWToken() {
  const cookieStore = cookies()
  // const token = cookieStore.get('ecw_token')
  return true
}