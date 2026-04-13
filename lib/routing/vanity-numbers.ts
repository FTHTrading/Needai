/**
 * VANITY NUMBER MAPPINGS
 * 
 * This file contains the authoritative billboard-to-digits mapping for all 42 canonical numbers.
 * When humans dial the vanity format (e.g., "470-STORM"), their phone automatically converts
 * it to digits using the standard keypad mapping (2=ABC, 3=DEF, ... 9=WXYZ).
 * 
 * IMPORTANT:
 * - Billboards and marketing display the vanity format (memorable words)
 * - Phone systems receive the digit format
 * - Routing engine uses the digit format (10 digits, no hyphens)
 * 
 * Last Updated: February 3, 2026
 */

export interface VanityNumber {
  /** What appears on billboards and marketing materials */
  billboard: string;
  /** The actual digits that get dialed (with hyphens for readability) */
  digits: string;
  /** The digits in routing format (10 digits, no hyphens) */
  routingFormat: string;
  /** Geographic region or toll-free designation */
  region: string;
  /** Persona/vertical this number routes to */
  persona: 'STORM' | 'HAIL' | 'HVAC' | 'CLAIMS' | 'LAW' | 'MONEY' | 'NEED';
  /** Additional notes */
  notes?: string;
}

export const VANITY_NUMBERS: VanityNumber[] = [
  // STORM - Emergency storm response and property damage
  { billboard: '470-STORM', digits: '470-287-8676', routingFormat: '4702878676', region: 'Georgia', persona: 'STORM', notes: 'Primary' },
  { billboard: '727-STORM', digits: '727-387-8676', routingFormat: '7273878676', region: 'Florida', persona: 'STORM', notes: 'Tampa Bay' },
  { billboard: '786-STORM', digits: '786-677-8676', routingFormat: '7866778676', region: 'Florida', persona: 'STORM', notes: 'Miami' },
  { billboard: '623-STORM', digits: '623-777-8676', routingFormat: '6237778676', region: 'Arizona', persona: 'STORM', notes: 'Phoenix' },
  { billboard: '213-STORM', digits: '213-423-7865', routingFormat: '2134237865', region: 'California', persona: 'STORM', notes: 'Los Angeles' },
  { billboard: '443-STORM', digits: '443-437-8657', routingFormat: '4434378657', region: 'Maryland', persona: 'STORM', notes: 'Baltimore' },
  { billboard: '770-STORM', digits: '770-230-0635', routingFormat: '7702300635', region: 'Georgia', persona: 'STORM', notes: 'Atlanta suburbs' },
  { billboard: '478-STORM', digits: '478-242-4246', routingFormat: '4782424246', region: 'Georgia', persona: 'STORM', notes: 'Macon' },
  { billboard: '321-STORM', digits: '321-559-0559', routingFormat: '3215590559', region: 'Florida', persona: 'STORM', notes: 'Space Coast' },
  { billboard: '321-STORM', digits: '321-485-8333', routingFormat: '3214858333', region: 'Florida', persona: 'STORM', notes: 'Space Coast (alt)' },
  { billboard: '912-COASTAL', digits: '912-910-6333', routingFormat: '9129106333', region: 'Georgia', persona: 'STORM', notes: 'Coastal regions' },

  // HAIL - Hail damage assessment and claims
  { billboard: '262-HAIL', digits: '262-397-4245', routingFormat: '2623974245', region: 'Wisconsin', persona: 'HAIL', notes: 'Milwaukee suburbs' },
  { billboard: '414-HAIL', digits: '414-676-6337', routingFormat: '4146766337', region: 'Wisconsin', persona: 'HAIL', notes: 'Milwaukee' },
  { billboard: '909-ROOF', digits: '909-488-7663', routingFormat: '9094887663', region: 'California', persona: 'HAIL', notes: 'San Bernardino' },
  { billboard: '539-ROOF', digits: '539-476-7663', routingFormat: '5394767663', region: 'Oklahoma', persona: 'HAIL', notes: 'Tulsa' },

  // HVAC - Heating, ventilation, and air conditioning
  { billboard: '833-HVAC-AI', digits: '833-760-4328', routingFormat: '8337604328', region: 'Toll-free', persona: 'HVAC', notes: 'Primary routing' },
  { billboard: '833-HVAC-NOW', digits: '833-602-4822', routingFormat: '8336024822', region: 'Toll-free', persona: 'HVAC', notes: 'Urgent requests' },
  { billboard: '833-HVAC-CALL', digits: '833-522-2653', routingFormat: '8335222653', region: 'Toll-free', persona: 'HVAC', notes: 'General inquiries' },

  // CLAIMS - Insurance claims processing
  { billboard: '844-CLAIM', digits: '844-725-2460', routingFormat: '8447252460', region: 'Toll-free', persona: 'CLAIMS', notes: 'Primary' },
  { billboard: '855-CLAIM', digits: '855-706-2533', routingFormat: '8557062533', region: 'Toll-free', persona: 'CLAIMS', notes: 'Overflow' },
  { billboard: '877-CLAIM', digits: '877-570-9775', routingFormat: '8775709775', region: 'Toll-free', persona: 'CLAIMS', notes: 'Overflow' },
  { billboard: '888-CLAIM-REP', digits: '888-712-0268', routingFormat: '8887120268', region: 'Toll-free', persona: 'CLAIMS', notes: 'Representative' },
  { billboard: '888-CLAIM-CHK', digits: '888-681-2729', routingFormat: '8886812729', region: 'Toll-free', persona: 'CLAIMS', notes: 'Status check' },

  // LAW - Legal services and consultation
  { billboard: '888-LAW-AI', digits: '888-505-2924', routingFormat: '8885052924', region: 'Toll-free', persona: 'LAW', notes: 'AI-powered legal' },
  { billboard: '833-LAW-AI', digits: '833-445-2924', routingFormat: '8334452924', region: 'Toll-free', persona: 'LAW', notes: 'AI-powered legal (alt)' },
  { billboard: '888-LAW-CALL', digits: '888-649-0529', routingFormat: '8886490529', region: 'Toll-free', persona: 'LAW', notes: 'General inquiries' },
  { billboard: '888-LAW-CASE', digits: '888-653-2529', routingFormat: '8886532529', region: 'Toll-free', persona: 'LAW', notes: 'Case evaluation' },
  { billboard: '888-LAW-HELP', digits: '888-763-1529', routingFormat: '8887631529', region: 'Toll-free', persona: 'LAW', notes: 'Legal help' },
  { billboard: '888-LAW-NOW', digits: '888-974-0529', routingFormat: '8889740529', region: 'Toll-free', persona: 'LAW', notes: 'Urgent legal' },
  { billboard: '888-LAW-DOCS', digits: '888-643-0529', routingFormat: '8886430529', region: 'Toll-free', persona: 'LAW', notes: 'Document services' },
  { billboard: '888-LAW-ESC', digits: '888-611-5384', routingFormat: '8886115384', region: 'Toll-free', persona: 'LAW', notes: 'Escalation' },

  // MONEY - Financial services and payments
  { billboard: '888-BUCK-AI', digits: '888-676-2825', routingFormat: '8886762825', region: 'Toll-free', persona: 'MONEY', notes: 'Payment assistance' },
  { billboard: '888-CASH-AI', digits: '888-678-0645', routingFormat: '8886780645', region: 'Toll-free', persona: 'MONEY', notes: 'Cash services' },
  { billboard: '866-BANK-AI', digits: '866-506-2265', routingFormat: '8665062265', region: 'Toll-free', persona: 'MONEY', notes: 'Banking services' },

  // ROUTING / OVERFLOW - General assistance and call routing
  { billboard: '844-NEED-AI', digits: '844-669-6333', routingFormat: '8446696333', region: 'Toll-free', persona: 'NEED', notes: 'General assistance' },
  { billboard: '888-TRUST-AI', digits: '888-474-8738', routingFormat: '8884748738', region: 'Toll-free', persona: 'NEED', notes: 'Trust/verify' },
  { billboard: '888-HELP-AI', digits: '888-344-2825', routingFormat: '8883442825', region: 'Toll-free', persona: 'NEED', notes: 'Help routing' },
  { billboard: '888-ASSIST', digits: '888-855-0209', routingFormat: '8888550209', region: 'Toll-free', persona: 'NEED', notes: 'Assistance' },
  { billboard: '844-ROUTE', digits: '844-756-1580', routingFormat: '8447561580', region: 'Toll-free', persona: 'NEED', notes: 'Call routing' },
  { billboard: '844-HAIL', digits: '844-967-4245', routingFormat: '8449674245', region: 'Toll-free', persona: 'NEED', notes: 'Hail routing' },
  { billboard: '844-HAIL', digits: '844-985-4245', routingFormat: '8449854245', region: 'Toll-free', persona: 'NEED', notes: 'Hail routing (alt)' },
  { billboard: '888-HAIL-AI', digits: '888-675-4245', routingFormat: '8886754245', region: 'Toll-free', persona: 'NEED', notes: 'AI hail routing' },
];

