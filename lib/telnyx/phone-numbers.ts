import telnyx from './client';

/**
 * List all phone numbers
 */
export async function listPhoneNumbers() {
  return telnyx.listPhoneNumbers();
}

/**
 * Update a phone number's connection/app
 */
export async function updatePhoneNumber(phoneNumber: string, connectionId?: string, messagingProfileId?: string) {
  return telnyx.updatePhoneNumber(phoneNumber, connectionId, messagingProfileId);
}

/**
 * Assign multiple numbers to a connection/app
 */
export async function assignNumbersToConnection(phoneNumbers: string[], connectionId: string) {
  const results = [];
  for (const number of phoneNumbers) {
    try {
      const result = await updatePhoneNumber(number, connectionId);
      results.push({ number, success: true, data: result });
    } catch (error) {
      results.push({ number, success: false, error });
    }
  }
  return results;
}