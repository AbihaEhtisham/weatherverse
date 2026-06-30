import { THRESHOLDS, CLOTHING_RULES, ACTIVITY_RULES, DEFAULT_ACTIVITIES, DEFAULT_CLOTHING } from './constants';

interface WeatherConditions {
  temp: number;
  humidity: number;
  windKph: number;
  uv: number;
  visibilityKm: number;
  rainChance: number;
  aqi?: number;
}

interface DecisionResult {
  clothing: string[];
  activities: string[];
  warnings: string[];
  summary: string;
}

function parseCondition(condition: string, context: WeatherConditions): boolean {
  // Replace variable names with actual values
  const evalStr = condition
    .replace(/temp/g, context.temp.toString())
    .replace(/humidity/g, context.humidity.toString())
    .replace(/windKph/g, context.windKph.toString())
    .replace(/uv/g, context.uv.toString())
    .replace(/visibility/g, context.visibilityKm.toString())
    .replace(/rainChance/g, context.rainChance.toString())
    .replace(/aqi/g, (context.aqi ?? 50).toString());

  try {
    // Safe eval for simple comparisons
    return Function(`"use strict"; return (${evalStr})`)();
  } catch {
    return false;
  }
}

export function generateRecommendations(conditions: WeatherConditions): DecisionResult {
  const clothing: string[] = [];
  const activities: string[] = [];
  const warnings: string[] = [];

  // Clothing recommendations
  for (const rule of CLOTHING_RULES) {
    if (parseCondition(rule.condition, conditions)) {
      const items = rule.recommendation.split(', ');
      items.forEach((item) => {
        if (!clothing.includes(item)) clothing.push(item);
      });
    }
  }

  if (clothing.length === 0) {
    clothing.push(DEFAULT_CLOTHING);
  }

  // Activity recommendations
  for (const rule of ACTIVITY_RULES) {
    if (parseCondition(rule.condition, conditions)) {
      rule.activities.forEach((activity) => {
        const cleanActivity = activity.replace(/^Avoid /, '');
        if (activity.startsWith('Avoid ')) {
          warnings.push(`Avoid: ${cleanActivity}`);
        } else {
          if (!activities.includes(activity)) activities.push(activity);
        }
      });
    }
  }

  if (activities.length === 0) {
    activities.push(...DEFAULT_ACTIVITIES);
  }

  // Temperature warnings
  if (conditions.temp < THRESHOLDS.temp.veryCold) {
    warnings.push('Very cold temperatures — risk of hypothermia with prolonged exposure');
  } else if (conditions.temp > THRESHOLDS.temp.hot) {
    warnings.push('Extreme heat — stay hydrated, limit outdoor activity');
  }

  // UV warnings
  if (conditions.uv > THRESHOLDS.uv.high) {
    warnings.push('High UV index — skin damage possible in under 30 minutes');
  }

  // AQI warnings
  if (conditions.aqi && conditions.aqi > THRESHOLDS.aqi.unhealthy) {
    warnings.push('Unhealthy air quality — wear a mask outdoors, limit exposure');
  }

  // Visibility warnings
  if (conditions.visibilityKm < THRESHOLDS.visibility.poor) {
    warnings.push('Poor visibility — drive with extra caution');
  }

  // Summary
  let summary = '';
  if (warnings.length === 0) {
    summary = '🌤️ Great conditions today! Enjoy your activities.';
  } else if (warnings.length <= 2) {
    summary = '⚠️ Mostly good conditions with some precautions needed.';
  } else {
    summary = '🚨 Several weather concerns today. Check warnings before heading out.';
  }

  return {
    clothing: [...new Set(clothing)],
    activities: [...new Set(activities)],
    warnings,
    summary,
  };
}