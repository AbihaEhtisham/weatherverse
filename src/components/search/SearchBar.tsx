'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGeolocation } from '@/hooks/useGeolocation';
import { GeocodeSuggestion } from '@/types/api';
import { validateLocation } from '@/lib/validators';
import SearchSuggestions from './SearchSuggestions';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodeSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const { latitude, longitude, loading: geoLoading, error: geoError, getLocation } = useGeolocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions on debounced input
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
        }
      } catch {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle geolocation result
  useEffect(() => {
    if (latitude && longitude) {
      const coordQuery = `${latitude},${longitude}`;
      setQuery(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      onSearch(coordQuery);
    }
  }, [latitude, longitude, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError(null);

    const validation = validateLocation(query);
    if (!validation.valid) {
      setInputError(validation.error || 'Invalid location');
      return;
    }

    setShowSuggestions(false);
    onSearch(query.trim());
  };

  const handleSuggestionSelect = (suggestion: GeocodeSuggestion) => {
    setQuery(`${suggestion.name}, ${suggestion.country}`);
    setShowSuggestions(false);
    onSearch(`${suggestion.lat},${suggestion.lon}`);
  };

  const handleGeolocation = () => {
    setInputError(null);
    getLocation();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setInputError(null);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Enter city, ZIP code, coordinates or postal address..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pm-blue focus:ring-2 focus:ring-pm-blue/20 transition-all text-sm"
              disabled={loading}
            />
            {loading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pm-blue animate-spin" />
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3.5 bg-pm-blue text-white rounded-xl font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            type="button"
            onClick={handleGeolocation}
            disabled={geoLoading}
            className="p-3.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-pm-blue hover:border-pm-blue/30 transition-all disabled:opacity-50"
            title="Use my location"
          >
            {geoLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Navigation className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Input error */}
        {inputError && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {inputError}
          </p>
        )}

        {/* Geolocation error */}
        {geoError && (
          <p className="mt-2 text-sm text-amber-600 flex items-center gap-1">
            <span>⚠</span> {geoError}
          </p>
        )}
      </form>

      {/* Suggestions dropdown */}
      <SearchSuggestions
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
        visible={showSuggestions}
      />
    </div>
  );
}