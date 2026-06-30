import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function escapeCSV(value: string | number | boolean | null): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  try {
    const records = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // CSV Header
    const headers = [
      'ID',
      'City',
      'Country',
      'Region',
      'Latitude',
      'Longitude',
      'Temperature (°C)',
      'Feels Like (°C)',
      'Humidity (%)',
      'Wind (km/h)',
      'Wind Direction',
      'Pressure (mb)',
      'UV Index',
      'Visibility (km)',
      'AQI',
      'Condition',
      'Travel Score',
      'Best Day',
      'Notes',
      'Favorite',
      'Searched At',
    ];

    // CSV Rows
    const rows = records.map((record) => [
      record.id,
      record.city,
      record.country,
      record.region || '',
      record.latitude,
      record.longitude,
      record.temperature,
      record.feelsLike,
      record.humidity,
      record.windKph,
      record.windDir || '',
      record.pressureMb || '',
      record.uvIndex,
      record.visibilityKm,
      record.aqi || '',
      record.condition,
      record.travelScore || '',
      record.bestDay || '',
      record.notes || '',
      record.isFavorite ? 'Yes' : 'No',
      record.createdAt.toISOString(),
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(',')),
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="weatherverse-export.csv"',
      },
    });
  } catch (error) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { error: 'Export failed', message: 'Failed to export data. Please try again.' },
      { status: 500 }
    );
  }
}