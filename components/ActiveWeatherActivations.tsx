'use client';

import { useState, useEffect } from 'react';

interface ActiveActivation {
  number: string;
  state: 'active' | 'standby' | 'inactive';
  activation_reason?: string;
  event_id?: string;
  activated_at?: string;
  ai_mode?: string;
}

interface WeatherActivationData {
  activeNumbers: ActiveActivation[];
  activeRules: string[];
  lastSignal?: any;
  auditLog: any[];
}

export default function ActiveWeatherActivations() {
  const [data, setData] = useState<WeatherActivationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivations = async () => {
      try {
        const response = await fetch('/api/weather-trigger');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch activations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivations();
    // Refresh every 30 seconds
    const interval = setInterval(fetchActivations, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Weather Activations</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Weather Activations</h3>
        <p className="text-gray-600">Unable to load activation data</p>
      </div>
    );
  }

  const activeActivations = data.activeNumbers.filter(n => n.state === 'active');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Weather Activations</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${activeActivations.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-sm text-gray-600">
            {activeActivations.length > 0 ? `${activeActivations.length} Active` : 'All Clear'}
          </span>
        </div>
      </div>

      {activeActivations.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">☀️</div>
          <p className="text-gray-600">No weather activations currently active</p>
          <p className="text-sm text-gray-500 mt-1">All numbers operating in normal mode</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeActivations.map((activation) => (
            <div key={activation.number} className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-lg font-mono font-semibold text-red-700">
                    {activation.number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                  </div>
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full uppercase">
                    {activation.ai_mode || 'Active'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Activated {activation.activated_at ? new Date(activation.activated_at).toLocaleTimeString() : 'Recently'}
                  </div>
                </div>
              </div>

              {activation.activation_reason && (
                <div className="text-sm text-red-700 mb-2">
                  <strong>Reason:</strong> {activation.activation_reason}
                </div>
              )}

              {activation.event_id && (
                <div className="text-xs text-gray-500">
                  Event ID: {activation.event_id}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.activeRules.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Active Rules</h4>
          <div className="flex flex-wrap gap-2">
            {data.activeRules.map((rule) => (
              <span key={rule} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {rule}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.lastSignal && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Last Weather Signal</h4>
          <div className="text-sm text-gray-600">
            {data.lastSignal.event_type} in {data.lastSignal.region?.county || 'Unknown'}, {data.lastSignal.region?.state} - {data.lastSignal.severity}% severity
          </div>
        </div>
      )}
    </div>
  );
}