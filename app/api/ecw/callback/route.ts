import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import crypto from 'crypto'

function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('base64url')
}

function generateCodeChallenge(verifier: string) {
  return crypto.createHash('sha256').update(verifier).digest('base64url')
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
    console.log('Token response:', tokenResponse)
    return NextResponse.json({ success: true, token: tokenResponse })
  } catch (error) {
    console.error('Token fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 })
  }
}

async function fetchToken(code: string) {
  console.log('Fetching token...')
  const clientId = process.env.ECW_CLIENT_ID
  const clientSecret = process.env.ECW_CLIENT_SECRET
  const redirectUri = process.env.ECW_REDIRECT_URI
  const tokenUrl = process.env.ECW_TOKEN_ENDPOINT

  if (!clientId || !clientSecret || !redirectUri || !tokenUrl) {
    console.error('Missing environment variables')
    throw new Error('Missing environment variables')
  }

  const codeVerifier = generateCodeVerifier()
  console.log('Code verifier generated')

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  console.log('Basic auth generated')
  
  console.log('Sending token request...')
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
    console.error('Token fetch failed:', response.status, response.statusText)
    throw new Error('Token fetch failed')
  }

  console.log('Token fetched successfully')
  return response.json()
}
