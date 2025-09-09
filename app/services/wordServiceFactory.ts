import { WordService } from '../types/word';
import { JsonWordService } from './implementations/jsonWordService';
import { DatabaseWordService } from './implementations/databaseWordService';
import { GoogleSheetsWordService } from './implementations/GoogleSheetsWordService';

// Factory function to create WordService instance
export function createWordService(): WordService {
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
