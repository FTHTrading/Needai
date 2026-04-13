/**
 * STT (Speech-to-Text) Provider Interface
 * 
 * All STT engines must implement this contract.
 * Supports both streaming and batch transcription.
 */

import { Persona } from '../routing/canonical-numbers.js';

export interface STTOptions {
  persona?: Persona;
  language?: string;
  /** Hint words to improve recognition (e.g., product names, addresses) */
  hints?: string[];
  /** Maximum audio duration in seconds */
  maxDuration?: number;
  /** Enable interim/partial results for streaming */
  interimResults?: boolean;
}

export interface STTResult {
  text: string;
  confidence: number;
  provider: string;
  durationMs: number;
  isFinal: boolean;
  /** Word-level timestamps if available */
  words?: Array<{
    word: string;
    start: number;
    end: number;
    confidence: number;
  }>;
}

export interface STTProvider {
  name: string;
  available(): Promise<boolean>;
  
  /** Transcribe a complete audio buffer */
  transcribe(audio: Buffer, options: STTOptions): Promise<STTResult>;
  
  /** Start a streaming transcription session (returns async iterator) */
  streamTranscribe?(
    audioStream: AsyncIterable<Buffer>,
    options: STTOptions
  ): AsyncIterable<STTResult>;
}

/** Supported audio formats */
export type AudioFormat = 'wav' | 'mp3' | 'ogg' | 'webm' | 'raw';

/** Audio configuration for STT */
export interface AudioConfig {
  format: AudioFormat;
  sampleRate: number;
  channels: number;
  encoding: 'LINEAR16' | 'MULAW' | 'MP3' | 'OGG_OPUS';
}

/** Default audio config for Telnyx calls (G.711 μ-law) */
export const TELNYX_AUDIO_CONFIG: AudioConfig = {
  format: 'raw',
  sampleRate: 8000,
  channels: 1,
  encoding: 'MULAW',
};

/** Persona-specific vocabulary hints */
export const PERSONA_HINTS: Record<Persona, string[]> = {
  STORM: [
    'storm damage', 'roof leak', 'water damage', 'wind damage',
    'tree fell', 'power outage', 'flooding', 'emergency repair',
    'insurance claim', 'property damage', 'hail damage'
  ],
  HAIL: [
    'hail damage', 'roof inspection', 'dents', 'shingles',
    'vehicle damage', 'car dents', 'windshield', 'body shop',
    'insurance adjuster', 'estimate', 'repair cost'
  ],
  HVAC: [
    'air conditioning', 'heating', 'furnace', 'AC unit',
    'thermostat', 'not cooling', 'not heating', 'HVAC repair',
    'maintenance', 'filter replacement', 'ductwork', 'refrigerant'
  ],
  CLAIMS: [
    'insurance claim', 'policy number', 'deductible', 'coverage',
    'adjuster', 'estimate', 'damage report', 'claim status',
    'file a claim', 'documentation', 'proof of loss'
  ],
  LAW: [
    'attorney', 'lawyer', 'legal consultation', 'lawsuit',
    'personal injury', 'accident', 'liability', 'settlement',
    'court date', 'legal rights', 'representation'
  ],
  MONEY: [
    'payment', 'financing', 'loan', 'credit',
    'monthly payment', 'interest rate', 'approval',
    'bank account', 'routing number', 'billing'
  ],
  NEED: [
    'help', 'assistance', 'emergency', 'urgent',
    'repair', 'service', 'appointment', 'schedule',
    'contact', 'information', 'support'
  ],
};
