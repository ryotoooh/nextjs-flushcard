import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Type definition for word data
interface WordData {
  word: string;
  meaning: string;
  example: string;
  level: string;
  lastReviewed: string;
}

// Initialize Google Sheets API client
function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Client for using API key
function getGoogleSheetsClientWithApiKey() {
  return google.sheets({ 
    version: 'v4', 
    auth: process.env.GOOGLE_SHEETS_API_KEY 
  });
}

export async function GET(request: NextRequest) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'A1:E1000';

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Google Sheets Spreadsheet ID is not configured' },
        { status: 500 }
      );
    }

    let sheets;
    
    // Prioritize service account authentication, use API key authentication if not available
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      sheets = getGoogleSheetsClient();
    } else if (process.env.GOOGLE_SHEETS_API_KEY) {
      sheets = getGoogleSheetsClientWithApiKey();
    } else {
      return NextResponse.json(
        { error: 'Google Sheets authentication is not configured' },
        { status: 500 }
      );
    }

    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return NextResponse.json({ words: [] });
    }

    // Skip header row and transform data
    const words: WordData[] = rows.slice(1).map((row: string[]) => ({
      word: row[0] || '',
      meaning: row[1] || '',
      example: row[2] || '',
      level: row[3] || '',
      lastReviewed: row[4] || '',
    }));

    return NextResponse.json({ words });

  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Sheets' },
      { status: 500 }
    );
  }
}
