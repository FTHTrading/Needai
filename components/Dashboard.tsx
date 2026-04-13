'use client';

import { useState, useEffect } from 'react';
import WeatherMap from '@/components/WeatherMap';
import ActiveNumbers from '@/components/ActiveNumbers';
import CallVolume from '@/components/CallVolume';
import AITriageStatus from '@/components/AITriageStatus';
import RegionActivation from '@/components/RegionActivation';
import StormModeToggle from '@/components/StormModeToggle';
import PricingCalculator from '@/components/PricingCalculator';
import ActiveWeatherActivations from '@/components/ActiveWeatherActivations';

interface DashboardData {
  stormMode: boolean;
  hailMode: boolean;
  activeRegions: string[];
  weatherAlerts: any[];
  callVolume: {
    total: number;
    storm: number;
    hail: number;
    lastHour: number;
  };
  aiTriage: {
    totalCalls: number;
    routed: number;
    escalated: number;
    pending: number;
  };
  monitoringStatus?: {
    monitoringLocations: number;
    activeRules: number;
    activeNumbers: number;
    lastSignal: any;
    apiKeyConfigured: boolean;
  };
}

export default function Dashboard({ canonicalCount }: { canonicalCount: number }) {
  const [data, setData] = useState<DashboardData>({
    stormMode: false,
    hailMode: false,
    activeRegions: [],
    weatherAlerts: [],
    callVolume: {
      total: 0,
      storm: 0,
      hail: 0,
      lastHour: 0,
    },
    aiTriage: {
      totalCalls: 0,
      routed: 0,
      escalated: 0,
      pending: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [monitoring, setMonitoring] = useState(false);

  const triggerWeatherMonitoring = async () => {
    setMonitoring(true);
    try {
      const response = await fetch('/api/weather-monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'monitor' })
      });
      const result = await response.json();

      if (result.success) {
        alert(`Monitoring complete! Found ${result.signalsFound} signals, triggered ${result.activations.length} activations.`);
        // Reload dashboard data
        window.location.reload();
      } else {
        alert('Monitoring failed: ' + result.error);
      }
    } catch (error) {
      alert('Failed to trigger monitoring: ' + error);
    }
    setMonitoring(false);
  };

  useEffect(() => {
    // Fetch real data from weather trigger engine
    const loadDashboard = async () => {
      try {
        const [triggerResponse, monitorResponse] = await Promise.all([
          fetch('/api/weather-trigger'),
          fetch('/api/weather-monitor')
        ]);

        const triggerData = await triggerResponse.json();
        const monitorData = await monitorResponse.json();

        // Transform to dashboard format
        const activeRegions: string[] = Array.from(new Set(
          triggerData.activeNumbers
            .filter((n: any) => n.state === 'active')
            .map((n: any) => n.number.includes('470') ? 'Georgia' :
                            n.number.includes('727') || n.number.includes('786') ? 'Florida' :
                            n.number.includes('580') ? 'Oklahoma' :
                            n.number.includes('520') || n.number.includes('623') ? 'Arizona' :
                            n.number.includes('262') ? 'Wisconsin' : 'National')
        ));

        setData({
          stormMode: triggerData.activeRules.some((r: string) => r.includes('STORM')),
          hailMode: triggerData.activeRules.some((r: string) => r.includes('HAIL')),
          activeRegions,
          weatherAlerts: triggerData.lastSignal ? [{
            region: `${triggerData.lastSignal.region.county || 'Unknown'}, ${triggerData.lastSignal.region.state}`,
            severity: triggerData.lastSignal.event_type,
            size: triggerData.lastSignal.hail_size_inches ? `${triggerData.lastSignal.hail_size_inches}in` : undefined,
            winds: triggerData.lastSignal.wind_speed_mph ? `${triggerData.lastSignal.wind_speed_mph}mph` : undefined
          }] : [],
          callVolume: {
            total: 1247, // Would come from call data API
            storm: triggerData.activeNumbers.filter((n: any) => n.ai_mode?.includes('storm')).length * 100,
            hail: triggerData.activeNumbers.filter((n: any) => n.ai_mode?.includes('hail')).length * 100,
            lastHour: 23,
          },
          aiTriage: {
            totalCalls: 1247,
            routed: 1156,
            escalated: 67,
            pending: 24,
          },
          monitoringStatus: monitorData,
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        // Fall back to mock data
        setData({
          stormMode: false,
          hailMode: false,
          activeRegions: [],
          weatherAlerts: [],
          callVolume: {
            total: 0,
            storm: 0,
            hail: 0,
            lastHour: 0,
          },
          aiTriage: {
            totalCalls: 0,
            routed: 0,
            escalated: 0,
            pending: 0,
          },
        });
      }
      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Weather Intake OS Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Real-time monitoring and control of your AI-powered weather intake network
        </p>
      </div>

      {/* Top Bar - Mode Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <StormModeToggle
              stormMode={data.stormMode}
              hailMode={data.hailMode}
              onToggle={(type, enabled) => {
                setData(prev => ({
                  ...prev,
                  [type === 'storm' ? 'stormMode' : 'hailMode']: enabled,
                }));
              }}
            />
            <div className="text-sm text-gray-600">
              Active Regions: {data.activeRegions.join(', ')}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Weather Monitoring Status */}
            <div className="text-right">
              <div className="text-sm text-gray-600">Weather Monitor</div>
              <div className="text-xs text-gray-500">
                {data.monitoringStatus?.apiKeyConfigured ? 'API Connected' : 'API Key Missing'}
              </div>
              <div className="text-xs text-gray-500">
                {data.monitoringStatus?.monitoringLocations || 0} locations
              </div>
            </div>

            {/* Manual Monitor Button */}
            <button
              onClick={triggerWeatherMonitoring}
              disabled={monitoring || !data.monitoringStatus?.apiKeyConfigured}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {monitoring ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Monitoring...</span>
                </>
              ) : (
                <span>Check Weather</span>
              )}
            </button>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {data.callVolume.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Calls Today</div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{canonicalCount}</div>
              <div className="text-sm text-gray-600">Canonical Numbers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Panel - Weather Map */}
        <div className="lg:col-span-2">
          <WeatherMap alerts={data.weatherAlerts} />
        </div>

        {/* Right Panel - Call Volume & AI Triage */}
        <div className="space-y-6">
          <CallVolume data={data.callVolume} />
          <AITriageStatus data={data.aiTriage} />
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActiveNumbers />
        <RegionActivation regions={data.activeRegions} />
      </div>

      {/* Active Weather Activations */}
      <div className="mb-6">
        <ActiveWeatherActivations />
      </div>

      {/* Pricing Calculator */}
      <PricingCalculator />
    </div>
  );
}
