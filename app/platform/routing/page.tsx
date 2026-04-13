import Navigation from '../../../components/Navigation';

export default function Routing() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Routing & Logic</h1>
        <p className="text-xl text-gray-700 mb-8">
          Intelligent routing ensures qualified calls reach the right destination instantly.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Routing Engine Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Decision Making</h3>
              <p className="text-gray-700">Routes calls based on AI analysis within seconds of call start.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-destination Support</h3>
              <p className="text-gray-700">Routes to teams, partners, CRMs, or downstream systems.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Priority Queuing</h3>
              <p className="text-gray-700">High-severity cases routed immediately, others queued appropriately.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fallback Logic</h3>
              <p className="text-gray-700">Automatic escalation if primary routing fails.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Geographic Routing</h3>
              <p className="text-gray-700">Routes based on jurisdiction, time zones, and local requirements.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Load Balancing</h3>
              <p className="text-gray-700">Distributes calls across multiple licensed recipients.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Example Routing Flow</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
              <p className="text-gray-700">Call received on 888-505-LAW-AI</p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
              <p className="text-gray-700">AI qualifies: Personal injury case, severity 8/10, California jurisdiction</p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
              <p className="text-gray-700">Routes to licensed PI firm in California with high-priority flag</p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
              <p className="text-gray-700">Call data and evidence automatically attached to case</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}