import { WeatherContext } from '../weather/types';
import { WeatherTriggerEngine } from '../weather-trigger/engine';
import { NUMBER_TO_PERSONA, getNumberByDigits, NumberConfig } from '../config/numbers';

/**
 * @deprecated Use NumberConfig from lib/config/numbers.ts instead
 */
export interface PhoneNumber {
  number: string;
  persona: string;
  type: 'local' | 'toll-free';
  region: string;
  aiMode: string;
  active: boolean;
}

export interface RoutingDecision {
  targetPersona: string;
  aiScript: string;
  priority: 'emergency' | 'urgent' | 'standard';
  weatherContext?: WeatherContext;
  routingReason: string;
}

/**
 * NUMBER_TO_PERSONA now imported from canonical config
 * Source: config/numbers.json (auto-generated)
 * 
 * @deprecated Direct access - use getNumberByDigits() instead
 */
export { NUMBER_TO_PERSONA };

export class RoutingEngine {
  private numbers: Map<string, PhoneNumber> = new Map();
  private weatherEngine: WeatherTriggerEngine;

  constructor(weatherEngine: WeatherTriggerEngine) {
    this.weatherEngine = weatherEngine;
    this.initializeNumberMappings();
  }

  private initializeNumberMappings() {
    Object.entries(NUMBER_TO_PERSONA).forEach(([number, persona]) => {
      this.numbers.set(number, {
        number,
        persona,
        type: this.getNumberType(number),
        region: this.getRegionFromAreaCode(number),
        aiMode: this.getAIModeForPersona(persona),
        active: true
      });
    });
  }

  private getRegionFromAreaCode(number: string): string {
    const areaCode = number.slice(0, 3);
    const areaCodeMap: { [key: string]: string } = {
      '786': 'Florida', '727': 'Florida', '321': 'Florida',
      '623': 'Arizona', '470': 'Georgia', '539': 'Oklahoma',
      '414': 'Wisconsin', '262': 'Wisconsin', '909': 'California',
      '912': 'Georgia', '443': 'Maryland', '213': 'California',
      '770': 'Georgia', '478': 'Georgia'
    };
    if (areaCodeMap[areaCode]) return areaCodeMap[areaCode];
    return number.startsWith('8') ? 'National' : 'Regional';
  }

  async routeCall(incomingNumber: string, callerLocation?: string): Promise<RoutingDecision> {
    void callerLocation;
    const numberConfig = this.numbers.get(incomingNumber);

    if (!numberConfig) {
      return {
        targetPersona: 'NEED',
        aiScript: 'universal_intake',
        priority: 'standard',
        routingReason: 'Unknown number - routing to universal intake'
      };
    }

    if (!numberConfig.active) {
      return {
        targetPersona: 'NEED',
        aiScript: 'universal_intake',
        priority: 'standard',
        routingReason: 'Number inactive - routing to universal intake'
      };
    }

    // Check for weather-triggered activation
    let weatherContext: WeatherContext | undefined;
    let priority: 'emergency' | 'urgent' | 'standard' = 'standard';

    if (numberConfig.persona === 'STORM' || numberConfig.persona === 'HAIL') {
      // For now, we'll assume weather context is not available
      // In production, this would integrate with a weather API
      weatherContext = undefined;

      // Check if this number is currently activated by weather triggers
      const activeNumbers = this.weatherEngine.getActiveNumbers();
      const isActivated = activeNumbers.some(n => n.number === incomingNumber && n.state === 'active');

      if (isActivated) {
        priority = 'urgent';
      }
    }

    // Emergency detection for HVAC
    if (numberConfig.persona === 'HVAC' && numberConfig.aiMode === 'HVAC Emergency') {
      priority = 'emergency';
    }

    return {
      targetPersona: numberConfig.persona,
      aiScript: this.getAIScriptForPersona(numberConfig.persona),
      priority,
      weatherContext,
      routingReason: `Direct routing to ${numberConfig.persona} persona`
    };
  }

  private getAIScriptForPersona(persona: string): string {
    const scriptMap: { [key: string]: string } = {
      'STORM': 'storm_damage_assessment',
      'HAIL': 'hail_damage_assessment',
      'HVAC': 'hvac_service_intake',
      'CLAIMS': 'insurance_claim_processing',
      'LAW': 'legal_service_intake',
      'MONEY': 'financial_service_intake',
      'NEED': 'universal_intake'
    };
    return scriptMap[persona] || 'universal_intake';
  }

  getAvailableNumbers(persona?: string): PhoneNumber[] {
    const allNumbers = Array.from(this.numbers.values());
    if (persona) {
      return allNumbers.filter(n => n.persona === persona && n.active);
    }
    return allNumbers.filter(n => n.active);
  }

  activateNumber(number: string): boolean {
    const config = this.numbers.get(number);
    if (config) {
      config.active = true;
      return true;
    }
    return false;
  }

  deactivateNumber(number: string): boolean {
    const config = this.numbers.get(number);
    if (config) {
      config.active = false;
      return true;
    }
    return false;
  }

  private getNumberType(number: string): 'toll-free' | 'local' {
    return number.startsWith('8') ? 'toll-free' : 'local';
  }

  private getAIModeForPersona(persona: string): string {
    const aiModes: { [key: string]: string } = {
      'STORM': 'Storm Damage',
      'HAIL': 'Hail Damage',
      'HVAC': 'HVAC Services',
      'CLAIMS': 'Claims Processing',
      'LAW': 'Legal Services',
      'MONEY': 'Financial Services',
      'NEED': 'Universal Intake'
    };
    return aiModes[persona] || 'Universal Intake';
  }
}

// Convenience function for simple call routing
export function routeCall(dialedNumber: string) {
  const cleanNumber = dialedNumber.replace(/\D/g, '');
  const persona = NUMBER_TO_PERSONA[cleanNumber];
  
  if (!persona) {
    return null;
  }

  return {
    number: cleanNumber,
    persona,
    active: true
  };
}
