// Weather-Trigger Engine Types
// This defines the normalized inputs and outputs for the weather-triggered activation system

export type WeatherEventType = "hail" | "storm" | "hurricane" | "wind" | "winter" | "flood" | "heat_wave" | "cold_snap" | "tornado";

export type AdvisoryLevel = "watch" | "warning" | "emergency";

export interface WeatherSignal {
  event_type: WeatherEventType;
  severity: number; // 0-100 normalized
  hail_size_inches?: number;
  wind_speed_mph?: number;
  region: {
    state: string;
    county?: string;
    lat?: number;
    lon?: number;
  };
  advisory: AdvisoryLevel;
  timestamp: string;
  source?: string; // e.g., "NOAA", "OpenWeather"
}

export interface ActivationRule {
  name: string;
  condition: (signal: WeatherSignal) => boolean;
  activate: string[]; // Phone numbers to activate
  ai_mode: string; // AI behavior profile to switch to
  priority: "low" | "medium" | "high" | "emergency";
  description?: string;
}

export interface NumberActivation {
  number: string;
  state: "active" | "standby" | "inactive";
  activation_reason?: string;
  event_id?: string;
  activated_at?: string;
  ai_mode?: string;
}

export interface ActivationAuditEntry {
  event: "WEATHER_ACTIVATION" | "WEATHER_DEACTIVATION";
  rule: string;
  numbers: string[];
  signal: WeatherSignal;
  timestamp: string;
  priority: string;
}

export interface WeatherTriggerState {
  activeNumbers: NumberActivation[];
  activeRules: string[];
  lastSignal?: WeatherSignal;
  auditLog: ActivationAuditEntry[];
}