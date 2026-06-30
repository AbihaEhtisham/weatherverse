'use client';

import HistoryTable from '@/components/history/HistoryTable';
import { useHistory } from '@/hooks/useHistory';

export default function HistoryPage() {
  const { records, loading, error, fetchHistory, updateRecord, deleteRecord } = useHistory();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Search History</h1>
        <p className="text-gray-500 mt-2">
          View, edit, and export your previous weather searches.
        </p>
      </div>

      <HistoryTable
        records={records}
        loading={loading}
        error={error}
        onUpdate={updateRecord}
        onDelete={deleteRecord}
        onRefresh={fetchHistory}
      />
    </div>
  );
}