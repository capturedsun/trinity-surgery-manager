// import { put } from '@vercel/blob'; // temporarily disabled Blob upload
import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';
import { Buffer } from 'buffer';
import fs from 'fs';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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
    "Letter"?: Array<{
      "id"?: string;
      "url": string;
      "filename"?: string;
      "size"?: number;
      "type"?: string;
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

const LetterExtractionSchema = z.object({
  patientName: z.string().nullable().optional(),
  surgicalProcedure: z.string().nullable().optional(),
  preOpDiagnosis: z.string().nullable().optional(),
  preAdmissionTesting: z.string().nullable().optional(),
  supplies: z.string().nullable().optional(),
  provider: z.enum(['Duey', 'Nilsson', 'Ritchie']).nullable().optional(),
});

type LetterExtraction = z.infer<typeof LetterExtractionSchema>;

export async function POST(request: Request) {
  const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;

  if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    return NextResponse.json({ error: 'Missing Airtable API key or base ID or table ID' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = (formData.get('name') as string) || 'File Upload';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are accepted.' }, { status: 400 });
    }

    console.log('Processing file:', file.name, file.size, 'bytes, type:', file.type);

    let parsedData: LetterExtraction | null = null;
    let parsingError: string | null = null;

    const pdfBuffer = await file.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    
    // see https://docs.anthropic.com/en/docs/about-claude/models
    try {
      const extractionResult = await generateObject({
        model: anthropic('claude-3-7-sonnet-latest'),
        schema: LetterExtractionSchema,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text:
                  'Parse this surgery scheduling / pre-op letter PDF and return a JSON object ' +
                  'that matches the LetterExtraction schema exactly. For the provider field, ' +
                  'make sure to match to one of: Duey, Nilsson, or Ritchie based on the physician name in the Surgeon field of the pdf document.',
              },
              {
                type: 'file',
                data: pdfBase64,
                mediaType: 'application/pdf',
              },
            ],
          },
        ],
      });

      parsedData = extractionResult.object;
      console.log('Anthropic parsedData:', parsedData);
    } catch (err) {
      console.error('Anthropic extraction failed:', err);
      parsingError = err instanceof Error ? err.message : 'Unknown parsing error';
    }

    
    const fields: Partial<AirtableRecord['fields']> = {
      Name: parsedData?.patientName || name,
      Supplies: parsedData?.supplies || undefined,
      Provider: parsedData?.provider || undefined,
    };

    const recordData: { records: Array<{ fields: AirtableRecord['fields'] }> } = {
      records: [
        {
          fields: fields as AirtableRecord['fields'],
        },
      ],
    };
    console.log('Airtable recordData payload:', JSON.stringify(recordData, null, 2));

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recordData)
    });


    if (!response.ok) {
      const errorText = await response.text()
      console.error('Airtable API error response:', errorText);
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result: AirtableResponse = await response.json();
    const recordId = result.records[0]?.id;

    if (!recordId) {
      console.error('Airtable did not return a record ID');
      return NextResponse.json({ error: 'Problem creating Airtable record' }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString('base64');
    const uploadUrl = `https://content.airtable.com/v0/${AIRTABLE_BASE_ID}/${recordId}/Letter/uploadAttachment`

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentType: file.type || 'application/octet-stream',
        file: base64File,
        filename: file.name,
      }),
    });

    console.log('Airtable uploadAttachment status:', uploadResponse.status, uploadResponse.statusText);

    if (!uploadResponse.ok) {
      const uploadErrorText = await uploadResponse.text();
      console.error('Airtable uploadAttachment error response:', uploadErrorText);
      throw new Error(`Airtable uploadAttachment error: ${uploadResponse.status} ${uploadResponse.statusText} - ${uploadErrorText}`);
    }

    const uploadResult = await uploadResponse.json();
    console.log('Airtable uploadAttachment response fields:', JSON.stringify(uploadResult.fields, null, 2));

    return NextResponse.json({
      success: true,
      data: result,
      upload: uploadResult,
      parsedData,
      parsingError,
    });

  } catch (error) {
    console.error('Integration error:', error);

    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
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
