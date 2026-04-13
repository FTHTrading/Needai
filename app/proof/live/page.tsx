import Navigation from '../../../components/Navigation';

export default function LiveProof() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Live System Proof</h1>
        <p className="text-xl text-gray-700 mb-8">
          View real-time system behavior, routing logic, and per-number performance metrics.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-gray-600">Calls Processed Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">87%</div>
              <div className="text-gray-600">Qualified Rate</div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-700">Legal intake call qualified and routed to PI firm</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-700">Auto incident report documented and escalated</p>
              <p className="text-sm text-gray-500">5 minutes ago</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-gray-700">Claims call verified and insurer routing initiated</p>
              <p className="text-sm text-gray-500">8 minutes ago</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}