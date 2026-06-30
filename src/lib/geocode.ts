import { GeocodeSuggestion } from '@/types/api';

const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;

export class GeocodeError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'GeocodeError';
    this.status = status;
  }
}

export async function resolveLocation(query: string): Promise<GeocodeSuggestion> {
  if (!WEATHERAPI_KEY) {
    throw new GeocodeError('API key not configured', 500);
  }

  const params = new URLSearchParams({
    key: WEATHERAPI_KEY,
    q: query,
  });

  const url = `https://api.weatherapi.com/v1/search.json?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new GeocodeError('Failed to resolve location', response.status);
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new GeocodeError(
      `We couldn't find "${query}". Please check the spelling or try a different location.`,
      404
    );
  }

  // Return the closest match
  const match = data[0];
  return {
    name: match.name,
    region: match.region || '',
    country: match.country,
    lat: match.lat,
    lon: match.lon,
  };
}

export async function getLocationSuggestions(query: string): Promise<GeocodeSuggestion[]> {
  if (!WEATHERAPI_KEY || query.length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      key: WEATHERAPI_KEY,
      q: query,
    });

    const url = `https://api.weatherapi.com/v1/search.json?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) return [];

    const data = await response.json();
    return (data || []).slice(0, 5).map((item: any) => ({
      name: item.name,
      region: item.region || '',
      country: item.country,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch {
    return [];
  }
}