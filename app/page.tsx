'use client';

import { useWords } from './hooks/useWords';
import { useFlashcardNavigation } from './hooks/useFlashcardNavigation';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import EmptyState from './components/EmptyState';
import Flashcard from './components/Flashcard';

export default function Home() {
  const { words, loading, error, fetchWords } = useWords();
  const { currentIndex, showAnswer, currentWord, nextWord, prevWord, toggleAnswer } = 
    useFlashcardNavigation(words);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchWords} />;
  }

  if (words.length === 0) {
    return <EmptyState onRefresh={fetchWords} />;
  }

  return (
    <Flashcard
      words={words}
      currentIndex={currentIndex}
      showAnswer={showAnswer}
      currentWord={currentWord}
      onNext={nextWord}
      onPrev={prevWord}
      onToggleAnswer={toggleAnswer}
      onRefresh={fetchWords}
    />
  );
}
