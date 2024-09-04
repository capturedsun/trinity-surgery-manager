"use server"

import { StatusTag } from "@/app/data/schema"
import { createClient } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"

export async function getStatuses() {
  const supabase = createClient()

  const { data: user, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('Error fetching user data:', error)
    return redirect("/singin?message=Could not fetch user data")
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

export async function updateStatusTag(tag: Partial<StatusTag>) {
  const supabase = createClient()

  console.log(tag)

  const { data: updatedTag, error: updateError } = await supabase
    .from('statuses')
    .update(tag)
    .match({ id: tag.id })
    .select()

  if (updateError) {
    console.error('Error updating status tag:', updateError)
    return null
  }

  console.log(updatedTag)

  return updatedTag
}