import { NextResponse } from "next/server"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import { captureException } from "@sentry/nextjs"
import { statusesController } from "@/src/interface-adapters/controllers/organization/statuses.controller"

export function GET() {
  return withServerActionInstrumentation("getOrganizationStatuses", { recordResponse: true }, async () => {
    try {
      const categorizedStatuses = await statusesController()
      console.log(categorizedStatuses, "statuses in route")
      return NextResponse.json({ ok: true, statuses: categorizedStatuses })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}
