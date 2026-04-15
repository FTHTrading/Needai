import { NextResponse } from 'next/server';
import { getFailures } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ failures: getFailures() });
}
