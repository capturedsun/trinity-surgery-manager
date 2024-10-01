import { NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET() {
    return NextResponse.json({ error: "This endpoint is not yet implemented" }, { status: 400 })
}
