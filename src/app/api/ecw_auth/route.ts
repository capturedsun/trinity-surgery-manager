// pages/api/authenticate.js
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import querystring from 'querystring';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function constructECWAuthorizationRequest() {
    const authorizationEndpoint = process.env.ECW_AUTHORIZATION_ENDPOINT
    const tokenEndpoint = process.env.ECW_TOKEN_ENDPOINT

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

    const { ECW_CLIENT_ID, ECW_REDIRECT_URI } = process.env;

    const params = {
        response_type: 'code',
        client_id: ECW_CLIENT_ID,
        redirect_uri: ECW_REDIRECT_URI,
        state: 'random_state_value',
        scope: 'openid fhirUser offline_access user/Encounter.read user/Patient.read',
        aud: tokenEndpoint,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
    };

    console.log(params)

    const authorizeUrl = `${authorizationEndpoint}?${querystring.stringify(params)}`;
    return authorizeUrl;
}

export async function GET(req:any, res:any) {
    try {
        const authorizeUrl = await constructECWAuthorizationRequest();
        const response = await fetch(authorizeUrl)
        const data = await response.json()
        console.log("response: ", data)
        return NextResponse.json({ success: true, message: 'Connected to the database' });
    } catch (error) {
        console.error('Error initiating authentication:', error);
        return NextResponse.json({ success: false, message: 'Database connection failed' }, { status: 500 });
    }
}
