/**
 * Phone Number Normalization
 * 
 * Single source of truth for phone number formatting.
 * Used by: Telnyx webhook, weather rules, CLI audit, dashboard, marketplace
 */

/**
 * Normalize any phone number input to 10-digit format
 * Strips all non-digits and takes last 10
 */
export function normalizeNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.slice(-10);
}

/**
 * Format 10-digit number for display
 */
export function formatPhone(number: string): string {
  const clean = normalizeNumber(number);
  if (clean.length !== 10) return number;
  return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
}

/**
 * Format to E.164 (+1XXXXXXXXXX)
 */
export function toE164(number: string): string {
  const clean = normalizeNumber(number);
  return `+1${clean}`;
}

/**
 * Validate 10-digit format
 */
export function isValid10Digit(number: string): boolean {
  return /^\d{10}$/.test(number);
}

/**
 * Get area code region
 */
export function getRegion(number: string): string {
  const areaCode = normalizeNumber(number).slice(0, 3);
  const regions: Record<string, string> = {
    '786': 'Florida', '727': 'Florida', '321': 'Florida',
    '623': 'Arizona',
    '470': 'Georgia', '912': 'Georgia', '770': 'Georgia', '478': 'Georgia',
    '539': 'Oklahoma',
    '414': 'Wisconsin', '262': 'Wisconsin',
    '909': 'California', '213': 'California',
    '443': 'Maryland',
    '872': 'Illinois',
    '833': 'Toll-Free', '844': 'Toll-Free', '855': 'Toll-Free',
    '866': 'Toll-Free', '877': 'Toll-Free', '888': 'Toll-Free',
  };
  return regions[areaCode] || 'Unknown';
}

/**
 * Check if toll-free
 */
export function isTollFree(number: string): boolean {
  const areaCode = normalizeNumber(number).slice(0, 3);
  return ['800', '833', '844', '855', '866', '877', '888'].includes(areaCode);
}
