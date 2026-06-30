import { WeatherAPIResponse, ForecastResponse, WeatherData, DayForecast } from '@/types/weather';

const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export class WeatherAPIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'WeatherAPIError';
    this.status = status;
  }
}

async function fetchFromAPI<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  if (!WEATHERAPI_KEY) {
    throw new WeatherAPIError('Weather API key is not configured', 500);
  }

  const searchParams = new URLSearchParams({ key: WEATHERAPI_KEY, ...params });
  const url = `${BASE_URL}/${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    
    if (response.status === 400) {
      const message = errorBody?.error?.message || 'Location not found. Please check your input and try again.';
      throw new WeatherAPIError(message, 404);
    }
    if (response.status === 403) {
      throw new WeatherAPIError('API service is currently unavailable. Please try again later.', 503);
    }
    throw new WeatherAPIError(`Weather service error: ${response.statusText}`, response.status);
  }

  return response.json();
}

export async function getCurrentWeather(query: string): Promise<WeatherAPIResponse> {
  return fetchFromAPI<WeatherAPIResponse>('current.json', { q: query, aqi: 'yes' });
}

export async function getForecast(query: string, days: number = 5): Promise<ForecastResponse> {
  return fetchFromAPI<ForecastResponse>('forecast.json', {
    q: query,
    days: days.toString(),
    aqi: 'no',
    alerts: 'no',
  });
}

export async function searchLocations(query: string): Promise<{ id: number; name: string; region: string; country: string; lat: number; lon: number; }[]> {
  return fetchFromAPI('search.json', { q: query });
}

export function transformWeatherData(current: WeatherAPIResponse, forecast: ForecastResponse): WeatherData {
  const forecastDays: DayForecast[] = forecast.forecast.forecastday.map((day) => ({
    date: day.date,
    dayName: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    avgTemp: day.day.avgtemp_c,
    humidity: day.day.avghumidity,
    windKph: day.day.maxwind_kph,
    rainChance: day.day.daily_chance_of_rain,
    uv: day.day.uv,
    condition: day.day.condition.text,
    conditionIcon: `https:${day.day.condition.icon}`,
  }));

  return {
    location: {
      name: current.location.name,
      region: current.location.region,
      country: current.location.country,
      lat: current.location.lat,
      lon: current.location.lon,
    },
    current: {
      temp: current.current.temp_c,
      feelsLike: current.current.feelslike_c,
      humidity: current.current.humidity,
      windKph: current.current.wind_kph,
      windDir: current.current.wind_dir,
      pressureMb: current.current.pressure_mb,
      uv: current.current.uv,
      visibilityKm: current.current.vis_km,
      isDay: current.current.is_day === 1,
      condition: current.current.condition.text,
      conditionIcon: `https:${current.current.condition.icon}`,
      aqi: current.current.air_quality?.['us-epa-index'],
    },
    forecast: forecastDays,
  };
}