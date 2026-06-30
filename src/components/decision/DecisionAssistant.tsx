'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import ClothingRecommendation from './ClothingRecommendation';
import ActivityRecommendation from './ActivityRecommendation';
import { generateRecommendations } from '@/lib/decision-engine';
import { WeatherData } from '@/types/weather';

interface DecisionAssistantProps {
  weather: WeatherData;
}

export default function DecisionAssistant({ weather }: DecisionAssistantProps) {
  const { current, forecast } = weather;
  const todayForecast = forecast[0];

  const recommendations = generateRecommendations({
    temp: current.temp,
    humidity: current.humidity,
    windKph: current.windKph,
    uv: current.uv,
    visibilityKm: current.visibilityKm,
    rainChance: todayForecast?.rainChance || 0,
    aqi: current.aqi,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-800">Weather Decision Assistant</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">{recommendations.summary}</p>

      <div className="space-y-4">
        <ClothingRecommendation items={recommendations.clothing} />
        <ActivityRecommendation
          activities={recommendations.activities}
          warnings={recommendations.warnings}
        />
      </div>
    </motion.div>
  );
}