import { useState, useEffect } from 'react';

export interface WordData {
  word: string;
  meaning: string;
  example: string;
  level: string;
  lastReviewed: string;
}

interface UseWordsReturn {
  words: WordData[];
  loading: boolean;
  error: string | null;
  fetchWords: () => Promise<void>;
}

export const useWords = (): UseWordsReturn => {
  const [words, setWords] = useState<WordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWords = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/words');
      const data = await response.json();
      
      if (response.ok) {
        setWords(data.words);
      } else {
        setError(data.error || 'Failed to fetch words');
      }
    } catch (err) {
      setError('Failed to fetch words');
      console.error('Error fetching words:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return {
    words,
    loading,
    error,
    fetchWords,
  };
};
