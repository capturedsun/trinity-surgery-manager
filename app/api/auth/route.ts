import { signInController } from "@/src/controllers/auth/sign-in.controller";
import { signOutController } from "@/src/controllers/auth/sign-out.controller";
import { signUpController } from "@/src/controllers/auth/sign-up.controller";
import { AuthenticationError, UnauthenticatedError } from "@/src/entities/errors/auth";
import { InputParseError } from "@/src/entities/errors/common";
import { captureException, withServerActionInstrumentation } from "@sentry/nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { action, ...data } = await request.json()

  switch (action) {
    case "signUp":
      return await handleSignUp(data)
    case "signIn":
      return await handleSignIn(data)
    case "signOut":
      return await handleSignOut()
    case "checkAuth":
      return await handleCheckAuth()
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }
}

async function handleSignUp(data: any) {
  return withServerActionInstrumentation("signUp", { recordResponse: true }, async () => {
    try {
      const { cookie } = await signUpController(data)
      cookies().set(cookie.name, cookie.value, cookie.attributes)
      return NextResponse.json({ ok: true })
    } catch (err) {
      if (err instanceof InputParseError) {
        return NextResponse.json({ error: "Invalid data. Make sure the Password and Confirm Password match." }, { status: 400 })
      }
      captureException(err)
      return NextResponse.json({ error: "An error occurred. Please try again later." }, { status: 500 })
    }
  })
}

async function handleSignIn(data: any) {
  return withServerActionInstrumentation("signIn", { recordResponse: true }, async () => {
    try {
      await signInController(data)
      return NextResponse.json({ ok: true, redirect: '/home' })
    } catch (err) {
      if (err instanceof InputParseError || err instanceof AuthenticationError) {
        return NextResponse.json({ error: "Incorrect username or password" }, { status: 401 })
      }
      captureException(err)
      return NextResponse.json({ error: "An error occurred. Please try again later." }, { status: 500 })
    }
  })
}

async function handleSignOut() {
  return withServerActionInstrumentation("signOut", { recordResponse: true }, async () => {
    try {
      await signOutController()
      return NextResponse.json({ ok: true, redirect: "/sign-in" })
    } catch (err) {
      if (err instanceof UnauthenticatedError) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
      }
      captureException(err)
      return NextResponse.json({ error: "An error occurred. Please try again later." }, { status: 500 })
    }
  })
}

async function handleCheckAuth() {
  try {
    // Assuming you have a method to check authentication
    // This is a placeholder - replace with your actual auth check
    const isAuthenticated = true // await yourAuthCheckMethod()
    return NextResponse.json({ isAuthenticated })
  } catch (err) {
    captureException(err)
    return NextResponse.json({ error: "An error occurred while checking authentication" }, { status: 500 })
  }
}
