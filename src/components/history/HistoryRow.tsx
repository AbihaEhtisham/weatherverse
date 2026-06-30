'use client';

import { useState } from 'react';
import { Pencil, Trash2, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { HistoryRecord } from '@/types/history';
import { formatTemp, formatDate } from '@/lib/formatters';
import EditModal from './EditModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface HistoryRowProps {
  record: HistoryRecord;
  onUpdate: (id: string, updates: { notes?: string; isFavorite?: boolean }) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export default function HistoryRow({ record, onUpdate, onDelete }: HistoryRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className={`bg-white rounded-xl border transition-all ${
        record.isFavorite ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 hover:border-gray-200'
      }`}>
        {/* Main Row */}
        <div className="flex items-center gap-4 p-4">
          {/* Favorite indicator */}
          {record.isFavorite && <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />}

          {/* Location */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">
              {record.city}
            </p>
            <p className="text-xs text-gray-400">{record.country}</p>
          </div>

          {/* Temperature */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">{formatTemp(record.temperature)}</p>
            <p className="text-xs text-gray-400">{record.condition}</p>
          </div>

          {/* Date */}
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-600">{formatDate(record.createdAt)}</p>
            {record.travelScore && (
              <p className="text-xs text-gray-400">Score: {record.travelScore}/100</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            <button
              onClick={() => setShowEdit(true)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="px-4 pb-4 border-t border-gray-50 pt-3 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Feels Like:</span>
                <span className="ml-2 font-medium">{formatTemp(record.feelsLike)}</span>
              </div>
              <div>
                <span className="text-gray-400">Humidity:</span>
                <span className="ml-2 font-medium">{record.humidity}%</span>
              </div>
              <div>
                <span className="text-gray-400">Wind:</span>
                <span className="ml-2 font-medium">{Math.round(record.windKph)} km/h</span>
              </div>
              <div>
                <span className="text-gray-400">UV:</span>
                <span className="ml-2 font-medium">{record.uvIndex}</span>
              </div>
              <div>
                <span className="text-gray-400">Visibility:</span>
                <span className="ml-2 font-medium">{record.visibilityKm} km</span>
              </div>
              {record.aqi && (
                <div>
                  <span className="text-gray-400">AQI:</span>
                  <span className="ml-2 font-medium">{record.aqi}</span>
                </div>
              )}
            </div>
            {record.notes && (
              <div className="mt-3 pt-3 border-t border-gray-50">
                <p className="text-xs text-gray-400 mb-1">Notes:</p>
                <p className="text-sm text-gray-600">{record.notes}</p>
              </div>
            )}
            {record.bestDay && (
              <div className="mt-2">
                <span className="text-xs text-amber-600">⭐ Best day: {record.bestDay}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showEdit && (
        <EditModal
          record={record}
          onSave={onUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showDelete && (
        <DeleteConfirmModal
          city={record.city}
          country={record.country}
          onConfirm={() => onDelete(record.id)}
          onClose={() => setShowDelete(false)}
        />
      )}
    </>
  );
}