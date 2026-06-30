'use client';

import { GeocodeSuggestion } from '@/types/api';
import { MapPin } from 'lucide-react';

interface SearchSuggestionsProps {
  suggestions: GeocodeSuggestion[];
  onSelect: (suggestion: GeocodeSuggestion) => void;
  visible: boolean;
}

export default function SearchSuggestions({ suggestions, onSelect, visible }: SearchSuggestionsProps) {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fade-in">
      <p className="px-4 py-2 text-xs font-medium text-gray-400 uppercase bg-gray-50">
        Suggestions
      </p>
      {suggestions.map((suggestion, index) => (
        <button
          key={`${suggestion.lat}-${suggestion.lon}-${index}`}
          onClick={() => onSelect(suggestion)}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-pm-light transition-colors"
        >
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div>
            <span className="text-sm font-medium text-gray-800">
              {suggestion.name}
            </span>
            <span className="text-xs text-gray-400 ml-2">
              {suggestion.region && `${suggestion.region}, `}{suggestion.country}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}