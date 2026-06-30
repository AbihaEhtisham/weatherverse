import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const records = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const exportData = records.map((record) => ({
      id: record.id,
      city: record.city,
      country: record.country,
      region: record.region,
      coordinates: {
        lat: record.latitude,
        lon: record.longitude,
      },
      weather: {
        temperature: record.temperature,
        feelsLike: record.feelsLike,
        humidity: record.humidity,
        windKph: record.windKph,
        windDir: record.windDir,
        pressureMb: record.pressureMb,
        uvIndex: record.uvIndex,
        visibilityKm: record.visibilityKm,
        aqi: record.aqi,
        condition: record.condition,
        isDay: record.isDay,
      },
      forecast: JSON.parse(record.forecastJson),
      travelScore: record.travelScore,
      bestDay: record.bestDay,
      notes: record.notes,
      isFavorite: record.isFavorite,
      searchedAt: record.createdAt,
    }));

    return NextResponse.json(
      {
        exportDate: new Date().toISOString(),
        totalRecords: exportData.length,
        data: exportData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="weatherverse-export.json"',
        },
      }
    );
  } catch (error) {
    console.error('JSON export error:', error);
    return NextResponse.json(
      { error: 'Export failed', message: 'Failed to export data. Please try again.' },
      { status: 500 }
    );
  }
}