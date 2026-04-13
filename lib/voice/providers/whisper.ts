/**
 * Whisper STT Provider (Local Fallback)
 * 
 * Uses OpenAI Whisper API or local whisper.cpp for transcription.
 * Falls back when Deepgram is unavailable.
 */

import { STTProvider, STTOptions, STTResult } from '../stt.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const USE_LOCAL_WHISPER = process.env.USE_LOCAL_WHISPER === 'true';

export const WhisperSTT: STTProvider = {
  name: 'whisper',

  async available(): Promise<boolean> {
    // Available if OpenAI key exists OR local whisper is configured
    if (OPENAI_API_KEY) return true;
    
    if (USE_LOCAL_WHISPER) {
      try {
        await execAsync('whisper --help');
        return true;
      } catch {
        return false;
      }
    }
    
    return false;
  },

  async transcribe(audio: Buffer, options: STTOptions): Promise<STTResult> {
    const startTime = Date.now();

    // Try OpenAI Whisper API first
    if (OPENAI_API_KEY) {
      return await transcribeWithOpenAI(audio, options, startTime);
    }

    // Fall back to local whisper.cpp
    if (USE_LOCAL_WHISPER) {
      return await transcribeWithLocal(audio, options, startTime);
    }

    throw new Error('No Whisper backend available');
  },
};

async function transcribeWithOpenAI(
  audio: Buffer,
  options: STTOptions,
  startTime: number
): Promise<STTResult> {
  // Save audio to temp file (OpenAI requires file upload)
  const tempFile = path.join(os.tmpdir(), `stt_${Date.now()}.wav`);
  fs.writeFileSync(tempFile, audio);

  try {
    const formData = new FormData();
    formData.append('file', new Blob([audio as BlobPart]), 'audio.wav');
    formData.append('model', 'whisper-1');
    formData.append('language', options.language?.split('-')[0] || 'en');
    formData.append('response_format', 'verbose_json');

    if (options.hints && options.hints.length > 0) {
      formData.append('prompt', options.hints.join(', '));
    }

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI Whisper API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    const durationMs = Date.now() - startTime;

    // Extract word timestamps if available
    const words = result.words?.map((w: any) => ({
      word: w.word,
      start: w.start,
      end: w.end,
      confidence: 1.0, // Whisper doesn't provide confidence per word
    }));

    return {
      text: result.text || '',
      confidence: 0.95, // Whisper is generally high confidence
      provider: 'whisper-openai',
      durationMs,
      isFinal: true,
      words,
    };
  } finally {
    // Cleanup temp file
    try {
      fs.unlinkSync(tempFile);
    } catch { }
  }
}

async function transcribeWithLocal(
  audio: Buffer,
  options: STTOptions,
  startTime: number
): Promise<STTResult> {
  const tempInput = path.join(os.tmpdir(), `stt_in_${Date.now()}.wav`);
  const tempOutput = path.join(os.tmpdir(), `stt_out_${Date.now()}.txt`);

  fs.writeFileSync(tempInput, audio);

  try {
    // Run local whisper.cpp
    const lang = options.language?.split('-')[0] || 'en';
    await execAsync(
      `whisper "${tempInput}" --language ${lang} --output_format txt --output_dir "${path.dirname(tempOutput)}"`
    );

    const text = fs.existsSync(tempOutput) 
      ? fs.readFileSync(tempOutput, 'utf-8').trim()
      : '';

    const durationMs = Date.now() - startTime;

    return {
      text,
      confidence: 0.9,
      provider: 'whisper-local',
      durationMs,
      isFinal: true,
    };
  } finally {
    // Cleanup
    try {
      fs.unlinkSync(tempInput);
      fs.unlinkSync(tempOutput);
    } catch { }
  }
}
