'use client';

import { useState, useCallback } from 'react';
import { WeatherData } from '@/types/weather';

interface UseWeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather() {
  const [state, setState] = useState<UseWeatherState>({
    weather: null,
    loading: false,
    error: null,
  });

  const fetchWeather = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setState({ weather: null, loading: true, error: null });

    try {
      const response = await fetch(`/api/weather?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch weather data');
      }

      const data: WeatherData = await response.json();
      setState({ weather: data, loading: false, error: null });

      // Auto-save to history
      saveToHistory(data);
    } catch (error) {
      setState({
        weather: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }, []);

  const clearWeather = useCallback(() => {
    setState({ weather: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    fetchWeather,
    clearWeather,
  };
}

async function saveToHistory(weather: WeatherData) {
  try {
    // Strip forecast to essential fields only to reduce size
    const slimForecast = weather.forecast.map((day) => ({
      date: day.date,
      dayName: day.dayName,
      maxTemp: day.maxTemp,
      minTemp: day.minTemp,
      avgTemp: day.avgTemp,
      condition: day.condition,
      rainChance: day.rainChance,
      travelScore: day.travelScore,
    }));

    const bestDayData = weather.forecast.find(
      (d) => d.travelScore?.total === Math.max(...weather.forecast.map((f) => f.travelScore?.total || 0))
    );

    const body = {
      city: weather.location.name,
      country: weather.location.country,
      region: weather.location.region || '',
      latitude: weather.location.lat,
      longitude: weather.location.lon,
      temperature: weather.current.temp,
      feelsLike: weather.current.feelsLike,
      humidity: weather.current.humidity,
      windKph: weather.current.windKph,
      windDir: weather.current.windDir || '',
      pressureMb: weather.current.pressureMb,
      uvIndex: weather.current.uv,
      visibilityKm: weather.current.visibilityKm,
      aqi: weather.current.aqi || null,
      condition: weather.current.condition,
      conditionIcon: weather.current.conditionIcon,
      isDay: weather.current.isDay,
      forecastJson: JSON.stringify(slimForecast),
      travelScore: weather.forecast[0]?.travelScore?.total || null,
      bestDay: bestDayData?.dayName || null,
    };

    const response = await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('History save failed:', errorData);
    } else {
      console.log('History saved successfully');
    }
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}