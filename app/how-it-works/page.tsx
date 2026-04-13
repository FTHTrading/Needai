import Navigation from '../../components/Navigation';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">How It Works</h1>

        <div className="space-y-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">1</div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">A caller dials a premium number</h2>
              <p className="text-gray-700">High-intent demand tied to a specific problem.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">2</div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI answers instantly</h2>
              <p className="text-gray-700">Intent detection + dynamic questioning.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">3</div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Calls are qualified and documented</h2>
              <p className="text-gray-700">Low-quality calls filtered. Structured data captured.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">4</div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Outcomes are routed</h2>
              <p className="text-gray-700">To teams, partners, or systems based on rules.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700">
            No call centers. No wasted spend. No guessing.
          </p>
        </div>
      </main>
    </div>
  );
}