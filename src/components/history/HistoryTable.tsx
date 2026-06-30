'use client';

import { motion } from 'framer-motion';
import HistoryRow from './HistoryRow';
import ExportButtons from './ExportButtons';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { HistoryRecord } from '@/types/history';

interface HistoryTableProps {
  records: HistoryRecord[];
  loading: boolean;
  error: string | null;
  onUpdate: (id: string, updates: { notes?: string; isFavorite?: boolean }) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onRefresh: () => void;
}

export default function HistoryTable({
  records,
  loading,
  error,
  onUpdate,
  onDelete,
  onRefresh,
}: HistoryTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Search History</h2>
          <p className="text-sm text-gray-400 mt-1">
            {records.length} record{records.length !== 1 ? 's' : ''}
          </p>
        </div>
        <ExportButtons />
      </div>

      {/* Error */}
      {error && (
        <ErrorAlert message={error} onRetry={onRefresh} />
      )}

      {/* Loading */}
      {loading && <LoadingSkeleton type="table" />}

      {/* Empty State */}
      {!loading && !error && records.length === 0 && (
        <EmptyState type="no-history" />
      )}

      {/* Records */}
      {!loading && records.length > 0 && (
        <div className="space-y-2">
          {records.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <HistoryRow
                record={record}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}