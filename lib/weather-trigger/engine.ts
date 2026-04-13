import {
  WeatherSignal,
  NumberActivation,
  ActivationAuditEntry,
  WeatherTriggerState
} from './types';
import { activationRules } from './rules';

// Export processWeatherSignal and getEngineState for API routes
export type { WeatherSignal } from './types';

class WeatherTriggerEngine {
  private state: WeatherTriggerState;

  constructor() {
    this.state = {
      activeNumbers: [],
      activeRules: [],
      auditLog: []
    };
  }

  /**
   * Process a weather signal and determine activations
   */
  processSignal(signal: WeatherSignal): {
    activated: NumberActivation[];
    deactivated: string[];
    auditEntries: ActivationAuditEntry[];
  } {
    const activated: NumberActivation[] = [];
    const deactivated: string[] = [];
    const auditEntries: ActivationAuditEntry[] = [];

    // Find matching rules
    const matchingRules = activationRules.filter(rule => rule.condition(signal));

    // Process each matching rule
    for (const rule of matchingRules) {
      if (!this.state.activeRules.includes(rule.name)) {
        // Rule is newly activated
        this.state.activeRules.push(rule.name);

        // Activate numbers
        for (const number of rule.activate) {
          const activation: NumberActivation = {
            number,
            state: "active",
            activation_reason: `${rule.name}: ${signal.event_type} ${signal.severity}%`,
            event_id: `wx_${Date.now()}`,
            activated_at: new Date().toISOString(),
            ai_mode: rule.ai_mode
          };

          activated.push(activation);

          // Update state
          const existingIndex = this.state.activeNumbers.findIndex(n => n.number === number);
          if (existingIndex >= 0) {
            this.state.activeNumbers[existingIndex] = activation;
          } else {
            this.state.activeNumbers.push(activation);
          }
        }

        // Create audit entry
        const auditEntry: ActivationAuditEntry = {
          event: "WEATHER_ACTIVATION",
          rule: rule.name,
          numbers: rule.activate,
          signal,
          timestamp: new Date().toISOString(),
          priority: rule.priority
        };

        auditEntries.push(auditEntry);
        this.state.auditLog.push(auditEntry);
      }
    }

    // Update last signal
    this.state.lastSignal = signal;

    return { activated, deactivated, auditEntries };
  }

  /**
   * Deactivate numbers based on weather clearing
   */
  deactivateNumbers(numbers: string[], reason: string): NumberActivation[] {
    const deactivated: NumberActivation[] = [];

    for (const number of numbers) {
      const index = this.state.activeNumbers.findIndex(n => n.number === number);
      if (index >= 0) {
        const activation = this.state.activeNumbers[index];
        activation.state = "inactive";
        activation.activation_reason = reason;
        deactivated.push(activation);

        // Create audit entry
        const auditEntry: ActivationAuditEntry = {
          event: "WEATHER_DEACTIVATION",
          rule: "MANUAL_DEACTIVATION",
          numbers: [number],
          signal: this.state.lastSignal || {} as WeatherSignal,
          timestamp: new Date().toISOString(),
          priority: "low"
        };

        this.state.auditLog.push(auditEntry);
      }
    }

    return deactivated;
  }

  /**
   * Get current state
   */
  getState(): WeatherTriggerState {
    return { ...this.state };
  }

  /**
   * Get active numbers
   */
  getActiveNumbers(): NumberActivation[] {
    return this.state.activeNumbers.filter(n => n.state === "active");
  }

  /**
   * Get audit log
   */
  getAuditLog(limit?: number): ActivationAuditEntry[] {
    const log = [...this.state.auditLog].reverse();
    return limit ? log.slice(0, limit) : log;
  }

  /**
   * Reset state (for testing)
   */
  reset(): void {
    this.state = {
      activeNumbers: [],
      activeRules: [],
      auditLog: []
    };
  }
}

// Singleton instance
export const weatherTriggerEngine = new WeatherTriggerEngine();

// Convenience exports for API routes
export function processWeatherSignal(signal: WeatherSignal) {
  const result = weatherTriggerEngine.processSignal(signal);
  return {
    activations: result.activated.map(a => a.number),
    deactivations: result.deactivated,
    message: `Processed ${signal.event_type} event`,
    details: result
  };
}

export function getEngineState() {
  return weatherTriggerEngine.getState();
}

// Export the class for testing
export { WeatherTriggerEngine };
