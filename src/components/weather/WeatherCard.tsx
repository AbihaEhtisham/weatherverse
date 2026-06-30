import { MapPin, Calendar } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import WeatherDetails from './WeatherDetails';
import { formatTemp, formatDate, formatTime } from '@/lib/formatters';
import { WeatherData } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { location, current } = weather;

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {location.name}
                {location.region && `, ${location.region}`}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{location.country}</h2>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(location.localtime || '')} • {formatTime(location.localtime || '')}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-5xl font-bold text-gray-800">
              {formatTemp(current.temp)}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Feels like {formatTemp(current.feelsLike)}
            </p>
          </div>
        </div>

        {/* Condition */}
        <div className="flex items-center gap-3 mt-4">
          <WeatherIcon iconUrl={current.conditionIcon} condition={current.condition} size="md" />
          <div>
            <p className="text-lg font-medium text-gray-700">{current.condition}</p>
            <p className="text-xs text-gray-400">
              {current.isDay ? 'Daytime' : 'Nighttime'}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="px-6 pb-6">
        <WeatherDetails
          humidity={current.humidity}
          windKph={current.windKph}
          windDir={current.windDir}
          visibilityKm={current.visibilityKm}
          uv={current.uv}
          pressureMb={current.pressureMb}
          aqi={current.aqi}
        />
      </div>
    </div>
  );
}