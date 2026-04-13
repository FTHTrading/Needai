'use client';

import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';

const states = [
  { code: 'AL', name: 'Alabama', region: 'Southeast', timezone: 'Central' },
  { code: 'AK', name: 'Alaska', region: 'West', timezone: 'Alaska' },
  { code: 'AZ', name: 'Arizona', region: 'Southwest', timezone: 'Mountain' },
  { code: 'AR', name: 'Arkansas', region: 'South', timezone: 'Central' },
  { code: 'CA', name: 'California', region: 'West', timezone: 'Pacific' },
  { code: 'CO', name: 'Colorado', region: 'Mountain', timezone: 'Mountain' },
  { code: 'CT', name: 'Connecticut', region: 'Northeast', timezone: 'Eastern' },
  { code: 'DE', name: 'Delaware', region: 'Northeast', timezone: 'Eastern' },
  { code: 'FL', name: 'Florida', region: 'Southeast', timezone: 'Eastern' },
  { code: 'GA', name: 'Georgia', region: 'Southeast', timezone: 'Eastern' },
  { code: 'HI', name: 'Hawaii', region: 'West', timezone: 'Hawaii' },
  { code: 'ID', name: 'Idaho', region: 'Mountain', timezone: 'Mountain' },
  { code: 'IL', name: 'Illinois', region: 'Midwest', timezone: 'Central' },
  { code: 'IN', name: 'Indiana', region: 'Midwest', timezone: 'Eastern' },
  { code: 'IA', name: 'Iowa', region: 'Midwest', timezone: 'Central' },
  { code: 'KS', name: 'Kansas', region: 'Midwest', timezone: 'Central' },
  { code: 'KY', name: 'Kentucky', region: 'South', timezone: 'Eastern' },
  { code: 'LA', name: 'Louisiana', region: 'South', timezone: 'Central' },
  { code: 'ME', name: 'Maine', region: 'Northeast', timezone: 'Eastern' },
  { code: 'MD', name: 'Maryland', region: 'Northeast', timezone: 'Eastern' },
  { code: 'MA', name: 'Massachusetts', region: 'Northeast', timezone: 'Eastern' },
  { code: 'MI', name: 'Michigan', region: 'Midwest', timezone: 'Eastern' },
  { code: 'MN', name: 'Minnesota', region: 'Midwest', timezone: 'Central' },
  { code: 'MS', name: 'Mississippi', region: 'South', timezone: 'Central' },
  { code: 'MO', name: 'Missouri', region: 'Midwest', timezone: 'Central' },
  { code: 'MT', name: 'Montana', region: 'Mountain', timezone: 'Mountain' },
  { code: 'NE', name: 'Nebraska', region: 'Midwest', timezone: 'Central' },
  { code: 'NV', name: 'Nevada', region: 'West', timezone: 'Pacific' },
  { code: 'NH', name: 'New Hampshire', region: 'Northeast', timezone: 'Eastern' },
  { code: 'NJ', name: 'New Jersey', region: 'Northeast', timezone: 'Eastern' },
  { code: 'NM', name: 'New Mexico', region: 'Southwest', timezone: 'Mountain' },
  { code: 'NY', name: 'New York', region: 'Northeast', timezone: 'Eastern' },
  { code: 'NC', name: 'North Carolina', region: 'Southeast', timezone: 'Eastern' },
  { code: 'ND', name: 'North Dakota', region: 'Midwest', timezone: 'Central' },
  { code: 'OH', name: 'Ohio', region: 'Midwest', timezone: 'Eastern' },
  { code: 'OK', name: 'Oklahoma', region: 'South', timezone: 'Central' },
  { code: 'OR', name: 'Oregon', region: 'West', timezone: 'Pacific' },
  { code: 'PA', name: 'Pennsylvania', region: 'Northeast', timezone: 'Eastern' },
  { code: 'RI', name: 'Rhode Island', region: 'Northeast', timezone: 'Eastern' },
  { code: 'SC', name: 'South Carolina', region: 'Southeast', timezone: 'Eastern' },
  { code: 'SD', name: 'South Dakota', region: 'Midwest', timezone: 'Central' },
  { code: 'TN', name: 'Tennessee', region: 'South', timezone: 'Central' },
  { code: 'TX', name: 'Texas', region: 'South', timezone: 'Central' },
  { code: 'UT', name: 'Utah', region: 'Mountain', timezone: 'Mountain' },
  { code: 'VT', name: 'Vermont', region: 'Northeast', timezone: 'Eastern' },
  { code: 'VA', name: 'Virginia', region: 'Southeast', timezone: 'Eastern' },
  { code: 'WA', name: 'Washington', region: 'West', timezone: 'Pacific' },
  { code: 'WV', name: 'West Virginia', region: 'South', timezone: 'Eastern' },
  { code: 'WI', name: 'Wisconsin', region: 'Midwest', timezone: 'Central' },
  { code: 'WY', name: 'Wyoming', region: 'Mountain', timezone: 'Mountain' }
];

