/**
 * Telnyx CLI Operations
 * 
 * Commands:
 *   telnyx:init   - Validate environment and webhook configuration
 *   telnyx:status - Show all numbers, personas, and connection status
 *   telnyx:test   - Simulate an inbound call
 *   telnyx:verify - Verify all numbers are properly configured in Telnyx
 */

import { NUMBER_TO_PERSONA } from '../lib/routing/engine.js';

const TELNYX_API_KEY = process.env.TELNYX_API_KEY;
const TELNYX_API_BASE = 'https://api.telnyx.com/v2';

interface TelnyxNumber {
  phone_number: string;
  connection_id: string | null;
  messaging_profile_id: string | null;
  status: string;
}

interface TelnyxConnection {
  id: string;
  connection_name: string;
  webhook_event_url: string;
  active: boolean;
}

// API helpers
async function telnyxFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  if (!TELNYX_API_KEY) {
    throw new Error('TELNYX_API_KEY not set');
  }

  const response = await fetch(`${TELNYX_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${TELNYX_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Telnyx API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Format phone number for display
function formatPhone(number: string): string {
  const clean = number.replace(/\D/g, '');
  if (clean.length === 10) {
    return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
  }
  if (clean.length === 11 && clean[0] === '1') {
    return `+1 (${clean.slice(1, 4)}) ${clean.slice(4, 7)}-${clean.slice(7)}`;
  }
  return number;
}

// TELNYX:INIT - Validate environment
export async function telnyxInit(): Promise<void> {
  console.log('\n🔧 TELNYX INITIALIZATION CHECK\n');
  console.log('━'.repeat(50));

  // Check API key
  if (!TELNYX_API_KEY) {
    console.log('❌ TELNYX_API_KEY: Not set');
    console.log('\n   Set it with: setx TELNYX_API_KEY "your_key_here"');
    return;
  }
  console.log('✅ TELNYX_API_KEY: Set');

  // Check webhook URL
  const webhookUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!webhookUrl) {
    console.log('⚠️  NEXT_PUBLIC_APP_URL: Not set (webhooks will not work)');
  } else {
    console.log(`✅ Webhook Base: ${webhookUrl}`);
  }

  // Test API connection
  try {
    const response = await telnyxFetch('/phone_numbers?page[size]=1');
    console.log('✅ API Connection: Working');
    console.log(`   Total numbers in account: ${response.meta?.total_results || 'unknown'}`);
  } catch (error) {
    console.log('❌ API Connection: Failed');
    console.log(`   Error: ${error instanceof Error ? error.message : error}`);
    return;
  }

  // Check connections
  try {
    const connections = await telnyxFetch('/connections');
    const activeConnections = connections.data?.filter((c: any) => c.active) || [];
    console.log(`✅ Connections: ${activeConnections.length} active`);
    
    for (const conn of activeConnections.slice(0, 3)) {
      console.log(`   - ${conn.connection_name} (${conn.id})`);
      if (conn.webhook_event_url) {
        console.log(`     Webhook: ${conn.webhook_event_url}`);
      }
    }
  } catch (error) {
    console.log('⚠️  Connections: Could not fetch');
  }

  console.log('\n' + '━'.repeat(50));
  console.log('✅ Telnyx initialization check complete\n');
}

// TELNYX:STATUS - Show all numbers and their routing
export async function telnyxStatus(): Promise<void> {
  console.log('\n📞 TELNYX NUMBER STATUS\n');
  console.log('━'.repeat(70));

  // Group by persona
  const byPersona: Record<string, string[]> = {};
  Object.entries(NUMBER_TO_PERSONA).forEach(([number, persona]) => {
    if (!byPersona[persona]) byPersona[persona] = [];
    byPersona[persona].push(number);
  });

  // Display summary
  console.log('\n📊 PERSONA DISTRIBUTION:\n');
  const personas = Object.keys(byPersona).sort();
  for (const persona of personas) {
    const numbers = byPersona[persona];
    const tollFree = numbers.filter(n => n.startsWith('8')).length;
    const local = numbers.length - tollFree;
    console.log(`  ${persona.padEnd(10)} │ ${numbers.length.toString().padStart(2)} numbers (${tollFree} toll-free, ${local} local)`);
  }

  console.log('\n' + '─'.repeat(70));
  console.log('\n📱 ALL NUMBERS:\n');

  // Try to get live status from Telnyx
  let liveNumbers: Map<string, TelnyxNumber> = new Map();
  
  if (TELNYX_API_KEY) {
    try {
      const response = await telnyxFetch('/phone_numbers?page[size]=100');
      for (const num of response.data || []) {
        const clean = num.phone_number.replace(/^\+1/, '');
        liveNumbers.set(clean, num);
      }
    } catch (error) {
      console.log('⚠️  Could not fetch live status from Telnyx\n');
    }
  }

  // Display each number
  for (const persona of personas) {
    console.log(`\n  ${persona}:`);
    for (const number of byPersona[persona]) {
      const live = liveNumbers.get(number);
      const status = live ? '🟢' : '⚪';
      const formatted = formatPhone(number);
      const region = getRegionFromNumber(number);
      console.log(`    ${status} ${formatted.padEnd(18)} │ ${region}`);
    }
  }

  console.log('\n' + '━'.repeat(70));
  console.log(`Total: ${Object.keys(NUMBER_TO_PERSONA).length} numbers across ${personas.length} personas\n`);
}

// TELNYX:TEST - Simulate an inbound call
export async function telnyxTest(testNumber?: string): Promise<void> {
  console.log('\n🧪 TELNYX CALL SIMULATION\n');
  console.log('━'.repeat(50));

  // Pick a random number if not specified
  const numbers = Object.keys(NUMBER_TO_PERSONA);
  const targetNumber = testNumber || numbers[Math.floor(Math.random() * numbers.length)];
  const persona = NUMBER_TO_PERSONA[targetNumber as keyof typeof NUMBER_TO_PERSONA];

  console.log(`\n📞 Simulating call to: ${formatPhone(targetNumber)}`);
  console.log(`🎭 Expected persona: ${persona}`);
  console.log(`📍 Region: ${getRegionFromNumber(targetNumber)}`);

  // Simulate the webhook payload
  const mockPayload = {
    event_type: 'call.initiated',
    payload: {
      to: `+1${targetNumber}`,
      from: '+15551234567',
      call_control_id: `sim_${Date.now()}`,
      direction: 'incoming',
    }
  };

  console.log('\n📨 Mock webhook payload:');
  console.log(JSON.stringify(mockPayload, null, 2));

  // Test the routing logic
  const cleanNumber = targetNumber.replace(/^\+1/, '');
  const routedPersona = NUMBER_TO_PERSONA[cleanNumber as keyof typeof NUMBER_TO_PERSONA];

  console.log('\n🔀 Routing decision:');
  console.log(`   Input number: ${cleanNumber}`);
  console.log(`   Resolved persona: ${routedPersona || 'UNKNOWN (fallback to NEED)'}`);

  // Check if persona script exists
  const fs = await import('fs');
  const path = await import('path');
  const personaPath = path.join(process.cwd(), 'personas', `${routedPersona || 'NEED'}.md`);
  
  if (fs.existsSync(personaPath)) {
    console.log(`   ✅ Persona script: ${personaPath}`);
  } else {
    console.log(`   ❌ Persona script: NOT FOUND at ${personaPath}`);
  }

  console.log('\n' + '━'.repeat(50));
  console.log('✅ Simulation complete (no actual call made)\n');
}

// TELNYX:VERIFY - Verify all numbers are configured in Telnyx
export async function telnyxVerify(): Promise<void> {
  console.log('\n🔍 TELNYX NUMBER VERIFICATION\n');
  console.log('━'.repeat(70));

  if (!TELNYX_API_KEY) {
    console.log('❌ TELNYX_API_KEY not set. Cannot verify.\n');
    return;
  }

  // Fetch all numbers from Telnyx
  let allTelnyxNumbers: Set<string> = new Set();
  let page = 1;
  
  console.log('Fetching numbers from Telnyx...');
  
  try {
    while (true) {
      const response = await telnyxFetch(`/phone_numbers?page[number]=${page}&page[size]=100`);
      const numbers = response.data || [];
      
      if (numbers.length === 0) break;
      
      for (const num of numbers) {
        const clean = num.phone_number.replace(/^\+1/, '');
        allTelnyxNumbers.add(clean);
      }
      
      page++;
      if (page > 10) break; // Safety limit
    }
  } catch (error) {
    console.log(`❌ Error fetching numbers: ${error instanceof Error ? error.message : error}`);
    return;
  }

  console.log(`Found ${allTelnyxNumbers.size} numbers in Telnyx account\n`);

  // Compare with our mapping
  const ourNumbers = Object.keys(NUMBER_TO_PERSONA);
  const missing: string[] = [];
  const extra: string[] = [];
  const matched: string[] = [];

  for (const num of ourNumbers) {
    if (allTelnyxNumbers.has(num)) {
      matched.push(num);
    } else {
      missing.push(num);
    }
  }

  for (const num of allTelnyxNumbers) {
    if (!NUMBER_TO_PERSONA[num as keyof typeof NUMBER_TO_PERSONA]) {
      extra.push(num);
    }
  }

  // Report
  console.log('📊 VERIFICATION RESULTS:\n');
  console.log(`  ✅ Matched: ${matched.length} numbers`);
  console.log(`  ❌ Missing from Telnyx: ${missing.length} numbers`);
  console.log(`  ⚠️  Extra in Telnyx (unmapped): ${extra.length} numbers`);

  if (missing.length > 0) {
    console.log('\n❌ MISSING NUMBERS (in code but not in Telnyx):');
    for (const num of missing) {
      const persona = NUMBER_TO_PERSONA[num as keyof typeof NUMBER_TO_PERSONA];
      console.log(`   ${formatPhone(num)} → ${persona}`);
    }
  }

  if (extra.length > 0 && extra.length <= 20) {
    console.log('\n⚠️  UNMAPPED NUMBERS (in Telnyx but not in code):');
    for (const num of extra) {
      console.log(`   ${formatPhone(num)}`);
    }
  } else if (extra.length > 20) {
    console.log(`\n⚠️  ${extra.length} unmapped numbers in Telnyx (showing first 10):`);
    for (const num of extra.slice(0, 10)) {
      console.log(`   ${formatPhone(num)}`);
    }
  }

  console.log('\n' + '━'.repeat(70));
  
  if (missing.length === 0) {
    console.log('✅ All mapped numbers exist in Telnyx\n');
  } else {
    console.log(`⚠️  ${missing.length} numbers need to be added to Telnyx\n`);
  }
}

// Helper: Get region from area code
function getRegionFromNumber(number: string): string {
  const areaCode = number.slice(0, 3);
  const regions: Record<string, string> = {
    '786': 'Florida',
    '727': 'Florida',
    '623': 'Arizona',
    '470': 'Georgia',
    '539': 'Oklahoma',
    '414': 'Wisconsin',
    '262': 'Wisconsin',
    '909': 'California',
    '321': 'Florida',
    '912': 'Georgia',
    '443': 'Maryland',
    '213': 'California',
    '770': 'Georgia',
    '478': 'Georgia',
    '872': 'Illinois',
    '833': 'Toll-Free',
    '844': 'Toll-Free',
    '855': 'Toll-Free',
    '866': 'Toll-Free',
    '877': 'Toll-Free',
    '888': 'Toll-Free',
  };
  return regions[areaCode] || 'Unknown';
}

// Main handler for CLI
export async function handleTelnyxCommand(command: string, args: string[]): Promise<void> {
  switch (command) {
    case 'telnyx:init':
      await telnyxInit();
      break;
    case 'telnyx:status':
      await telnyxStatus();
      break;
    case 'telnyx:test':
      await telnyxTest(args[0]);
      break;
    case 'telnyx:verify':
      await telnyxVerify();
      break;
    case 'telnyx:simulate':
      await telnyxSimulate(args[0]);
      break;
    case 'telnyx:signature':
      await telnyxSignatureTest(args);
      break;
    default:
      console.log(`Unknown telnyx command: ${command}`);
      console.log('Available: telnyx:init, telnyx:status, telnyx:test, telnyx:verify, telnyx:simulate, telnyx:signature');
  }
}

/**
 * TELNYX:SIGNATURE - Test ED25519 signature verification
 * 
 * Tests:
 *   telnyx:signature              - Show verification status
 *   telnyx:signature --test       - Full verification test suite
 *   telnyx:signature --generate   - Generate a test keypair
 */
async function telnyxSignatureTest(args: string[]): Promise<void> {
  console.log('\n🔐 ED25519 SIGNATURE VERIFICATION\n');
  console.log('━'.repeat(70));
  
  const { 
    verifyTelnyxSignature, 
    generateTestSignature,
    isSignatureVerificationEnabled 
  } = await import('../lib/telephony/telnyx-signature.js');
  
  const hasPublicKey = isSignatureVerificationEnabled();
  const publicKey = process.env.TELNYX_PUBLIC_KEY || '';
  
  // Status check (default)
  if (args.length === 0) {
    console.log('\n📊 STATUS:\n');
    console.log(`  Verification enabled: ${hasPublicKey ? '✅ Yes' : '❌ No'}`);
    if (hasPublicKey) {
      console.log(`  Public key: ${publicKey.slice(0, 40)}...`);
    } else {
      console.log('  To enable: setx TELNYX_PUBLIC_KEY "your_key_here"');
      console.log('  Or run: telnyx:signature --generate');
    }
    console.log('\n' + '━'.repeat(70));
    return;
  }
  
  // Generate test keypair
  if (args.includes('--generate')) {
    console.log('\n🔑 GENERATING TEST KEYPAIR:\n');
    
    const testPayload = Buffer.from('{"test": "payload"}');
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const { signature, publicKey: testPubKey } = generateTestSignature(testPayload, timestamp);
    
    console.log('  Public Key (base64):');
    console.log(`    ${testPubKey}`);
    console.log('');
    console.log('  Test Signature:');
    console.log(`    ${signature}`);
    console.log('');
    console.log('  Timestamp:');
    console.log(`    ${timestamp}`);
    console.log('');
    console.log('  To use in testing:');
    console.log(`    $env:TELNYX_PUBLIC_KEY="${testPubKey}"`);
    console.log('\n' + '━'.repeat(70));
    return;
  }
  
  // Full test suite
  if (args.includes('--test')) {
    console.log('\n🧪 RUNNING VERIFICATION TESTS:\n');
    
    const testPayload = Buffer.from(JSON.stringify({
      data: {
        event_type: 'call.initiated',
        payload: { to: '+17866778676', from: '+15551234567' }
      }
    }));
    
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const { signature, publicKey: testPubKey } = generateTestSignature(testPayload, timestamp);
    
    let passed = 0;
    let failed = 0;
    
    // Test 1: Valid signature
    console.log('  Test 1: Valid signature with matching key');
    const result1 = verifyTelnyxSignature(testPubKey, testPayload, signature, timestamp);
    if (result1.valid) {
      console.log('    ✅ PASSED');
      passed++;
    } else {
      console.log(`    ❌ FAILED: ${result1.reason}`);
      failed++;
    }
    
    // Test 2: Wrong payload
    console.log('  Test 2: Tampered payload');
    const tamperedPayload = Buffer.from('{"tampered": true}');
    const result2 = verifyTelnyxSignature(testPubKey, tamperedPayload, signature, timestamp);
    if (!result2.valid) {
      console.log('    ✅ PASSED (correctly rejected)');
      passed++;
    } else {
      console.log('    ❌ FAILED (should have rejected)');
      failed++;
    }
    
    // Test 3: Wrong key
    console.log('  Test 3: Wrong public key');
    const { publicKey: wrongKey } = generateTestSignature(testPayload, timestamp);
    const result3 = verifyTelnyxSignature(wrongKey, testPayload, signature, timestamp);
    if (!result3.valid) {
      console.log('    ✅ PASSED (correctly rejected)');
      passed++;
    } else {
      console.log('    ❌ FAILED (should have rejected)');
      failed++;
    }
    
    // Test 4: Expired timestamp
    console.log('  Test 4: Expired timestamp (6 minutes ago)');
    const oldTimestamp = (Math.floor(Date.now() / 1000) - 360).toString();
    const { signature: oldSig } = generateTestSignature(testPayload, oldTimestamp);
    const result4 = verifyTelnyxSignature(testPubKey, testPayload, oldSig, oldTimestamp);
    if (!result4.valid && result4.reason?.includes('window')) {
      console.log('    ✅ PASSED (correctly rejected)');
      passed++;
    } else {
      console.log(`    ❌ FAILED: ${result4.reason || 'should have rejected'}`);
      failed++;
    }
    
    // Test 5: Missing signature header
    console.log('  Test 5: Missing signature header');
    const result5 = verifyTelnyxSignature(testPubKey, testPayload, '', timestamp);
    if (!result5.valid) {
      console.log('    ✅ PASSED (correctly rejected)');
      passed++;
    } else {
      console.log('    ❌ FAILED (should have rejected)');
      failed++;
    }
    
    // Test 6: Missing timestamp header
    console.log('  Test 6: Missing timestamp header');
    const result6 = verifyTelnyxSignature(testPubKey, testPayload, signature, '');
    if (!result6.valid) {
      console.log('    ✅ PASSED (correctly rejected)');
      passed++;
    } else {
      console.log('    ❌ FAILED (should have rejected)');
      failed++;
    }
    
    // Summary
    console.log('\n' + '─'.repeat(70));
    console.log(`\n  Results: ${passed}/${passed + failed} tests passed`);
    
    if (failed === 0) {
      console.log('  ✅ All signature verification tests passed!');
    } else {
      console.log(`  ❌ ${failed} test(s) failed`);
    }
    
    console.log('\n' + '━'.repeat(70));
    
    if (failed > 0) {
      process.exit(1);
    }
    return;
  }
  
  console.log('Unknown flag. Available: --test, --generate');
}

/**
 * TELNYX:SIMULATE - Full end-to-end call simulation
 * 
 * Exercises the complete behavioral spine:
 * 1. Telnyx webhook payload (real schema)
 * 2. Number normalization
 * 3. Canonical routing
 * 4. Persona selection
 * 5. AI response generation
 * 6. TTS synthesis (local or ElevenLabs if key exists)
 * 7. Telnyx Call Control JSON output
 * 8. Audit log write
 */
export async function telnyxSimulate(testNumber?: string): Promise<void> {
  console.log('\n🎯 TELNYX LIVE CALL SIMULATION\n');
  console.log('━'.repeat(70));
  
  const fs = await import('fs');
  const path = await import('path');
  
  // Import routing and canonical functions
  const { getCanonicalHash, routeByNumber, CANONICAL_PERSONAS } = await import('../lib/routing/canonical-numbers.js');
  const { normalizeNumber, toE164, getRegion } = await import('../lib/telephony/normalize.js');
  const { speak, getTTSStats } = await import('../lib/voice/index.js');
  const { personaRunner } = await import('../lib/engine/persona-runner.js');
  
  const startTime = Date.now();
  const auditLog: SimulationAudit = {
    timestamp: new Date().toISOString(),
    testNumber: '',
    canonicalHash: '',
    steps: [],
    success: false,
  };
  
  try {
    // Step 1: Build realistic Telnyx webhook payload
    const numbers = Object.keys(NUMBER_TO_PERSONA);
    const rawNumber = testNumber || numbers[Math.floor(Math.random() * numbers.length)];
    auditLog.testNumber = rawNumber;
    
    console.log('📥 STEP 1: Incoming Webhook\n');
    
    const webhookPayload = buildCallInitiatedPayload(rawNumber);
    console.log(`   Event: ${webhookPayload.data.event_type}`);
    console.log(`   Call ID: ${webhookPayload.data.payload.call_control_id}`);
    console.log(`   To: ${webhookPayload.data.payload.to}`);
    console.log(`   From: ${webhookPayload.data.payload.from}`);
    auditLog.steps.push({ step: 'webhook_received', status: 'ok', details: webhookPayload.data.event_type });
    
    // Step 2: Normalize the number
    console.log('\n📞 STEP 2: Number Normalization\n');
    
    const normalized = normalizeNumber(webhookPayload.data.payload.to);
    const e164 = toE164(normalized);
    const region = getRegion(normalized);
    
    console.log(`   Raw: ${webhookPayload.data.payload.to}`);
    console.log(`   Normalized: ${normalized}`);
    console.log(`   E.164: ${e164}`);
    console.log(`   Region: ${region}`);
    auditLog.steps.push({ step: 'normalize', status: 'ok', details: normalized });
    
    // Step 3: Canonical routing lookup
    console.log('\n🔀 STEP 3: Canonical Routing\n');
    
    const canonicalHash = getCanonicalHash();
    auditLog.canonicalHash = canonicalHash;
    const persona = routeByNumber(normalized);
    
    if (!persona) {
      console.log(`   ❌ FATAL: Number not in canonical map`);
      auditLog.steps.push({ step: 'routing', status: 'error', details: 'Number not found' });
      throw new Error(`Number ${normalized} not in canonical routing table`);
    }
    
    console.log(`   Hash: ${canonicalHash}`);
    console.log(`   Persona: ${persona}`);
    console.log(`   ✅ Routing deterministic`);
    auditLog.steps.push({ step: 'routing', status: 'ok', details: persona });
    
    // Step 4: Verify persona script exists
    console.log('\n📄 STEP 4: Persona Validation\n');
    
    const personaPath = path.join(process.cwd(), 'personas', `${persona}.md`);
    if (!fs.existsSync(personaPath)) {
      console.log(`   ❌ FATAL: Persona script missing`);
      auditLog.steps.push({ step: 'persona_check', status: 'error', details: personaPath });
      throw new Error(`Persona script not found: ${personaPath}`);
    }
    
    const scriptSize = fs.statSync(personaPath).size;
    console.log(`   Script: personas/${persona}.md`);
    console.log(`   Size: ${scriptSize} bytes`);
    console.log(`   ✅ Persona validated`);
    auditLog.steps.push({ step: 'persona_check', status: 'ok', details: `${scriptSize} bytes` });
    
    // Step 5: AI Response generation
    console.log('\n🤖 STEP 5: AI Response Generation\n');
    
    const aiResponse = await personaRunner.processMessage({
      persona,
      message: 'CALL_INITIATED',
      callerId: normalizeNumber(webhookPayload.data.payload.from),
      callId: webhookPayload.data.payload.call_control_id,
      source: 'call',
    });
    
    console.log(`   Session: ${aiResponse.metadata.sessionId}`);
    console.log(`   Turn: ${aiResponse.metadata.turnCount}`);
    console.log(`   Response: "${aiResponse.text.slice(0, 80)}..."`);
    auditLog.steps.push({ step: 'ai_response', status: 'ok', details: `${aiResponse.text.length} chars` });
    
    // Step 6: TTS synthesis
    console.log('\n🔊 STEP 6: TTS Synthesis\n');
    
    const greeting = getGreetingForPersona(persona);
    const ttsResult = await speak(greeting, {
      persona: persona as any,
      urgency: 'standard',
    });
    
    const ttsStats = getTTSStats();
    console.log(`   Provider: ${ttsResult.provider}`);
    console.log(`   Voice: ${ttsResult.voice}`);
    console.log(`   Audio: ${ttsResult.audio.length} bytes`);
    console.log(`   Duration: ${ttsResult.durationMs}ms`);
    console.log(`   Budget: ${ttsStats.used}/${ttsStats.limit} calls this hour`);
    if (ttsResult.fallback) {
      console.log(`   ⚠️ Used fallback (local TTS)`);
    }
    auditLog.steps.push({ step: 'tts_synthesis', status: 'ok', details: `${ttsResult.audio.length} bytes via ${ttsResult.provider}` });
    
    // Step 7: Build Telnyx Call Control response
    console.log('\n📤 STEP 7: Call Control Response\n');
    
    const callControlResponse = buildCallControlResponse(persona, aiResponse, greeting);
    console.log(`   Commands: ${callControlResponse.commands.length}`);
    for (const cmd of callControlResponse.commands) {
      console.log(`     - ${cmd.type}`);
    }
    console.log(`   Client State: ${callControlResponse.client_state ? 'Set' : 'None'}`);
    auditLog.steps.push({ step: 'call_control', status: 'ok', details: `${callControlResponse.commands.length} commands` });
    
    // Step 8: Write audit log
    console.log('\n📝 STEP 8: Audit Log\n');
    
    auditLog.success = true;
    auditLog.totalDurationMs = Date.now() - startTime;
    
    const auditDir = path.join(process.cwd(), 'data', 'simulations');
    if (!fs.existsSync(auditDir)) {
      fs.mkdirSync(auditDir, { recursive: true });
    }
    
    const auditFile = path.join(auditDir, `sim_${Date.now()}.json`);
    fs.writeFileSync(auditFile, JSON.stringify(auditLog, null, 2));
    
    console.log(`   File: ${auditFile}`);
    console.log(`   ✅ Audit written`);
    
    // Final summary
    console.log('\n' + '━'.repeat(70));
    console.log('\n✅ SIMULATION COMPLETE\n');
    console.log('┌─────────────────────────────────────────────────────────────────┐');
    console.log(`│  Number:      ${formatPhone(normalized).padEnd(50)}│`);
    console.log(`│  Persona:     ${persona.padEnd(50)}│`);
    console.log(`│  Region:      ${region.padEnd(50)}│`);
    console.log(`│  Hash:        ${canonicalHash.padEnd(50)}│`);
    console.log(`│  TTS:         ${ttsResult.provider.padEnd(50)}│`);
    console.log(`│  Audio:       ${(ttsResult.audio.length + ' bytes').padEnd(50)}│`);
    console.log(`│  Duration:    ${(auditLog.totalDurationMs + 'ms').padEnd(50)}│`);
    console.log(`│  Steps:       ${(auditLog.steps.length + '/8 passed').padEnd(50)}│`);
    console.log('└─────────────────────────────────────────────────────────────────┘');
    console.log('');
    
  } catch (error) {
    auditLog.success = false;
    auditLog.error = error instanceof Error ? error.message : String(error);
    auditLog.totalDurationMs = Date.now() - startTime;
    
    console.log('\n' + '━'.repeat(70));
    console.log('\n❌ SIMULATION FAILED\n');
    console.log(`Error: ${auditLog.error}`);
    console.log(`Steps completed: ${auditLog.steps.length}/8`);
    console.log('');
    
    process.exit(1);
  }
}

interface SimulationAudit {
  timestamp: string;
  testNumber: string;
  canonicalHash: string;
  steps: { step: string; status: 'ok' | 'error'; details: string }[];
  success: boolean;
  totalDurationMs?: number;
  error?: string;
}

// Build a realistic Telnyx call.initiated webhook payload
function buildCallInitiatedPayload(toNumber: string): { data: { event_type: string; payload: any } } {
  const callControlId = `call_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  
  return {
    data: {
      event_type: 'call.initiated',
      payload: {
        call_control_id: callControlId,
        call_leg_id: `leg_${callControlId}`,
        call_session_id: `session_${Date.now()}`,
        client_state: null,
        connection_id: 'conn_sim',
        direction: 'incoming',
        from: '+15551234567',
        to: `+1${toNumber.replace(/\D/g, '')}`,
        state: 'parked',
        start_time: new Date().toISOString(),
      },
    },
  };
}

