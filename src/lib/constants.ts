// API Base URLs
export const WEATHERAPI_BASE = 'https://api.weatherapi.com/v1';
export const OPENWEATHERMAP_BASE = 'https://api.openweathermap.org/data/2.5';
export const GOOGLE_MAPS_EMBED_BASE = 'https://www.google.com/maps/embed/v1/place';

// Trip Planner Scoring Weights
export const SCORE_WEIGHTS = {
  temperature: 30,
  rain: 25,
  wind: 20,
  humidity: 10,
  visibility: 15,
};

// Ideal Weather Conditions
export const IDEAL_TEMP = 22; // Celsius
export const IDEAL_HUMIDITY = 50; // Percentage
export const IDEAL_WIND = 10; // km/h
export const IDEAL_VISIBILITY = 10; // km

// Decision Engine Thresholds
export const THRESHOLDS = {
  temp: {
    veryCold: 5,
    cold: 12,
    pleasant: 25,
    hot: 35,
  },
  rain: {
    likely: 50,
    certain: 80,
  },
  wind: {
    breezy: 20,
    windy: 30,
    strong: 50,
  },
  uv: {
    low: 3,
    moderate: 6,
    high: 8,
    veryHigh: 11,
  },
  visibility: {
    poor: 2,
    fair: 5,
    good: 10,
  },
  aqi: {
    good: 50,
    moderate: 100,
    unhealthy: 150,
    hazardous: 300,
  },
};

// Weather Condition Codes to Background Themes
export const WEATHER_THEMES: Record<string, string> = {
  sunny: 'gradient-sunny',
  clear: 'gradient-sunny',
  cloudy: 'gradient-cloudy',
  overcast: 'gradient-cloudy',
  rain: 'gradient-rainy',
  drizzle: 'gradient-rainy',
  snow: 'gradient-snowy',
  sleet: 'gradient-snowy',
  thunder: 'gradient-stormy',
  storm: 'gradient-stormy',
  night: 'gradient-night',
  mist: 'gradient-cloudy',
  fog: 'gradient-cloudy',
};

// Clothing Recommendations
export const CLOTHING_RULES = [
  { condition: 'temp < 5', recommendation: 'Heavy jacket, gloves, scarf, boots' },
  { condition: 'temp >= 5 && temp < 12', recommendation: 'Warm coat, sweater, long pants' },
  { condition: 'temp >= 12 && temp < 18', recommendation: 'Light jacket, hoodie, jeans' },
  { condition: 'temp >= 18 && temp < 25', recommendation: 'T-shirt, light pants or shorts' },
  { condition: 'temp >= 25 && temp < 35', recommendation: 'Light clothing, shorts, sandals' },
  { condition: 'temp >= 35', recommendation: 'Minimal clothing, hat, stay hydrated' },
  { condition: 'rainChance > 50', recommendation: 'Umbrella, waterproof jacket, boots' },
  { condition: 'uv > 6', recommendation: 'Sunscreen, sunglasses, wide-brim hat' },
  { condition: 'windKph > 30', recommendation: 'Windbreaker, avoid loose items' },
];

// Activity Recommendations
export const ACTIVITY_RULES = [
  { condition: 'temp >= 15 && temp <= 30 && rainChance < 30', activities: ['Walking', 'Running', 'Cycling', 'Hiking'] },
  { condition: 'temp >= 20 && temp <= 35 && rainChance < 20', activities: ['Swimming', 'Beach day', 'Picnic', 'Outdoor sports'] },
  { condition: 'rainChance > 50', activities: ['Museum visit', 'Shopping', 'Indoor dining', 'Cinema'] },
  { condition: 'visibility > 8 && rainChance < 40', activities: ['Photography', 'Sightseeing', 'Scenic drive'] },
  { condition: 'windKph > 30', activities: ['Kite flying', 'Avoid cycling', 'Avoid hiking'] },
  { condition: 'aqi > 100', activities: ['Indoor activities only', 'Wear mask outdoors'] },
  { condition: 'temp < 5', activities: ['Skiing', 'Ice skating', 'Indoor activities'] },
];

// Default fallback
export const DEFAULT_ACTIVITIES = ['Sightseeing', 'Walking', 'Shopping', 'Dining'];
export const DEFAULT_CLOTHING = 'Dress for comfort, check weather updates';