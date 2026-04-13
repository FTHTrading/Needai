/**
 * Clawdbot CLI Runner
 * 
 * Usage:
 *   npm run clawdbot -- <prompt_name> [input_file.json]
 *   npm run clawdbot -- --list
 *   npm run clawdbot -- --audit
 *   npm run clawdbot -- --audit-canonical
 *   npm run clawdbot -- telnyx:init|status|test|verify
 *   npm run clawdbot -- voice:test [persona]
 * 
 * Examples:
 *   npm run clawdbot -- audit_routing
 *   npm run clawdbot -- telnyx:status
 *   npm run clawdbot -- voice:test STORM
 */

import { listPrompts, execute } from '../lib/ai/clawdbot.js';
import { handleTelnyxCommand } from './telnyx-cli.js';
import { auditCanonicalIntegrity } from '../lib/audit/canonical-audit.js';
import fs from 'fs';
import path from 'path';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Clawdbot - Sovereign AI Runner for Weather Intake OS

USAGE:
  clawdbot-cli.ts <prompt_name> [input.json]   Run a prompt
  clawdbot-cli.ts --list                        List available prompts
  clawdbot-cli.ts --audit                       Run AI-powered routing audit
  clawdbot-cli.ts --audit-canonical             Run canonical integrity check
  clawdbot-cli.ts --local                       Force local model only
  clawdbot-cli.ts --remote                      Force remote model only

TELNYX COMMANDS:
  clawdbot-cli.ts telnyx:init                   Validate environment
  clawdbot-cli.ts telnyx:status                 Show all numbers & personas
  clawdbot-cli.ts telnyx:test [number]          Quick routing test
  clawdbot-cli.ts telnyx:verify                 Verify Telnyx configuration
  clawdbot-cli.ts telnyx:simulate [number]      Full end-to-end call simulation
  clawdbot-cli.ts telnyx:signature              Check ED25519 signature status
  clawdbot-cli.ts telnyx:signature --test       Run signature verification tests
  clawdbot-cli.ts telnyx:signature --generate   Generate test keypair

VOICE COMMANDS:
  clawdbot-cli.ts voice:test [persona]          Test TTS for persona
  clawdbot-cli.ts voice:status                  Show TTS provider status
  clawdbot-cli.ts voice:stt                     Show STT provider status
  clawdbot-cli.ts voice:stt --test [persona]    Test STT transcription

PROMPTS:
${listPrompts().map(p => `  - ${p}`).join('\n')}

