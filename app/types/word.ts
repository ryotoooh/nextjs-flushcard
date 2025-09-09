// Word data type definition
export interface WordData {
  word: string;
  meaning: string;
  example: string;
  level: string;
  lastReviewed: string;
}

// Word service interface for dependency inversion
export interface WordService {
  getAllWords(): Promise<WordData[]>;
  getWordsByLevel(level: string): Promise<WordData[]>;
  getWordById(id: string): Promise<WordData | null>;
}
