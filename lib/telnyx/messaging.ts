import telnyx from './client';

/**
 * List messaging profiles
 */
export async function listMessagingProfiles() {
  return telnyx.listMessagingProfiles();
}

/**
 * Create a messaging profile
 */
export async function createMessagingProfile(name: string) {
  return telnyx.createMessagingProfile(name);
}