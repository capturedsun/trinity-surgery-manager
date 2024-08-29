"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function getStatuses() {
  const supabase = createClient()

  const { data: user, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('Error fetching user data:', error)
    return redirect("/login?message=Could not fetch user data")
  }

  const { data: statuses, error: statusesError } = await supabase
    .from('statuses')
    .select('*')

    console.log(statuses)

  if (statusesError) {
    console.error('Error fetching statuses:', statusesError)
    return null
  }

  return statuses
}