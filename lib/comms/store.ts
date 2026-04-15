import fs from 'fs';
import path from 'path';
import { getNumberStats, NUMBERS, PERSONAS } from '@/lib/config/numbers';
import type {
  AiLedgerRecord,
  ApprovalRecord,
  CommsProviderHealth,
  ConversationThread,
  DeliveryLogRecord,
  FailureQueueRecord,
  LeadRecord,
  NumberPackRecord,
  PersonaRegistryRecord,
  WebhookEventRecord,
} from './types';

const workspaceRoot = path.join(process.cwd(), 'workspace');
const stateRoot = path.join(workspaceRoot, 'state');
const reportsRoot = path.join(workspaceRoot, 'reports');
const auditsRoot = path.join(workspaceRoot, 'audits');
const backlogRoot = path.join(workspaceRoot, 'backlog');
const architectureRoot = path.join(workspaceRoot, 'architecture');
const eventsPath = path.join(reportsRoot, 'needai-control-events.jsonl');

function ensureDirs() {
  try {
    for (const dir of [workspaceRoot, stateRoot, reportsRoot, auditsRoot, backlogRoot, architectureRoot]) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {
    // read-only filesystem (e.g. Vercel production) — skip silently
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    ensureDirs();
    if (!fs.existsSync(filePath)) {
      try { fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf8'); } catch { /* read-only */ }
      return fallback;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, value: T) {
  try {
    ensureDirs();
    fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8');
  } catch {
    // read-only filesystem (e.g. Vercel production) — log entry dropped silently
  }
}

function statePath(name: string) {
  return path.join(stateRoot, name);
}

function generateId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function appendControlEvent(kind: string, payload: Record<string, unknown>) {
  try {
    ensureDirs();
    fs.appendFileSync(eventsPath, `${JSON.stringify({ ts: new Date().toISOString(), kind, ...payload })}\n`, 'utf8');
  } catch {
    // read-only filesystem — event dropped silently
  }
}

function seedPersonaRegistry(): PersonaRegistryRecord[] {
  const now = new Date().toISOString();
  return Object.entries(PERSONAS).map(([persona, config]) => ({
    id: `persona_${persona.toLowerCase()}`,
    persona,
    version: 'v1',
    channelSupport: ['voice', 'sms'],
    promptSummary: config.script,
    routingIntent: config.capabilities.join(', '),
    active: true,
    updatedAt: now,
  }));
}

function seedNumberPacks(): NumberPackRecord[] {
  const now = new Date().toISOString();
  const packs = new Map<string, NumberPackRecord>();
  for (const number of NUMBERS) {
    const id = `${number.campaign.toLowerCase()}-pack`;
    const existing = packs.get(id);
    if (existing) {
      existing.numberIds.push(number.id);
    } else {
      packs.set(id, {
        id,
        persona: number.persona,
        campaign: number.campaign,
        active: number.active,
        numberIds: [number.id],
        updatedAt: now,
      });
    }
  }
  return Array.from(packs.values());
}

export function getDeliveryLogs(): DeliveryLogRecord[] {
  return readJsonFile(statePath('delivery-logs.json'), [] as DeliveryLogRecord[]);
}

export function addDeliveryLog(log: Omit<DeliveryLogRecord, 'id' | 'timestamp'>): DeliveryLogRecord {
  const records = getDeliveryLogs();
  const created = { ...log, id: generateId('delivery'), timestamp: new Date().toISOString() };
  records.unshift(created);
  writeJsonFile(statePath('delivery-logs.json'), records.slice(0, 500));
  appendControlEvent('delivery_log', { id: created.id, tenantId: created.tenantId, channel: created.channel, status: created.status, persona: created.persona });
  return created;
}

export function getFailures(): FailureQueueRecord[] {
  return readJsonFile(statePath('failures.json'), [] as FailureQueueRecord[]);
}

export function addFailure(failure: Omit<FailureQueueRecord, 'id' | 'createdAt' | 'status'>): FailureQueueRecord {
  const records = getFailures();
  const created: FailureQueueRecord = {
    ...failure,
    id: generateId('failure'),
    createdAt: new Date().toISOString(),
    status: 'open',
  };
  records.unshift(created);
  writeJsonFile(statePath('failures.json'), records.slice(0, 200));
  appendControlEvent('failure_created', { id: created.id, tenantId: created.tenantId, reason: created.reason, channel: created.channel });
  return created;
}

export function retryFailure(id: string): FailureQueueRecord | null {
  const records = getFailures();
  const index = records.findIndex((item) => item.id === id);
  if (index === -1) return null;
  records[index] = { ...records[index], status: 'retried', retriedAt: new Date().toISOString() };
  writeJsonFile(statePath('failures.json'), records);
  appendControlEvent('failure_retried', { id });
  return records[index];
}

export function getApprovals(): ApprovalRecord[] {
  return readJsonFile(statePath('approvals.json'), [] as ApprovalRecord[]);
}

export function addApproval(approval: Omit<ApprovalRecord, 'id' | 'createdAt' | 'status'>): ApprovalRecord {
  const records = getApprovals();
  const created: ApprovalRecord = {
    ...approval,
    id: generateId('approval'),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  records.unshift(created);
  writeJsonFile(statePath('approvals.json'), records.slice(0, 200));
  appendControlEvent('approval_created', { id: created.id, tenantId: created.tenantId, actionType: created.actionType });
  return created;
}

export function approveAction(id: string): ApprovalRecord | null {
  const records = getApprovals();
  const index = records.findIndex((item) => item.id === id);
  if (index === -1) return null;
  records[index] = { ...records[index], status: 'approved', resolvedAt: new Date().toISOString() };
  writeJsonFile(statePath('approvals.json'), records);
  appendControlEvent('approval_approved', { id });
  return records[index];
}

export function getWebhookEvents(): WebhookEventRecord[] {
  return readJsonFile(statePath('webhooks.json'), [] as WebhookEventRecord[]);
}

export function addWebhookEvent(event: Omit<WebhookEventRecord, 'id' | 'timestamp'>): WebhookEventRecord {
  const records = getWebhookEvents();
  const created = { ...event, id: generateId('webhook'), timestamp: new Date().toISOString() };
  records.unshift(created);
  writeJsonFile(statePath('webhooks.json'), records.slice(0, 500));
  appendControlEvent('webhook_event', { id: created.id, provider: created.provider, eventType: created.eventType });
  return created;
}

export function getLedger(): AiLedgerRecord[] {
  return readJsonFile(statePath('ai-ledger.json'), [] as AiLedgerRecord[]);
}

export function addLedgerEntry(entry: AiLedgerRecord): AiLedgerRecord {
  const records = getLedger();
  records.unshift(entry);
  writeJsonFile(statePath('ai-ledger.json'), records.slice(0, 500));
  appendControlEvent('ai_ledger_entry', { id: entry.id, tenantId: entry.tenantId, tokens: entry.totalTokens, costUsd: entry.costUsd, confidence: entry.confidence });
  return entry;
}

export function getPersonas(): PersonaRegistryRecord[] {
  return readJsonFile(statePath('persona-registry.json'), seedPersonaRegistry());
}

export function upsertPersona(record: PersonaRegistryRecord): PersonaRegistryRecord {
  const records = getPersonas();
  const index = records.findIndex((item) => item.id === record.id || item.persona === record.persona);
  const next = { ...record, updatedAt: new Date().toISOString() };
  if (index === -1) {
    records.unshift(next);
  } else {
    records[index] = next;
  }
  writeJsonFile(statePath('persona-registry.json'), records);
  appendControlEvent('persona_upserted', { id: next.id, persona: next.persona, version: next.version });
  return next;
}

export function getNumberPacks(): NumberPackRecord[] {
  return readJsonFile(statePath('number-packs.json'), seedNumberPacks());
}

export function setNumberPackActive(id: string, active: boolean): NumberPackRecord | null {
  const records = getNumberPacks();
  const index = records.findIndex((item) => item.id === id);
  if (index === -1) return null;
  records[index] = { ...records[index], active, updatedAt: new Date().toISOString() };
  writeJsonFile(statePath('number-packs.json'), records);
  appendControlEvent(active ? 'number_pack_activated' : 'number_pack_deactivated', { id });
  return records[index];
}

export function findActivePackForPersona(persona: string): NumberPackRecord | undefined {
  return getNumberPacks().find((pack) => pack.persona === persona && pack.active);
}

export function getThreads(): ConversationThread[] {
  return readJsonFile(statePath('threads.json'), [] as ConversationThread[]);
}

export function upsertThread(thread: ConversationThread): ConversationThread {
  const records = getThreads();
  const index = records.findIndex((item) => item.id === thread.id);
  if (index === -1) {
    records.unshift(thread);
  } else {
    records[index] = thread;
  }
  writeJsonFile(statePath('threads.json'), records.slice(0, 200));
  return thread;
}

export function getLeads(): LeadRecord[] {
  return readJsonFile(statePath('leads.json'), [] as LeadRecord[]);
}

export function upsertLead(record: LeadRecord): LeadRecord {
  const records = getLeads();
  const index = records.findIndex((item) => item.id === record.id || (item.phoneNumber === record.phoneNumber && item.persona === record.persona));
  if (index === -1) {
    records.unshift(record);
  } else {
    records[index] = record;
  }
  writeJsonFile(statePath('leads.json'), records.slice(0, 300));
  appendControlEvent('lead_upserted', { id: record.id, persona: record.persona, tenantId: record.tenantId, status: record.status });
  return record;
}

export function computeProviderHealth(): CommsProviderHealth[] {
  const webhooks = getWebhookEvents();
  const deliveries = getDeliveryLogs();
  const lastTelnyxSuccess = deliveries.find((item) => item.provider === 'telnyx' && item.status !== 'failed')?.timestamp;
  const lastAiSuccess = getLedger()[0]?.timestamp;
  return [
    {
      provider: 'telnyx',
      configured: Boolean(process.env.TELNYX_API_KEY),
      status: process.env.TELNYX_API_KEY ? (lastTelnyxSuccess ? 'healthy' : 'degraded') : 'unconfigured',
      lastSuccessAt: lastTelnyxSuccess,
      detail: process.env.TELNYX_API_KEY ? (webhooks.length > 0 ? 'Webhook traffic observed' : 'Configured, awaiting webhook traffic') : 'TELNYX_API_KEY missing',
    },
    {
      provider: 'openai',
      configured: Boolean(process.env.OPENAI_API_KEY),
      status: process.env.OPENAI_API_KEY ? (lastAiSuccess ? 'healthy' : 'degraded') : 'unconfigured',
      lastSuccessAt: lastAiSuccess,
      detail: process.env.OPENAI_API_KEY ? 'AI runtime available for structured intake' : 'OPENAI_API_KEY missing',
    },
    {
      provider: 'weather',
      configured: Boolean(process.env.OPENWEATHER_API_KEY),
      status: process.env.OPENWEATHER_API_KEY ? 'healthy' : 'unconfigured',
      detail: process.env.OPENWEATHER_API_KEY ? 'Weather monitor configured' : 'OPENWEATHER_API_KEY missing',
    },
  ];
}

export function writeNeedaiWorkspaceReports() {
  ensureDirs();
  const deliveries = getDeliveryLogs();
  const failures = getFailures();
  const approvals = getApprovals();
  const ledger = getLedger();
  const packs = getNumberPacks();
  const personas = getPersonas();
  const activeThreads = getThreads().filter((thread) => thread.status === 'active');
  const stats = getNumberStats();

  const implementation = [
    '# NeedAI Phase 2 Implementation',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Real',
    '- Shared file-backed communications state and control APIs',
    '- Provider health derived from env + observed traffic',
    '- Voice and SMS live Telnyx webhook ingestion with delivery logs, webhook event store, AI ledger, failure queue, approvals',
    '- Persona registry and number-pack activation state',
    '- Control-center summary and operator UI surface',
    '',
    '## Partial',
    '- CRM/email automation is not yet integrated',
    '',
    '## Missing',
    '- Persistent database backing',
    '- Automated campaign attribution exports into an external CRM',
    '',
    '## Blocked',
    '- None inside this repo; live external behavior depends on env and Telnyx/OpenAI configuration',
    '',
    `Provider health entries: ${computeProviderHealth().length}`,
    `Delivery logs: ${deliveries.length}`,
    `Failures: ${failures.length}`,
    `Approvals: ${approvals.length}`,
    `AI ledger entries: ${ledger.length}`,
    `Active threads: ${activeThreads.length}`,
    `Active number packs: ${packs.filter((pack) => pack.active).length}/${packs.length}`,
    `Persona versions: ${personas.length}`,
    `Canonical active numbers: ${stats.active}`,
  ].join('\n');

  const audit = {
    generatedAt: new Date().toISOString(),
    modules: {
      comms: ['store', 'provider-health', 'runtime', 'control-summary'],
      api: ['control summary', 'provider health', 'delivery logs', 'failures', 'approvals', 'personas', 'number packs', 'runtime execute'],
      ui: ['control-center'],
    },
    counts: {
      deliveries: deliveries.length,
      failures: failures.length,
      approvals: approvals.length,
      ledger: ledger.length,
      threads: getThreads().length,
    },
    providerHealth: computeProviderHealth(),
  };

  const backlog = [
    '# NeedAI Phase 2 Priority',
    '',
    '1. Add external CRM sync for qualified leads and delivery outcomes.',
    '2. Add outbound email provider abstraction and approval gate.',
    '3. Add per-pack attribution analytics from number to campaign to lead outcome.',
    '4. Add durable database storage behind the file-backed control state.',
    '5. Add signed webhook verification for Telnyx voice and SMS callbacks.',
  ].join('\n');

  const architecture = [
    '# NeedAI Communications Pack Map',
    '',
    '- Shared spine: provider abstraction, runtime, threading, approvals, failures, logs',
    '- Live ingress: voice route, voice gather route, telnyx webhook',
    '- Portfolio consumption target: Ai-Franchise and future vertical packs consume NeedAI comms controls via shared API and pack model',
    '- Number packs map campaign/persona groupings to operator activation state',
  ].join('\n');

  writeJsonFile(path.join(auditsRoot, 'needai-module-audit.json'), audit);
  fs.writeFileSync(path.join(reportsRoot, 'needai-phase2-implementation.md'), implementation, 'utf8');
  fs.writeFileSync(path.join(backlogRoot, 'needai-phase2-priority.md'), backlog, 'utf8');
  fs.writeFileSync(path.join(architectureRoot, 'needai-comms-pack-map.md'), architecture, 'utf8');
}
