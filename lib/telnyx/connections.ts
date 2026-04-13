import telnyx from './client';

/**
 * List all connections
 */
export async function listConnections() {
  return telnyx.listConnections();
}

/**
 * Create a new connection (voice app)
 */
export async function createConnection(name: string, webhookUrl?: string) {
  return telnyx.createConnection(name, webhookUrl);
}

/**
 * Update a connection
 */
export async function updateConnection(connectionId: string, updates: any) {
  return telnyx.updateConnection(connectionId, updates);
}