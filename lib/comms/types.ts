export type CommsChannel = 'voice' | 'sms' | 'email';
export type CommsDirection = 'inbound' | 'outbound';
export type ProviderStatus = 'healthy' | 'degraded' | 'unconfigured';
export type FailureStatus = 'open' | 'retried' | 'resolved';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface DeliveryLogRecord {
  id: string;
  tenantId: string;
  conversationId: string;
  channel: CommsChannel;
  direction: CommsDirection;
  provider: string;
  status: string;
  persona: string;
  packId: string;
  toNumber: string;
  fromNumber?: string;
  messageSummary: string;
  externalId?: string;
  timestamp: string;
}

export interface ConversationThread {
  id: string;
  tenantId: string;
  channel: CommsChannel;
  status: 'active' | 'closed' | 'escalated';
  persona: string;
  packId: string;
  numberId?: string;
  lastInboundAt?: string;
  lastOutboundAt?: string;
  collectedFields: Record<string, string>;
  messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>;
}

export interface FailureQueueRecord {
  id: string;
  tenantId: string;
  conversationId?: string;
  channel: CommsChannel;
  provider: string;
  reason: string;
  detail: string;
  status: FailureStatus;
  createdAt: string;
  retriedAt?: string;
}

export interface ApprovalRecord {
  id: string;
  tenantId: string;
  conversationId?: string;
  actionType: string;
  reason: string;
  payload: Record<string, unknown>;
  status: ApprovalStatus;
  createdAt: string;
  resolvedAt?: string;
}

export interface WebhookEventRecord {
  id: string;
  provider: string;
  eventType: string;
  timestamp: string;
  payloadSummary: string;
}

export interface AiLedgerRecord {
  id: string;
  tenantId: string;
  conversationId?: string;
  persona: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUsd: number;
  confidence: number;
  approvalRequired: boolean;
  timestamp: string;
}

export interface PersonaRegistryRecord {
  id: string;
  persona: string;
  version: string;
  channelSupport: CommsChannel[];
  promptSummary: string;
  routingIntent: string;
  active: boolean;
  updatedAt: string;
}

export interface NumberPackRecord {
  id: string;
  persona: string;
  campaign: string;
  active: boolean;
  numberIds: string[];
  updatedAt: string;
}

export interface LeadRecord {
  id: string;
  phoneNumber: string;
  callerNumber?: string;
  persona: string;
  tenantId: string;
  status: string;
  qualification: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CommsProviderHealth {
  provider: string;
  status: ProviderStatus;
  configured: boolean;
  lastSuccessAt?: string;
  detail: string;
}

export interface RuntimeExecuteInput {
  tenantId: string;
  conversationId: string;
  channel: CommsChannel;
  persona: string;
  packId: string;
  callerInput: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  toNumber: string;
  fromNumber?: string;
}

export interface RuntimeExecuteResult {
  ok: boolean;
  message: string;
  confidence: number;
  approvalRequired: boolean;
  escalate: boolean;
  structured: {
    intent: string;
    contactName?: string;
    callbackNumber?: string;
    summary: string;
    nextAction: string;
  };
  ledger?: AiLedgerRecord;
}
