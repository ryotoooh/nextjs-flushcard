interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="border border-gray-300 bg-gray-50 px-6 py-4 rounded-lg mb-6">
          <p className="text-gray-800 font-medium">Error: {error}</p>
        </div>
        <button
          onClick={onRetry}
          className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
