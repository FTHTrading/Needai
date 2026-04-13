#!/usr/bin/env node

/**
 * Check Telnyx Account
 *
 * Verifies the Telnyx account setup and lists all configured phone numbers,
 * connections, assistants, and messaging profiles.
 */

import { config } from 'dotenv';
import { TelnyxWrapper } from '@/lib/telnyx/wrapper';

// Load environment variables from .env file
config();

async function checkTelnyxAccount() {
  console.log('🔍 Checking Telnyx Account...\n');

  // Load API key from environment
  const apiKey = process.env.TELNYX_API_KEY;
  if (!apiKey) {
    console.error('❌ TELNYX_API_KEY not found in environment variables');
    process.exit(1);
  }

  const telnyx = new TelnyxWrapper(apiKey);

  try {
    // Check connections
    console.log('📡 Connections:');
    const connections = await telnyx.listConnections();
    if (connections.length === 0) {
      console.log('   No connections found');
    } else {
      connections.forEach((conn: any) => {
        console.log(`   - ${conn.connection_name} (${conn.id}) - ${conn.active ? 'Active' : 'Inactive'}`);
      });
    }

    // Check assistants
    console.log('\n🤖 AI Assistants:');
    const assistants = await telnyx.listAssistants();
    if (assistants.length === 0) {
      console.log('   No assistants found');
    } else {
      assistants.forEach((assistant: any) => {
        console.log(`   - ${assistant.name} (${assistant.id}) - ${assistant.model}`);
      });
    }

    // Check phone numbers
    console.log('\n📞 Phone Numbers:');
    const phoneNumbers = await telnyx.listPhoneNumbers();
    if (phoneNumbers.length === 0) {
      console.log('   No phone numbers found');
    } else {
      phoneNumbers.forEach((number: any) => {
        console.log(`   - ${number.phone_number}`);
        if (number.connection_id) {
          console.log(`     Connection: ${number.connection_id}`);
        }
        if (number.messaging_profile_id) {
          console.log(`     Messaging Profile: ${number.messaging_profile_id}`);
        }
      });
    }

    // Check messaging profiles
    console.log('\n💬 Messaging Profiles:');
    const profiles = await telnyx.listMessagingProfiles();
    if (profiles.length === 0) {
      console.log('   No messaging profiles found');
    } else {
      profiles.forEach((profile: any) => {
        console.log(`   - ${profile.name} (${profile.id})`);
      });
    }

    console.log('\n✅ Telnyx account check complete');

  } catch (error) {
    console.error('❌ Error checking Telnyx account:', error);
    process.exit(1);
  }
}

// Run if called directly (ES module compatible)
if (import.meta.url === `file://${process.argv[1]}`) {
  checkTelnyxAccount();
}