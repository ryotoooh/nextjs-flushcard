import { WordData } from '../../types/word';
import { WordService } from '../word-service';
import fs from 'fs/promises';
import path from 'path';

// JSON file implementation of WordService
export class JsonWordService implements WordService<WordData> {
  private dataPath: string;

  constructor(dataPath: string = './data/words.json') {
    this.dataPath = dataPath;
  }

  async getAllWords(): Promise<WordData[]> {
    try {
      const filePath = path.resolve(this.dataPath);
      const data = await fs.readFile(filePath, 'utf-8');
      const words: WordData[] = JSON.parse(data);
      return words;
    } catch (error) {
      console.error('Error reading JSON file:', error);
      throw new Error('Failed to read words from JSON file');
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
