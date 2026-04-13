import Navigation from '../../../components/Navigation';

export default function Affiliates() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Affiliate Program</h1>
        <p className="text-xl text-gray-700 mb-8">
          Earn commissions by referring businesses to our number licensing platform.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">Sign Up</h3>
                <p className="text-gray-700">Register for our affiliate program with your contact information.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Your Links</h3>
                <p className="text-gray-700">Receive unique referral links and marketing materials.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">Promote</h3>
                <p className="text-gray-700">Share your links with potential customers in your network.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
              <div>
                <h3 className="font-semibold text-gray-900">Earn</h3>
                <p className="text-gray-700">Receive commissions on successful referrals.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Commission Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15%</div>
              <div className="text-gray-600">First Year Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10%</div>
              <div className="text-gray-600">Renewal Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">$500</div>
              <div className="text-gray-600">Per Referral Bonus</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Who Should Join</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Legal marketing agencies</li>
            <li>• Insurance brokers and consultants</li>
            <li>• Telecom and VoIP resellers</li>
            <li>• Business process outsourcing firms</li>
            <li>• Marketing agencies specializing in lead generation</li>
            <li>• Industry consultants and advisors</li>
          </ul>

          <div className="mt-8 text-center">
            <a
              href="/contact"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Apply for Affiliate Program
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}