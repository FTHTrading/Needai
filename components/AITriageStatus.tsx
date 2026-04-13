'use client';

interface AITriageData {
  totalCalls: number;
  routed: number;
  escalated: number;
  pending: number;
}

interface AITriageStatusProps {
  data: AITriageData;
}

export default function AITriageStatus({ data }: AITriageStatusProps) {
  const routedPercent = Math.round((data.routed / data.totalCalls) * 100);
  const escalatedPercent = Math.round((data.escalated / data.totalCalls) * 100);
  const pendingPercent = Math.round((data.pending / data.totalCalls) * 100);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Triage Status</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Calls Processed</span>
          <span className="text-lg font-semibold text-gray-900">
            {data.totalCalls.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600">✓ Routed</span>
            <span className="text-sm font-medium text-green-600">
              {data.routed} ({routedPercent}%)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-orange-600">⚠️ Escalated</span>
            <span className="text-sm font-medium text-orange-600">
              {data.escalated} ({escalatedPercent}%)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600">⏳ Pending</span>
            <span className="text-sm font-medium text-blue-600">
              {data.pending} ({pendingPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${routedPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 w-8">{routedPercent}%</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${escalatedPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 w-8">{escalatedPercent}%</span>
        </div>
      </div>
    </div>
  );
}