'use client';

import { useState } from 'react';
import Navigation from '../../components/Navigation';
import { AIIntakeEngine, IntakeRequest, IntakeRecommendation } from '../../lib/ai/intake-engine';
import { WeatherProvider } from '../../lib/weather/provider';

export default function Intake() {
  const [formData, setFormData] = useState({
    location: '',
    businessType: '',
    targetAudience: '',
    budget: '',
    urgency: 'medium' as 'low' | 'medium' | 'high'
  });

  const [recommendation, setRecommendation] = useState<IntakeRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);

  const weatherProvider = new WeatherProvider();
  const intakeEngine = new AIIntakeEngine(weatherProvider);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch current weather for the location
      const weatherContext = await weatherProvider.getCurrentWeather(formData.location);

      const intakeRequest: IntakeRequest = {
        location: formData.location,
        businessType: formData.businessType,
        targetAudience: formData.targetAudience,
        budget: parseInt(formData.budget) || 1000,
        urgency: formData.urgency,
        weatherContext
      };

      const result = await intakeEngine.processIntake(intakeRequest);
      setRecommendation(result);
      setWeatherData(weatherContext);
    } catch (error) {
      console.error('Intake processing error:', error);
      alert('Failed to process intake. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">AI Assistant Setup</h1>
        <p className="text-xl text-gray-700 mb-8">
          Configure your AI assistant for call handling and customer interactions with weather-aware intelligence.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Configuration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State (e.g., Miami, FL)"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select business type...</option>
                  <option value="emergency">Emergency Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="finance">Finance</option>
                  <option value="government">Government</option>
                  <option value="technology">Technology</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="automotive">Automotive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="e.g., homeowners, businesses, tourists"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Budget ($)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="1000"
                  min="500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low - Standard setup</option>
                  <option value="medium">Medium - Priority setup</option>
                  <option value="high">High - Emergency setup</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Generate Weather-Aware Configuration'}
              </button>
            </form>
          </div>

          {/* Recommendations Panel */}
          <div className="space-y-6">
            {weatherData && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Weather Conditions</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Risk Score: {weatherData.risk_score}/100</div>
                  <div>Advisory Level: {weatherData.advisory_level}</div>
                  <div>Active Events: {weatherData.active_events.length}</div>
                  <div>Location: {weatherData.location.state}</div>
                </div>
              </div>
            )}

            {recommendation && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Configuration Recommendations</h3>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Recommended Numbers:</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.recommendedNumbers.map((number, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {number}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Weather-Influenced Decisions:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {recommendation.weatherInfluencedDecisions.map((decision, index) => (
                      <li key={index}>{decision}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">AI Configuration:</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Routing Rules:</span>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                        {recommendation.aiConfiguration.routingRules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Marketing Strategy:</span>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                        {recommendation.aiConfiguration.marketingStrategy.map((strategy, index) => (
                          <li key={index}>{strategy}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Risk Mitigation:</span>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                        {recommendation.aiConfiguration.riskMitigation.map((mitigation, index) => (
                          <li key={index}>{mitigation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Estimated Monthly Cost:</span>
                    <span className="text-2xl font-bold text-green-600">${recommendation.estimatedCost}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">AI Confidence: </span>
                    <span className={`text-sm font-medium ${recommendation.confidence > 0.8 ? 'text-green-600' : recommendation.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {Math.round(recommendation.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Assistant Preview */}
        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Assistant Preview</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">AI</div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                  "Thank you for calling [Company Name]. I'm here to help you with your [service]. Could you please tell me your name and how I can assist you today?"
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                  "Hi, I'm John Smith. I need help with my insurance claim."
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm ml-3">Caller</div>
              </div>
              <div className="flex">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">AI</div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                  "I'd be happy to help you with your claim, John. Could you please provide your policy number and a brief description of what happened?"
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Test AI Assistant
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
