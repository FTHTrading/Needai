import { ActivationRule } from './types';

// Weather-Trigger Activation Rules
// These rules determine when to activate specific phone numbers based on weather signals
// All numbers use the canonical 10-digit format from NUMBER_TO_PERSONA mapping

export const activationRules: ActivationRule[] = [
  // STORM ACTIVATION RULES
  {
    name: "FL_HURRICANE_EMERGENCY",
    description: "Activate Florida storm numbers for hurricane emergencies",
    condition: (signal) =>
      signal.event_type === "hurricane" &&
      signal.region.state === "FL" &&
      signal.advisory === "emergency",
    activate: [
      "7273878676", // 727-387-STORM (Florida)
      "7866778676"  // 786-677-STORM (Florida)
    ],
    ai_mode: "storm_property",
    priority: "emergency"
  },

  {
    name: "FL_HURRICANE_WARNING",
    description: "Activate Florida storm numbers for hurricane warnings",
    condition: (signal) =>
      signal.event_type === "hurricane" &&
      signal.region.state === "FL" &&
      signal.advisory === "warning",
    activate: [
      "7273878676", // 727-387-STORM (Florida)
      "7866778676"  // 786-677-STORM (Florida)
    ],
    ai_mode: "storm_property",
    priority: "high"
  },

  {
    name: "GA_STORM_WARNING",
    description: "Activate Georgia storm numbers for severe weather",
    condition: (signal) =>
      signal.event_type === "storm" &&
      signal.region.state === "GA" &&
      signal.advisory === "warning",
    activate: [
      "4702878676" // 470-287-STORM (Georgia)
    ],
    ai_mode: "storm_property",
    priority: "high"
  },

  {
    name: "AZ_STORM_WARNING",
    description: "Activate Arizona storm numbers for monsoon season",
    condition: (signal) =>
      signal.event_type === "storm" &&
      signal.region.state === "AZ" &&
      signal.advisory === "warning",
    activate: [
      "6237778676" // 623-777-STORM (Arizona)
    ],
    ai_mode: "storm_property",
    priority: "medium"
  },

  {
    name: "OK_STORM_WARNING",
    description: "Activate Oklahoma storm numbers for tornado alley",
    condition: (signal) =>
      signal.event_type === "storm" &&
      signal.region.state === "OK" &&
      signal.advisory === "warning",
    activate: [
      "5394767663" // 539-476-STORM (Oklahoma)
    ],
    ai_mode: "storm_property",
    priority: "high"
  },

  // HAIL ACTIVATION RULES
  {
    name: "WI_HAIL_SEVERE",
    description: "Activate Wisconsin hail numbers for severe hail",
    condition: (signal) =>
      signal.event_type === "hail" &&
      signal.hail_size_inches !== undefined &&
      signal.hail_size_inches >= 1.5 &&
      signal.region.state === "WI",
    activate: [
      "4146766337", // 414-676-HAIL (Wisconsin)
      "2623974245"  // 262-397-HAIL (Wisconsin)
    ],
    ai_mode: "hail_property",
    priority: "high"
  },

  {
    name: "WI_HAIL_MODERATE",
    description: "Activate Wisconsin hail numbers for moderate hail",
    condition: (signal) =>
      signal.event_type === "hail" &&
      signal.hail_size_inches !== undefined &&
      signal.hail_size_inches >= 1.0 &&
      signal.region.state === "WI",
    activate: [
      "4146766337", // 414-676-HAIL (Wisconsin)
      "2623974245"  // 262-397-HAIL (Wisconsin)
    ],
    ai_mode: "hail_property",
    priority: "medium"
  },

  {
    name: "CA_HAIL_SEVERE",
    description: "Activate California hail numbers for severe hail",
    condition: (signal) =>
      signal.event_type === "hail" &&
      signal.hail_size_inches !== undefined &&
      signal.hail_size_inches >= 1.25 &&
      signal.region.state === "CA",
    activate: [
      "9094887663" // 909-488-HAIL (California)
    ],
    ai_mode: "hail_property",
    priority: "high"
  },

  {
    name: "NATIONAL_HAIL_EMERGENCY",
    description: "Activate national hail overflow for emergency hail events",
    condition: (signal) =>
      signal.event_type === "hail" &&
      signal.hail_size_inches !== undefined &&
      signal.hail_size_inches >= 2.0,
    activate: [
      "8886754245", // 888-675-NEED (National hail overflow)
      "8449854245"  // 844-985-NEED (National hail overflow)
    ],
    ai_mode: "hail_property_national",
    priority: "emergency"
  },

  // HVAC ACTIVATION RULES
  {
    name: "HEAT_WAVE_EMERGENCY",
    description: "Activate HVAC emergency numbers for extreme heat",
    condition: (signal) =>
      signal.event_type === "heat_wave" &&
      signal.severity >= 90,
    activate: [
      "8337604328", // 833-760-HVAC (Emergency)
      "8335222653", // 833-522-HVAC (Emergency)
      "8336024822"  // 833-602-HVAC (Emergency)
    ],
    ai_mode: "hvac_emergency",
    priority: "emergency"
  },

  {
    name: "COLD_SNAP_EMERGENCY",
    description: "Activate HVAC emergency numbers for extreme cold",
    condition: (signal) =>
      signal.event_type === "cold_snap" &&
      signal.severity >= 90,
    activate: [
      "8337604328", // 833-760-HVAC (Emergency)
      "8335222653", // 833-522-HVAC (Emergency)
      "8336024822"  // 833-602-HVAC (Emergency)
    ],
    ai_mode: "hvac_emergency",
    priority: "emergency"
  },

  {
    name: "HEAT_WAVE_WARNING",
    description: "Activate HVAC service numbers for heat warnings",
    condition: (signal) =>
      signal.event_type === "heat_wave" &&
      signal.severity >= 70,
    activate: [
      "3215590559", // 321-559-HVAC (Florida)
      "3214858333"  // 321-485-HVAC (Florida)
    ],
    ai_mode: "hvac_service",
    priority: "high"
  },

  {
    name: "COLD_SNAP_WARNING",
    description: "Activate HVAC service numbers for cold warnings",
    condition: (signal) =>
      signal.event_type === "cold_snap" &&
      signal.severity >= 70,
    activate: [
      "3215590559", // 321-559-HVAC (Florida)
      "3214858333"  // 321-485-HVAC (Florida)
    ],
    ai_mode: "hvac_service",
    priority: "high"
  },

  // WIND ACTIVATION RULES
  {
    name: "HIGH_WIND_EMERGENCY",
    description: "Activate storm numbers for extreme wind events",
    condition: (signal) =>
      signal.event_type === "wind" &&
      signal.wind_speed_mph !== undefined &&
      signal.wind_speed_mph >= 80,
    activate: [
      "8886754245", // 888-675-NEED (National overflow)
      "8449854245"  // 844-985-NEED (National overflow)
    ],
    ai_mode: "storm_property",
    priority: "emergency"
  },

  // FLOOD ACTIVATION RULES
  {
    name: "FLOOD_EMERGENCY",
    description: "Activate emergency numbers for flood events",
    condition: (signal) =>
      signal.event_type === "flood" &&
      signal.advisory === "emergency",
    activate: [
      "8886754245", // 888-675-NEED (National emergency)
      "8449854245"  // 844-985-NEED (National emergency)
    ],
    ai_mode: "universal_intake",
    priority: "emergency"
  },

  // WINTER STORM ACTIVATION RULES
  {
    name: "WINTER_STORM_EMERGENCY",
    description: "Activate emergency numbers for winter storms",
    condition: (signal) =>
      signal.event_type === "winter" &&
      signal.advisory === "emergency",
    activate: [
      "8886754245", // 888-675-NEED (National emergency)
      "8449854245"  // 844-985-NEED (National emergency)
    ],
    ai_mode: "universal_intake",
    priority: "emergency"
  }
];

// Helper function to get rules by priority
export function getRulesByPriority(priority: string): ActivationRule[] {
  return activationRules.filter(rule => rule.priority === priority);
}

// Helper function to get rules for a specific state
export function getRulesForState(state: string): ActivationRule[] {
  const normalized = state.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) return [];

  return activationRules.filter(rule =>
    rule.name.startsWith(`${normalized}_`) || rule.name.startsWith('NATIONAL_')
  );
}
