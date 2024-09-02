import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = createClient()

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .single()

  if (userError) {
    return NextResponse.json({ ok: false, error: userError.message }, { status: 401 })
  } else if (!user) {
    return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ ok: true, user })
}
