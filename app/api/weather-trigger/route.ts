import { NextRequest, NextResponse } from 'next/server';
import { processWeatherSignal, getEngineState, type WeatherSignal } from '@/lib/weather-trigger/engine';

export const dynamic = 'force-dynamic';

/**
 * Weather Trigger API
 * 
 * Processes weather signals and manages automatic phone number activation
 * based on real-time weather events (storms, hail, etc.)
 */

export async function POST(request: NextRequest) {
  try {
    const signal: WeatherSignal = await request.json();

    // Validate required fields (note: WeatherSignal uses event_type, not eventType)
    if (!signal.region || !signal.event_type) {
      return NextResponse.json(
        { error: 'Missing required fields: region, event_type' },
        { status: 400 }
      );
    }

    console.log(`[Weather Trigger] Processing signal: ${signal.event_type} in ${signal.region}`);

    // Process the weather signal
    const result = await processWeatherSignal(signal);

    return NextResponse.json({
      success: true,
      activations: result.activations,
      deactivations: result.deactivations,
      message: result.message,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Weather Trigger] Error processing signal:', error);
    return NextResponse.json(
      { error: 'Failed to process weather signal' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const state = getEngineState();

    return NextResponse.json({
      status: 'operational',
      activeNumbers: state.activeNumbers || [],
      activeRules: state.activeRules || [],
      lastUpdate: new Date().toISOString(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Weather Trigger] Error fetching state:', error);
    return NextResponse.json(
      { error: 'Failed to fetch engine state' },
      { status: 500 }
    );
  }
}
