import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather, getForecast, transformWeatherData, WeatherAPIError } from '@/lib/weather-api';
import { calculateDayScore, findBestDay } from '@/lib/scoring';
import { validateLocation } from '@/lib/validators';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || !query.trim()) {
      return NextResponse.json(
        { error: 'Missing query', message: 'Please provide a location (city, ZIP, landmark, or coordinates)' },
        { status: 400 }
      );
    }

    // Validate input format
    const validation = validateLocation(query);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid location', message: validation.error },
        { status: 400 }
      );
    }

    // Pass the query directly to WeatherAPI — it handles cities, ZIP codes, landmarks, coordinates
    const [current, forecast] = await Promise.all([
      getCurrentWeather(query.trim()),
      getForecast(query.trim(), 5),
    ]);

    // Transform to our app's format
    const weatherData = transformWeatherData(current, forecast);

    // Calculate travel scores
    const scoredForecast = weatherData.forecast.map((day) => ({
      ...day,
      travelScore: calculateDayScore(day),
    }));

    // Find best day
    const bestDay = findBestDay(scoredForecast);

    return NextResponse.json({
      ...weatherData,
      forecast: scoredForecast,
      bestDay: bestDay
        ? {
            date: bestDay.date,
            dayName: bestDay.dayName,
            score: bestDay.travelScore,
          }
        : null,
    });
  } catch (error) {
    if (error instanceof WeatherAPIError) {
      return NextResponse.json(
        { error: 'Weather API error', message: error.message },
        { status: error.status }
      );
    }

    console.error('Weather fetch error:', error);
    return NextResponse.json(
      { error: 'Service unavailable', message: 'Unable to fetch weather data. Please try again later.' },
      { status: 500 }
    );
  }
}