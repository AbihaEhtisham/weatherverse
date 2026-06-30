import { HistoryRecord } from '@/types/history';

export function recordsToJSON(records: HistoryRecord[]): string {
  const exportData = records.map((record) => ({
    id: record.id,
    city: record.city,
    country: record.country,
    coordinates: { lat: record.latitude, lon: record.longitude },
    weather: {
      temperature: record.temperature,
      feelsLike: record.feelsLike,
      humidity: record.humidity,
      windKph: record.windKph,
      condition: record.condition,
    },
    searchedAt: record.createdAt,
  }));

  return JSON.stringify({ exportDate: new Date().toISOString(), data: exportData }, null, 2);
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}