/**
 * Lookup map: routingFormat → VanityNumber
 * Use this for fast lookups when a call comes in
 */
export const VANITY_NUMBER_MAP = new Map<string, VanityNumber>(
  VANITY_NUMBERS.map(num => [num.routingFormat, num])
);

/**
 * Lookup map: billboard format → digits
 * Use this for marketing tools and number validation
 */
export const BILLBOARD_TO_DIGITS = new Map<string, string>(
  VANITY_NUMBERS.map(num => [num.billboard, num.digits])
);

/**
 * Get the vanity number info for a given routing format
 */
export function getVanityNumber(routingFormat: string): VanityNumber | undefined {
  return VANITY_NUMBER_MAP.get(routingFormat);
}

/**
 * Get the digits for a given billboard format
 */
export function getDigitsFromBillboard(billboard: string): string | undefined {
  return BILLBOARD_TO_DIGITS.get(billboard);
}

/**
 * Get all numbers for a specific persona
 */
export function getNumbersByPersona(persona: VanityNumber['persona']): VanityNumber[] {
  return VANITY_NUMBERS.filter(num => num.persona === persona);
}

/**
 * Get all numbers for a specific region
 */
export function getNumbersByRegion(region: string): VanityNumber[] {
  return VANITY_NUMBERS.filter(num => num.region === region);
}

