import { CloudOff, Search, History } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-weather' | 'no-results' | 'no-history';
  message?: string;
}

const config = {
  'no-weather': {
    icon: CloudOff,
    title: 'No weather data yet',
    defaultMessage: 'Search for a location to see the weather.',
  },
  'no-results': {
    icon: Search,
    title: 'No results found',
    defaultMessage: 'Try a different location or check the spelling.',
  },
  'no-history': {
    icon: History,
    title: 'No search history',
    defaultMessage: 'Your recent weather searches will appear here.',
  },
};

export default function EmptyState({ type, message }: EmptyStateProps) {
  const { icon: Icon, title, defaultMessage } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <Icon className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm">{message || defaultMessage}</p>
    </div>
  );
}