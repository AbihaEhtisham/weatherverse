'use client';

import { motion } from 'framer-motion';
import ForecastDayCard from './ForecastDayCard';
import TripPlanner from './TripPlanner';
import { DayForecast } from '@/types/weather';

interface ForecastGridProps {
  forecast: DayForecast[];
  bestDay: DayForecast | null;
}

export default function ForecastGrid({ forecast, bestDay }: ForecastGridProps) {
  if (!forecast.length) return null;

  return (
    <div className="space-y-6">
      {/* Horizontal scrollable forecast */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {forecast.map((day, index) => (
            <ForecastDayCard
              key={day.date}
              day={day}
              isBestDay={bestDay?.date === day.date}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Trip Planner */}
      <TripPlanner forecast={forecast} bestDay={bestDay} />
    </div>
  );
}