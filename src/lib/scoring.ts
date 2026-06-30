import { ForecastDay, TravelScore, DayForecast } from '@/types/weather';
import { SCORE_WEIGHTS, IDEAL_TEMP } from './constants';

/**
 * Trip Planner Scoring Algorithm
 * Each day receives a score out of 100 based on weighted factors:
 * - Temperature: 30% (closer to 22°C = better)
 * - Rain: 25% (lower chance = better)
 * - Wind: 20% (lower wind = better)
 * - Humidity: 10% (closer to 50% = better)
 * - Visibility: 15% (higher = better)
 */

function scoreTemperature(temp: number): number {
  const diff = Math.abs(temp - IDEAL_TEMP);
  if (diff <= 2) return 30;
  if (diff <= 5) return 25;
  if (diff <= 10) return 20;
  if (diff <= 15) return 10;
  return 5;
}

function scoreRain(rainChance: number): number {
  if (rainChance === 0) return 25;
  if (rainChance <= 10) return 22;
  if (rainChance <= 30) return 17;
  if (rainChance <= 50) return 10;
  if (rainChance <= 70) return 5;
  return 0;
}

function scoreWind(windKph: number): number {
  if (windKph <= 10) return 20;
  if (windKph <= 20) return 15;
  if (windKph <= 30) return 10;
  if (windKph <= 40) return 5;
  return 0;
}

function scoreHumidity(humidity: number): number {
  const diff = Math.abs(humidity - 50);
  if (diff <= 10) return 10;
  if (diff <= 20) return 7;
  if (diff <= 30) return 4;
  return 1;
}

function scoreVisibility(visKm: number): number {
  if (visKm >= 10) return 15;
  if (visKm >= 7) return 12;
  if (visKm >= 5) return 8;
  if (visKm >= 3) return 4;
  return 0;
}

function getVerdict(total: number): string {
  if (total >= 85) return '⭐ Perfect day! Highly recommended.';
  if (total >= 70) return '👍 Great day for outdoor activities.';
  if (total >= 55) return '✅ Good day, but check conditions.';
  if (total >= 40) return '⚠️ Fair day. Some conditions may be uncomfortable.';
  return '👎 Not ideal. Consider indoor activities.';
}

export function calculateDayScore(day: DayForecast): TravelScore {
  const breakdown = {
    temperature: scoreTemperature(day.avgTemp),
    rain: scoreRain(day.rainChance),
    wind: scoreWind(day.windKph),
    humidity: scoreHumidity(day.humidity),
    visibility: 15, // default full score (visibility from forecast API is limited)
  };

  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return {
    total,
    breakdown,
    verdict: getVerdict(total),
  };
}

export function findBestDay(days: DayForecast[]): DayForecast | null {
  if (days.length === 0) return null;

  let bestDay = days[0];
  let bestScore = calculateDayScore(days[0]).total;

  for (let i = 1; i < days.length; i++) {
    const score = calculateDayScore(days[i]).total;
    if (score > bestScore) {
      bestScore = score;
      bestDay = days[i];
    }
  }

  return bestDay;
}