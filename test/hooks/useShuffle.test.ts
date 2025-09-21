import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useShuffle } from '../../app/hooks/useShuffle';
import { FisherYatesShuffleService } from '../../app/services/implementations/fisher-yates-shuffle-service';
import { MockRandomGenerator } from '../services/implementations/mock-random-generator';
import { WordData } from '../../app/hooks/useWords';

const mockWords: WordData[] = [
  { word: 'apple', meaning: 'りんご', example: 'I eat an apple.', level: 'A1', lastReviewed: '2024-01-01' },
  { word: 'banana', meaning: 'バナナ', example: 'Banana is yellow.', level: 'A1', lastReviewed: '2024-01-02' },
  { word: 'cherry', meaning: 'さくらんぼ', example: 'Cherry is red.', level: 'A2', lastReviewed: '2024-01-03' },
];

describe('useShuffle', () => {
  it('should initialize with original words', () => {
    const { result } = renderHook(() => useShuffle(mockWords));
    
    expect(result.current.shuffledWords).toEqual(mockWords);
    expect(result.current.isShuffled).toBe(false);
  });

  it('should shuffle words when shuffle is called', () => {
    const mockRandomGenerator = new MockRandomGenerator();
    mockRandomGenerator.setValues([0.1, 0.3, 0.7]);
    const shuffleService = new FisherYatesShuffleService<WordData>(mockRandomGenerator);
    
    const { result } = renderHook(() => useShuffle(mockWords, shuffleService));
    
    act(() => {
      result.current.shuffle();
    });
    
    expect(result.current.isShuffled).toBe(true);
    expect(result.current.shuffledWords).not.toEqual(mockWords);
    expect(result.current.shuffledWords).toHaveLength(mockWords.length);
  });

  it('should reset to original order when reset is called', () => {
    const mockRandomGenerator = new MockRandomGenerator();
    const shuffleService = new FisherYatesShuffleService<WordData>(mockRandomGenerator);
    
    const { result } = renderHook(() => useShuffle(mockWords, shuffleService));
    
    // First shuffle
    act(() => {
      result.current.shuffle();
    });
    
    expect(result.current.isShuffled).toBe(true);
    
    // Then reset
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.isShuffled).toBe(false);
    expect(result.current.shuffledWords).toEqual(mockWords);
  });

  it('should update when original words change', () => {
    const { result, rerender } = renderHook(
      ({ words }) => useShuffle(words),
      { initialProps: { words: mockWords } }
    );
    
    const newWords = [...mockWords, { word: 'date', meaning: 'デーツ', example: 'Date is sweet.', level: 'A2', lastReviewed: '2024-01-04' }];
    
    rerender({ words: newWords });
    
    expect(result.current.shuffledWords).toEqual(newWords);
    expect(result.current.isShuffled).toBe(false);
  });
});
