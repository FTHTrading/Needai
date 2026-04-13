/**
 * CallRail OS Number Configuration
 * 
 * This file is AUTO-GENERATED from config/numbers.json
 * DO NOT EDIT MANUALLY - Update numbers.json instead
 * 
 * Run: npm run generate:config to regenerate
 */

import numbersConfig from '../../config/numbers.json';

export interface NumberConfig {
  id: string;
  vanity: string;
  digits: string;
  e164: string;
  persona: string;
  region: string;
  type: 'local' | 'toll-free';
  campaign: string;
  active: boolean;
  priority?: 'primary' | 'secondary' | 'tertiary';
  notes?: string;
}

export interface CampaignConfig {
  name: string;
  description: string;
  count: number;
  personas: string[];
}

export interface PersonaConfig {
  name: string;
  script: string;
  capabilities: string[];
}

/**
 * All 42 phone numbers in the system
 */
export const NUMBERS: readonly NumberConfig[] = numbersConfig.numbers as NumberConfig[];

/**
 * NUMBER_TO_PERSONA mapping (digits only → persona name)
 * Used by routing engine to determine which AI persona handles the call
 */
export const NUMBER_TO_PERSONA: Readonly<Record<string, string>> = Object.freeze(
  NUMBERS.reduce((acc, num) => {
    acc[num.digits] = num.persona;
    return acc;
  }, {} as Record<string, string>)
);

/**
 * Reverse lookup: Find number config by digits
 */
export function getNumberByDigits(digits: string): NumberConfig | undefined {
  return NUMBERS.find(n => n.digits === digits);
}

/**
 * Reverse lookup: Find number config by E.164 format
 */
export function getNumberByE164(e164: string): NumberConfig | undefined {
  return NUMBERS.find(n => n.e164 === e164);
}

/**
 * Get all numbers for a specific persona
 */
export function getNumbersByPersona(persona: string): NumberConfig[] {
  return NUMBERS.filter(n => n.persona === persona && n.active);
}

/**
 * Get all numbers for a specific campaign
 */
export function getNumbersByCampaign(campaign: string): NumberConfig[] {
  return NUMBERS.filter(n => n.campaign === campaign && n.active);
}

/**
 * Get all numbers by region
 */
export function getNumbersByRegion(region: string): NumberConfig[] {
  return NUMBERS.filter(n => n.region === region && n.active);
}

/**
 * Get all active toll-free numbers
 */
export function getTollFreeNumbers(): NumberConfig[] {
  return NUMBERS.filter(n => n.type === 'toll-free' && n.active);
}

/**
 * Get all active local numbers
 */
export function getLocalNumbers(): NumberConfig[] {
  return NUMBERS.filter(n => n.type === 'local' && n.active);
}

/**
 * Campaign configurations
 */
export const CAMPAIGNS: Readonly<Record<string, CampaignConfig>> = numbersConfig.campaigns as Record<string, CampaignConfig>;

/**
 * Persona configurations
 */
export const PERSONAS: Readonly<Record<string, PersonaConfig>> = numbersConfig.personas as Record<string, PersonaConfig>;

/**
 * Get total count of active numbers
 */
export function getActiveNumberCount(): number {
  return NUMBERS.filter(n => n.active).length;
}

/**
 * Get statistics summary
 */
export interface NumberStats {
  total: number;
  active: number;
  inactive: number;
  byType: {
    local: number;
    tollFree: number;
  };
  byCampaign: Record<string, number>;
  byPersona: Record<string, number>;
}

export function getNumberStats(): NumberStats {
  const active = NUMBERS.filter(n => n.active);
  const inactive = NUMBERS.filter(n => !n.active);
  
  return {
    total: NUMBERS.length,
    active: active.length,
    inactive: inactive.length,
    byType: {
      local: active.filter(n => n.type === 'local').length,
      tollFree: active.filter(n => n.type === 'toll-free').length,
    },
    byCampaign: active.reduce((acc, n) => {
      acc[n.campaign] = (acc[n.campaign] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byPersona: active.reduce((acc, n) => {
      acc[n.persona] = (acc[n.persona] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}

/**
 * Validate a phone number input (accepts digits, E.164, or vanity format)
 */
export function validateNumber(input: string): {
  valid: boolean;
  digits?: string;
  config?: NumberConfig;
  error?: string;
} {
  // Remove all non-digits
  const cleaned = input.replace(/\D/g, '');
  
  // Handle E.164 format (+1XXXXXXXXXX)
  if (cleaned.startsWith('1') && cleaned.length === 11) {
    const digits = cleaned.substring(1);
    const config = getNumberByDigits(digits);
    return {
      valid: !!config,
      digits,
      config,
      error: config ? undefined : 'Number not found in system',
    };
  }
  
  // Handle 10-digit format
  if (cleaned.length === 10) {
    const config = getNumberByDigits(cleaned);
    return {
      valid: !!config,
      digits: cleaned,
      config,
      error: config ? undefined : 'Number not found in system',
    };
  }
  
  return {
    valid: false,
    error: 'Invalid phone number format',
  };
}

// Export config version and metadata
export const CONFIG_VERSION = numbersConfig.version;
export const CONFIG_LAST_UPDATED = numbersConfig.lastUpdated;