EXAMPLES:
  clawdbot-cli.ts --audit-canonical
  clawdbot-cli.ts telnyx:status
  clawdbot-cli.ts voice:test STORM
    `);
    return;
  }

  // Handle Telnyx commands
  if (args[0].startsWith('telnyx:')) {
    await handleTelnyxCommand(args[0], args.slice(1));
    return;
  }

  // Handle Voice commands
  if (args[0].startsWith('voice:')) {
    await handleVoiceCommand(args[0], args.slice(1));
    return;
  }

  // Canonical integrity audit (hard fail check)
  if (args[0] === '--audit-canonical') {
    console.log('\n🔍 CANONICAL INTEGRITY AUDIT\n');
    console.log('━'.repeat(60));
    
    const result = auditCanonicalIntegrity();
    
    for (const check of result.checks) {
      const icon = check.passed ? '✅' : '❌';
      console.log(`${icon} ${check.name}: ${check.details}`);
    }
    
    console.log('\n' + '━'.repeat(60));
    console.log(result.summary);
    console.log(`Timestamp: ${result.timestamp}\n`);
    
    if (!result.success) {
      process.exit(1);
    }
    return;
  }

  if (args[0] === '--list') {
    console.log('Available prompts:');
    listPrompts().forEach(p => console.log(`  - ${p}`));
    return;
  }

  if (args[0] === '--audit') {
    // Quick audit of routing configuration
    const canonicalPath = path.join(process.cwd(), 'CANONICAL_NUMBERS.md');
    const routingPath = path.join(process.cwd(), 'lib', 'routing', 'engine.ts');
    
    const input = {
      canonical: fs.existsSync(canonicalPath) ? fs.readFileSync(canonicalPath, 'utf-8') : null,
      routing: fs.existsSync(routingPath) ? fs.readFileSync(routingPath, 'utf-8') : null,
    };

    const result = await execute('audit_routing', input);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // Parse mode flag
  let mode: 'local' | 'remote' | 'auto' = 'auto';
  const filteredArgs = args.filter(arg => {
    if (arg === '--local') { mode = 'local'; return false; }
    if (arg === '--remote') { mode = 'remote'; return false; }
    return true;
  });

  // Parse inline input
  let input: Record<string, unknown> = {};
  const inputIdx = filteredArgs.indexOf('--input');
  if (inputIdx !== -1 && filteredArgs[inputIdx + 1]) {
    try {
      input = JSON.parse(filteredArgs[inputIdx + 1]);
      filteredArgs.splice(inputIdx, 2);
    } catch (e) {
      console.error('Invalid JSON input');
      process.exit(1);
    }
  }

  const [promptName, inputFile] = filteredArgs;

  if (inputFile && fs.existsSync(inputFile)) {
    const content = fs.readFileSync(inputFile, 'utf-8');
    input = { ...input, ...JSON.parse(content) };
  }

  try {
    const result = await execute(promptName, input, { mode });
    
    // Pretty output
    console.log('\n=== CLAWDBOT RESULT ===');
    console.log(`Mode: ${result.mode}`);
    console.log(`Model: ${result.audit.model}`);
    console.log(`Latency: ${result.latency}ms`);
    if (result.tokens) console.log(`Tokens: ${result.tokens}`);
    console.log(`Hash: ${result.audit.promptHash}`);
    console.log('\n--- OUTPUT ---\n');
    console.log(typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2));
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();

// Voice command handler
async function handleVoiceCommand(command: string, args: string[]): Promise<void> {
  const { testVoice, getTTSStats } = await import('../lib/voice/index.js');
  const { CANONICAL_PERSONAS } = await import('../lib/routing/canonical-numbers.js');
  
  switch (command) {
    case 'voice:test': {
      const persona = (args[0]?.toUpperCase() || 'NEED') as any;
      
      if (!CANONICAL_PERSONAS.includes(persona)) {
        console.log(`❌ Unknown persona: ${persona}`);
        console.log(`Available: ${CANONICAL_PERSONAS.join(', ')}`);
        return;
      }
      
      console.log(`\n🔊 VOICE TEST: ${persona}\n`);
      console.log('━'.repeat(50));
      
      try {
        const result = await testVoice(persona);
        console.log(`✅ Provider: ${result.provider}`);
        console.log(`🎙️ Voice: ${result.voice}`);
        console.log(`⏱️ Duration: ${result.durationMs}ms`);
        console.log(`📦 Audio size: ${result.audio.length} bytes`);
        if (result.fallback) {
          console.log(`⚠️ Fallback: Used local TTS`);
        }
      } catch (error) {
        console.log(`❌ Failed: ${error instanceof Error ? error.message : error}`);
      }
      
      console.log('\n' + '━'.repeat(50));
      break;
    }
    
    case 'voice:status': {
      console.log(`\n🔊 TTS STATUS\n`);
      console.log('━'.repeat(50));
      
      const stats = getTTSStats();
      console.log(`📊 Usage this hour: ${stats.used}/${stats.limit}`);
      console.log(`📉 Remaining: ${stats.remaining}`);
      
      const hasElevenlabs = !!process.env.ELEVENLABS_API_KEY;
      console.log(`\n🔌 Providers:`);
      console.log(`  ${hasElevenlabs ? '✅' : '❌'} ElevenLabs: ${hasElevenlabs ? 'Configured' : 'Not set'}`);
      console.log(`  ✅ Local TTS: Always available`);
      
      console.log('\n' + '━'.repeat(50));
      break;
    }
    
    case 'voice:stt': {
      const { getSTTStats, testSTT } = await import('../lib/voice/stt-hub.js');
      
      // Test mode
      if (args.includes('--test')) {
        const personaArg = args.find(a => !a.startsWith('-'))?.toUpperCase() || 'NEED';
        const persona = CANONICAL_PERSONAS.includes(personaArg as any) ? personaArg : 'NEED';
        
        console.log(`\n🎤 STT TEST: ${persona}\n`);
        console.log('━'.repeat(50));
        
        try {
          console.log('  Generating test audio via TTS...');
          const result = await testSTT(persona as any);
          console.log(`  ✅ Provider: ${result.provider}`);
          console.log(`  📝 Transcribed: "${result.text}"`);
          console.log(`  📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
          console.log(`  ⏱️ Duration: ${result.durationMs}ms`);
        } catch (error) {
          console.log(`  ❌ Failed: ${error instanceof Error ? error.message : error}`);
        }
        
        console.log('\n' + '━'.repeat(50));
        break;
      }
      
      // Status mode (default)
      console.log(`\n🎤 STT STATUS\n`);
      console.log('━'.repeat(50));
      
      const sttStats = getSTTStats();
      console.log(`📊 Calls this hour: ${sttStats.callsThisHour}`);
      
      console.log(`\n🔌 Providers:`);
      console.log(`  ${sttStats.deepgramAvailable ? '✅' : '❌'} Deepgram: ${sttStats.deepgramAvailable ? 'Configured' : 'Not set'}`);
      console.log(`  ${sttStats.whisperAvailable ? '✅' : '❌'} Whisper: ${sttStats.whisperAvailable ? 'Available' : 'Not configured'}`);
      
      if (!sttStats.deepgramAvailable && !sttStats.whisperAvailable) {
        console.log('\n⚠️ No STT providers configured');
        console.log('  Set DEEPGRAM_API_KEY or OPENAI_API_KEY');
      }
      
      console.log('\n' + '━'.repeat(50));
      break;
    }
    
    default:
      console.log(`Unknown voice command: ${command}`);
      console.log('Available: voice:test, voice:status, voice:stt');
  }
}
