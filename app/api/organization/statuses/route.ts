import { NextResponse } from "next/server"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import { captureException } from "@sentry/nextjs"
import { 
  getStatusesController, 
  modifyStatusController 
} from "@/src/interface-adapters/controllers/organization/organization.controller"

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const categorized = searchParams.get('categorized') === 'true'
  console.log(categorized)
  return withServerActionInstrumentation("getOrganizationStatuses", { recordResponse: true }, async () => {
    try {
      const categorizedStatuses = await getStatusesController(categorized)
      return NextResponse.json({ ok: true, statuses: categorizedStatuses })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}

export function PATCH(request: Request) {
  return withServerActionInstrumentation("updateOrganizationStatus", { recordResponse: true }, async () => {
    try {
      const statusData = await request.json()
      const updatedStatus = await modifyStatusController(statusData)
      return NextResponse.json({ ok: true, status: updatedStatus })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: 'Failed to update status.' }, { status: 500 })
    }
  })
}
