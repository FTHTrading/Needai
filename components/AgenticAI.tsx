'use client';

import { useState, useEffect } from 'react';

interface AgentAction {
  id: string;
  agent: string;
  action: string;
  target: string;
  result: 'success' | 'pending' | 'failed';
  timestamp: string;
  impact: number;
}

interface AutonomousAgent {
  id: string;
  name: string;
  type: 'marketing' | 'targeting' | 'content' | 'monitoring';
  status: 'active' | 'idle' | 'learning' | 'error';
  currentTask: string;
  performance: number;
  autonomy: number; // 0-100% autonomous decision making
  lastAction: string;
}

interface AgenticAIProps {
  targetArea?: string;
}

export default function AgenticAI({ targetArea = 'Global' }: AgenticAIProps) {
  const [agents, setAgents] = useState<AutonomousAgent[]>([
    {
      id: '1',
      name: 'StormHunter-Agentic',
      type: 'monitoring',
      status: 'active',
      currentTask: 'Monitoring weather patterns in Gulf Coast',
      performance: 96,
      autonomy: 89,
      lastAction: 'Deployed emergency marketing in Houston'
    },
    {
      id: '2',
      name: 'DemandSeeker-Agentic',
      type: 'targeting',
      status: 'active',
      currentTask: 'Analyzing high-demand areas in California',
      performance: 92,
      autonomy: 94,
      lastAction: 'Optimized targeting for Los Angeles metro'
    },
    {
      id: '3',
      name: 'ContentCreator-Agentic',
      type: 'content',
      status: 'active',
      currentTask: 'Generating location-specific ad copy',
      performance: 88,
      autonomy: 76,
      lastAction: 'Created 15 local marketing variations'
    },
    {
      id: '4',
      name: 'CampaignManager-Agentic',
      type: 'marketing',
      status: 'learning',
      currentTask: 'Learning from successful campaign patterns',
      performance: 85,
      autonomy: 91,
      lastAction: 'Analyzed 200+ campaign outcomes'
    }
  ]);

  const [recentActions, setRecentActions] = useState<AgentAction[]>([
    {
      id: '1',
      agent: 'StormHunter-Agentic',
      action: 'Weather Alert Response',
      target: 'Houston, TX',
      result: 'success',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      impact: 87
    },
    {
      id: '2',
      agent: 'DemandSeeker-Agentic',
      action: 'Area Optimization',
      target: 'Los Angeles, CA',
      result: 'success',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      impact: 92
    },
    {
      id: '3',
      agent: 'ContentCreator-Agentic',
      action: 'Local Ad Generation',
      target: 'Miami, FL',
      result: 'pending',
      timestamp: new Date(Date.now() - 120000).toISOString(),
      impact: 0
    }
  ]);

  const [isAutoMode, setIsAutoMode] = useState(true);

  // Simulate real-time agent activity
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoMode) {
        // Randomly update agent statuses and add new actions
        setAgents(prev => prev.map(agent => ({
          ...agent,
          performance: Math.max(80, Math.min(100, agent.performance + (Math.random() - 0.5) * 2)),
          autonomy: Math.max(70, Math.min(100, agent.autonomy + (Math.random() - 0.5) * 1))
        })));

        // Add new action occasionally
        if (Math.random() < 0.3) {
          const newAction: AgentAction = {
            id: Date.now().toString(),
            agent: agents[Math.floor(Math.random() * agents.length)].name,
            action: ['Campaign Optimization', 'Content Generation', 'Target Adjustment', 'Weather Response'][Math.floor(Math.random() * 4)],
            target: ['New York, NY', 'Chicago, IL', 'Phoenix, AZ', 'Seattle, WA'][Math.floor(Math.random() * 4)],
            result: 'success',
            timestamp: new Date().toISOString(),
            impact: Math.floor(Math.random() * 30) + 70
          };
          setRecentActions(prev => [newAction, ...prev.slice(0, 9)]);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoMode, agents]);

  const toggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
  };

  const overrideAgent = (agentId: string) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId
        ? { ...agent, status: 'idle', autonomy: Math.max(0, agent.autonomy - 10) }
        : agent
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'learning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'monitoring': return '👁️';
      case 'targeting': return '🎯';
      case 'content': return '✍️';
      case 'marketing': return '📢';
      default: return '🤖';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Agentic AI Fleet</h3>
          <p className="text-sm text-gray-600">24/7 Autonomous Marketing Agents â€¢ Target: {targetArea}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{agents.filter(a => a.status === 'active').length}</div>
            <div className="text-xs text-gray-500">Active Agents</div>
          </div>
          <button
            onClick={toggleAutoMode}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isAutoMode
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            {isAutoMode ? '🤖 Auto Mode ON' : '👤 Manual Mode'}
          </button>
        </div>
      </div>

      {/* Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {agents.map((agent) => (
          <div key={agent.id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{getTypeIcon(agent.type)}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => overrideAgent(agent.id)}
                className="text-xs text-gray-500 hover:text-gray-700"
                disabled={!isAutoMode}
              >
                Override
              </button>
            </div>

            <div className="space-y-2 mb-3">
              <div className="text-sm text-gray-700">{agent.currentTask}</div>
              <div className="text-xs text-gray-600">Last: {agent.lastAction}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">Performance</div>
                <div className="text-lg font-bold text-blue-600">{agent.performance}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Autonomy</div>
                <div className="text-lg font-bold text-green-600">{agent.autonomy}%</div>
              </div>
            </div>

            {agent.status === 'active' && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${agent.performance}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Real-time Actions Feed */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Real-time Actions</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentActions.map((action) => (
            <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  action.result === 'success' ? 'bg-green-500' :
                  action.result === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {action.agent}: {action.action}
                  </div>
                  <div className="text-xs text-gray-600">Target: {action.target}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {action.result === 'success' ? `+${action.impact}%` : action.result}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(action.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomy Controls */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Autonomy Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900 mb-1">Decision Threshold</div>
            <div className="text-sm text-blue-700">Agents can make decisions with 80%+ confidence</div>
            <div className="mt-2">
              <input
                type="range"
                min="50"
                max="95"
                defaultValue="80"
                className="w-full"
              />
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="font-medium text-green-900 mb-1">Learning Rate</div>
            <div className="text-sm text-green-700">Continuous improvement from campaign data</div>
            <div className="mt-2">
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            <span className="font-medium">System Health:</span> All agents operational • 99.7% uptime
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-green-600">Healthy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
