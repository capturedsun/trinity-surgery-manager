import { NextRequest, NextResponse } from 'next/server';
// import {connectDB, getPatients}  from '@/db/index';

export default async function GET(req: NextRequest) {
    try {
        // await connectDB();
        // const patients = await getPatients();
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}