import { computeProviderHealth } from './store';

export async function getProviderHealth() {
  return computeProviderHealth();
}
