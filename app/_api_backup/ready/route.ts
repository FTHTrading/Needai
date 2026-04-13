import { NextResponse } from 'next/server';

const REQUIRED_ENV_VARS = ['OPENWEATHER_API_KEY', 'TELNYX_API_KEY', 'TELNYX_PUBLIC_KEY'] as const;

export async function GET() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        status: 'not_ready',
        missing
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    status: 'ready',
    configured: REQUIRED_ENV_VARS.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  });
}

