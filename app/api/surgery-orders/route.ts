import { NextResponse } from "next/server"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import { captureException } from "@sentry/nextjs"
import { surgeryOrderController } from "@/src/controllers/surgery-order/surgery-order.controller"

export async function GET() {
  return withServerActionInstrumentation("getSurgeryOrder", { recordResponse: true }, async () => {
    try {
      const surgeryOrder = await surgeryOrderController()
      return NextResponse.json({ ok: true, surgeryOrder })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}

export async function PATCH() {
  return withServerActionInstrumentation("updateSurgeryOrder", { recordResponse: true }, async () => {
    console.log("we patching")
    return NextResponse.json({ ok: true, surgeryOrder: {} })
  })
}

export async function DELETE() {
  return withServerActionInstrumentation("deleteSurgeryOrder", { recordResponse: true }, async () => {
    return NextResponse.json({ ok: true, surgeryOrder: {} })
  })
}