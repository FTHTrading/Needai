import Link from 'next/link';
import { NUMBER_TO_PERSONA } from '../../lib/routing/engine';

export default function MarketplacePage() {
  // Generate available numbers from the canonical mapping
  const availableNumbers = Object.entries(NUMBER_TO_PERSONA).map(([number, persona]) => {
    const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    const isTollFree = number.startsWith('8');

    // Pricing based on persona and type
    let price = 199; // Base price for local numbers
    if (isTollFree) price = 299; // Toll-free numbers cost more
    if (persona === 'LAW') price = 399; // Legal services premium
    if (persona === 'CLAIMS') price = 349; // Claims processing premium

    // Features based on persona
    const baseFeatures = ['AI Intake', 'Local Routing'];
    if (persona === 'STORM' || persona === 'HAIL') {
      baseFeatures.unshift('Weather Activation');
    }
    if (isTollFree) {
      baseFeatures.push('Toll-Free');
    }

    return {
      number: formattedNumber,
      type: isTollFree ? 'Toll-Free' : 'Local',
      region: getRegionFromNumber(number),
      aiMode: getAIModeFromPersona(persona),
      price,
      features: baseFeatures,
      persona
    };
  });

  // Helper functions
  function getRegionFromNumber(number: string): string {
    const areaCode = number.substring(0, 3);
    const areaCodeMap: { [key: string]: string } = {
      '786': 'Florida', '727': 'Florida', '321': 'Florida',
      '623': 'Arizona', '470': 'Georgia', '539': 'Oklahoma',
      '414': 'Wisconsin', '262': 'Wisconsin', '909': 'California',
      '912': 'Georgia', '443': 'Maryland', '213': 'California',
      '770': 'Georgia', '478': 'Georgia'
    };
    return areaCodeMap[areaCode] || (number.startsWith('8') ? 'National' : 'Regional');
  }

  function getAIModeFromPersona(persona: string): string {
    const aiModes: { [key: string]: string } = {
      'STORM': 'Storm Damage',
      'HAIL': 'Hail Damage',
      'HVAC': 'HVAC Services',
      'CLAIMS': 'Claims Processing',
      'LAW': 'Legal Services',
      'MONEY': 'Financial Services',
      'NEED': 'Universal Intake'
    };
    return aiModes[persona] || 'Universal Intake';
  }

  // Group numbers by persona for display
  const numbersByPersona = availableNumbers.reduce((acc, num) => {
    if (!acc[num.persona]) acc[num.persona] = [];
    acc[num.persona].push(num);
    return acc;
  }, {} as Record<string, typeof availableNumbers>);

  const personaOrder = ['STORM', 'HAIL', 'HVAC', 'CLAIMS', 'LAW', 'MONEY', 'NEED'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Phone Number Marketplace</h1>
          <p className="mt-2 text-gray-600">
            License programmable AI endpoints that activate with weather events and route qualified leads.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Inventory: <span className="font-semibold text-gray-700">{availableNumbers.length}</span> canonical numbers (<Link href="/numbers" className="text-blue-600 hover:underline">view directory</Link>)
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Licensing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800">Local</h3>
              <p className="text-2xl font-bold text-blue-600">$199/mo</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Exclusive number usage</li>
                <li>• Weather-triggered activation</li>
                <li>• AI intake routing</li>
                <li>• Regional coverage</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800">Toll-Free</h3>
              <p className="text-2xl font-bold text-blue-600">$399/mo</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• National reach</li>
                <li>• Weather-triggered activation</li>
                <li>• AI intake routing</li>
                <li>• Overflow capacity</li>
                <li>• SMS follow-ups</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800">Enterprise</h3>
              <p className="text-2xl font-bold text-blue-600">Custom</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• White-label solution</li>
                <li>• Custom AI training</li>
                <li>• API integration</li>
                <li>• Dedicated support</li>
                <li>• Custom pricing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Available Numbers */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Available Numbers</h2>
            <p className="text-gray-600">Select a number to license for your business</p>
          </div>

          {personaOrder.map((persona) => {
            const numbers = numbersByPersona[persona] || [];
            if (numbers.length === 0) return null;

            const sectionColors = {
              'STORM': 'blue',
              'HAIL': 'blue',
              'HVAC': 'orange',
              'CLAIMS': 'green',
              'LAW': 'purple',
              'MONEY': 'yellow',
              'NEED': 'gray'
            };

            const color = sectionColors[persona as keyof typeof sectionColors] || 'gray';

            return (
              <div key={persona}>
                <div className={`px-6 py-4 bg-${color}-50 border-b border-gray-200`}>
                  <h3 className="text-lg font-semibold text-${color}-900">
                    {getPersonaIcon(persona)} {persona} Numbers
                  </h3>
                  <p className={`text-${color}-700`}>{getPersonaDescription(persona)}</p>
                </div>

                <div className="divide-y divide-gray-200">
                  {numbers.map((number) => (
                    <div key={number.number} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-gray-900">{number.number}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              number.type === 'Local' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {number.type}
                            </span>
                            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              {number.aiMode}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-gray-600">{number.region} Region</p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {number.features.map((feature) => (
                              <span key={feature} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${number.price}</p>
                          <p className="text-sm text-gray-600">per month</p>
                          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            License Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to License a Number?</h2>
          <p className="mb-6">
            Turn weather events into qualified leads with AI-powered phone numbers.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

function getPersonaIcon(persona: string): string {
  const icons = {
    'STORM': '🌦️',
    'HAIL': '🌨️',
    'HVAC': '🔥',
    'CLAIMS': '📋',
    'LAW': '⚖️',
    'MONEY': '💰',
    'NEED': '🎯'
  };
  return icons[persona as keyof typeof icons] || '📞';
}

function getPersonaDescription(persona: string): string {
  const descriptions = {
    'STORM': 'Storm damage assessment and response hotlines',
    'HAIL': 'Hail damage evaluation and claims assistance',
    'HVAC': 'Emergency and scheduled HVAC service coordination',
    'CLAIMS': 'Insurance claims processing and support',
    'LAW': 'Legal intake and case qualification services',
    'MONEY': 'Financial services and banking assistance',
    'NEED': 'Universal intake for multi-vertical routing'
  };
  return descriptions[persona as keyof typeof descriptions] || 'AI-powered call routing';
}
