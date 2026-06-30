import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export default function HistoryLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse space-y-4 mb-8">
        <div className="h-8 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
      <LoadingSkeleton type="table" />
    </div>
  );
}