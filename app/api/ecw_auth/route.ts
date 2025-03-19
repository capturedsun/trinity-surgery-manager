import { createClient } from '@/app/utils/supabase/server';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import querystring from 'querystring';
dotenv.config();

async function storeCodeVerifier(codeVerifier: string) {
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) {
        console.error('Error fetching user data:', userError)
        return
    }
    const userId = userData.user.id

    const { data, error } = await supabase
        .from('user_sessions')
        .insert([{
            user_id: userId,
            code_verifier: codeVerifier,
        }]);
    if (error) {
        console.error('Error storing code verifier:', error)
        return
    }
}

async function constructECWAuthorizationRequest() {
    const ECW_AUTHORIZATION_ENDPOINT_SANDBOX = process.env.ECW_AUTHORIZATION_ENDPOINT_SANDBOX
    const ECW_CLIENT_ID_SANDBOX = process.env.ECW_CLIENT_ID_SANDBOX
    const ECW_CLIENT_SECRET_SANDBOX = process.env.ECW_CLIENT_SECRET_SANDBOX
    const ECW_AUD_STAGING = process.env.ECW_AUD_STAGING

    const codeVerifier = crypto.randomBytes(64).toString('hex')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    await storeCodeVerifier(codeVerifier)
    const codeChallenge = crypto.createHash('sha256')
        .update(codeVerifier)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const params = {
        response_type: 'code',
        client_id: ECW_CLIENT_ID_SANDBOX,
        client_secret: ECW_CLIENT_SECRET_SANDBOX,
        redirect_uri: 'https://trinity-surgery-manager.vercel.app/api/ecw/callback',
        state: 'random_state_value',
        scope: 'openid fhirUser offline_access user/Patient.read user/Encounter.read user/AllergyIntolerance.read user/Condition.read user/DocumentReference.read',
        aud: ECW_AUD_STAGING,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
    };

    return `${ECW_AUTHORIZATION_ENDPOINT_SANDBOX}?${querystring.stringify(params)}`;
}

export async function GET() {
    try {
        const authorizeUrl = await constructECWAuthorizationRequest();
        return new NextResponse(authorizeUrl, { headers: { 'Content-Type': 'text/html' } });
    } catch (error) {
        console.error('Error initiating authentication:', error);
        return NextResponse.json({ success: false, message: 'Database connection failed' }, { status: 500 });
    }
}
