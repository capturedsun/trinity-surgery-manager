import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import crypto from 'crypto'
import dotenv from 'dotenv';
import { createClient } from '@/app/utils/supabase/server';
import { EcwAuthentication } from '@/src/entities/models/ecw-authentication';

dotenv.config();

async function getCodeVerifier() {
  const supabase = createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
      console.error('Error fetching user data:', userError)
      return
  }
  const userId = userData.user.id

  const { data, error } = await supabase
    .from('user_sessions')
    .select('code_verifier')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
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
    return NextResponse.json({ success: true, response: tokenResponse })
  } catch (error) {
    console.error('Token fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 })
  }
}



async function fetchToken(code: string): Promise<EcwAuthentication | null> {

  const clientId = process.env.ECW_CLIENT_ID_SANDBOX
  const clientSecret = process.env.ECW_CLIENT_SECRET_SANDBOX
  const redirectUri = process.env.ECW_REDIRECT_URI
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
      code: code,
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
  return data
}


// {"success":true,"token":{"access_token":"eyJ4NXQjUzI1NiI6IlU1SlF6LVlLcnR1MHc2QTRpRTdzd3Y0N1ZnUHFZRnR1N0RIRzNVYW9aaXMiLCJraWQiOiJqd3QiLCJhbGciOiJSUzI1NiJ9.eyJwYXRpZW50R3VpZCI6IiIsInN1YiI6ImM1YjExODExLTQ1YjgtMTFlZC1hYTM1LTAwNTA1Njg0Y2UxYl9zYW0iLCJ3b3JrZmxvdyI6InN0YW5kYWxvbmVfcHJvdmlkZXIiLCJwcm92aWRlckd1aWQiOiJMdDJJRlI1QWg3Nm40ZDhURlA1Z0JBZnJ3cXhpZXNnODNjZWp6dFBrT0VJIiwiaXNzIjoiaHR0cHM6Ly9zdGFnaW5nLW9hdXRoc2VydmVyLmVjd2Nsb3VkLmNvbS9vYXV0aCIsInZlbmRvcklkIjoiMTA0NSIsImF1ZCI6WyJJM1YzaDQ0dGhwS3pvRGY1NnphWTlnSjl1aDNQamhRUkNlWWJLeDNVa0drIiwiaHR0cHM6Ly9zdGFnaW5nLWZoaXIuZWN3Y2xvdWQuY29tL2ZoaXIvcjQvRkZCSkNEIl0sIm5iZiI6MTcyODkzNzEyOSwicHJhY3RpY2VHdWlkIjoiYzViMTE4MTEtNDViOC0xMWVkLWFhMzUtMDA1MDU2ODRjZTFiIiwic2NvcGUiOlsib3BlbmlkIiwidXNlci9QYXRpZW50LnJlYWQiXSwiZXhwIjoxNzI4OTM3NDI5LCJpYXQiOjE3Mjg5MzcxMjl9.YiB60zIRQaTpdFj_jOqUp4AUAGNQaHyz6u2ftxfnW-DuBtR1FAqfOAKlNar6s05IjMjwpbMw1dxI6LTUoKA0J85Y3fDoXOKYWZvJbs9T9fAVMbwe0ZVH-wOtFDCFAKbAOzu9qs_EJNrxvIXMO22lMJqnT7w4IPpjZzbQF7UNrYzRvWTv3M9dYmx0JI0Wi1cZb1ikjsu0y0doX0KASIJRRDsmSQaSe3yiWns68LAOm-CP4nB-1ows4Yr1AKrsbfQhp3I2Nv9MCFuJbPM0v9Ia_-qF4xaC4Ei6Ev6EgI-MKLEXjAr2Z9WH81mgjTN1qd8gVZgoyxXV2KVnvU7MdDeQ7-Py3k8TNxaf3N8YpHLfYM2FBDCmjA-RJlAvT6SBfFK60stiJBu7IVws2VuJCt8IbuxkUSDNfL7JZsDGbmHn02Hk-ja4V7ouOFRB83EDoE3t_pd0LwrGZ2Hgv46_cj9gKNLaM7q3MSDJEPYCqi2vsvXzZTD1MONuaROLkMTqFJ1ogynL2KFxu318F8X7vRvV6STnQP6siyn_oPY-35Dm60QS-_Fo9wW83lL_Vm9z2AsdiYrAYarX4ocuKaDcbRN14UQ5MoO_1CaVxucth0900G71b5Rj7YPCEyO8U2HXY4WxEIjAp6SQS8dfIPIl-K_kk7PRq7rC5FGsjoTD_f78oNcQGA-IThq4OHenEqq3mgIYHIAKeL7KhNeZQWvBNDpQXIh1QXxWrBrxLalHTTNRYtxjVEWBcFtZXi-vRBLtt_mT3pon81t0llrrCUIj7OJr2LW3KTmolMcL5Yaho4Se-KSOvphd24sfJFRcQ0qX_4o3jg","patient":"","scope":"openid user/Patient.read","need_patient_banner":"false","id_token":"eyJ4NXQjUzI1NiI6IlU1SlF6LVlLcnR1MHc2QTRpRTdzd3Y0N1ZnUHFZRnR1N0RIRzNVYW9aaXMiLCJraWQiOiJqd3QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNWIxMTgxMS00NWI4LTExZWQtYWEzNS0wMDUwNTY4NGNlMWJfc2FtIiwiYXVkIjpbIkkzVjNoNDR0aHBLem9EZjU2emFZOWdKOXVoM1BqaFFSQ2VZYkt4M1VrR2siLCJodHRwczovL3N0YWdpbmctZmhpci5lY3djbG91ZC5jb20vZmhpci9yNC9GRkJKQ0QiXSwiYXpwIjoiSTNWM2g0NHRocEt6b0RmNTZ6YVk5Z0o5dWgzUGpoUVJDZVliS3gzVWtHayIsImlzcyI6Imh0dHBzOi8vc3RhZ2luZy1maGlyLmVjd2Nsb3VkLmNvbS9maGlyL3I0L0ZGQkpDRCIsInZlbmRvcklkIjoiMTA0NSIsImV4cCI6MTcyODkzODkyOSwiaWF0IjoxNzI4OTM3MTI5LCJmaGlyVXNlciI6Imh0dHBzOi8vc3RhZ2luZy1maGlyLmVjd2Nsb3VkLmNvbS9maGlyL3I0L0ZGQkpDRC9QcmFjdGl0aW9uZXIvTHQySUZSNUFoNzZuNGQ4VEZQNWdCQWZyd3F4aWVzZzgzY2VqenRQa09FSSJ9.a9EBc2_L0yBZ_5f5IrovJ5cp5Mb6nErT-fwBkENFgH0X4BwzVbbCqFTo1g8-iaqeX235HVSBYzKcvlOaBp-KoZPQqSOtCAyYQ76kDPtMSiWv90YOrqNSaWBNty6rNrTSZHoNX7SOslH77Nhcx2IAXGkOVSCy1DfhUAktKMyPDNQlCXP4DxM7x4hbQCX9MgkmFrVtMOk_H_th2IRVgXUPS3f0kdQYZq4N2-vNuqDidLV-knPPFYhkZIHsilOIrftOO-7pUrrSRk_29zgukZzropkWt2Wl_AiPJPAfyZ4K3RCo-qwNnfPlZVNEWFEdFkNI2p2UDAKZnhmat-xbEc2E0n_y5bfvycQO0yRcxEafhyfxrosseKeOxHrf42s-PjOjFTx-YGFH6_hmPcVpPuZEzYGoYJVTZg71CUDPCD1ictkJy2MKgR6wvCG_KJp3LJnA8oJEzFOhdypfz7mkfmMOB3WPZFvesRxoKVTpQFCgktqXV8nSNBzcKQcnUnmwQFQsfqnFs_S8CXc5mcZm1qzgMoMqIyn-HkJMq70rEELE3_bjzGn55HRk87pElBl8wMmDHsfPuhiUM0mqVz5AJx9sRhMSdCvuWw-lYLVY802EeGCN-SgGUF6h8yhlI_nvdxYTFt1Licu-JwVTcFpPfNfciBOjAajea6LiQMR7IH6d4DJux7NDEUwQbAuZKGTPWCrrmLtv2wrAwAeKdvxJbh9Px6lKjzoX7SvH8GdXrIer3oyfFbVdmgDaPeEzX2vxqzXN1mJJrZrnBKErfAnD9nmOS2-Ca0CZ62YCp1SgROIpNKlDU7-ec8PSp3w6sNgcDsTCRQ","smart_style_url":"https://staging-oauthserver.ecwcloud.com/oauth/generateSmartStyle.do","token_type":"Bearer","expires_in":299}}
