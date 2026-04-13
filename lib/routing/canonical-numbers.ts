import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export type Persona = (typeof CANONICAL_PERSONAS)[number];

export const CANONICAL_PERSONAS = [
  'STORM',
  'HAIL',
  'HVAC',
  'CLAIMS',
  'LAW',
  'MONEY',
  'NEED'
] as const;

export function formatTenDigitNumber(digits: string): string {
  const normalized = digits.replace(/\D/g, '');
  if (!/^\d{10}$/.test(normalized)) return digits;
  return `${normalized.slice(0, 3)}-${normalized.slice(3, 6)}-${normalized.slice(6)}`;
}

export type CanonicalNote = {
  note?: string;
};

export function loadCanonicalNotes(): Record<string, CanonicalNote> {
  const filePath = path.join(process.cwd(), 'CANONICAL_NUMBERS.md');
  if (!fs.existsSync(filePath)) return {};

  const text = fs.readFileSync(filePath, 'utf8');
  const notes: Record<string, CanonicalNote> = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    const numberMatch = line.match(/`(\d{3}-\d{3}-\d{4})`/);
    if (!numberMatch) continue;

    const display = numberMatch[1];
    const digits = display.replace(/-/g, '');

    const parenMatch = line.match(/\(([^)]+)\)\s*$/);
    notes[digits] = { note: parenMatch?.[1] };
  }

  return notes;
}

export type PersonaInfo = {
  emoji: string;
  title: string;
  blurb: string;
};

export const PERSONA_INFO: Record<Persona, PersonaInfo> = {
  STORM: {
    emoji: '🌩️',
    title: 'Storm',
    blurb: 'Storm-related emergency and property damage intake.'
  },
  HAIL: {
    emoji: '🌨️',
    title: 'Hail',
    blurb: 'Hail damage assessment and claims intake.'
  },
  HVAC: {
    emoji: '❄️🔥',
    title: 'HVAC',
    blurb: 'Heating, ventilation, and air conditioning services.'
  },
  CLAIMS: {
    emoji: '🧾',
    title: 'Claims',
    blurb: 'Insurance claims processing and support.'
  },
  LAW: {
    emoji: '🏛️',
    title: 'Legal (Law-AI)',
    blurb: 'AI legal intake and case qualification.'
  },
  MONEY: {
    emoji: '💰',
    title: 'Money',
    blurb: 'Financial services and payments.'
  },
  NEED: {
    emoji: '🌐',
    title: 'Need',
    blurb: 'General needs, overflow, routing, and brandable lines.'
  }
};

// Re-export NUMBER_TO_PERSONA from engine for canonical access
export { NUMBER_TO_PERSONA } from './engine';

// Expected counts per persona (from CANONICAL_NUMBERS.md)
export const EXPECTED_PERSONA_COUNTS: Record<Persona, number> = {
  STORM: 5,
  HAIL: 3,
  HVAC: 5,
  CLAIMS: 4,
  LAW: 9,
  MONEY: 3,
  NEED: 16,
};

export const CANONICAL_NUMBER_COUNT = 45;

// Generate canonical hash for audit trail
export function getCanonicalHash(): string {
  // Import dynamically to avoid circular dependency
  const { NUMBER_TO_PERSONA } = require('./engine');
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(NUMBER_TO_PERSONA))
    .digest('hex')
    .slice(0, 16);
}

// Helper: Get all numbers for a persona
export function getNumbersForPersona(persona: Persona): string[] {
  const { NUMBER_TO_PERSONA } = require('./engine');
  return Object.entries(NUMBER_TO_PERSONA)
    .filter(([, p]) => p === persona)
    .map(([num]) => num);
}

// Helper: Route by number (deterministic, no fallback)
export function routeByNumber(number10: string): Persona | null {
  const { NUMBER_TO_PERSONA } = require('./engine');
  return NUMBER_TO_PERSONA[number10] ?? null;
}
