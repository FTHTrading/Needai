/**
 * Deepgram STT Provider
 * 
 * High-quality speech-to-text with streaming support.
 * Used as primary STT engine when API key is configured.
 */

import { STTProvider, STTOptions, STTResult, TELNYX_AUDIO_CONFIG } from '../stt.js';

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const DEEPGRAM_API_BASE = 'https://api.deepgram.com/v1';

export const DeepgramSTT: STTProvider = {
  name: 'deepgram',

  async available(): Promise<boolean> {
    return !!DEEPGRAM_API_KEY;
  },

  async transcribe(audio: Buffer, options: STTOptions): Promise<STTResult> {
    if (!DEEPGRAM_API_KEY) {
      throw new Error('DEEPGRAM_API_KEY not configured');
    }

    const startTime = Date.now();

    try {
      // Build query parameters
      const params = new URLSearchParams({
        model: 'nova-2',
        language: options.language || 'en-US',
        punctuate: 'true',
        smart_format: 'true',
        utterances: 'true',
      });

      // Add vocabulary hints if provided
      if (options.hints && options.hints.length > 0) {
        params.set('keywords', options.hints.slice(0, 100).join(','));
      }

      const response = await fetch(`${DEEPGRAM_API_BASE}/listen?${params}`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/wav',
        },
        body: audio as BodyInit,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Deepgram API error: ${response.status} - ${error}`);
      }

      const result = await response.json();
      const durationMs = Date.now() - startTime;

      // Extract transcript from response
      const channel = result.results?.channels?.[0];
      const alternative = channel?.alternatives?.[0];

      if (!alternative) {
        return {
          text: '',
          confidence: 0,
          provider: 'deepgram',
          durationMs,
          isFinal: true,
        };
      }

      // Extract word-level timestamps if available
      const words = alternative.words?.map((w: any) => ({
        word: w.word,
        start: w.start,
        end: w.end,
        confidence: w.confidence,
      }));

      return {
        text: alternative.transcript || '',
        confidence: alternative.confidence || 0,
        provider: 'deepgram',
        durationMs,
        isFinal: true,
        words,
      };
    } catch (error) {
      console.error('[DeepgramSTT] Transcription failed:', error);
      throw error;
    }
  },

  async *streamTranscribe(
    audioStream: AsyncIterable<Buffer>,
    options: STTOptions
  ): AsyncIterable<STTResult> {
    if (!DEEPGRAM_API_KEY) {
      throw new Error('DEEPGRAM_API_KEY not configured');
    }

    // For streaming, we'd use WebSocket connection to Deepgram
    // This is a simplified implementation that buffers and transcribes
    
    const chunks: Buffer[] = [];
    const startTime = Date.now();

    for await (const chunk of audioStream) {
      chunks.push(chunk);

      // Yield interim results every 500ms of audio (4000 bytes at 8kHz mono)
      if (Buffer.concat(chunks).length >= 4000) {
        const audio = Buffer.concat(chunks);
        
        try {
          const result = await this.transcribe(audio, {
            ...options,
            interimResults: true,
          });

          yield {
            ...result,
            isFinal: false,
            durationMs: Date.now() - startTime,
          };
        } catch {
          // Continue accumulating on interim failures
        }
      }
    }

    // Final transcription of complete audio
    const finalAudio = Buffer.concat(chunks);
    if (finalAudio.length > 0) {
      const result = await this.transcribe(finalAudio, options);
      yield {
        ...result,
        isFinal: true,
        durationMs: Date.now() - startTime,
      };
    }
  },
};
