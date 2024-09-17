// pages/api/authenticate.js
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import querystring from 'querystring';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function constructECWAuthorizationRequest() {
    const ECW_AUTHORIZATION_ENDPOINT_SANDBOX = process.env.ECW_AUTHORIZATION_ENDPOINT_SANDBOX
    const ECW_CLIENT_ID_SANDBOX = process.env.ECW_CLIENT_ID_SANDBOX
    const ECW_CLIENT_SECRET_SANDBOX = process.env.ECW_CLIENT_SECRET_SANDBOX
    const ECW_AUD_STAGING = process.env.ECW_AUD_STAGING

    const codeVerifier = crypto.randomBytes(64).toString('hex')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

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
        redirect_uri: 'https://trinity-surgery-manager.vercel.app/api/callback',
        state: 'random_state_value',
        scope: 'user/Patient.read openid',
        aud: ECW_AUD_STAGING,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
    };

    console.log(process.env.NODE_ENV)
    console.log(`${ECW_AUTHORIZATION_ENDPOINT_SANDBOX}?${querystring.stringify(params)}`)
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
