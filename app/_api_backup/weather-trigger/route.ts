import { NextRequest, NextResponse } from 'next/server';
import { weatherTriggerEngine } from '@/lib/weather-trigger/engine';
import { WeatherSignal } from '@/lib/weather-trigger/types';

export async function POST(request: NextRequest) {
  try {
    const signal: WeatherSignal = await request.json();

    // Validate signal
    if (!signal.event_type || !signal.severity || !signal.region?.state) {
      return NextResponse.json(
        { error: 'Invalid weather signal format' },
        { status: 400 }
      );
    }

    // Process the signal
    const result = weatherTriggerEngine.processSignal(signal);

    return NextResponse.json({
      success: true,
      activated: result.activated,
      deactivated: result.deactivated,
      auditEntries: result.auditEntries
    });

  } catch (error) {
    console.error('Weather trigger API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const state = weatherTriggerEngine.getState();

    return NextResponse.json({
      activeNumbers: state.activeNumbers,
      activeRules: state.activeRules,
      lastSignal: state.lastSignal,
      auditLog: state.auditLog.slice(-10) // Last 10 entries
    });

  } catch (error) {
    console.error('Weather trigger GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}