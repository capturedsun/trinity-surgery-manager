// pages/api/callback.js

import querystring from 'querystring';
import fetch from 'node-fetch';

export default async function handler(req:any, res:any) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: 'Missing authorization code or state' });
  }

  try {
    const requestBody = querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://trinity-surgery-manager.vercel.app/api/callback', // Replace with your redirect URI
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

    const tokenData:any = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(400).json({ error: 'Failed to exchange authorization code for access token' });
    }

    return res.status(200).json({ access_token: tokenData.access_token });
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
