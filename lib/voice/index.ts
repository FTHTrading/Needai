/**
 * Voice Synthesis Hub
 * 
 * Single entry point for all TTS operations.
 * Handles provider selection, fallback, and audit logging.
 */

import { Persona } from '../routing/canonical-numbers.js';
import { TTSOptions, TTSResult, PERSONA_VOICES } from './tts.js';
import { ElevenLabsTTS } from './providers/elevenlabs.js';
import { LocalTTS } from './providers/local.js';

// Budget tracking (in-memory, replace with persistent store)
let ttsCallsThisHour = 0;
const TTS_HOURLY_LIMIT = parseInt(process.env.TTS_HOURLY_LIMIT || '100');

/**
 * Check if TTS budget allows cloud provider
 */
function withinBudget(): boolean {
  return ttsCallsThisHour < TTS_HOURLY_LIMIT;
}

/**
 * Log TTS call for audit
 */
function logTTSCall(result: TTSResult, text: string): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    provider: result.provider,
    voice: result.voice,
    fallback: result.fallback,
    textLength: text.length,
    durationMs: result.durationMs,
  };
  console.log('[TTS Audit]', JSON.stringify(logEntry));
}

/**
 * Synthesize speech with automatic provider selection and fallback
 */
export async function speak(
  text: string,
  options: { persona: Persona; urgency?: 'normal' | 'emergency' }
): Promise<TTSResult> {
  const startTime = Date.now();
  const ttsOptions: TTSOptions = {
    persona: options.persona,
    urgency: options.urgency || 'normal',
  };

  let audio: Buffer;
  let provider: string;
  let fallback = false;
  let voice: string;

  // Try ElevenLabs first if within budget
  if (withinBudget() && process.env.ELEVENLABS_API_KEY) {
    try {
      const available = await ElevenLabsTTS.available();
      if (available) {
        audio = await ElevenLabsTTS.synthesize(text, ttsOptions);
        provider = 'elevenlabs';
        voice = PERSONA_VOICES[options.persona].elevenlabs;
        ttsCallsThisHour++;
      } else {
        throw new Error('ElevenLabs not available');
      }
    } catch (error) {
      console.warn('[TTS] ElevenLabs failed, falling back to local:', error);
      audio = await LocalTTS.synthesize(text, ttsOptions);
      provider = 'local';
      voice = PERSONA_VOICES[options.persona].local;
      fallback = true;
    }
  } else {
    // Use local directly
    audio = await LocalTTS.synthesize(text, ttsOptions);
    provider = 'local';
    voice = PERSONA_VOICES[options.persona].local;
  }

  const result: TTSResult = {
    audio,
    provider,
    voice,
    durationMs: Date.now() - startTime,
    fallback,
  };

  logTTSCall(result, text);
  return result;
}

/**
 * Test TTS for a persona
 */
export async function testVoice(persona: Persona): Promise<TTSResult> {
  const testText = getTestPhrase(persona);
  return speak(testText, { persona, urgency: 'normal' });
}

function getTestPhrase(persona: Persona): string {
  const phrases: Record<Persona, string> = {
    STORM: "This is the Storm response line. We're here to help you with property damage from severe weather.",
    HAIL: "Thank you for calling. I'm here to assist with your hail damage assessment.",
    HVAC: "Hi there! Let me help you with your heating and cooling needs today.",
    CLAIMS: "Welcome to claims support. I'll guide you through the insurance process.",
    LAW: "Thank you for reaching out. Let me connect you with legal assistance.",
    MONEY: "Hello, I'm here to help you explore your financial options.",
    NEED: "Thank you for calling. How can I assist you today?",
  };
  return phrases[persona];
}

/**
 * Reset hourly counter (call from cron)
 */
export function resetTTSBudget(): void {
  ttsCallsThisHour = 0;
}

/**
 * Get current TTS usage stats
 */
export function getTTSStats(): { used: number; limit: number; remaining: number } {
  return {
    used: ttsCallsThisHour,
    limit: TTS_HOURLY_LIMIT,
    remaining: Math.max(0, TTS_HOURLY_LIMIT - ttsCallsThisHour),
  };
}
