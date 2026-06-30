'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { HistoryRecord } from '@/types/history';

interface EditModalProps {
  record: HistoryRecord;
  onSave: (id: string, updates: { notes?: string; isFavorite?: boolean }) => Promise<boolean>;
  onClose: () => void;
}

export default function EditModal({ record, onSave, onClose }: EditModalProps) {
  const [notes, setNotes] = useState(record.notes || '');
  const [isFavorite, setIsFavorite] = useState(record.isFavorite);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(record.id, { notes, isFavorite });
    setSaving(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Record</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {record.city}, {record.country} — {new Date(record.createdAt).toLocaleDateString()}
        </p>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes..."
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pm-blue focus:ring-1 focus:ring-pm-blue/20 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">{notes.length}/500</p>
        </div>

        {/* Favorite Toggle */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-pm-blue focus:ring-pm-blue"
            />
            <span className="text-sm text-gray-700">Mark as favorite</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-pm-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}