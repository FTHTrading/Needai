#!/usr/bin/env tsx

/**
 * Weather-Trigger Engine Test Script
 *
 * This script demonstrates the weather-trigger engine by processing sample weather signals
 * and showing the resulting activations.
 */

import { weatherTriggerEngine } from '../lib/weather-trigger';
import { WeatherSignal } from '../lib/weather-trigger/types';

async function testWeatherTrigger() {
  console.log('🧪 Testing Weather-Trigger Engine\n');

  // Test signals
  const testSignals: WeatherSignal[] = [
    {
      event_type: "hail",
      severity: 75,
      hail_size_inches: 1.5,
      region: { state: "GA", county: "Fulton" },
      advisory: "warning",
      timestamp: new Date().toISOString()
    },
    {
      event_type: "hurricane",
      severity: 90,
      wind_speed_mph: 85,
      region: { state: "FL", county: "Miami-Dade" },
      advisory: "emergency",
      timestamp: new Date().toISOString()
    },
    {
      event_type: "hail",
      severity: 85,
      hail_size_inches: 2.0,
      region: { state: "OK" },
      advisory: "warning",
      timestamp: new Date().toISOString()
    }
  ];

  for (const signal of testSignals) {
    console.log(`📡 Processing signal: ${signal.event_type} in ${signal.region.state}`);
    console.log(`   Severity: ${signal.severity}%, Hail: ${signal.hail_size_inches || 'N/A'}in, Wind: ${signal.wind_speed_mph || 'N/A'}mph\n`);

    const result = weatherTriggerEngine.processSignal(signal);

    if (result.activated.length > 0) {
      console.log('✅ Activated numbers:');
      result.activated.forEach(activation => {
        console.log(`   ${activation.number} (${activation.ai_mode})`);
      });
    }

    if (result.auditEntries.length > 0) {
      console.log('📋 Audit entries:');
      result.auditEntries.forEach(entry => {
        console.log(`   Rule: ${entry.rule}, Priority: ${entry.priority}`);
      });
    }

    console.log('---\n');
  }

  // Show final state
  console.log('📊 Final Engine State:');
  const state = weatherTriggerEngine.getState();
  console.log(`Active rules: ${state.activeRules.join(', ')}`);
  console.log(`Active numbers: ${state.activeNumbers.filter(n => n.state === 'active').length}`);
  console.log(`Audit log entries: ${state.auditLog.length}`);

  console.log('\n🎯 Weather-Trigger Engine test complete!');
}

testWeatherTrigger().catch(console.error);