const regions = {
  'Northeast': ['CT', 'DE', 'ME', 'MD', 'MA', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT', 'VA', 'WV'],
  'Midwest': ['IL', 'IN', 'IA', 'KS', 'MI', 'MN', 'MO', 'NE', 'ND', 'OH', 'SD', 'WI'],
  'South': ['AL', 'AR', 'FL', 'GA', 'KY', 'LA', 'MS', 'NC', 'OK', 'SC', 'TN', 'TX'],
  'Southeast': ['AL', 'FL', 'GA', 'KY', 'LA', 'MS', 'NC', 'SC', 'TN', 'VA'],
  'West': ['AK', 'CA', 'HI', 'NV', 'OR', 'WA'],
  'Southwest': ['AZ', 'CO', 'ID', 'MT', 'NM', 'UT', 'WY']
};

export default function States() {
  const router = useRouter();

  const handleManageState = (stateCode: string) => {
    router.push(`/states/${stateCode.toLowerCase()}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">State AI Registration System</h1>
        <p className="text-xl text-gray-700 mb-8">
          Comprehensive AI system registration and management across all 50 states with algorithmic geographic targeting.
        </p>

        {/* System Overview */}
        <div className="bg-blue-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Geographic Targeting System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="font-semibold text-gray-900 mb-2">State-by-State Coverage</h3>
              <p className="text-gray-700 text-sm">Dedicated AI systems for each state's unique needs and regulations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Algorithmic Activation</h3>
              <p className="text-gray-700 text-sm">AI systems activate automatically based on time, location, and demand patterns</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Precision Targeting</h3>
              <p className="text-gray-700 text-sm">Geographic and temporal optimization for maximum effectiveness</p>
            </div>
          </div>
        </div>

        {/* Regional Organization */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regional AI System Organization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(regions).map(([regionName, stateCodes]) => (
            <div key={regionName} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{regionName} Region</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {stateCodes.map(code => {
                  const state = states.find(s => s.code === code);
                  return (
                    <div key={code} className="text-center">
                      <div className="text-sm font-medium text-gray-900">{code}</div>
                      <div className="text-xs text-gray-600">{state?.timezone}</div>
                    </div>
                  );
                })}
              </div>
              <div className="text-sm text-gray-700">
                <strong>{stateCodes.length} states</strong> with coordinated AI systems
              </div>
            </div>
          ))}
        </div>

        {/* State Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">State AI Registration Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {states.map(state => (
            <div key={state.code} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{state.name}</h3>
                  <p className="text-sm text-gray-600">{state.region} Region</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{state.code}</div>
                  <div className="text-xs text-gray-500">{state.timezone}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">AI System Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Numbers Registered</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Monthly Calls</span>
                  <span className="text-sm font-medium">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Conversion Rate</span>
                  <span className="text-sm font-medium text-green-600">24.3%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Active Campaigns</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Legal Intake (888-505-LAW-AI)
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Auto Claims (855-771-AUTO)
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Roofing (909-488-ROOF)
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleManageState(state.code)}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm"
              >
                Manage {state.code} Systems
              </button>
            </div>
          ))}
        </div>

        {/* Algorithmic Activation System */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Algorithmic Activation System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Triggers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🌪️</span>
                  <div>
                    <strong>Weather Events:</strong> Hurricanes, tornadoes, floods trigger roofing and insurance campaigns
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">🚨</span>
                  <div>
                    <strong>Emergency Alerts:</strong> Amber alerts, natural disasters activate appropriate response systems
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📈</span>
                  <div>
                    <strong>Demand Patterns:</strong> Seasonal trends and historical data optimize campaign timing
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">🏛️</span>
                  <div>
                    <strong>Regulatory Changes:</strong> State law updates trigger compliance and legal campaign adjustments
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Temporal Optimization</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">🌅</span>
                  <div>
                    <strong>Time Zone Awareness:</strong> Campaigns activate during business hours in each state's timezone
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">📊</span>
                  <div>
                    <strong>Peak Performance:</strong> AI analyzes call patterns to optimize campaign timing for maximum conversions
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">🔄</span>
                  <div>
                    <strong>Real-time Adjustment:</strong> Systems continuously learn and adjust based on live performance data
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">🎯</span>
                  <div>
                    <strong>Event-Driven:</strong> Breaking news, market changes, and local events trigger targeted campaigns
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Management Dashboard */}
        <div className="bg-gray-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">State Management Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">All States Active</span>
                  <span className="text-sm font-medium text-green-600">50/50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Uptime</span>
                  <span className="text-sm font-medium text-green-600">99.97%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-medium text-green-600">&lt; 2s</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Monthly Calls</span>
                  <span className="text-sm font-medium">142,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Conversion</span>
                  <span className="text-sm font-medium text-green-600">23.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Campaigns</span>
                  <span className="text-sm font-medium">156</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Coordination</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Regions Active</span>
                  <span className="text-sm font-medium text-green-600">6/6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cross-State Sync</span>
                  <span className="text-sm font-medium text-green-600">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Load Balancing</span>
                  <span className="text-sm font-medium text-green-600">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">State AI System Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Process</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Select target states and categories</li>
                <li>Configure AI personality and responses</li>
                <li>Set up geographic targeting parameters</li>
                <li>Define algorithmic activation rules</li>
                <li>Test system with live calls</li>
                <li>Deploy and monitor performance</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Best Practices</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Start with 2-3 states in the same region</li>
                <li>Use historical data for initial targeting</li>
                <li>Monitor performance for 30 days before expansion</li>
                <li>Coordinate with local regulations and licensing</li>
                <li>Implement gradual rollout to ensure quality</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 text-lg mr-4">
              Start State Registration
            </button>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 text-lg">
              View System Analytics
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}