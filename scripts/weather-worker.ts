#!/usr/bin/env node

/**
 * Weather Monitoring Worker
 *
 * This script runs periodically to monitor weather conditions
 * and trigger activations based on real weather data.
 *
 * Usage:
 * - Manual run: npm run weather-worker
 * - Cron job: Add to crontab for regular execution
 *   Example: *\/15 * * * * cd /path/to/project && npm run weather-worker
 */

import { weatherMonitor, MONITORING_LOCATIONS } from '@/lib/weather-monitor/monitor';
import { weatherTriggerEngine } from '@/lib/weather-trigger/engine';

async function runWeatherMonitoring() {
  console.log('🌦️ Weather Monitoring Worker Started');
  console.log(`📍 Monitoring ${MONITORING_LOCATIONS.length} locations`);

  try {
    // Monitor all locations
    const signals = await weatherMonitor.monitorLocations(MONITORING_LOCATIONS);

    if (signals.length === 0) {
      console.log('✅ No significant weather signals detected');
      return;
    }

    console.log(`📡 Processing ${signals.length} weather signals...`);

    let activations = 0;
    let totalAuditEntries = 0;

    for (const signal of signals) {
      console.log(`\n🌪️  Processing: ${signal.event_type} in ${signal.region.county || 'Unknown'}, ${signal.region.state}`);
      console.log(`   Severity: ${signal.severity}% | Advisory: ${signal.advisory}`);

      const result = weatherTriggerEngine.processSignal(signal);

      if (result.activated) {
        activations++;
        console.log(`   ✅ Activated ${result.activated.length} phone numbers`);
      }

      if (result.auditEntries.length > 0) {
        totalAuditEntries += result.auditEntries.length;
        console.log(`   📝 Created ${result.auditEntries.length} audit entries`);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Signals processed: ${signals.length}`);
    console.log(`   Activations triggered: ${activations}`);
    console.log(`   Audit entries created: ${totalAuditEntries}`);

  } catch (error) {
    console.error('❌ Weather monitoring error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runWeatherMonitoring()
    .then(() => {
      console.log('✅ Weather monitoring cycle completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Weather monitoring failed:', error);
      process.exit(1);
    });
}

export { runWeatherMonitoring };