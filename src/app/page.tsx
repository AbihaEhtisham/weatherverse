'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/search/SearchBar';
import WeatherCard from '@/components/weather/WeatherCard';
import ForecastGrid from '@/components/forecast/ForecastGrid';
import DecisionAssistant from '@/components/decision/DecisionAssistant';
import MapEmbed from '@/components/map/MapEmbed';
import DynamicBackground from '@/components/layout/DynamicBackground';
import ErrorAlert from '@/components/ui/ErrorAlert';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import { useWeather } from '@/hooks/useWeather';
import { WeatherData } from '@/types/weather';

export default function HomePage() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(
    (query: string) => {
      setSearched(true);
      fetchWeather(query);
    },
    [fetchWeather]
  );

  return (
    <>
      {/* Dynamic Background */}
      {weather && (
        <DynamicBackground
          condition={weather.current.condition}
          isDay={weather.current.isDay}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Weather<span className="text-pm-blue">Verse</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Real-time weather intelligence, trip planning, and smart recommendations
            for any location worldwide.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6">
            <ErrorAlert message={error} onRetry={() => searched && handleSearch} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="forecast" />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !weather && !searched && (
          <EmptyState
            type="no-weather"
            message="Enter a city, ZIP code, coordinates or postal address above to get started."
          />
        )}

        {/* Weather Display */}
        {!loading && weather && (
          <div className="space-y-6 animate-fade-in">
            <WeatherCard weather={weather} />

            <ForecastGrid
              forecast={weather.forecast}
              bestDay={
                weather.forecast.find(
                  (d) =>
                    d.date ===
                    (weather as WeatherData & { bestDay?: { date: string } }).bestDay?.date
                ) || null
              }
            />

            <DecisionAssistant weather={weather} />

            <MapEmbed
              lat={weather.location.lat}
              lon={weather.location.lon}
              locationName={`${weather.location.name}, ${weather.location.country}`}
            />
          </div>
        )}
      </div>
    </>
  );
}