'use client';

import { useState } from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { validateLocation } from '@/lib/validators';

interface CompareFormProps {
  onCompare: (city1: string, city2: string) => void;
  loading: boolean;
}

export default function CompareForm({ onCompare, loading }: CompareFormProps) {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const v1 = validateLocation(city1);
    const v2 = validateLocation(city2);

    if (!v1.valid || !v2.valid) {
      setError('Please enter valid locations for both cities');
      return;
    }

    if (city1.trim().toLowerCase() === city2.trim().toLowerCase()) {
      setError('Please enter two different locations');
      return;
    }

    onCompare(city1.trim(), city2.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Compare Two Cities</h2>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            placeholder="First city..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pm-blue focus:ring-1 focus:ring-pm-blue/20"
            disabled={loading}
          />
        </div>

        <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0 hidden sm:block" />

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            placeholder="Second city..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pm-blue focus:ring-1 focus:ring-pm-blue/20"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !city1.trim() || !city2.trim()}
          className="px-5 py-2.5 bg-pm-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2 flex-shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Compare
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </form>
  );
}