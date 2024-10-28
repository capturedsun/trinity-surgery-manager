import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import crypto from 'crypto'
import dotenv from 'dotenv';
import { createClient } from '@/app/utils/supabase/server';

dotenv.config();

async function getCodeVerifier() {
  const supabase = createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
      console.error('Error fetching user data:', userError)
      return
  }
  const userId = userData.user.id

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data, error } = await supabase
    .from('user_sessions')
    .select('code_verifier')
    .eq('user_id', userId)
    .gt('created_at', fiveMinutesAgo)
    .limit(1)
    .single()

  if (!data) {
    throw new Error("No recent code verifier found. What, did you fall asleep during login?")
  }

  if (error) {
    console.error('Error retrieving code verifier:', error);
    return null;
  }
  return data?.code_verifier;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  if (!code || !state) {
    return NextResponse.json({ error: 'Missing code or state' }, { status: 400 })
  }

  try {
    const tokenResponse = await fetchToken(code)
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

  const codeVerifier = await getCodeVerifier()

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

  const errorBody = await response.text();

  if (!response.ok) {
    switch (response.status) {
      case 400:
        if (errorBody.includes('unsupported_grant_type')) {
          console.error('Unsupported grant type');
          throw new Error('Unsupported grant type');
        } else if (errorBody.includes('invalid_grant')) {
          console.error('Invalid grant');
          throw new Error('Invalid grant');
        } else if (errorBody.includes('invalid_request')) {
          console.error('Invalid request');
          throw new Error('Invalid request');
        }
        break;
      case 401:
        if (errorBody.includes('invalid_client')) {
          console.error('Invalid client');
          throw new Error('Invalid client');
        }
        break;
      case 500:
        if (errorBody.includes('access_denied')) {
          console.error('Access denied');
          throw new Error('Access denied');
        }
        break;
      default:
        console.error('Token fetch failed:', response.status, response.statusText, errorBody);
        throw new Error('Token fetch failed');
    }
  }

  const data = await response.json()
  console.log('Token data:', data)
  return data
}
