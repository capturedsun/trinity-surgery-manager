import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = createClient()

  const { data: statuses, error: statusesError } = await supabase
    .from('statuses')
    .select('*')

  if (statusesError) {
    return NextResponse.json({ ok: false, error: statusesError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, statuses })
}
