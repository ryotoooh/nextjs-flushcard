interface EmptyStateProps {
  onRefresh: () => void;
}

export default function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-gray-600 mb-6 font-light">No words found in the spreadsheet.</p>
        <button
          onClick={onRefresh}
          className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
