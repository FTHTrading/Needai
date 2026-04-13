#!/usr/bin/env tsx

import { personaRunner } from '../lib/engine/persona-runner';

async function testMultiTurnConversation() {
  console.log('🧠 Testing Multi-Turn AI Conversation Engine\n');

  // Test 1: Storm damage report
  console.log('=== TEST 1: Storm Damage Report ===');
  const stormResponse1 = await personaRunner.processMessage({
    persona: 'STORM',
    message: 'My roof was damaged in a storm last night',
    callerId: '+1555123456',
    source: 'call'
  });

  console.log('🤖 AI Response:', stormResponse1.text);
  console.log('📊 Metadata:', stormResponse1.metadata);
  console.log('🎯 Actions:', stormResponse1.actions);

  // Continue the conversation
  const stormResponse2 = await personaRunner.processMessage({
    sessionId: stormResponse1.metadata.sessionId,
    persona: 'STORM',
    message: 'The wind tore off part of my roof and it\'s leaking',
    source: 'call'
  });

  console.log('\n🤖 Follow-up Response:', stormResponse2.text);
  console.log('📊 Turn Count:', stormResponse2.metadata.turnCount);

  // Test 2: HVAC emergency
  console.log('\n=== TEST 2: HVAC Emergency ===');
  const hvacResponse = await personaRunner.processMessage({
    persona: 'HVAC',
    message: 'My heat stopped working and it\'s freezing in here',
    callerId: '+1555987654',
    source: 'sms'
  });

  console.log('🤖 AI Response:', hvacResponse.text);
  console.log('🚨 Should Escalate:', hvacResponse.metadata.shouldEscalate);

  // Test 3: Claims processing
  console.log('\n=== TEST 3: Insurance Claims ===');
  const claimsResponse1 = await personaRunner.processMessage({
    persona: 'CLAIMS',
    message: 'I need to file an insurance claim for hail damage',
    callerId: '+1555111111',
    source: 'web'
  });

  console.log('🤖 AI Response:', claimsResponse1.text);

  const claimsResponse2 = await personaRunner.processMessage({
    sessionId: claimsResponse1.metadata.sessionId,
    persona: 'CLAIMS',
    message: 'My policy number is ABC123456',
    source: 'web'
  });

  console.log('🤖 Follow-up Response:', claimsResponse2.text);
  console.log('✅ Is Complete:', claimsResponse2.metadata.isComplete);

  // Get session status
  console.log('\n=== SESSION STATUS ===');
  const sessionStatus = await personaRunner.getSessionStatus(claimsResponse2.metadata.sessionId);
  console.log('📋 Session Facts:', sessionStatus?.memory.facts);

  // Cleanup
  await personaRunner.cleanup();
  console.log('\n🧹 Cleaned up expired sessions');

  console.log('\n✅ Multi-turn conversation engine test completed!');
}

testMultiTurnConversation().catch(console.error);