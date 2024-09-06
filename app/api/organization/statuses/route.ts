import { createClient } from "@/src/infrastructure/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient()

  const { data: statuses, error: statusesError } = await supabase
    .from('statuses')
    .select('*')

  console.log(statuses)

  if (statusesError) {
    return NextResponse.json({ ok: false, error: statusesError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, statuses })
}
