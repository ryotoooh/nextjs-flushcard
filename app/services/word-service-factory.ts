import { WordService } from './word-service';
import { WordData } from '../types/word';
import { JsonWordService } from './implementations/json-word-service';
import { DatabaseWordService } from './implementations/database-word-service';
import { GoogleSheetsWordService } from './implementations/google-sheets-word-service';

// Factory function to create WordService instance
export function createWordService(): WordService<WordData> {
  const dataSource = process.env.DATA_SOURCE || 'google-sheets';
  
  switch (dataSource) {
    case 'json':
      return new JsonWordService();
    case 'database':
      return new DatabaseWordService();
    case 'google-sheets':
    default:
      return new GoogleSheetsWordService();
  }
}
