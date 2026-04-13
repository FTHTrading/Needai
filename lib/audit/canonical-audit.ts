/**
 * Canonical Integrity Audit
 * 
 * Validates the single source of truth for phone numbers.
 * If any check fails, the system should NOT run.
 */

import fs from 'fs';
import path from 'path';
import { NUMBER_TO_PERSONA } from '../routing/engine';
import {
  CANONICAL_NUMBER_COUNT,
  CANONICAL_PERSONAS,
  EXPECTED_PERSONA_COUNTS,
  getCanonicalHash,
  Persona,
} from '../routing/canonical-numbers';
import { isValid10Digit } from '../telephony/normalize.js';

export interface AuditResult {
  success: boolean;
  hash: string;
  timestamp: string;
  checks: {
    name: string;
    passed: boolean;
    details?: string;
  }[];
  summary: string;
}

export function auditCanonicalIntegrity(): AuditResult {
  const checks: AuditResult['checks'] = [];
  const numbers = Object.keys(NUMBER_TO_PERSONA);
  const hash = getCanonicalHash();
  
  // Check 1: Count matches
  const countMatch = numbers.length === CANONICAL_NUMBER_COUNT;
  checks.push({
    name: 'Number count',
    passed: countMatch,
    details: countMatch 
      ? `${numbers.length} numbers (expected ${CANONICAL_NUMBER_COUNT})`
      : `MISMATCH: found ${numbers.length}, expected ${CANONICAL_NUMBER_COUNT}`
  });

  // Check 2: All numbers are valid 10-digit
  const invalidNumbers = numbers.filter(n => !isValid10Digit(n));
  checks.push({
    name: 'Number format',
    passed: invalidNumbers.length === 0,
    details: invalidNumbers.length === 0
      ? 'All numbers are valid 10-digit format'
      : `Invalid: ${invalidNumbers.join(', ')}`
  });

  // Check 3: No duplicates
  const uniqueNumbers = new Set(numbers);
  const hasDuplicates = uniqueNumbers.size !== numbers.length;
  checks.push({
    name: 'No duplicates',
    passed: !hasDuplicates,
    details: hasDuplicates
      ? `Found ${numbers.length - uniqueNumbers.size} duplicate(s)`
      : 'No duplicates found'
  });

  // Check 4: All personas have scripts
  const missingScripts: string[] = [];
  for (const persona of CANONICAL_PERSONAS) {
    const scriptPath = path.join(process.cwd(), 'personas', `${persona}.md`);
    if (!fs.existsSync(scriptPath)) {
      missingScripts.push(persona);
    }
  }
  checks.push({
    name: 'Persona scripts',
    passed: missingScripts.length === 0,
    details: missingScripts.length === 0
      ? `All ${CANONICAL_PERSONAS.length} persona scripts exist`
      : `Missing: ${missingScripts.join(', ')}`
  });

  // Check 5: All personas have at least one number
  const personaCounts = new Map<Persona, number>();
  Object.values(NUMBER_TO_PERSONA).forEach(p => {
    personaCounts.set(p as Persona, (personaCounts.get(p as Persona) || 0) + 1);
  });
  const emptyPersonas = CANONICAL_PERSONAS.filter(p => !personaCounts.get(p));
  checks.push({
    name: 'Persona coverage',
    passed: emptyPersonas.length === 0,
    details: emptyPersonas.length === 0
      ? 'All personas have assigned numbers'
      : `No numbers assigned: ${emptyPersonas.join(', ')}`
  });

  // Check 6: Verify expected persona counts
  const countMismatches: string[] = [];
  for (const persona of CANONICAL_PERSONAS) {
    const actual = personaCounts.get(persona) || 0;
    const expected = EXPECTED_PERSONA_COUNTS[persona];
    if (actual !== expected) {
      countMismatches.push(`${persona}: ${actual} (expected ${expected})`);
    }
  }
  checks.push({
    name: 'Persona counts',
    passed: countMismatches.length === 0,
    details: countMismatches.length === 0
      ? 'All persona counts match expected'
      : `Mismatches: ${countMismatches.join('; ')}`
  });

  const allPassed = checks.every(c => c.passed);

  return {
    success: allPassed,
    hash,
    timestamp: new Date().toISOString(),
    checks,
    summary: allPassed
      ? `✅ All ${checks.length} checks passed | Hash: ${hash}`
      : `❌ ${checks.filter(c => !c.passed).length} of ${checks.length} checks failed`
  };
}

/**
 * Throws if audit fails - use in startup/CI
 */
export function enforceCanonicalIntegrity(): void {
  const result = auditCanonicalIntegrity();
  if (!result.success) {
    const failures = result.checks
      .filter(c => !c.passed)
      .map(c => `  - ${c.name}: ${c.details}`)
      .join('\n');
    throw new Error(`Canonical integrity check failed:\n${failures}`);
  }
}

/**
 * Validate weather rule references only known numbers
 */
export function validateWeatherRuleNumbers(numbers: string[]): void {
  for (const number of numbers) {
    if (!(NUMBER_TO_PERSONA as Record<string, string>)[number]) {
      throw new Error(
        `Weather rule references unknown number: ${number}`
      );
    }
  }
}
