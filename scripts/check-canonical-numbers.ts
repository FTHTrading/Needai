import fs from 'node:fs';
import path from 'node:path';

type Persona = string;

function getRepoPath(...parts: string[]) {
  return path.join(process.cwd(), ...parts);
}

function extractCanonicalNumberToPersona(markdown: string): Map<string, Persona> {
  const re = /`(\d{3}-\d{3}-\d{4})`\s*(?:→|->)\s*([A-Z]+)/g;
  const numberToPersona = new Map<string, Persona>();
  const duplicates: Array<{ digits: string; prev: Persona; next: Persona }> = [];

  for (const match of markdown.matchAll(re)) {
    const digits = match[1].replace(/-/g, '');
    const persona = match[2];

    const prev = numberToPersona.get(digits);
    if (prev) {
      duplicates.push({ digits, prev, next: persona });
      continue;
    }

    numberToPersona.set(digits, persona);
  }

  if (duplicates.length) {
    const details = duplicates
      .map((d) => `${d.digits}: ${d.prev} vs ${d.next}`)
      .join('\n');
    throw new Error(
      `Duplicate numbers found in CANONICAL_NUMBERS.md (a number must map to exactly one persona):\n${details}`
    );
  }

  return numberToPersona;
}

function extractEngineNumberToPersona(engineSource: string): Map<string, Persona> {
  const anchor = 'export const NUMBER_TO_PERSONA';
  const anchorIndex = engineSource.indexOf(anchor);
  if (anchorIndex === -1) {
    throw new Error(`Could not find \`${anchor}\` in lib/routing/engine.ts`);
  }

  const openBraceIndex = engineSource.indexOf('{', anchorIndex);
  if (openBraceIndex === -1) {
    throw new Error('Could not find opening "{" for NUMBER_TO_PERSONA in lib/routing/engine.ts');
  }

  const closeIndex = engineSource.indexOf('};', openBraceIndex);
  if (closeIndex === -1) {
    throw new Error('Could not find closing "};" for NUMBER_TO_PERSONA in lib/routing/engine.ts');
  }

  const body = engineSource.slice(openBraceIndex, closeIndex);
  const re = /"(\d{10})"\s*:\s*"([A-Z]+)"/g;

  const numberToPersona = new Map<string, Persona>();
  for (const match of body.matchAll(re)) {
    const digits = match[1];
    const persona = match[2];
    numberToPersona.set(digits, persona);
  }

  if (numberToPersona.size === 0) {
    throw new Error('Parsed 0 entries for NUMBER_TO_PERSONA from lib/routing/engine.ts');
  }

  return numberToPersona;
}

function extractActivatedNumbers(rulesSource: string): Set<string> {
  const re = /"(\d{10})"/g;
  const digits = new Set<string>();
  for (const match of rulesSource.matchAll(re)) digits.add(match[1]);
  return digits;
}

function main() {
  const canonicalPath = getRepoPath('CANONICAL_NUMBERS.md');
  const enginePath = getRepoPath('lib', 'routing', 'engine.ts');
  const rulesPath = getRepoPath('lib', 'weather-trigger', 'rules.ts');

  const canonicalMd = fs.readFileSync(canonicalPath, 'utf8');
  const engineSource = fs.readFileSync(enginePath, 'utf8');
  const rulesSource = fs.readFileSync(rulesPath, 'utf8');

  const canonical = extractCanonicalNumberToPersona(canonicalMd);
  const engine = extractEngineNumberToPersona(engineSource);
  const activated = extractActivatedNumbers(rulesSource);

  const missingInEngine: string[] = [];
  const extraInEngine: string[] = [];
  const mismatchedPersona: Array<{ digits: string; canonical: Persona; engine: Persona }> = [];

  for (const [digits, persona] of canonical.entries()) {
    const enginePersona = engine.get(digits);
    if (!enginePersona) missingInEngine.push(digits);
    else if (enginePersona !== persona) {
      mismatchedPersona.push({ digits, canonical: persona, engine: enginePersona });
    }
  }

  for (const digits of engine.keys()) {
    if (!canonical.has(digits)) extraInEngine.push(digits);
  }

  const missingInEngineRules = Array.from(activated).filter((digits) => !engine.has(digits));

  if (missingInEngine.length || extraInEngine.length || mismatchedPersona.length || missingInEngineRules.length) {
    if (missingInEngine.length) {
      console.error('Missing from lib/routing/engine.ts NUMBER_TO_PERSONA:', missingInEngine.join(', '));
    }
    if (extraInEngine.length) {
      console.error('Extra in lib/routing/engine.ts NUMBER_TO_PERSONA (not in CANONICAL_NUMBERS.md):', extraInEngine.join(', '));
    }
    if (mismatchedPersona.length) {
      console.error('Persona mismatches (canonical vs engine):');
      for (const m of mismatchedPersona) {
        console.error(`- ${m.digits}: ${m.canonical} vs ${m.engine}`);
      }
    }
    if (missingInEngineRules.length) {
      console.error('Numbers referenced in lib/weather-trigger/rules.ts but missing from NUMBER_TO_PERSONA:', missingInEngineRules.join(', '));
    }
    process.exit(1);
  }

  console.log(`OK: ${canonical.size} canonical numbers match lib/routing/engine.ts and weather-trigger rules.`);
}

main();

