import { NextResponse } from "next/server"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import { captureException } from "@sentry/nextjs"
import { organizationController } from "@/src/interface-adapters/controllers/organization/organization.controller"

export async function GET() {
  return withServerActionInstrumentation("getOrganization", { recordResponse: true }, async () => {
    try {
      const organization = await organizationController()
      return NextResponse.json({ ok: true, organization })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}

export async function PATCH() {
  return withServerActionInstrumentation("updateOrganization", { recordResponse: true }, async () => {
    return NextResponse.json({ ok: true, organization: {} })
  })
}

export async function DELETE() {
  return withServerActionInstrumentation("deleteOrganization", { recordResponse: true }, async () => {
    return NextResponse.json({ ok: true, organization: {} })
  })
}