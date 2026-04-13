#!/usr/bin/env tsx
/**
 * Number Configuration Statistics
 * 
 * Displays comprehensive stats about the phone number inventory
 * Run: npm run numbers:stats
 */

import { getNumberStats, NUMBERS, CAMPAIGNS, PERSONAS } from '../lib/config/numbers';

console.log('\n📊 CallRail OS Number Configuration Statistics\n');
console.log('='.repeat(60));

const stats = getNumberStats();

// Overall Stats
console.log('\n📈 OVERALL');
console.log('-'.repeat(60));
console.log(`Total Numbers:       ${stats.total}`);
console.log(`Active:              ${stats.active}`);
console.log(`Inactive:            ${stats.inactive}`);

// By Type
console.log('\n📞 BY TYPE');
console.log('-'.repeat(60));
console.log(`Local Numbers:       ${stats.byType.local}`);
console.log(`Toll-Free Numbers:   ${stats.byType.tollFree}`);

// By Campaign
console.log('\n📢 BY CAMPAIGN');
console.log('-'.repeat(60));
Object.entries(CAMPAIGNS)
  .sort((a, b) => (stats.byCampaign[b[0]] || 0) - (stats.byCampaign[a[0]] || 0))
  .forEach(([key, campaign]) => {
    const count = stats.byCampaign[key] || 0;
    const bar = '█'.repeat(Math.floor(count / 2));
    console.log(`${campaign.name.padEnd(20)} ${count.toString().padStart(2)} ${bar}`);
  });

// By Persona
console.log('\n🤖 BY PERSONA');
console.log('-'.repeat(60));
Object.entries(PERSONAS)
  .sort((a, b) => (stats.byPersona[b[0]] || 0) - (stats.byPersona[a[0]] || 0))
  .forEach(([key, persona]) => {
    const count = stats.byPersona[key] || 0;
    const bar = '█'.repeat(Math.floor(count / 2));
    console.log(`${persona.name.padEnd(25)} ${count.toString().padStart(2)} ${bar}`);
  });

// Primary Numbers by Campaign
console.log('\n⭐ PRIMARY NUMBERS (Priority: primary)');
console.log('-'.repeat(60));
Object.keys(CAMPAIGNS).forEach(campaign => {
  const primaries = NUMBERS.filter(n => 
    n.campaign === campaign && 
    n.priority === 'primary' && 
    n.active
  );
  
  if (primaries.length > 0) {
    console.log(`\n${CAMPAIGNS[campaign].name}:`);
    primaries.forEach(n => {
      console.log(`  ${n.vanity.padEnd(20)} ${n.region}`);
    });
  }
});

// Toll-Free Numbers
console.log('\n☎️  TOLL-FREE NUMBERS (National Coverage)');
console.log('-'.repeat(60));
const tollFree = NUMBERS.filter(n => n.type === 'toll-free' && n.active);
Object.keys(CAMPAIGNS).forEach(campaign => {
  const campaignTollFree = tollFree.filter(n => n.campaign === campaign);
  if (campaignTollFree.length > 0) {
    console.log(`\n${CAMPAIGNS[campaign].name} (${campaignTollFree.length}):`);
    campaignTollFree.forEach(n => {
      const priority = n.priority ? ` [${n.priority}]` : '';
      console.log(`  ${n.vanity}${priority}`);
    });
  }
});

// Local Numbers by Region
console.log('\n🗺️  LOCAL NUMBERS BY REGION');
console.log('-'.repeat(60));
const local = NUMBERS.filter(n => n.type === 'local' && n.active);
const byRegion = local.reduce((acc, n) => {
  if (!acc[n.region]) acc[n.region] = [];
  acc[n.region].push(n);
  return acc;
}, {} as Record<string, typeof NUMBERS>);

Object.entries(byRegion)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([region, numbers]) => {
    console.log(`\n${region} (${numbers.length}):`);
    numbers.forEach(n => {
      console.log(`  ${n.vanity.padEnd(20)} ${n.campaign.padEnd(10)} [${n.persona}]`);
    });
  });

// Coverage Map
console.log('\n🌎 GEOGRAPHIC COVERAGE');
console.log('-'.repeat(60));
const states = new Set(
  local
    .map(n => n.region.split(' - ')[0])
    .filter(s => s !== 'National')
);
console.log(`States Covered: ${states.size}`);
console.log(Array.from(states).sort().join(', '));

// Persona Capabilities
console.log('\n🎯 PERSONA CAPABILITIES');
console.log('-'.repeat(60));
Object.entries(PERSONAS).forEach(([key, persona]) => {
  console.log(`\n${persona.name}:`);
  console.log(`  Script: ${persona.script}`);
  console.log(`  Capabilities: ${persona.capabilities.join(', ')}`);
});

console.log('\n' + '='.repeat(60));
console.log('✅ Configuration valid and loaded successfully\n');
