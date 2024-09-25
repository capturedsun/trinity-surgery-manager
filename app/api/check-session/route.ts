import { NextResponse } from 'next/server';
import { checkSessionController } from '@/src/interface-adapters/controllers/auth/check-session.controller';

export async function GET() {
  try {
    const user = await checkSessionController();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}