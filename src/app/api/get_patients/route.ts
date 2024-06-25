import { NextApiRequest, NextApiResponse } from 'next';
// import {connectDB, getPatients}  from '@/db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // await connectDB();
        // const patients = await getPatients();
        res.status(200).json({ success: true, message: 'Connected to the database' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Database connection failed' });
    }
}