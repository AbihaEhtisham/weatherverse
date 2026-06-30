export interface HistoryRecord {
  id: string;
  city: string;
  country: string;
  region: string | null;
  latitude: number;
  longitude: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windKph: number;
  windDir: string | null;
  pressureMb: number | null;
  uvIndex: number;
  visibilityKm: number;
  aqi: number | null;
  condition: string;
  conditionIcon: string;
  isDay: boolean;
  forecastJson: string;
  travelScore: number | null;
  bestDay: string | null;
  notes: string | null;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHistoryInput {
  city: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windKph: number;
  windDir?: string;
  pressureMb?: number;
  uvIndex: number;
  visibilityKm: number;
  aqi?: number;
  condition: string;
  conditionIcon: string;
  isDay: boolean;
  forecastJson: string;
  travelScore?: number;
  bestDay?: string;
}

export interface UpdateHistoryInput {
  notes?: string;
  isFavorite?: boolean;
}