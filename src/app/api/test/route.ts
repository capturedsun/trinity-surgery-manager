import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json({ success: true, message: 'Connected to the database' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Database connection failed' }, { status: 500 });
    }
}