// Build Telnyx Call Control response
function buildCallControlResponse(
  persona: string,
  aiResponse: { text: string; metadata: any },
  greeting: string
): { commands: { type: string; [key: string]: any }[]; client_state?: string } {
  const commands: { type: string; [key: string]: any }[] = [];
  
  // Answer the call
  commands.push({
    type: 'answer',
  });
  
  // Speak greeting
  commands.push({
    type: 'speak',
    payload: greeting,
    voice: 'female',
    language: 'en-US',
  });
  
  // Gather input
  commands.push({
    type: 'gather',
    payload: 'Please tell me how I can help you today.',
    voice: 'female',
    language: 'en-US',
    timeout: 15,
  });
  
  return {
    commands,
    client_state: JSON.stringify({
      sessionId: aiResponse.metadata.sessionId,
      persona,
      turn_count: aiResponse.metadata.turnCount,
    }),
  };
}

// Get greeting for persona (matches webhook handler)
function getGreetingForPersona(persona: string): string {
  const greetings: Record<string, string> = {
    STORM: "Hello, this is the Storm Damage Response Line. I understand you may be dealing with property damage from recent weather events. How can I help you today?",
    HAIL: "Hello, this is the Hail Damage Assessment Line. I specialize in helping with hail damage to roofs and vehicles. What can I assist you with?",
    HVAC: "Hello, this is the HVAC Service Line. Whether you need emergency repairs or scheduled maintenance, I'm here to help. What's the issue?",
    CLAIMS: "Hello, this is the Insurance Claims Support Line. I can help you file a claim, check status, or answer any questions about your coverage.",
    LAW: "Hello, this is the Legal Services Intake Line. I can help assess your legal needs and connect you with the right attorney. What type of legal matter brings you here?",
    MONEY: "Hello, this is the Financial Services Center. How can I help you with your banking and financial needs today?",
    NEED: "Hello, this is the Universal Service Line. I handle everything from home repairs to insurance claims to legal services. What do you need help with?",
  };
  
  return greetings[persona] || greetings.NEED;
}
