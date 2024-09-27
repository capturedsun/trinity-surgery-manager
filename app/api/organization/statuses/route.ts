import { createClient } from "@/app/utils/supabase/server"
import { NextResponse } from "next/server"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import { captureException } from "@sentry/nextjs"
import { Status } from "@/src/entities/models/status"
import { statusesController } from "@/src/interface-adapters/controllers/organization/statuses.controller"

export async function GET() {
  return withServerActionInstrumentation("getOrganizationStatuses", { recordResponse: true }, async () => {
    try {
      const statuses = await statusesController()
      return NextResponse.json({ ok: true, statuses })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}
