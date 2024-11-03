import { NextResponse } from "next/server"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import { captureException } from "@sentry/nextjs"
import { surgeryOrderController } from "@/src/controllers/surgery-order/surgery-order.controller"

export async function GET() {
  return withServerActionInstrumentation("getSurgeryOrderActivity", { recordResponse: true }, async () => {
    try {
      const surgeryOrder = await surgeryOrderController()
      return NextResponse.json({ ok: true, surgeryOrder })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}

export async function POST(request: Request) {
  return withServerActionInstrumentation("createSurgeryOrderActivity", { recordResponse: true }, async () => {
    const body = await request.json()
    return NextResponse.json({ ok: true, surgeryOrderActivity: body })
  })
}

export async function PATCH(request: Request) {
  return withServerActionInstrumentation("updateSurgeryOrderActivity", { recordResponse: true }, async () => {
    const body = await request.json()
    return NextResponse.json({ ok: true, surgeryOrderActivity: body })
  })
}