import { getNumberByDigits } from '@/lib/config/numbers';
import { normalizeNumber } from '@/lib/telephony/normalize';
import { findActivePackForPersona, getNumberPacks } from './store';

export function resolvePersonaPack(toNumber: string) {
  const digits = normalizeNumber(toNumber);
  const numberConfig = getNumberByDigits(digits);
  const persona = numberConfig?.persona ?? 'NEED';
  const activePack = findActivePackForPersona(persona);
  const fallbackPack = getNumberPacks().find((pack) => pack.persona === persona) ?? getNumberPacks().find((pack) => pack.persona === 'NEED');
  const pack = activePack ?? fallbackPack;

  return {
    digits,
    numberConfig,
    persona: pack?.active === false ? 'NEED' : persona,
    packId: pack?.id ?? 'need-pack',
    campaign: pack?.campaign ?? numberConfig?.campaign ?? 'NEED',
  };
}
