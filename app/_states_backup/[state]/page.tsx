'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '../../../components/Navigation';
import { WeatherProvider } from '../../../lib/weather/provider';
import { AIIntakeEngine } from '../../../lib/ai/intake-engine';

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

export function generateStaticParams() {
  return states.map((state) => ({
    state: state.code.toLowerCase(),
  }));
}

export default function StateManagement() {
  const params = useParams();
  const router = useRouter();
  const stateCode = params.state as string;

  const [weatherData, setWeatherData] = useState<any>(null);
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const state = states.find(s => s.code.toLowerCase() === stateCode.toLowerCase());

  useEffect(() => {
    if (!state) {
      router.push('/states');
      return;
    }

    const loadStateData = async () => {
      try {
        const weatherProvider = new WeatherProvider();
        const intakeEngine = new AIIntakeEngine(weatherProvider);

        // Get current weather for the state
        const weatherContext = await weatherProvider.getCurrentWeather(`${state.name}, ${state.code}`);

        // Get AI recommendations for this state
        const recommendations = await intakeEngine.processIntake({
          location: `${state.name}, ${state.code}`,
          businessType: 'emergency', // Default for state management
          targetAudience: 'state residents',
          budget: 2000,
          urgency: 'medium',
          weatherContext
        });

        setWeatherData(weatherContext);
        setAiRecommendations(recommendations);
      } catch (error) {
        console.error('Error loading state data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStateData();
  }, [state, router]);

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">State Not Found</h1>
          <p className="text-xl text-gray-700 mb-8">The requested state could not be found.</p>
          <button
            onClick={() => router.push('/states')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Back to States
          </button>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading {state.name} AI systems...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{state.name} AI Management</h1>
            <p className="text-xl text-gray-700 mt-2">
              {state.region} Region • {state.timezone} Timezone
            </p>
          </div>
          <button
            onClick={() => router.push('/states')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700"
          >
            ← Back to States
          </button>
        </div>

        {/* Current Weather & AI Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weather Conditions */}
          {weatherData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current Weather Conditions</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl mb-2">⚠️</div>
                  <div className="text-2xl font-bold text-blue-600">{weatherData.risk_score}/100</div>
                  <div className="text-sm text-gray-600">Risk Score</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl mb-2">🚨</div>
                  <div className="text-2xl font-bold text-green-600 capitalize">{weatherData.advisory_level}</div>
                  <div className="text-sm text-gray-600">Advisory Level</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl mb-2">🌪️</div>
                  <div className="text-2xl font-bold text-yellow-600">{weatherData.active_events.length}</div>
                  <div className="text-sm text-gray-600">Active Events</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl mb-2">📍</div>
                  <div className="text-2xl font-bold text-purple-600">{weatherData.location.state}</div>
                  <div className="text-sm text-gray-600">State</div>
                </div>
              </div>

              {/* Active Events */}
              {weatherData.active_events.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Active Weather Events</h3>
                  <div className="space-y-2">
                    {weatherData.active_events.map((event: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {event.type === 'hurricane' ? '🌀' :
                             event.type === 'storm' ? '⛈️' :
                             event.type === 'flood' ? '🌊' :
                             event.type === 'wildfire' ? '🔥' :
                             event.type === 'tornado' ? '🌪️' :
                             event.type === 'hail' ? '🧊' : '❄️'}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900 capitalize">{event.type}</div>
                            <div className="text-sm text-gray-600">Severity: {event.severity}/100</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {new Date(event.start_time).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI System Status */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI System Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-900">System Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-900">Numbers Registered</span>
                <span className="text-xl font-bold text-blue-600">12</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="font-medium text-gray-900">Monthly Calls</span>
                <span className="text-xl font-bold text-purple-600">2,847</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <span className="font-medium text-gray-900">Conversion Rate</span>
                <span className="text-xl font-bold text-orange-600">24.3%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI System Recommendations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recommended Numbers */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Recommended Numbers</h3>
                <div className="space-y-2">
                  {aiRecommendations.recommendedNumbers.map((number: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl mr-3">📞</span>
                      <span className="font-medium text-blue-600">{number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather-Influenced Decisions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Weather-Influenced Decisions</h3>
                <div className="space-y-2">
                  {aiRecommendations.weatherInfluencedDecisions.map((decision: string, index: number) => (
                    <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                      <span className="text-xl mr-3">⚡</span>
                      <span className="text-sm text-gray-700">{decision}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Configuration */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Routing Rules</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {aiRecommendations.aiConfiguration.routingRules.map((rule: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Marketing Strategy</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {aiRecommendations.aiConfiguration.marketingStrategy.map((strategy: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Risk Mitigation</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {aiRecommendations.aiConfiguration.riskMitigation.map((mitigation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {mitigation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Management Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Management Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-2">📞</div>
              <div className="font-medium text-blue-900">Configure Numbers</div>
              <div className="text-sm text-blue-700">Add or modify phone numbers</div>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium text-green-900">Campaign Settings</div>
              <div className="text-sm text-green-700">Adjust marketing campaigns</div>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium text-purple-900">AI Configuration</div>
              <div className="text-sm text-purple-700">Tune AI behavior and rules</div>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-orange-900">View Analytics</div>
              <div className="text-sm text-orange-700">Performance metrics and reports</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}