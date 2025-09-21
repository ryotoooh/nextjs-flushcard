import { WordData } from '../hooks/useWords';

interface FlashcardProps {
  words: WordData[];
  currentIndex: number;
  showAnswer: boolean;
  currentWord: WordData | null;
  isShuffled: boolean;
  onNext: () => void;
  onPrev: () => void;
  onToggleAnswer: () => void;
  onRefresh: () => void;
  onShuffle: () => void;
  onReset: () => void;
}

export default function Flashcard({
  words,
  currentIndex,
  showAnswer,
  currentWord,
  isShuffled,
  onNext,
  onPrev,
  onToggleAnswer,
  onRefresh,
  onShuffle,
  onReset,
}: FlashcardProps) {
  if (!currentWord) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-light text-center mb-12 text-black tracking-wide">
          Flashcard
        </h1>
        
        <div className="border border-gray-200 rounded-lg p-8 mb-8 bg-white shadow-sm">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-3 mb-6">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                {currentIndex + 1} / {words.length}
              </span>
              <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                {currentWord.level}
              </span>
              {isShuffled && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  Shuffled
                </span>
              )}
            </div>

            <h2 className="text-3xl font-light text-black mb-8 tracking-wide">
              {currentWord.word}
            </h2>
            
            {showAnswer && (
              <div className="space-y-6">
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wider">Meaning</h3>
                  <p className="text-gray-800 font-light leading-relaxed">{currentWord.meaning}</p>
                </div>
                
                {currentWord.example && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wider">Example</h3>
                    <p className="text-gray-800 font-light italic leading-relaxed">"{currentWord.example}"</p>
                  </div>
                )}
                
                {currentWord.lastReviewed && (
                  <div className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
                    Last reviewed: {currentWord.lastReviewed}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onPrev}
              className="bg-white hover:bg-gray-50 text-black font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors"
            >
              Previous
            </button>
            
            <button
              onClick={onToggleAnswer}
              className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            
            <button
              onClick={onNext}
              className="bg-white hover:bg-gray-50 text-black font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={onShuffle}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Shuffle Cards
            </button>
            
            {isShuffled && (
              <button
                onClick={onReset}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Reset Order
              </button>
            )}
          </div>
          
          <button
            onClick={onRefresh}
            className="text-gray-600 hover:text-black font-light py-2 px-4 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
