import { NextRequest, NextResponse } from 'next/server';
import { weatherMonitor, MONITORING_LOCATIONS } from '@/lib/weather-monitor/monitor';
import { weatherTriggerEngine } from '@/lib/weather-trigger/engine';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'monitor') {
      // Monitor all locations and process signals
      console.log('🌦️ Starting weather monitoring cycle...');

      const signals = await weatherMonitor.monitorLocations(MONITORING_LOCATIONS);
      console.log(`📡 Found ${signals.length} significant weather signals`);

      const results = [];

      for (const signal of signals) {
        console.log(`Processing: ${signal.event_type} in ${signal.region.state} (${signal.severity}% severity)`);

        const result = weatherTriggerEngine.processSignal(signal);
        results.push({
          signal,
          activated: result.activated,
          auditEntries: result.auditEntries
        });
      }

      return NextResponse.json({
        success: true,
        monitoredLocations: MONITORING_LOCATIONS.length,
        signalsFound: signals.length,
        activations: results
      });

    } else if (action === 'check') {
      // Check a specific location
      const { lat, lon, city } = await request.json();

      if (!lat || !lon) {
        return NextResponse.json(
          { error: 'lat and lon required for check action' },
          { status: 400 }
        );
      }

      const signal = await weatherMonitor.getCurrentWeather(lat, lon, city);

      if (!signal) {
        return NextResponse.json({
          success: true,
          signal: null,
          message: 'No significant weather found'
        });
      }

      const result = weatherTriggerEngine.processSignal(signal);

      return NextResponse.json({
        success: true,
        signal,
        activated: result.activated,
        auditEntries: result.auditEntries
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "monitor" or "check"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Weather monitor API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get current monitoring status
    const engineState = weatherTriggerEngine.getState();

    return NextResponse.json({
      monitoringLocations: MONITORING_LOCATIONS.length,
      activeRules: engineState.activeRules.length,
      activeNumbers: engineState.activeNumbers.filter(n => n.state === 'active').length,
      lastSignal: engineState.lastSignal,
      apiKeyConfigured: !!process.env.OPENWEATHER_API_KEY
    });

  } catch (error) {
    console.error('Weather monitor GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}