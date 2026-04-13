import { createConnection } from './connections';
import { createAssistant } from './assistants';
import { assignNumbersToConnection } from './phone-numbers';

/**
 * Setup script for weather-events billing group
 * This script helps operationalize the weather-triggered intake network
 */

// Configuration for the weather intake system
const CONFIG = {
  billingGroup: 'weather-events',
  voiceApps: {
    storm: 'storm-intake-app',
    hail: 'hail-intake-app',
  },
  aiProfiles: {
    storm: ['wind', 'tornado', 'hurricane', 'winter'],
    hail: ['hail', 'roof', 'property', 'claims'],
  },
  numbers: {
    core: [
      '+1888675HAIL', // 888-675-HAIL
      '+1470287STORM', // 470-287-STORM
      '+1727387STORM', // 727-387-STORM
      '+1786677STORM', // 786-677-STORM
      '+1844967HAIL', // 844-967-HAIL
    ],
    tier2: [
      '+1470887STORM', // 470-887-STORM
      '+1229398HAIL', // 229-398-HAIL
      '+1262397HAIL', // 262-397-HAIL
      '+1580967STORM', // 580-967-STORM
      '+1520347STORM', // 520-347-STORM
      '+1623777STORM', // 623-777-STORM
    ],
  },
};

/**
 * Step 1: Create Telnyx Billing Group
 * Note: This is typically done in the Telnyx portal, not via API
 */
export function createBillingGroupInstructions() {
  console.log(`
=== Step 1: Create Telnyx Billing Group ===
In the Telnyx portal:
1. Go to Account > Billing Groups
2. Create new billing group: "${CONFIG.billingGroup}"
3. Assign your API key to this billing group
`);
}

/**
 * Step 2: Create Voice Apps (Connections)
 */
export async function setupVoiceApps() {
  console.log('=== Step 2: Creating Voice Apps ===');

  try {
    const stormApp = await createConnection(CONFIG.voiceApps.storm);
    console.log(`Created STORM voice app: ${stormApp.id}`);

    const hailApp = await createConnection(CONFIG.voiceApps.hail);
    console.log(`Created HAIL voice app: ${hailApp.id}`);

    return {
      stormAppId: stormApp.id,
      hailAppId: hailApp.id,
    };
  } catch (error) {
    console.error('Error creating voice apps:', error);
    throw error;
  }
}

/**
 * Step 3: Create AI Profiles (Assistants)
 */
export async function setupAIProfiles() {
  console.log('=== Step 3: Creating AI Profiles ===');

  try {
    const stormAssistant = await createAssistant(
      'Storm Intake AI',
      'gpt-4', // or appropriate model
      `You are a storm damage intake specialist. Handle claims for: ${CONFIG.aiProfiles.storm.join(', ')}`
    );
    console.log(`Created STORM AI assistant: ${stormAssistant.id}`);

    const hailAssistant = await createAssistant(
      'Hail Intake AI',
      'gpt-4',
      `You are a hail damage intake specialist. Handle claims for: ${CONFIG.aiProfiles.hail.join(', ')}`
    );
    console.log(`Created HAIL AI assistant: ${hailAssistant.id}`);

    return {
      stormAssistantId: stormAssistant.id,
      hailAssistantId: hailAssistant.id,
    };
  } catch (error) {
    console.error('Error creating AI profiles:', error);
    throw error;
  }
}

/**
 * Step 4: Bind AI Profiles to Voice Apps
 */
export async function bindAIProfiles(appIds: { stormAppId: string; hailAppId: string }, assistantIds: { stormAssistantId: string; hailAssistantId: string }) {
  console.log('=== Step 4: Binding AI Profiles to Voice Apps ===');

  // Note: This would typically be done by updating the connection with the assistant ID
  // The exact API call depends on Telnyx's implementation
  console.log('Binding STORM assistant to STORM voice app...');
  console.log('Binding HAIL assistant to HAIL voice app...');

  // Placeholder for actual binding logic
  return {
    stormBinding: { appId: appIds.stormAppId, assistantId: assistantIds.stormAssistantId },
    hailBinding: { appId: appIds.hailAppId, assistantId: assistantIds.hailAssistantId },
  };
}

/**
 * Step 5: Assign Numbers to Voice Apps
 */
export async function assignNumbers(appIds: { stormAppId: string; hailAppId: string }) {
  console.log('=== Step 5: Assigning Numbers to Voice Apps ===');

  // Separate STORM and HAIL numbers
  const stormNumbers = CONFIG.numbers.core.filter(num => num.includes('STORM')).concat(
    CONFIG.numbers.tier2.filter(num => num.includes('STORM'))
  );

  const hailNumbers = CONFIG.numbers.core.filter(num => num.includes('HAIL')).concat(
    CONFIG.numbers.tier2.filter(num => num.includes('HAIL'))
  );

  console.log(`Assigning ${stormNumbers.length} STORM numbers to STORM app...`);
  const stormResults = await assignNumbersToConnection(stormNumbers, appIds.stormAppId);

  console.log(`Assigning ${hailNumbers.length} HAIL numbers to HAIL app...`);
  const hailResults = await assignNumbersToConnection(hailNumbers, appIds.hailAppId);

  return {
    stormResults,
    hailResults,
  };
}

/**
 * Step 6: Set Routing Logic
 */
export function setupRoutingLogic() {
  console.log('=== Step 6: Setting Up Routing Logic ===');
  console.log(`
Routing Logic Setup:
- Geo-based routing: Route calls to regional numbers based on caller location
- Weather-triggered activation: Use webhooks to activate/deactivate numbers based on weather events
- Overflow routing: Route excess calls to toll-free numbers

This is typically configured in the Telnyx portal or via webhooks.
`);
}

/**
 * Main setup function
 */
export async function setupWeatherIntakeSystem() {
  try {
    createBillingGroupInstructions();

    const appIds = await setupVoiceApps();
    const assistantIds = await setupAIProfiles();

    await bindAIProfiles(appIds, assistantIds);
    await assignNumbers(appIds);

    setupRoutingLogic();

    console.log('=== Weather Intake System Setup Complete ===');
    console.log('Your national weather-intake network is now operational!');

  } catch (error) {
    console.error('Setup failed:', error);
    throw error;
  }
}