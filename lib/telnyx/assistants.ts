import telnyx from './client';

/**
 * List all AI assistants
 */
export async function listAssistants() {
  return telnyx.listAssistants();
}

/**
 * Create a new AI assistant
 */
export async function createAssistant(name: string, model: string, instructions: string) {
  return telnyx.createAssistant(name, model, instructions);
}

/**
 * Update an assistant
 */
export async function updateAssistant(assistantId: string, updates: any) {
  return telnyx.updateAssistant(assistantId, updates);
}