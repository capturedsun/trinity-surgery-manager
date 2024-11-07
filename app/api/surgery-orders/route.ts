import { NextResponse } from "next/server"
import { withServerActionInstrumentation } from "@sentry/nextjs"
import { captureException } from "@sentry/nextjs"
import { surgeryOrdersController } from "@/src/controllers/surgery-order/surgery-orders.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  return withServerActionInstrumentation("getSurgeryOrders", { recordResponse: true }, async () => {
    try {
      const searchParams = req.nextUrl.searchParams
      const id = searchParams.get('id')
      if (id) { 
        const surgeryOrder = await surgeryOrdersController.get(id)
        return NextResponse.json( surgeryOrder )
      }
      const surgeryOrders = await surgeryOrdersController.getAll()
      return NextResponse.json( surgeryOrders )
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}

export async function POST() {
  return withServerActionInstrumentation("createSurgeryOrder", { recordResponse: true }, async () => {
    try {
      const surgeryOrder = await surgeryOrdersController.create(req.body)
      return NextResponse.json( surgeryOrder )
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