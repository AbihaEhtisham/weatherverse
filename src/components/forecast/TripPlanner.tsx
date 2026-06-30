'use client';

import { motion } from 'framer-motion';
import { Calendar, Star, TrendingUp } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { DayForecast } from '@/types/weather';
import { formatDate } from '@/lib/formatters';

interface TripPlannerProps {
  forecast: DayForecast[];
  bestDay: DayForecast | null;
}

export default function TripPlanner({ forecast, bestDay }: TripPlannerProps) {
  if (!forecast.length) return null;

  const sortedByScore = [...forecast]
    .filter((d) => d.travelScore)
    .sort((a, b) => (b.travelScore?.total || 0) - (a.travelScore?.total || 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-pm-blue" />
        <h3 className="text-lg font-semibold text-gray-800">Trip Planner</h3>
        <Badge variant="info">Best Day to Visit</Badge>
      </div>

      {/* Best Day Highlight */}
      {bestDay && bestDay.travelScore && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-gray-800">
              {bestDay.dayName}, {formatDate(bestDay.date)}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {bestDay.travelScore.verdict}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Score: {bestDay.travelScore.total}/100
          </p>
        </div>
      )}

      {/* Daily Rankings */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Daily Rankings
        </p>
        {sortedByScore.map((day, index) => {
          const score = day.travelScore;
          if (!score) return null;

          return (
            <div
              key={day.date}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-xs font-bold text-gray-400 w-5">#{index + 1}</span>
              <span className="flex-1 text-sm font-medium text-gray-700">{day.dayName}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      score.total >= 70
                        ? 'bg-green-500'
                        : score.total >= 40
                        ? 'bg-yellow-500'
                        : 'bg-red-400'
                    }`}
                    style={{ width: `${score.total}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-600 w-8 text-right">
                  {score.total}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}