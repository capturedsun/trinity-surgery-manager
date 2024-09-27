import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server"
import { userController } from "@/src/interface-adapters/controllers/user/user.controller"

export async function GET() {
  return withServerActionInstrumentation("getUser", { recordResponse: true }, async () => {
    try {
      const user = await userController()
      return NextResponse.json({ ok: true, user })
    } catch (err) {
      captureException(err)
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }
  })
}

export async function PATCH(req: NextRequest) {
  return withServerActionInstrumentation("updateUser", { recordResponse: true }, async () => {
    return NextResponse.json({ ok: true, user: {} })
  })
}

export async function DELETE(req: NextRequest) {
  return withServerActionInstrumentation("deleteUser", { recordResponse: true }, async () => {
    return NextResponse.json({ ok: true, user: {} })
  })
}
