import { WordData, WordService } from '../../types/word';

// Database implementation of WordService (example with Prisma)
export class DatabaseWordService implements WordService {
  // This would be injected via constructor in a real implementation
  // private prisma: PrismaClient;

  async getAllWords(): Promise<WordData[]> {
    // Example implementation with Prisma
    // return await this.prisma.word.findMany();
    
    // Placeholder implementation
    throw new Error('Database implementation not yet configured');
  }

  async getWordsByLevel(level: string): Promise<WordData[]> {
    // Example implementation with Prisma
    // return await this.prisma.word.findMany({
    //   where: { level }
    // });
    
    // Placeholder implementation
    throw new Error('Database implementation not yet configured');
  }

  async getWordById(id: string): Promise<WordData | null> {
    // Example implementation with Prisma
    // return await this.prisma.word.findUnique({
    //   where: { word: id }
    // });
    
    // Placeholder implementation
    throw new Error('Database implementation not yet configured');
  }
}
