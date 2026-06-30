'use client';

import { useState, useCallback } from 'react';
import CompareForm from '@/components/compare/CompareForm';
import CompareCards from '@/components/compare/CompareCards';
import ErrorAlert from '@/components/ui/ErrorAlert';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import { WeatherData } from '@/types/weather';

export default function ComparePage() {
  const [weather1, setWeather1] = useState<WeatherData | null>(null);
  const [weather2, setWeather2] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleCompare = useCallback(async (city1: string, city2: string) => {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/weather?q=${encodeURIComponent(city1)}`),
        fetch(`/api/weather?q=${encodeURIComponent(city2)}`),
      ]);

      if (!res1.ok || !res2.ok) {
        const errData = (!res1.ok ? await res1.json() : null) || (!res2.ok ? await res2.json() : null);
        throw new Error(errData?.message || 'Failed to fetch weather for one or both cities');
      }

      const data1: WeatherData = await res1.json();
      const data2: WeatherData = await res2.json();

      setWeather1(data1);
      setWeather2(data2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Comparison failed');
      setWeather1(null);
      setWeather2(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Compare Cities</h1>
        <p className="text-gray-500 mt-2">
          See weather conditions side-by-side for two locations.
        </p>
      </div>

      <CompareForm onCompare={handleCompare} loading={loading} />

      <div className="mt-6">
        {error && <ErrorAlert message={error} />}

        {loading && <LoadingSkeleton type="card" />}

        {!loading && !error && weather1 && weather2 && (
          <CompareCards weather1={weather1} weather2={weather2} />
        )}

        {!loading && !error && !weather1 && !weather2 && searched && (
          <EmptyState type="no-results" message="Could not load comparison data." />
        )}
      </div>
    </div>
  );
}