// Word service interface for dependency inversion
export interface WordService<T = any> {
  getAllWords(): Promise<T[]>;
  getWordsByLevel(level: string): Promise<T[]>;
  getWordById(id: string): Promise<T | null>;
}
