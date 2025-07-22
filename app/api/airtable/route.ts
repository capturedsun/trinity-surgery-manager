import dotenv from 'dotenv';
import { NextResponse } from 'next/server';

dotenv.config();

// Define the Airtable record schema based on your actual table structure
interface AirtableRecord {
  "id"?: string;
  "createdTime"?: string;
  "fields": {
    "Name": string;
    "Notes"?: string;
    "Assignee"?: {
      "id": string;
      "email": string;
    };
    "Attachments"?: Array<{
      "id": string;
      "url": string;
      "filename": string;
      "size": number;
      "type": string;
    }>;
    "Communication Status": string;
    "Insurance Status": string;
    "Clearance Status": string;
    "Provider"?: string;
    "Supplies"?: string;
    "Pre-Op Diagnosis"?: string;
    "Pre-Op Labs"?: string;
    "Pre-Op Visit DME"?: boolean;
    "Post-Op Visit"?: string;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
}

export async function POST(request: Request) {
  const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID

  console.log('Airtable Config:', {
    token: AIRTABLE_ACCESS_TOKEN ? 'Present' : 'Missing',
    baseId: AIRTABLE_BASE_ID,
    tableId: AIRTABLE_TABLE_ID
  })

  if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    return NextResponse.json({ error: 'Missing Airtable API key or base ID or table ID' }, { status: 500 })
  }

  // Sample data matching your actual table schema
  const sampleData: { records: Array<{ fields: AirtableRecord['fields'] }> } = {
    records: [
      {
        fields: {
          "Name": "Surgery Case - ACL Repair",
          "Notes": "Patient requires follow-up appointment next week\n",
          "Assignee": {
            "id": "invepR9W2yJmvmE9Y",
            "email": "salanis@trinityorthosa.com"
          },
          "Attachments": [], // Empty array for no attachments
          "Communication Status": "No status",
          "Insurance Status": "No status",
          "Clearance Status": "No status",
          "Provider": "Nilsson",
          "Supplies": "Surgical Kit A, Sterile gloves, Sutures\n",
          "Pre-Op Diagnosis": "ACL tear, right knee",
          "Pre-Op Labs": "Complete blood count, EKG",
          "Pre-Op Visit DME": true,
          "Post-Op Visit": "Scheduled for next Tuesday"
        }
      }
    ]
  };

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`
    console.log('Making request to:', url)
    console.log('Sending data:', JSON.stringify(sampleData, null, 2))

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleData)
    })

    console.log('Response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Airtable API error response:', errorText)
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const result: AirtableResponse = await response.json()
    console.log('Success response:', result)
    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    console.error('Airtable request error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to create Airtable record'
    }, { status: 500 })
  }
}

// GET method to fetch existing records
export async function GET() {
  const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`
    console.log('Fetching records from:', url)

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
      },
    })

    console.log('GET Response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GET Airtable API error response:', errorText)
      return NextResponse.json({ error: `GET failed: ${response.status} ${response.statusText}` }, { status: 500 })
    }

    const result = await response.json()
    console.log('GET Response:', JSON.stringify(result, null, 2))
    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    console.error('GET Airtable request error:', error)
    return NextResponse.json({ error: 'GET request failed' }, { status: 500 })
  }
}
