export function formatTemp(celsius: number): string {
  return `${Math.round(celsius)}°C`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDayName(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatWind(speedKph: number): string {
  return `${Math.round(speedKph)} km/h`;
}

export function formatVisibility(km: number): string {
  if (km >= 10) return 'Excellent';
  if (km >= 5) return 'Good';
  if (km >= 2) return 'Fair';
  return 'Poor';
}

export function formatUV(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: 'Low', color: 'text-green-500' };
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-500' };
  if (uv <= 7) return { label: 'High', color: 'text-orange-500' };
  if (uv <= 10) return { label: 'Very High', color: 'text-red-500' };
  return { label: 'Extreme', color: 'text-purple-600' };
}

export function formatAQI(aqi: number): { label: string; color: string; bg: string } {
  if (aqi <= 50) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-orange-600', bg: 'bg-orange-100' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-100' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-600', bg: 'bg-purple-100' };
  return { label: 'Hazardous', color: 'text-rose-800', bg: 'bg-rose-200' };
}

export function getWeatherTheme(condition: string, isDay: boolean): string {
  const lower = condition.toLowerCase();
  if (!isDay) return 'gradient-night';
  if (lower.includes('sunny') || lower.includes('clear')) return 'gradient-sunny';
  if (lower.includes('rain') || lower.includes('drizzle')) return 'gradient-rainy';
  if (lower.includes('cloud') || lower.includes('overcast') || lower.includes('mist') || lower.includes('fog')) return 'gradient-cloudy';
  if (lower.includes('snow') || lower.includes('sleet')) return 'gradient-snowy';
  if (lower.includes('thunder') || lower.includes('storm')) return 'gradient-stormy';
  return 'gradient-sunny';
}