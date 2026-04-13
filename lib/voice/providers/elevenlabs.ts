/**
 * ElevenLabs TTS Provider
 * 
 * Premium voice synthesis with persona-specific voices.
 * Falls back gracefully if unavailable.
 */

import { TTSProvider, TTSOptions, PERSONA_VOICES } from '../tts.js';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const API_BASE = 'https://api.elevenlabs.io/v1';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_turbo_v2';

// Voice IDs (need to be fetched from ElevenLabs account)
const VOICE_IDS: Record<string, string> = {
  'Rachel': '21m00Tcm4TlvDq8ikWAM',
  'Adam': 'pNInz6obpgDQGcFmaJgB',
  'Josh': 'TxGEqnHWrfWFTfGW9XjX',
  'Antoni': 'ErXwobaYiN019PkySvjV',
  'Bella': 'EXAVITQu4vr4xnSDxMaL',
  'Elli': 'MF3mGyEYCl7XYWbV9V6O',
};

export const ElevenLabsTTS: TTSProvider = {
  name: 'elevenlabs',

  async available(): Promise<boolean> {
    if (!API_KEY) return false;
    
    try {
      const res = await fetch(`${API_BASE}/user`, {
        headers: { 'xi-api-key': API_KEY }
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async synthesize(text: string, options: TTSOptions): Promise<Buffer> {
    if (!API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not set');
    }

    const voiceName = options.voice || PERSONA_VOICES[options.persona].elevenlabs;
    const voiceId = VOICE_IDS[voiceName] || VOICE_IDS['Rachel'];

    const stability = options.urgency === 'emergency' ? 0.35 : 0.55;
    const similarityBoost = 0.75;

    const res = await fetch(`${API_BASE}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: {
          stability,
          similarity_boost: similarityBoost,
        },
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`ElevenLabs TTS failed: ${res.status} - ${error}`);
    }

    return Buffer.from(await res.arrayBuffer());
  },
};
