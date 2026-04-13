import { NextResponse } from 'next/server';

const startedAtMs = Date.now();

export async function GET() {
  return NextResponse.json({
    ok: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeMs: Date.now() - startedAtMs,
    node: process.version,
    env: process.env.NODE_ENV ?? 'unknown'
  });
}

