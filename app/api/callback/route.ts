import { NextRequest, NextResponse } from 'next/server';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json({ error: 'Missing authorization code or state' }, { status: 400 });
  }

  try {
    const requestBody = querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.ECW_REDIRECT_URI, // Replace with your redirect URI
      client_id: process.env.ECW_CLIENT_ID, // Use your ECW client ID from environment variables
      client_secret: process.env.ECW_CLIENT_SECRET // Use your ECW client secret from environment variables
    });

    const tokenResponse = await fetch('https://{ehr_token_url}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    });

    const tokenData: any = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Failed to exchange authorization code for access token' }, { status: 400 });
    }

    return NextResponse.json({ access_token: tokenData.access_token });
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
