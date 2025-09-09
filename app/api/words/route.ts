import { NextRequest, NextResponse } from 'next/server';
import { createWordService } from '../../services/implementations/GoogleSheetsWordService'

export async function GET(request: NextRequest) {
  try {
    const wordService = createWordService();
    const words = await wordService.getAllWords();
    
    return NextResponse.json({ words });

  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    );
  }
}
