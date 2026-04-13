import { NextRequest, NextResponse } from 'next/server';
import { WeatherProvider } from '../../../lib/weather/provider';

const weatherProvider = new WeatherProvider();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    // Get current weather for the location
    const weatherContext = await weatherProvider.getCurrentWeather(location);

    return NextResponse.json({
      success: true,
      data: weatherContext,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, includeForecast = false } = body;

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required in request body' },
        { status: 400 }
      );
    }

    // Get current weather
    const weatherContext = await weatherProvider.getCurrentWeather(location);

    let forecast = null;
    if (includeForecast) {
      forecast = await weatherProvider.getWeatherForecast(location, 7); // 7-day forecast
    }

    return NextResponse.json({
      success: true,
      data: {
        current: weatherContext,
        forecast: forecast
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Weather API POST error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}