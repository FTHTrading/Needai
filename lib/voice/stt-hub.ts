/**
 * Speech-to-Text Hub
 * 
 * Unified STT interface with automatic provider selection and fallback.
 * 
 * Provider priority:
 * 1. Deepgram (fast, accurate, streaming)
 * 2. OpenAI Whisper (accurate, no streaming)
 * 3. Local Whisper (offline fallback)
 * 
 * Usage:
 *   const result = await transcribe(audioBuffer, { persona: 'STORM' });
 *   console.log(result.text);
 */

import { STTProvider, STTOptions, STTResult, PERSONA_HINTS } from './stt.js';
import { DeepgramSTT } from './providers/deepgram.js';
import { WhisperSTT } from './providers/whisper.js';
import { Persona } from '../routing/canonical-numbers.js';

// Provider registry (priority order)
const PROVIDERS: STTProvider[] = [
  DeepgramSTT,
  WhisperSTT,
];

// Usage tracking
let sttCallCount = 0;
let lastResetHour = new Date().getHours();

function resetHourlyCounterIfNeeded(): void {
  const currentHour = new Date().getHours();
  if (currentHour !== lastResetHour) {
    sttCallCount = 0;
    lastResetHour = currentHour;
  }
}

/**
 * Transcribe audio using the best available provider
 */
export async function transcribe(
  audio: Buffer,
  options: Partial<STTOptions> = {}
): Promise<STTResult> {
  resetHourlyCounterIfNeeded();

  // Build full options with persona hints
  const fullOptions: STTOptions = {
    language: options.language || 'en-US',
    maxDuration: options.maxDuration || 60,
    interimResults: options.interimResults || false,
    hints: [
      ...(options.hints || []),
      ...(options.persona ? PERSONA_HINTS[options.persona] : []),
    ],
    ...options,
  };

  // Try providers in priority order
  for (const provider of PROVIDERS) {
    try {
      const isAvailable = await provider.available();
      if (!isAvailable) continue;

      const result = await provider.transcribe(audio, fullOptions);
      sttCallCount++;

      // Log for audit trail
      console.log('[STT Audit]', JSON.stringify({
        timestamp: new Date().toISOString(),
        provider: result.provider,
        textLength: result.text.length,
        confidence: result.confidence,
        durationMs: result.durationMs,
      }));

      return result;
    } catch (error) {
      console.error(`[STT] Provider ${provider.name} failed:`, error);
      // Try next provider
    }
  }

  // All providers failed
  throw new Error('All STT providers failed');
}

/**
 * Stream transcribe audio (returns async iterator of partial results)
 */
export async function* streamTranscribe(
  audioStream: AsyncIterable<Buffer>,
  options: Partial<STTOptions> = {}
): AsyncIterable<STTResult> {
  // Only Deepgram supports streaming currently
  const deepgramAvailable = await DeepgramSTT.available();
  
  if (deepgramAvailable && DeepgramSTT.streamTranscribe) {
    const fullOptions: STTOptions = {
      language: options.language || 'en-US',
      interimResults: true,
      hints: [
        ...(options.hints || []),
        ...(options.persona ? PERSONA_HINTS[options.persona] : []),
      ],
      ...options,
    };

    yield* DeepgramSTT.streamTranscribe(audioStream, fullOptions);
    return;
  }

  // Fallback: buffer entire stream and transcribe at end
  const chunks: Buffer[] = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }

  const audio = Buffer.concat(chunks);
  if (audio.length > 0) {
    yield await transcribe(audio, options);
  }
}

/**
 * Get STT usage statistics
 */
export function getSTTStats(): {
  callsThisHour: number;
  deepgramAvailable: boolean;
  whisperAvailable: boolean;
} {
  resetHourlyCounterIfNeeded();
  
  return {
    callsThisHour: sttCallCount,
    deepgramAvailable: !!process.env.DEEPGRAM_API_KEY,
    whisperAvailable: !!process.env.OPENAI_API_KEY || process.env.USE_LOCAL_WHISPER === 'true',
  };
}

/**
 * Test STT with a sample audio file
 */
export async function testSTT(
  persona: Persona = 'NEED'
): Promise<{
  provider: string;
  text: string;
  confidence: number;
  durationMs: number;
}> {
  // Generate test audio using TTS, then transcribe it
  const { speak } = await import('./index.js');
  
  const testText = `Hello, this is a test of the ${persona.toLowerCase()} intake system.`;
  const ttsResult = await speak(testText, { persona, urgency: 'normal' });
  
  if (ttsResult.audio.length === 0) {
    throw new Error('TTS failed to generate audio for STT test');
  }

  const sttResult = await transcribe(ttsResult.audio, { persona });
  
  return {
    provider: sttResult.provider,
    text: sttResult.text,
    confidence: sttResult.confidence,
    durationMs: sttResult.durationMs,
  };
}
