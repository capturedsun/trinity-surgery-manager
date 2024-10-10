import { checkSessionController } from '@/src/controllers/auth/check-session.controller';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await checkSessionController();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}