import { useState, useCallback, useEffect } from 'react';
import { WordData } from './useWords';
import { ShuffleService } from '../services/shuffle-service';
import { FisherYatesShuffleService } from '../services/implementations/fisher-yates-shuffle-service';
import { MathRandomGenerator } from '../services/implementations/math-random-generator';

interface UseShuffleReturn {
  shuffledWords: WordData[];
  isShuffled: boolean;
  shuffle: () => void;
  reset: () => void;
}

/**
 * Custom hook for shuffling words
 * Uses dependency injection for testability
 */
export const useShuffle = (
  originalWords: WordData[],
  shuffleService?: ShuffleService<WordData>
): UseShuffleReturn => {
  // Dependency injection with default implementation
  const service = shuffleService || new FisherYatesShuffleService(new MathRandomGenerator());
  
  const [shuffledWords, setShuffledWords] = useState<WordData[]>(originalWords);
  const [isShuffled, setIsShuffled] = useState(false);

  // Update shuffled words when original words change
  useEffect(() => {
    setShuffledWords(originalWords);
    setIsShuffled(false);
  }, [originalWords]);

  const shuffle = useCallback(() => {
    const shuffled = service.shuffle(originalWords);
    setShuffledWords(shuffled);
    setIsShuffled(true);
  }, [originalWords, service]);

  const reset = useCallback(() => {
    setShuffledWords(originalWords);
    setIsShuffled(false);
  }, [originalWords]);

  return {
    shuffledWords,
    isShuffled,
    shuffle,
    reset,
  };
};
