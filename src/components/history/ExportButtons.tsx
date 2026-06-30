'use client';

import { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';

export default function ExportButtons() {
  const [exporting, setExporting] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const handleExport = async (format: 'json' | 'csv') => {
    setExporting(format);
    setDone(null);

    try {
      const response = await fetch(`/api/export/${format}`);
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `weatherverse-export.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDone(format);
      setTimeout(() => setDone(null), 2000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-2">Export:</span>
      <button
        onClick={() => handleExport('json')}
        disabled={exporting !== null}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {exporting === 'json' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : done === 'json' ? (
          <Check className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        JSON
      </button>
      <button
        onClick={() => handleExport('csv')}
        disabled={exporting !== null}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {exporting === 'csv' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : done === 'csv' ? (
          <Check className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        CSV
      </button>
    </div>
  );
}