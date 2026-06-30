'use client';

import { Navigation, Loader2 } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect } from 'react';

interface CurrentLocationButtonProps {
  onLocation: (lat: number, lon: number) => void;
}

export default function CurrentLocationButton({ onLocation }: CurrentLocationButtonProps) {
  const { latitude, longitude, loading, error, getLocation } = useGeolocation();

  useEffect(() => {
    if (latitude && longitude) {
      onLocation(latitude, longitude);
    }
  }, [latitude, longitude, onLocation]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={getLocation}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:text-pm-blue hover:border-pm-blue/30 transition-all disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Navigation className="w-4 h-4" />
        )}
        Use My Location
      </button>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}