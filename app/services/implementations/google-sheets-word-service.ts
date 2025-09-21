import { google } from 'googleapis';
import { WordData } from '../../types/word';
import { WordService } from '../word-service';

// Google Sheets implementation of WordService
export class GoogleSheetsWordService implements WordService<WordData> {
  private sheets: any;
  private spreadsheetId: string;
  private range: string;

  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '';
    this.range = process.env.GOOGLE_SHEETS_RANGE || 'A1:E1000';
    this.sheets = this.initializeSheetsClient();
  }

  private initializeSheetsClient() {
    // Prioritize service account authentication, use API key authentication if not available
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
      return google.sheets({ version: 'v4', auth });
    } else if (process.env.GOOGLE_SHEETS_API_KEY) {
      return google.sheets({ 
        version: 'v4', 
        auth: process.env.GOOGLE_SHEETS_API_KEY 
      });
    } else {
      throw new Error('Google Sheets authentication is not configured');
    }
  }

  async getAllWords(): Promise<WordData[]> {
    if (!this.spreadsheetId) {
      throw new Error('Google Sheets Spreadsheet ID is not configured');
    }

    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: this.range,
      });

      const rows = response.data.values;
      
      if (!rows || rows.length === 0) {
        return [];
      }

      // Skip header row and transform data
      return rows.slice(1).map((row: string[]) => ({
        word: row[0] || '',
        meaning: row[1] || '',
        example: row[2] || '',
        level: row[3] || '',
        lastReviewed: row[4] || '',
      }));
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw new Error('Failed to fetch data from Google Sheets');
    }
  }

  async getWordsByLevel(level: string): Promise<WordData[]> {
    const allWords = await this.getAllWords();
    return allWords.filter(word => word.level === level);
  }

  async getWordById(id: string): Promise<WordData | null> {
    const allWords = await this.getAllWords();
    return allWords.find(word => word.word === id) || null;
  }
}
