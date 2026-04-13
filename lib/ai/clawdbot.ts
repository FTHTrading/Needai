/**
 * Clawdbot - Sovereign AI Runner
 * 
 * This module provides a unified interface for AI operations that:
 * 1. Prefers local models (no rate limits)
 * 2. Falls back to remote APIs when needed
 * 3. Maintains full transparency and auditability
 * 4. Produces deterministic, structured outputs
 */

import fs from 'fs';
import path from 'path';

// Types
export interface ClawdbotConfig {
  mode: 'local' | 'remote' | 'auto';
  localEndpoint?: string;
  remoteEndpoint?: string;
  apiKey?: string;
  maxRetries: number;
  timeout: number;
}

export interface PromptContext {
  task: string;
  constraints: string[];
  input: Record<string, unknown>;
  outputFormat: string;
}

export interface ClawdbotResponse {
  success: boolean;
  mode: 'local' | 'remote';
  output: unknown;
  tokens?: number;
  latency: number;
  audit: {
    timestamp: string;
    promptHash: string;
    model: string;
  };
}

// Default configuration
const DEFAULT_CONFIG: ClawdbotConfig = {
  mode: 'auto',
  localEndpoint: 'http://localhost:11434/api/generate', // Ollama default
  remoteEndpoint: process.env.OPENAI_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000,
};

// Load AI rules
export function loadAIRules(): string {
  const rulesPath = path.join(process.cwd(), '.ai', 'AI_RULES.md');
  if (fs.existsSync(rulesPath)) {
    return fs.readFileSync(rulesPath, 'utf-8');
  }
  return '';
}

// Load a prompt template
export function loadPrompt(promptName: string): string | null {
  const promptPath = path.join(process.cwd(), '.ai', 'prompts', `${promptName}.md`);
  if (fs.existsSync(promptPath)) {
    return fs.readFileSync(promptPath, 'utf-8');
  }
  return null;
}

// List available prompts
export function listPrompts(): string[] {
  const promptsDir = path.join(process.cwd(), '.ai', 'prompts');
  if (!fs.existsSync(promptsDir)) {
    return [];
  }
  return fs.readdirSync(promptsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

// Check if local AI is available
async function checkLocalAvailable(endpoint: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(endpoint.replace('/api/generate', '/api/tags'), {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

// Generate hash for audit
function hashPrompt(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Call local model (Ollama)
async function callLocal(
  prompt: string,
  config: ClawdbotConfig
): Promise<{ output: string; model: string }> {
  const response = await fetch(config.localEndpoint!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2',
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Local model error: ${response.status}`);
  }

  const data = await response.json();
  return { output: data.response, model: data.model || 'local' };
}

// Call remote model (OpenAI-compatible)
async function callRemote(
  prompt: string,
  config: ClawdbotConfig
): Promise<{ output: string; model: string; tokens: number }> {
  const response = await fetch(config.remoteEndpoint!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: loadAIRules() },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1, // Deterministic
    }),
  });

  if (!response.ok) {
    throw new Error(`Remote model error: ${response.status}`);
  }

  const data = await response.json();
  return {
    output: data.choices[0].message.content,
    model: data.model,
    tokens: data.usage?.total_tokens || 0,
  };
}

// Main execution function
export async function execute(
  promptName: string,
  input: Record<string, unknown>,
  configOverrides: Partial<ClawdbotConfig> = {}
): Promise<ClawdbotResponse> {
  const config = { ...DEFAULT_CONFIG, ...configOverrides };
  const startTime = Date.now();

  // Load prompt template
  const template = loadPrompt(promptName);
  if (!template) {
    throw new Error(`Prompt not found: ${promptName}`);
  }

  // Build full prompt
  const rules = loadAIRules();
  const fullPrompt = `${rules}\n\n---\n\n${template}\n\n---\n\nINPUT:\n${JSON.stringify(input, null, 2)}`;

  let mode: 'local' | 'remote' = 'remote';
  let output: string;
  let model: string;
  let tokens: number | undefined;

  // Determine mode
  if (config.mode === 'local' || config.mode === 'auto') {
    const localAvailable = await checkLocalAvailable(config.localEndpoint!);
    
    if (localAvailable) {
      mode = 'local';
      const result = await callLocal(fullPrompt, config);
      output = result.output;
      model = result.model;
    } else if (config.mode === 'local') {
      throw new Error('Local model required but not available');
    } else {
      // Auto mode: fall back to remote
      const result = await callRemote(fullPrompt, config);
      output = result.output;
      model = result.model;
      tokens = result.tokens;
    }
  } else {
    const result = await callRemote(fullPrompt, config);
    output = result.output;
    model = result.model;
    tokens = result.tokens;
  }

  const latency = Date.now() - startTime;

  return {
    success: true,
    mode,
    output,
    tokens,
    latency,
    audit: {
      timestamp: new Date().toISOString(),
      promptHash: hashPrompt(fullPrompt),
      model,
    },
  };
}

// CLI interface
export async function runFromCLI(args: string[]): Promise<void> {
  const [promptName, inputFile] = args;

  if (!promptName) {
    console.log('Available prompts:', listPrompts().join(', '));
    return;
  }

  let input: Record<string, unknown> = {};
  if (inputFile) {
    const content = fs.readFileSync(inputFile, 'utf-8');
    input = JSON.parse(content);
  }

  try {
    const result = await execute(promptName, input);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Export for use as module
const clawdbot = {
  execute,
  loadPrompt,
  listPrompts,
  loadAIRules,
};

export default clawdbot;
