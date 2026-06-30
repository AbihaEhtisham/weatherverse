import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="animate-pulse space-y-4 text-center">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
      <LoadingSkeleton type="card" />
      <LoadingSkeleton type="forecast" />
    </div>
  );
}