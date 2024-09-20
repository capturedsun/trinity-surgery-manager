import { createClient } from "@/app/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient()

  const { data: organization, error: organizationError } = await supabase
    .from('organizations')
    .select('*')
    .single()

  if (organizationError) {
    return NextResponse.json({ ok: false, error: organizationError.message }, { status: 401 })
  } else if (!organization) {
    return NextResponse.json({ ok: false, error: "Organization not found" }, { status: 404 })
  }

  return NextResponse.json({ ok: true, organization })
}