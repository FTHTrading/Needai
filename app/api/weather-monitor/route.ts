import { NextRequest, NextResponse } from 'next/server';
import { checkWeatherConditions, getMonitoringStatus } from '@/lib/weather-monitor/service';

export const dynamic = 'force-dynamic';

/**
 * Weather Monitor API
 * 
 * Triggers manual weather monitoring cycles and retrieves current monitoring status
 */

export async function POST(request: NextRequest) {
  try {
    const { regions } = await request.json().catch(() => ({ regions: undefined }));

    console.log('[Weather Monitor] Triggering monitoring cycle...');

    const results = await checkWeatherConditions(regions);

    return NextResponse.json({
      success: true,
      regionsChecked: results.regionsChecked,
      alertsFound: results.alertsFound,
      activations: results.activations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Weather Monitor] Error:', error);
    return NextResponse.json(
      { error: 'Monitoring cycle failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const status = getMonitoringStatus();

    return NextResponse.json({
      status: 'operational',
      lastCheck: status.lastCheck,
      nextCheck: status.nextCheck,
      activeMonitors: status.activeMonitors,
      weatherApiStatus: status.weatherApiStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Weather Monitor] Error fetching status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monitoring status' },
      { status: 500 }
    );
  }
}
