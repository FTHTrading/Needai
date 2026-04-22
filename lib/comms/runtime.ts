import { normalizeNumber } from '@/lib/telephony/normalize';
import { addApproval, addFailure, addLedgerEntry, addDeliveryLog, upsertLead, upsertThread, writeNeedaiWorkspaceReports } from './store';
import type { AiLedgerRecord, ConversationThread, LeadRecord, RuntimeExecuteInput, RuntimeExecuteResult } from './types';

const COST_PER_1K = {
  input: 0.00015,
  output: 0.0006,
};

const SENSITIVE_TERMS = ['lawsuit', 'attorney', 'suicide', 'death', 'credit card', 'social security', 'wire transfer', 'refund', 'chargeback'];

function generateId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function extractJsonObject(text: string): string | null {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

function computeConfidence(summary: string, callbackNumber?: string, contactName?: string, modelHint?: number): number {
  let score: number = Number.isFinite(modelHint) ? (modelHint as number) : 0.72;
  if (contactName) score += 0.08;
  if (callbackNumber) score += 0.08;
  if (summary.length < 30) score -= 0.15;
  if (SENSITIVE_TERMS.some((term) => summary.toLowerCase().includes(term))) score = Math.min(score, 0.45);
  return Math.max(0, Math.min(1, score));
}

async function callStructuredAI(input: RuntimeExecuteInput): Promise<{ ok: false; error: string } | { ok: true; content: string; usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number }; model: string }> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ok: false,
      error: 'OPENAI_API_KEY missing',
    };
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      max_tokens: 180,
      messages: [
        {
          role: 'system',
          content: [
            `You are NeedAI's shared communications runtime for persona ${input.persona}.`,
            'Return only JSON with keys: message, intent, contactName, callbackNumber, summary, nextAction, confidenceHint, approvalRequired, escalate.',
            'message must sound natural for voice or SMS and be under 2 sentences.',
            'For sensitive, risky, or unclear scenarios set approvalRequired or escalate to true.',
            'callbackNumber should be digits if present.',
          ].join(' '),
        },
        ...input.conversationHistory.map((entry) => ({ role: entry.role, content: entry.content })),
        {
          role: 'user',
          content: `Channel: ${input.channel}. Caller input: ${input.callerInput}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return { ok: false, error: `OpenAI error ${response.status}: ${await response.text()}` };
  }

  const payload = await response.json();
  return {
    ok: true,
    content: payload.choices?.[0]?.message?.content ?? '',
    usage: payload.usage ?? { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    model: payload.model ?? 'gpt-4o-mini',
  };
}

export async function executeRuntime(input: RuntimeExecuteInput): Promise<RuntimeExecuteResult> {
  const ai = await callStructuredAI(input);
  if (!ai.ok) {
    addFailure({
      tenantId: input.tenantId,
      conversationId: input.conversationId,
      channel: input.channel,
      provider: 'openai',
      reason: 'ai_call_failed',
      detail: ai.error,
    });
    return {
      ok: false,
      message: 'I am not fully confident in that response. Please share your name and callback number so we can follow up.',
      confidence: 0.25,
      approvalRequired: false,
      escalate: true,
      structured: {
        intent: 'invalid_json',
        summary: 'Model returned invalid JSON',
        nextAction: 'manual_follow_up',
      },
    };
  }

  const rawText = extractJsonObject(ai.content);
  let parsed: Record<string, unknown> = {};
  if (rawText) {
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // leave parsed empty — will degrade gracefully below
    }
  }

  const callbackNumber = parsed.callbackNumber ? normalizeNumber(String(parsed.callbackNumber)) : undefined;
  const contactName = parsed.contactName ? String(parsed.contactName) : undefined;
  const summary = String(parsed.summary ?? input.callerInput);
  const modelHint = Number(parsed.confidenceHint);
  const confidence = computeConfidence(
    summary,
    callbackNumber,
    contactName,
    Number.isFinite(modelHint) ? modelHint : undefined,
  );
  const approvalRequired = Boolean(parsed.approvalRequired) || SENSITIVE_TERMS.some((term) => input.callerInput.toLowerCase().includes(term));
  const escalate = Boolean(parsed.escalate) || confidence < 0.65;

  const ledger: AiLedgerRecord = {
    id: generateId('ledger'),
    tenantId: input.tenantId,
    conversationId: input.conversationId,
    persona: input.persona,
    model: ai.model,
    promptTokens: Number(ai.usage.prompt_tokens ?? 0),
    completionTokens: Number(ai.usage.completion_tokens ?? 0),
    totalTokens: Number(ai.usage.total_tokens ?? 0),
    costUsd: Number((((Number(ai.usage.prompt_tokens ?? 0) / 1000) * COST_PER_1K.input) + ((Number(ai.usage.completion_tokens ?? 0) / 1000) * COST_PER_1K.output)).toFixed(6)),
    confidence,
    approvalRequired,
    timestamp: new Date().toISOString(),
  };
  addLedgerEntry(ledger);

  const historyMessages = input.conversationHistory.map(
    (entry): ConversationThread['messages'][number] => ({
      role: entry.role,
      content: entry.content,
      timestamp: new Date().toISOString(),
    }),
  );
  const threadMessages = [
    ...historyMessages,
    { role: 'user' as const, content: input.callerInput, timestamp: new Date().toISOString() },
    { role: 'assistant' as const, content: String(parsed.message ?? ''), timestamp: new Date().toISOString() },
  ].slice(-12);

  const thread: ConversationThread = {
    id: input.conversationId,
    tenantId: input.tenantId,
    channel: input.channel,
    status: escalate ? 'escalated' : 'active',
    persona: input.persona,
    packId: input.packId,
    numberId: input.toNumber,
    lastInboundAt: new Date().toISOString(),
    lastOutboundAt: new Date().toISOString(),
    collectedFields: {
      ...(contactName ? { contactName } : {}),
      ...(callbackNumber ? { callbackNumber } : {}),
      summary,
    },
    messages: threadMessages,
  };
  upsertThread(thread);

  addDeliveryLog({
    tenantId: input.tenantId,
    conversationId: input.conversationId,
    channel: input.channel,
    direction: 'outbound',
    provider: input.channel === 'email' ? 'internal' : 'telnyx',
    status: escalate ? 'escalated' : 'delivered',
    persona: input.persona,
    packId: input.packId,
    toNumber: input.toNumber,
    fromNumber: input.fromNumber,
    messageSummary: String(parsed.message ?? '').slice(0, 160),
  });

  if (callbackNumber || contactName) {
    const lead: LeadRecord = {
      id: generateId('lead'),
      phoneNumber: callbackNumber ?? input.fromNumber ?? input.toNumber,
      callerNumber: input.fromNumber,
      persona: input.persona,
      tenantId: input.tenantId,
      status: escalate ? 'review' : 'new',
      qualification: confidence >= 0.85 ? 'qualified' : confidence >= 0.65 ? 'review' : 'pending',
      metadata: {
        summary,
        contactName,
        packId: input.packId,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    upsertLead(lead);
  }

  if (approvalRequired) {
    addApproval({
      tenantId: input.tenantId,
      conversationId: input.conversationId,
      actionType: 'sensitive_outbound_followup',
      reason: 'Sensitive or regulated interaction requires approval',
      payload: {
        persona: input.persona,
        summary,
        proposedMessage: String(parsed.message ?? ''),
      },
    });
  }

  if (escalate) {
    addFailure({
      tenantId: input.tenantId,
      conversationId: input.conversationId,
      channel: input.channel,
      provider: 'openai',
      reason: 'low_confidence_interaction',
      detail: summary,
    });
  }

  writeNeedaiWorkspaceReports();

  return {
    ok: true,
    message: String(parsed.message ?? 'Thank you. A specialist will follow up shortly.'),
    confidence,
    approvalRequired,
    escalate,
    structured: {
      intent: String(parsed.intent ?? 'general_intake'),
      contactName,
      callbackNumber,
      summary,
      nextAction: String(parsed.nextAction ?? (escalate ? 'manual_review' : 'continue_conversation')),
    },
    ledger,
  };
}
