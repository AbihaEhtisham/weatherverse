'use client';

import { motion } from 'framer-motion';
import { MapPin, Thermometer, Droplets, Wind, Sun, Eye } from 'lucide-react';
import WeatherIcon from '@/components/weather/WeatherIcon';
import { WeatherData } from '@/types/weather';
import { formatTemp } from '@/lib/formatters';

interface CompareCardsProps {
  weather1: WeatherData;
  weather2: WeatherData;
}

export default function CompareCards({ weather1, weather2 }: CompareCardsProps) {
  const comparisonRows = [
    { icon: Thermometer, label: 'Temperature', val1: formatTemp(weather1.current.temp), val2: formatTemp(weather2.current.temp) },
    { icon: Thermometer, label: 'Feels Like', val1: formatTemp(weather1.current.feelsLike), val2: formatTemp(weather2.current.feelsLike) },
    { icon: Droplets, label: 'Humidity', val1: `${weather1.current.humidity}%`, val2: `${weather2.current.humidity}%` },
    { icon: Wind, label: 'Wind', val1: `${Math.round(weather1.current.windKph)} km/h`, val2: `${Math.round(weather2.current.windKph)} km/h` },
    { icon: Sun, label: 'UV Index', val1: weather1.current.uv.toFixed(1), val2: weather2.current.uv.toFixed(1) },
    { icon: Eye, label: 'Visibility', val1: `${weather1.current.visibilityKm} km`, val2: `${weather2.current.visibilityKm} km` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {[weather1, weather2].map((weather, idx) => (
        <div key={idx} className="glass-card p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-pm-blue" />
            <h3 className="text-lg font-semibold text-gray-800">
              {weather.location.name}, {weather.location.country}
            </h3>
          </div>

          {/* Main weather */}
          <div className="flex items-center gap-4 mb-4">
            <WeatherIcon iconUrl={weather.current.conditionIcon} condition={weather.current.condition} size="lg" />
            <div>
              <p className="text-4xl font-bold text-gray-800">{formatTemp(weather.current.temp)}</p>
              <p className="text-gray-500">{weather.current.condition}</p>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="space-y-2">
            {comparisonRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <row.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{row.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {idx === 0 ? row.val1 : row.val2}
                </span>
              </div>
            ))}
          </div>

          {/* Best day */}
          {weather.forecast[0]?.travelScore && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">Today's Travel Score</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      weather.forecast[0].travelScore.total >= 70
                        ? 'bg-green-500'
                        : weather.forecast[0].travelScore.total >= 40
                        ? 'bg-yellow-500'
                        : 'bg-red-400'
                    }`}
                    style={{ width: `${weather.forecast[0].travelScore.total}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700">
                  {weather.forecast[0].travelScore.total}/100
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}