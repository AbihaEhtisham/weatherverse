// API Route Request/Response Types

export interface WeatherRequest {
  query: string; // city, ZIP, GPS "lat,lon", landmark
}

export interface GeocodeSuggestion {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export interface GeocodeResponse {
  suggestions: GeocodeSuggestion[];
}

export interface ApiError {
  error: string;
  message: string;
  status: number;
}

export interface ExportRequest {
  format: 'json' | 'csv';
}

export interface CompareRequest {
  city1: string;
  city2: string;
}