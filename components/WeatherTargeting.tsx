'use client';

import { useState, useEffect } from 'react';

interface WeatherEvent {
  id: string;
  location: string;
  event: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  impact: number;
  aiAction: string;
  timestamp: string;
  coordinates: { lat: number; lng: number };
}

interface WeatherTargetingProps {
  autoDeploy?: boolean;
}

export default function WeatherTargeting({ autoDeploy = true }: WeatherTargetingProps) {
  const [weatherEvents, setWeatherEvents] = useState<WeatherEvent[]>([
    {
      id: '1',
      location: 'Houston, TX',
      event: 'Severe Thunderstorm',
      severity: 'severe',
      impact: 85,
      aiAction: 'Deployed emergency marketing, local presence claims activated',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      coordinates: { lat: 29.7604, lng: -95.3698 }
    },
    {
      id: '2',
      location: 'Miami, FL',
      event: 'Hurricane Watch',
      severity: 'extreme',
      impact: 95,
      aiAction: 'Maximum marketing deployment, 24/7 monitoring active',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    {
      id: '3',
      location: 'Denver, CO',
      event: 'Winter Storm',
      severity: 'moderate',
      impact: 70,
      aiAction: 'Seasonal marketing activated, emergency services highlighted',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      coordinates: { lat: 39.7392, lng: -104.9903 }
    }
  ]);

  const [targetingMetrics, setTargetingMetrics] = useState({
    activeCampaigns: 12,
    areasCovered: 45,
    impressionsGenerated: 2500000,
    conversions: 387
  });

  const [isMonitoring, setIsMonitoring] = useState(autoDeploy);

  // Simulate real-time weather updates
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Randomly update existing events or add new ones
      setWeatherEvents(prev => prev.map(event => ({
        ...event,
        impact: Math.max(50, Math.min(100, event.impact + (Math.random() - 0.5) * 5))
      })));

      // Occasionally add new weather events
      if (Math.random() < 0.1) {
        const newEvent: WeatherEvent = {
          id: Date.now().toString(),
          location: ['Atlanta, GA', 'Chicago, IL', 'Phoenix, AZ', 'Seattle, WA'][Math.floor(Math.random() * 4)],
          event: ['Heavy Rain', 'High Winds', 'Flood Warning', 'Tornado Watch'][Math.floor(Math.random() * 4)],
          severity: ['minor', 'moderate', 'severe'][Math.floor(Math.random() * 3)] as any,
          impact: Math.floor(Math.random() * 50) + 50,
          aiAction: 'AI analyzing optimal response strategy...',
          timestamp: new Date().toISOString(),
          coordinates: {
            lat: 30 + Math.random() * 20,
            lng: -120 + Math.random() * 50
          }
        };
        setWeatherEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }

      // Update metrics
      setTargetingMetrics(prev => ({
        activeCampaigns: prev.activeCampaigns + (Math.random() > 0.7 ? 1 : 0),
        areasCovered: prev.areasCovered + (Math.random() > 0.8 ? 1 : 0),
        impressionsGenerated: prev.impressionsGenerated + Math.floor(Math.random() * 10000),
        conversions: prev.conversions + (Math.random() > 0.6 ? 1 : 0)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme': return 'text-red-600 bg-red-100';
      case 'severe': return 'text-orange-600 bg-orange-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'minor': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const deployEmergencyMarketing = (eventId: string) => {
    setWeatherEvents(prev => prev.map(event =>
      event.id === eventId
        ? {
            ...event,
            aiAction: '🚨 EMERGENCY MARKETING DEPLOYED: Local presence claims activated, 24/7 response messaging, area-specific targeting initiated',
            impact: Math.min(100, event.impact + 15)
          }
        : event
    ));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Weather-Driven Marketing</h3>
          <p className="text-sm text-gray-600">Real-time weather event targeting and automated response</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isMonitoring
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            {isMonitoring ? '🟢 Monitoring ON' : '🔴 Monitoring OFF'}
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{targetingMetrics.activeCampaigns}</div>
          <div className="text-xs text-blue-700">Active Campaigns</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">{targetingMetrics.areasCovered}</div>
          <div className="text-xs text-green-700">Areas Covered</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-xl font-bold text-purple-600">{formatNumber(targetingMetrics.impressionsGenerated)}</div>
          <div className="text-xs text-purple-700">Impressions</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-xl font-bold text-orange-600">{targetingMetrics.conversions}</div>
          <div className="text-xs text-orange-700">Conversions</div>
        </div>
      </div>

      {/* Active Weather Events */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Active Weather Events</h4>
        <div className="space-y-3">
          {weatherEvents.map((event) => (
            <div key={event.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`px-2 py-1 rounded text-sm font-medium mr-3 ${getSeverityColor(event.severity)}`}>
                    {event.severity.toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{event.location}</h5>
                    <p className="text-sm text-gray-600">{event.event}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{event.impact}%</div>
                  <div className="text-xs text-gray-500">Impact Score</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                  <strong>AI Action:</strong> {event.aiAction}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
                <button
                  onClick={() => deployEmergencyMarketing(event.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Deploy Emergency Marketing
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Targeting Strategies */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">AI Weather Targeting Strategies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <h5 className="font-medium text-red-900 mb-2">🚨 Emergency Response</h5>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Immediate local presence claims</li>
              <li>• 24/7 availability messaging</li>
              <li>• Emergency service highlighting</li>
              <li>• Geographic targeting within storm path</li>
            </ul>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">📊 Predictive Marketing</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Weather forecast integration</li>
              <li>• Pre-event preparation campaigns</li>
              <li>• Risk assessment targeting</li>
              <li>• Seasonal pattern optimization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Weather API Status:</span> Connected • Last update: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-green-600">Real-time monitoring active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
