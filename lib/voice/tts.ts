/**
 * TTS Provider Interface
 * 
 * All TTS engines must implement this contract.
 * Allows swapping between local and cloud providers.
 */

import { Persona } from '../routing/canonical-numbers.js';

export interface TTSOptions {
  persona: Persona;
  urgency?: 'normal' | 'emergency';
  voice?: string;
}

export interface TTSResult {
  audio: Buffer;
  provider: string;
  voice: string;
  durationMs: number;
  fallback: boolean;
}

export interface TTSProvider {
  name: string;
  available(): Promise<boolean>;
  synthesize(text: string, options: TTSOptions): Promise<Buffer>;
}

// Voice mapping per persona
export const PERSONA_VOICES: Record<Persona, { elevenlabs: string; local: string }> = {
  STORM: { elevenlabs: 'Adam', local: 'en_US-lessac-medium' },      // Authoritative male
  HAIL: { elevenlabs: 'Rachel', local: 'en_US-amy-medium' },        // Professional female
  HVAC: { elevenlabs: 'Josh', local: 'en_US-lessac-medium' },       // Friendly male
  CLAIMS: { elevenlabs: 'Rachel', local: 'en_US-amy-medium' },      // Calm female
  LAW: { elevenlabs: 'Antoni', local: 'en_US-lessac-medium' },      // Serious male
  MONEY: { elevenlabs: 'Bella', local: 'en_US-amy-medium' },        // Trustworthy female
  NEED: { elevenlabs: 'Elli', local: 'en_US-amy-medium' },          // Empathetic female
};
