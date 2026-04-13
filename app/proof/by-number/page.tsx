import Navigation from '../../../components/Navigation';

export default function ProofByNumber() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Proof by Number</h1>
        <p className="text-xl text-gray-700 mb-8">
          Detailed performance metrics and routing logic for each licensed number.
        </p>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">888-505-LAW-AI</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-gray-600">Total Calls</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-gray-600">Qualified Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">4.2 min</div>
                <div className="text-gray-600">Avg Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">95%</div>
                <div className="text-gray-600">Resolution Rate</div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900">Routing Logic:</h4>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Jurisdiction check (US states)</li>
                <li>Severity assessment (1-10 scale)</li>
                <li>Evidence collection (photos, docs)</li>
                <li>Route to licensed PI firms</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">855-771-AUTO</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">567</div>
                <div className="text-gray-600">Total Calls</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-gray-600">Qualified Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">3.8 min</div>
                <div className="text-gray-600">Avg Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">88%</div>
                <div className="text-gray-600">Resolution Rate</div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900">Routing Logic:</h4>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Accident type classification</li>
                <li>Injury severity assessment</li>
                <li>Evidence prompts (photos, police report)</li>
                <li>Escalation to LAW or CLAIM systems</li>
              </ul>
            </div>
          </div>

          {/* Add more numbers as needed */}
        </div>
      </main>
    </div>
  );
}