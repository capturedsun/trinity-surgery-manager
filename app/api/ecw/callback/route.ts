import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import crypto from 'crypto'
import dotenv from 'dotenv';

dotenv.config();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code || !state) {
    return NextResponse.json({ error: 'Missing code or state' }, { status: 400 })
  }

  try {
    const tokenResponse = await fetchToken(code)
    console.log('Token response:', tokenResponse)
    return NextResponse.json({ success: true, token: tokenResponse })
  } catch (error) {
    console.error('Token fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 })
  }
}



async function fetchToken(code: string) {

  const clientId = process.env.ECW_CLIENT_ID_SANDBOX
  const clientSecret = process.env.ECW_CLIENT_SECRET_SANDBOX
  const redirectUri = "https://trinity-surgery-manager.vercel.app/api/ecw/callback"
  const tokenUrl = process.env.ECW_TOKEN_ENDPOINT_STAGING

  if (!clientId || !clientSecret || !redirectUri || !tokenUrl) {
    console.error('Missing environment variables')
    throw new Error('Missing environment variables')
  }

  const codeVerifier = crypto.randomBytes(32)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .slice(0, 128);

    

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basicAuth}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier
    })
  })

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Token fetch failed:', response.status, response.statusText, errorBody);
    throw new Error('Token fetch failed');
  }

  const data = await response.json()
  console.log('Token data:', data)
  return data
}
