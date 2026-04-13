'use client';

import { useState } from 'react';
import Navigation from '../../components/Navigation';
import RAGSystem from '../../components/RAGSystem';
import AgenticAI from '../../components/AgenticAI';
import WeatherTargeting from '../../components/WeatherTargeting';

interface TargetingRule {
  id: string;
  name: string;
  type: 'weather' | 'demand' | 'seasonal' | 'geographic';
  conditions: string[];
  active: boolean;
  performance: number;
}

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  reach: number;
  engagement: number;
}

interface AIAgent {
  id: string;
  name: string;
  type: 'rag' | 'agentic' | 'hybrid';
  status: 'active' | 'idle' | 'learning';
  targetAreas: string[];
  campaigns: number;
  conversions: number;
}

export default function AIMarketingHub() {
  const [activeTab, setActiveTab] = useState('overview');

  const targetingRules: TargetingRule[] = [
    {
      id: '1',
      name: 'Storm Damage Response',
      type: 'weather',
      conditions: ['Severe Weather Alert', 'High Wind', 'Heavy Rain', 'Storm Path'],
      active: true,
      performance: 87
    },
    {
      id: '2',
      name: 'High Demand Areas',
      type: 'demand',
      conditions: ['Population Density > 500/sq mi', 'Income > $75k', 'Recent Claims Activity'],
      active: true,
      performance: 92
    },
    {
      id: '3',
      name: 'Seasonal Roofing',
      type: 'seasonal',
      conditions: ['Spring Season', 'Hail Risk Areas', 'Age of Roofs > 15 years'],
      active: false,
      performance: 78
    },
    {
      id: '4',
      name: 'Urban Targeting',
      type: 'geographic',
      conditions: ['Major Metro Areas', 'High Traffic Zones', 'Business Districts'],
      active: true,
      performance: 95
    }
  ];

  const socialPlatforms: SocialPlatform[] = [
    { id: 'facebook', name: 'Facebook', icon: '📘', connected: true, reach: 2500000, engagement: 4.2 },
    { id: 'instagram', name: 'Instagram', icon: '📷', connected: true, reach: 1800000, engagement: 5.8 },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', connected: true, reach: 950000, engagement: 3.1 },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', connected: true, reach: 3200000, engagement: 7.4 },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: false, reach: 0, engagement: 0 },
    { id: 'youtube', name: 'YouTube', icon: '📺', connected: true, reach: 4100000, engagement: 6.2 }
  ];

  const aiAgents: AIAgent[] = [
    {
      id: '1',
      name: 'StormResponse-RAG',
      type: 'rag',
      status: 'active',
      targetAreas: ['Texas', 'Florida', 'Carolinas'],
      campaigns: 45,
      conversions: 127
    },
    {
      id: '2',
      name: 'DemandHunter-Agentic',
      type: 'agentic',
      status: 'active',
      targetAreas: ['California', 'New York', 'Illinois'],
      campaigns: 67,
      conversions: 203
    },
    {
      id: '3',
      name: 'SeasonalOptimizer-Hybrid',
      type: 'hybrid',
      status: 'learning',
      targetAreas: ['All States'],
      campaigns: 23,
      conversions: 89
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation showBackButton backTo="/" backLabel="Home" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 Ultimate AI Marketing Hub
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            24/7 Agentic RAG Systems • Algorithmic Area Targeting • Weather-Driven Marketing • Social Media Domination
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
              🟢 24/7 Active Systems
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
              🎯 Algorithmic Targeting
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold">
              🌦️ Weather Integration
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-semibold">
              📱 Social Media AI
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'agents', label: 'AI Agents', icon: '🤖' },
              { id: 'rag', label: 'RAG System', icon: '🧠' },
              { id: 'agentic', label: 'Agentic AI', icon: '⚡' },
              { id: 'targeting', label: 'Targeting Rules', icon: '🎯' },
              { id: 'social', label: 'Social Media', icon: '📱' },
              { id: 'weather', label: 'Weather Events', icon: '🌦️' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🤖</div>
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-gray-600">Active AI Agents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-gray-600">Targeting Rules</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-gray-600">Social Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌦️</div>
                  <div className="text-2xl font-bold text-orange-600">24</div>
                  <div className="text-gray-600">Weather Events Tracked</div>
                </div>
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-time Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-semibold">StormResponse-RAG</div>
                      <div className="text-sm text-gray-600">Deploying emergency marketing in Houston, TX</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">2 min ago</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-semibold">DemandHunter-Agentic</div>
                      <div className="text-sm text-gray-600">Optimizing campaigns for high-demand areas in California</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">5 min ago</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-semibold">Social Media AI</div>
                      <div className="text-sm text-gray-600">Posting weather-targeted content across 5 platforms</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">8 min ago</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rag' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">RAG Knowledge System</h2>
                <p className="text-gray-600">Retrieval-Augmented Generation for intelligent marketing decisions</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-500">Active Learning</div>
              </div>
            </div>

            <RAGSystem targetArea="United States" category="Marketing" />
          </div>
        )}

        {activeTab === 'agentic' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Agentic AI Fleet</h2>
                <p className="text-gray-600">Autonomous AI agents making real-time marketing decisions</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-gray-500">Active Agents</div>
              </div>
            </div>

            <AgenticAI targetArea="Global" />
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">AI Agent Fleet</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Deploy New Agent
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiAgents.map((agent) => (
                <div key={agent.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' :
                      agent.status === 'learning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{agent.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Areas:</span>
                      <span className="font-medium">{agent.targetAreas.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Campaigns:</span>
                      <span className="font-medium">{agent.campaigns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversions:</span>
                      <span className="font-medium text-green-600">{agent.conversions}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                      Configure
                    </button>
                    <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700">
                      Monitor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'targeting' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Algorithmic Targeting Rules</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Create Rule
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {targetingRules.map((rule) => (
                <div key={rule.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{rule.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        rule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-sm text-gray-500">{rule.performance}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      rule.type === 'weather' ? 'bg-blue-100 text-blue-800' :
                      rule.type === 'demand' ? 'bg-green-100 text-green-800' :
                      rule.type === 'seasonal' ? 'bg-orange-100 text-orange-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium text-gray-700">Conditions:</div>
                    {rule.conditions.map((condition, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                        • {condition}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                      Edit
                    </button>
                    <button className={`flex-1 px-3 py-2 rounded text-sm ${
                      rule.active
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}>
                      {rule.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Social Media Integration</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Connect Platform
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialPlatforms.map((platform) => (
                <div key={platform.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{platform.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{platform.name}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      platform.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {platform.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>

                  {platform.connected && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reach:</span>
                        <span className="font-medium">{platform.reach.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Engagement:</span>
                        <span className="font-medium">{platform.engagement}%</span>
                      </div>
                    </div>
                  )}

                  <button className={`w-full px-4 py-2 rounded text-sm font-medium ${
                    platform.connected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                    {platform.connected ? 'Manage' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>

            {/* AI Content Generation */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Content Generation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-semibold">Post Generation</div>
                  <div className="text-sm text-gray-600">Weather-targeted content</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="font-semibold">Image Creation</div>
                  <div className="text-sm text-gray-600">AI-generated visuals</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold">Analytics</div>
                  <div className="text-sm text-gray-600">Performance tracking</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Weather-Driven Marketing</h2>
              <p className="text-gray-600">AI-powered weather event detection and automated marketing response</p>
            </div>

            <WeatherTargeting autoDeploy={true} />

            {/* Weather Marketing Strategies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Storm Response</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Immediate emergency marketing deployment</li>
                  <li>• Local presence messaging ("We're in [City]")</li>
                  <li>• 24/7 monitoring and response</li>
                  <li>• Damage assessment content generation</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Preventive Marketing</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Weather prediction integration</li>
                  <li>• Pre-storm preparation campaigns</li>
                  <li>• Seasonal maintenance reminders</li>
                  <li>• Risk assessment targeting</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Marketing Analytics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl mb-2">📞</div>
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-gray-600">Calls Generated</div>
                <div className="text-sm text-green-600 mt-1">+23% vs last week</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-green-600">$89,432</div>
                <div className="text-gray-600">Revenue Generated</div>
                <div className="text-sm text-green-600 mt-1">+31% vs last week</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-purple-600">94.2%</div>
                <div className="text-gray-600">Targeting Accuracy</div>
                <div className="text-sm text-green-600 mt-1">+5.1% vs last week</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl mb-2">🤖</div>
                <div className="text-2xl font-bold text-orange-600">99.7%</div>
                <div className="text-gray-600">AI Uptime</div>
                <div className="text-sm text-green-600 mt-1">+0.2% vs last week</div>
              </div>
            </div>

            {/* Performance Charts Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Trends</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📈</div>
                  <div>Real-time analytics visualization</div>
                  <div className="text-sm">Charts and graphs would display here</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