/**
 * Convert a vanity string to digits using standard phone keypad mapping
 * e.g., "STORM" → "78676"
 */
export function vanityToDigits(vanity: string): string {
  const keyMap: Record<string, string> = {
    'A': '2', 'B': '2', 'C': '2',
    'D': '3', 'E': '3', 'F': '3',
    'G': '4', 'H': '4', 'I': '4',
    'J': '5', 'K': '5', 'L': '5',
    'M': '6', 'N': '6', 'O': '6',
    'P': '7', 'Q': '7', 'R': '7', 'S': '7',
    'T': '8', 'U': '8', 'V': '8',
    'W': '9', 'X': '9', 'Y': '9', 'Z': '9',
  };

  return vanity
    .toUpperCase()
    .split('')
    .map(char => keyMap[char] || char) // Keep digits and hyphens as-is
    .join('');
}

/**
 * Validate that a billboard format correctly converts to its expected digits
 */
export function validateVanityMapping(billboard: string, expectedDigits: string): boolean {
  const converted = vanityToDigits(billboard);
  const normalized = expectedDigits.replace(/-/g, '');
  const convertedNoHyphens = converted.replace(/-/g, '');
  return convertedNoHyphens === normalized;
}

/**
 * Summary stats
 */
export const VANITY_STATS = {
  total: VANITY_NUMBERS.length,
  byPersona: {
    STORM: VANITY_NUMBERS.filter(n => n.persona === 'STORM').length,
    HAIL: VANITY_NUMBERS.filter(n => n.persona === 'HAIL').length,
    HVAC: VANITY_NUMBERS.filter(n => n.persona === 'HVAC').length,
    CLAIMS: VANITY_NUMBERS.filter(n => n.persona === 'CLAIMS').length,
    LAW: VANITY_NUMBERS.filter(n => n.persona === 'LAW').length,
    MONEY: VANITY_NUMBERS.filter(n => n.persona === 'MONEY').length,
    NEED: VANITY_NUMBERS.filter(n => n.persona === 'NEED').length,
  },
  tollFree: VANITY_NUMBERS.filter(n => n.region === 'Toll-free').length,
  local: VANITY_NUMBERS.filter(n => n.region !== 'Toll-free').length,
};
