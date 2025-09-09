import { useState } from 'react';
import { WordData } from './useWords';

interface UseFlashcardNavigationReturn {
  currentIndex: number;
  showAnswer: boolean;
  currentWord: WordData | null;
  nextWord: () => void;
  prevWord: () => void;
  toggleAnswer: () => void;
}

export const useFlashcardNavigation = (words: WordData[]): UseFlashcardNavigationReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextWord = () => {
    setCurrentIndex((prev: number) => (prev + 1) % words.length);
    setShowAnswer(false);
  };

  const prevWord = () => {
    setCurrentIndex((prev: number) => (prev - 1 + words.length) % words.length);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const currentWord = words.length > 0 ? words[currentIndex] : null;

  return {
    currentIndex,
    showAnswer,
    currentWord,
    nextWord,
    prevWord,
    toggleAnswer,
  };
};
