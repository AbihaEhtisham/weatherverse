import { z } from 'zod';

export const locationSchema = z
  .string()
  .min(1, 'Please enter a location')
  .max(200, 'Location name is too long')
  .trim();

export const coordinatesSchema = z
  .string()
  .regex(
    /^-?\d{1,2}\.?\d*,\s*-?\d{1,3}\.?\d*$/,
    'Coordinates must be in format "lat,lon" (e.g., 40.7128,-74.0060)'
  );

export const zipCodeSchema = z
  .string()
  .min(3, 'ZIP/Postal code must be at least 3 characters')
  .max(10, 'ZIP/Postal code is too long')
  .trim();

export const createHistorySchema = z.object({
  city: z.string().min(1),
  country: z.string().min(1),
  region: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  temperature: z.number(),
  feelsLike: z.number(),
  humidity: z.number().min(0).max(100),
  windKph: z.number().min(0),
  windDir: z.string().optional(),
  pressureMb: z.number().optional().nullable(),
  uvIndex: z.number().min(0),
  visibilityKm: z.number().min(0),
  aqi: z.number().optional().nullable(),
  condition: z.string(),
  conditionIcon: z.string(),
  isDay: z.boolean(),
  forecastJson: z.string(),
  travelScore: z.number().min(0).max(100).optional().nullable(),
  bestDay: z.string().optional().nullable(),
});

export const updateHistorySchema = z.object({
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
  isFavorite: z.boolean().optional(),
});

export function validateLocation(input: string): { valid: boolean; error?: string; type: 'city' | 'zip' | 'coordinates' } {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, error: 'Please enter a location', type: 'city' };
  }

  if (trimmed.length > 200) {
    return { valid: false, error: 'Location name is too long', type: 'city' };
  }

  const coordRegex = /^-?\d{1,2}\.?\d*,\s*-?\d{1,3}\.?\d*$/;
  if (coordRegex.test(trimmed)) {
    const [lat, lon] = trimmed.split(',').map(Number);
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return { valid: false, error: 'Coordinates out of range', type: 'coordinates' };
    }
    return { valid: true, type: 'coordinates' };
  }

  const zipRegex = /^[A-Za-z0-9]{3,10}([-\s]?[A-Za-z0-9]{3,4})?$/;
  if (zipRegex.test(trimmed)) {
    return { valid: true, type: 'zip' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Please enter at least 2 characters', type: 'city' };
  }

  return { valid: true, type: 'city' };
}