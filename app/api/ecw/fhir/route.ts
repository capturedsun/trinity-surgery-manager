import { createClient } from '@/app/utils/supabase/server';
import { EcwAuthentication } from '@/src/entities/models/ecw-authentication';
import { Buffer } from 'buffer';
import { NextResponse } from 'next/server';
import { fetchToken } from '../callback/route';

// This function uses the access_token to fetch FHIR data
async function fetchFhirData(accessToken: string) {
  // This URL comes from your API documentation or discovery document.
  // Based on your id_token's 'aud' claim, this is your likely FHIR base URL:
  const fhirBaseUrl = "https://staging-fhir.ecwcloud.com/fhir/r4/FFBJCD";
  // You should store this in your .env file
  // const fhirBaseUrl = process.env.ECW_FHIR_BASE_URL;

  // Example: Fetching the Patient resource based on your scope
  const resourceUrl = `${fhirBaseUrl}/Patient`;

  try {
    const response = await fetch(resourceUrl, {
      method: 'GET',
      headers: {
        // This is the crucial part for Step 6
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // If the token is expired (401), you'll need to refresh it
      if (response.status === 401) {
        console.error('Access token is expired or invalid.');
        // Here you would trigger the refresh token logic (see section 2)
      }
      const errorBody = await response.text();
      console.error('FHIR API request failed:', response.status, errorBody);
      throw new Error('FHIR API request failed');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching FHIR data:', error);
    throw error;
  }
}

async function getUserId() {
  const supabase = createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('Error fetching user data:', userError)
    return
  }
  return userData.user.id
}

async function storeTokensInSupabase(userId: string, tokenData: EcwAuthentication) {
  const supabase = createClient()

  const expiresAt = new Date(Date.now() + (tokenData.expires_in * 1000))

  const tokenRecord: any = {
    user_id: userId,
    access_token: tokenData.access_token,
    expires_at: expiresAt.toISOString(),
    token_type: tokenData.token_type,
    scope: tokenData.scope
  }

  if (tokenData.refresh_token) {
    tokenRecord.refresh_token = tokenData.refresh_token
  }

  const { error } = await supabase
    .from('user_sessions')
    .upsert(tokenRecord)

  if (error) {
    console.error('Error storing tokens:', error)
    throw new Error('Failed to store tokens')
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  if (!code || !state) {
    return NextResponse.json({ error: 'Missing code or state' }, { status: 400 })
  }

  try {
    const userId = await getUserId()
    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    const tokenData = await fetchToken(code)

    if (tokenData && tokenData.access_token) {
      // Store tokens in Supabase
      await storeTokensInSupabase(userId, tokenData)

      // Use the access token to make an API call
      const fhirData = await fetchFhirData(tokenData.access_token)

      // Return the data you fetched
      return NextResponse.json({ success: true, fhirData: fhirData })

    } else {
      throw new Error("Token data is null or missing access_token");
    }

  } catch (error) {
    console.error('Token fetch or API call error:', error)
    return NextResponse.json({ error: 'Failed to fetch token or API data' }, { status: 500 })
  }
}

async function refreshAccessToken(refreshToken: string): Promise<EcwAuthentication | null> {
  const clientId = process.env.ECW_CLIENT_ID_SANDBOX;
  const clientSecret = process.env.ECW_CLIENT_SECRET_SANDBOX;
  const tokenUrl = process.env.ECW_TOKEN_ENDPOINT_STAGING;

  if (!clientId || !clientSecret || !tokenUrl) {
    throw new Error('Missing environment variables for token refresh');
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Refresh token fetch failed:', response.status, errorBody);
      // This likely means the user needs to re-authenticate completely
      throw new Error('Refresh token fetch failed');
    }

    const data = await response.json();

    // *** CRITICAL ***
    // The response gives you a new access_token AND
    // may give you a new refresh_token.
    // You MUST save these new tokens and new expiration time in Supabase,
    // overwriting the old ones.

    const userId = await getUserId()
    if (userId) {
      await storeTokensInSupabase(userId, data)
    }

    return data;

  } catch (error) {
    console.error('Error in refreshAccessToken:', error);
    return null;
  }
}