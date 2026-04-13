import Navigation from '../../components/Navigation';

export default function SIMs() {
  const apiExample = '{"type": "esim", "quantity": 1}';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">SIM Cards & eSIMs</h1>
        <p className="text-xl text-gray-700 mb-8">
          Physical SIM cards and digital eSIMs for your AI-powered phone numbers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Physical SIM Cards */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Physical SIM Cards</h2>
            <div className="mb-6">
              <div className="text-3xl font-bold text-green-600 mb-2">$25</div>
              <div className="text-gray-600">One-time purchase</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Standard SIM card
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Pre-configured for AI routing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Free shipping worldwide
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                30-day return policy
              </li>
            </ul>
            <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              Order Physical SIM - $25
            </button>
          </div>

          {/* eSIM Cards */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Digital eSIM</h2>
            <div className="mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">$15</div>
              <div className="text-gray-600">One-time purchase</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Instant digital activation
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                No physical card needed
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Compatible with modern devices
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Instant delivery via email
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Order eSIM - $15
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Integration</h2>
          <p className="text-gray-700 mb-6">
            Integrate SIM provisioning directly into your applications using our developer API.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">API Key: <span className="text-gray-500 italic">Configure via environment variable TELNYX_API_KEY</span></h3>
            <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <div>curl -X POST https://api.callrail-os.com/v1/sims</div>
              <div>-H "Authorization: Bearer YOUR_API_KEY"</div>
              <div>-H "Content-Type: application/json"</div>
              <div>-d '{apiExample}'</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Supported Types</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Physical SIM cards</li>
                <li>• Digital eSIM profiles</li>
                <li>• Bulk ordering (10+ units)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Options</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Instant digital delivery</li>
                <li>• Physical shipping (3-5 days)</li>
                <li>• Express shipping available</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}