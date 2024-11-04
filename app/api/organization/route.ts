import { organizationController } from "@/src/controllers/organization/organization.controller"
import { captureException, withServerActionInstrumentation } from "@sentry/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  return withServerActionInstrumentation("getOrganization", { recordResponse: true }, async () => {
    try {
      const organization = await organizationController()
      return NextResponse.json({ ok: true, organization: organization.organization, users: organization.users })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}

export async function POST() {
  return withServerActionInstrumentation("addOrganization", { recordResponse: true }, async () => {
    return NextResponse.json({ ok: true, organization: {} })
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