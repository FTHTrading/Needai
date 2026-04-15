'use client';

import { useEffect, useState } from 'react';

type Summary = any;

export default function CommsControlCenter() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const response = await fetch('/api/control/summary', { cache: 'no-store' });
    setSummary(await response.json());
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  async function retryFailure(id: string) {
    setBusyId(id);
    await fetch(`/api/control/failures/${id}/retry`, { method: 'POST' });
    setBusyId(null);
    await load();
  }

  async function approve(id: string) {
    setBusyId(id);
    await fetch(`/api/control/approvals/${id}/approve`, { method: 'POST' });
    setBusyId(null);
    await load();
  }

  async function togglePack(id: string, active: boolean) {
    setBusyId(id);
    await fetch(`/api/control/number-packs/${id}/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active }),
    });
    setBusyId(null);
    await load();
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto p-8">Loading control center...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">NeedAI Control Center</h1>
        <p className="text-gray-600 mt-2">Shared communications spine controls for voice, SMS, approvals, routing packs, and AI runtime health.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Voice Queue" value={summary?.queues?.voice ?? 0} />
        <MetricCard label="SMS Queue" value={summary?.queues?.sms ?? 0} />
        <MetricCard label="Open Failures" value={summary?.queues?.failures ?? 0} />
        <MetricCard label="Pending Approvals" value={summary?.queues?.approvals ?? 0} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Provider Health">
          <pre className="text-sm overflow-auto">{JSON.stringify(summary?.providerHealth ?? [], null, 2)}</pre>
        </Panel>
        <Panel title="AI Usage">
          <div className="space-y-2 text-sm">
            <div>Total tokens: <strong>{summary?.usage?.totalTokens ?? 0}</strong></div>
            <div>Total cost: <strong>${summary?.usage?.totalCostUsd ?? 0}</strong></div>
            <div>Confidence: low {summary?.confidence?.low ?? 0} · medium {summary?.confidence?.medium ?? 0} · high {summary?.confidence?.high ?? 0}</div>
          </div>
        </Panel>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Failures And Retries">
          <div className="space-y-3">
            {(summary?.failures ?? []).slice(0, 10).map((item: any) => (
              <div key={item.id} className="border rounded-md p-3 bg-white">
                <div className="font-medium">{item.reason}</div>
                <div className="text-sm text-gray-600">{item.detail}</div>
                <button className="mt-2 px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-300" disabled={busyId === item.id || item.status !== 'open'} onClick={() => retryFailure(item.id)}>
                  {busyId === item.id ? 'Retrying...' : 'Retry'}
                </button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Approvals">
          <div className="space-y-3">
            {(summary?.approvals ?? []).slice(0, 10).map((item: any) => (
              <div key={item.id} className="border rounded-md p-3 bg-white">
                <div className="font-medium">{item.actionType}</div>
                <div className="text-sm text-gray-600">{item.reason}</div>
                <button className="mt-2 px-3 py-1 rounded bg-green-600 text-white disabled:bg-gray-300" disabled={busyId === item.id || item.status !== 'pending'} onClick={() => approve(item.id)}>
                  {busyId === item.id ? 'Approving...' : 'Approve'}
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Number Pack Activation">
          <div className="space-y-3">
            {(summary?.numberPacks ?? []).map((pack: any) => (
              <div key={pack.id} className="flex items-center justify-between border rounded-md p-3 bg-white">
                <div>
                  <div className="font-medium">{pack.campaign}</div>
                  <div className="text-sm text-gray-600">{pack.numberIds.length} numbers · persona {pack.persona}</div>
                </div>
                <button className="px-3 py-1 rounded bg-slate-800 text-white disabled:bg-gray-300" disabled={busyId === pack.id} onClick={() => togglePack(pack.id, !pack.active)}>
                  {busyId === pack.id ? 'Saving...' : pack.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Persona Registry">
          <pre className="text-sm overflow-auto">{JSON.stringify(summary?.personas ?? [], null, 2)}</pre>
        </Panel>
      </section>

      <Panel title="Recent Deliveries">
        <pre className="text-sm overflow-auto">{JSON.stringify(summary?.deliveries ?? [], null, 2)}</pre>
      </Panel>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-gray-100 rounded-xl p-5 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      {children}
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}
