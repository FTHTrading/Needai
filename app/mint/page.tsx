import Navigation from '../../components/Navigation';

export default function Mint() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mint New Numbers</h1>
        <p className="text-xl text-gray-700 mb-8">
          Create custom vanity numbers for your business needs.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Number Minting Form</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Vanity Word/Phrase
              </label>
              <input
                type="text"
                placeholder="e.g., LAW-AI, CLAIMS, BUCK"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area Code Preference
              </label>
              <input
                type="text"
                placeholder="e.g., 888, 844, 855"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Legal</option>
                <option>Insurance</option>
                <option>Payments</option>
                <option>Auto</option>
                <option>Property</option>
                <option>General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Configuration
              </label>
              <textarea
                placeholder="Describe how the AI should handle calls to this number..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Mint Number - $500 Setup Fee
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Number Suggestions</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">888-555-HELP</div>
                <div className="text-gray-600">888-555-4357</div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Reserve
              </button>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">844-CALL-US</div>
                <div className="text-gray-600">844-225-5887</div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}