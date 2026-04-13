import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Health Check Endpoint
 * 
 * Lightweight liveness probe - returns 200 if server is running
 * Used by monitoring systems, load balancers, and GitHub Actions
 */

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'vanity-ai',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }, { status: 200 });
}
