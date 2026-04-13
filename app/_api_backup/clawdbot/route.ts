/**
 * Clawdbot API Endpoint
 * 
 * POST /api/clawdbot
 * 
 * Execute Clawdbot prompts via HTTP for integration with:
 * - Dashboard components
 * - Webhook processors
 * - External systems
 */

import { NextRequest, NextResponse } from 'next/server';
import { execute, listPrompts, loadAIRules } from '../../../lib/ai/clawdbot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, input, mode } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // Validate prompt exists
    const available = listPrompts();
    if (!available.includes(prompt)) {
      return NextResponse.json(
        { error: `Unknown prompt: ${prompt}. Available: ${available.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await execute(prompt, input || {}, { 
      mode: mode || 'auto' 
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Clawdbot API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return available prompts and rules
  return NextResponse.json({
    prompts: listPrompts(),
    rules: loadAIRules(),
    modes: ['local', 'remote', 'auto'],
    usage: {
      method: 'POST',
      body: {
        prompt: 'string (required)',
        input: 'object (optional)',
        mode: 'local|remote|auto (optional, default: auto)'
      }
    }
  });
}
