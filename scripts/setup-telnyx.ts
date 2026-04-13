#!/usr/bin/env tsx

/**
 * Telnyx Setup Script for Weather Intake Network
 *
 * This script operationalizes the weather-triggered intake system by:
 * 1. Creating voice apps for STORM and HAIL
 * 2. Setting up AI assistants with appropriate profiles
 * 3. Assigning phone numbers to the correct apps
 * 4. Configuring routing logic
 *
 * Usage: npm run setup-telnyx
 */

import { setupWeatherIntakeSystem } from '../lib/telnyx';

async function main() {
  console.log('🚀 Starting Telnyx Weather Intake Network Setup...\n');

  try {
    await setupWeatherIntakeSystem();
    console.log('\n✅ Setup complete! Your weather intake network is live.');
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

main();