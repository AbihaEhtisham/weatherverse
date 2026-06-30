import { NextRequest, NextResponse } from 'next/server';
import { resolveLocation, getLocationSuggestions, GeocodeError } from '@/lib/geocode';
import { validateLocation } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Location query is required' },
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

    // Resolve location to coordinates
    const location = await resolveLocation(query.trim());

    return NextResponse.json({ location });
  } catch (error) {
    if (error instanceof GeocodeError) {
      return NextResponse.json(
        { error: 'Geocoding failed', message: error.message },
        { status: error.status }
      );
    }

    console.error('Geocode error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to resolve location. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = await getLocationSuggestions(query);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json({ suggestions: [] });
  }
}