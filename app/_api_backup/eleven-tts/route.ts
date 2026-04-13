import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateElevenAudioFile } from '@/lib/eleven/tts';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text') || '';
    const voice = searchParams.get('voice') || 'alloy';

    if (!text) {
      return NextResponse.json({ error: 'Missing text query parameter' }, { status: 400 });
    }

    // Create or fetch cached file
    const result = await getOrCreateElevenAudioFile(text, voice);

    // Serve the cached file bytes directly for reliability (Telnyx will fetch this URL)
    const fileBuffer = await fs.readFile(result.path);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  } catch (error: any) {
    console.error('Eleven TTS error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'TTS error' }, { status: 500 });
  }
}
