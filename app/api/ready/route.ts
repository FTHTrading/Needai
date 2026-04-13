import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Readiness Check Endpoint
 * 
 * Returns 200 if service is ready to accept traffic
 * Returns 503 if critical dependencies are missing
 */

export async function GET() {
  const requiredEnvVars = [
    'TELNYX_API_KEY',
    'OPENWEATHER_API_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    return NextResponse.json({
      status: 'not_ready',
      error: 'Missing required environment variables',
      missing: missingVars,
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }

  return NextResponse.json({
    status: 'ready',
    service: 'vanity-ai',
    checks: {
      envVars: 'ok',
      telnyx: process.env.TELNYX_API_KEY ? 'configured' : 'missing',
      weather: process.env.OPENWEATHER_API_KEY ? 'configured' : 'missing'
    },
    timestamp: new Date().toISOString()
  }, { status: 200 });
}
