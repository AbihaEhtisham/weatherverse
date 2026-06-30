// WeatherAPI.com Current Weather Response
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  uv: number;
  vis_km: number;
  is_day: 0 | 1;
  condition: WeatherCondition;
  air_quality?: {
    'us-epa-index': number;
    pm2_5: number;
    pm10: number;
  };
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherAPIResponse {
  location: Location;
  current: CurrentWeather;
}

// WeatherAPI.com Forecast Response
export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    uv: number;
    condition: WeatherCondition;
  };
}

export interface ForecastResponse {
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
}

// OpenWeatherMap Types (for 5-day forecast fallback)
export interface OWMListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
  };
  visibility: number;
  dt_txt: string;
}

export interface OWMForecastResponse {
  list: OWMListItem[];
  city: {
    name: string;
    country: string;
  };
}

// Combined/Aggregated Types for our app
export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windKph: number;
    windDir: string;
    pressureMb: number;
    uv: number;
    visibilityKm: number;
    isDay: boolean;
    condition: string;
    conditionIcon: string;
    aqi?: number;
  };
  forecast: DayForecast[];
}

export interface DayForecast {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
  humidity: number;
  windKph: number;
  rainChance: number;
  uv: number;
  condition: string;
  conditionIcon: string;
  travelScore?: TravelScore;
}

export interface TravelScore {
  total: number;
  breakdown: {
    temperature: number;
    rain: number;
    wind: number;
    humidity: number;
    visibility: number;
  };
  verdict: string;
}