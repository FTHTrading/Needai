import { computeProviderHealth, getApprovals, getDeliveryLogs, getFailures, getLedger, getNumberPacks, getPersonas, getThreads, writeNeedaiWorkspaceReports } from './store';

export function getControlCenterSummary() {
  const providerHealth = computeProviderHealth();
  const deliveries = getDeliveryLogs();
  const failures = getFailures();
  const approvals = getApprovals();
  const ledger = getLedger();
  const packs = getNumberPacks();
  const personas = getPersonas();
  const threads = getThreads();
  const activeThreads = threads.filter((thread) => thread.status === 'active');
  const voiceQueue = activeThreads.filter((thread) => thread.channel === 'voice');
  const smsQueue = activeThreads.filter((thread) => thread.channel === 'sms');

  const confidence = ledger.length > 0 ? {
    low: ledger.filter((item) => item.confidence < 0.65).length,
    medium: ledger.filter((item) => item.confidence >= 0.65 && item.confidence < 0.85).length,
    high: ledger.filter((item) => item.confidence >= 0.85).length,
  } : { low: 0, medium: 0, high: 0 };

  writeNeedaiWorkspaceReports();

  return {
    generatedAt: new Date().toISOString(),
    providerHealth,
    queues: {
      voice: voiceQueue.length,
      sms: smsQueue.length,
      failures: failures.filter((item) => item.status === 'open').length,
      approvals: approvals.filter((item) => item.status === 'pending').length,
    },
    confidence,
    usage: {
      totalTokens: ledger.reduce((sum, item) => sum + item.totalTokens, 0),
      totalCostUsd: Number(ledger.reduce((sum, item) => sum + item.costUsd, 0).toFixed(4)),
      recentEntries: ledger.slice(0, 10),
    },
    deliveries: deliveries.slice(0, 20),
    failures: failures.slice(0, 20),
    approvals: approvals.slice(0, 20),
    personas,
    numberPacks: packs,
    activeThreads: activeThreads.slice(0, 20),
  };
}
