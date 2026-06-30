'use client';

import { motion } from 'framer-motion';
import WeatherIcon from '@/components/weather/WeatherIcon';
import { formatTemp } from '@/lib/formatters';
import { DayForecast } from '@/types/weather';

interface ForecastDayCardProps {
  day: DayForecast;
  isBestDay: boolean;
  index: number;
}

export default function ForecastDayCard({ day, isBestDay, index }: ForecastDayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative flex-shrink-0 w-40 p-4 rounded-xl border-2 transition-all ${
        isBestDay
          ? 'border-amber-400 bg-amber-50/80 shadow-lg shadow-amber-100'
          : 'border-gray-100 bg-white/60 hover:border-gray-200'
      }`}
    >
      {/* Best Day Badge */}
      {isBestDay && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-amber-400 text-white text-xs font-bold rounded-full shadow-md">
          ⭐ Best Day
        </div>
      )}

      {/* Day Name */}
      <p className="text-sm font-semibold text-gray-700 text-center mb-2">
        {day.dayName}
      </p>

      {/* Icon */}
      <div className="flex justify-center mb-2">
        <WeatherIcon iconUrl={day.conditionIcon} condition={day.condition} size="sm" />
      </div>

      {/* Condition */}
      <p className="text-xs text-gray-500 text-center mb-2 truncate">
        {day.condition}
      </p>

      {/* Temps */}
      <div className="flex justify-center items-center gap-2 text-sm">
        <span className="font-bold text-gray-800">{formatTemp(day.maxTemp)}</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500">{formatTemp(day.minTemp)}</span>
      </div>

      {/* Stats */}
      <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Rain</span>
          <span className="font-medium text-gray-600">{day.rainChance}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Wind</span>
          <span className="font-medium text-gray-600">{Math.round(day.windKph)} km/h</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">UV</span>
          <span className="font-medium text-gray-600">{day.uv.toFixed(0)}</span>
        </div>
      </div>

      {/* Travel Score */}
      {day.travelScore && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Score</span>
            <span
              className={`text-xs font-bold ${
                day.travelScore.total >= 70
                  ? 'text-green-600'
                  : day.travelScore.total >= 40
                  ? 'text-yellow-600'
                  : 'text-red-500'
              }`}
            >
              {day.travelScore.total}/100
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}