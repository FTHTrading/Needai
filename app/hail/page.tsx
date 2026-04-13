export default function HailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 text-gray-900">Roof Damage?</h1>
        <p className="text-2xl mb-12 text-gray-700">Hail Damage Assessment • Insurance Claims</p>
        
        <div className="bg-gray-900 text-white rounded-xl p-12 mb-8 inline-block">
          <p className="text-xl mb-4">Call Now</p>
          <a 
            href="tel:+12623974245"
            className="text-6xl font-bold hover:underline block mb-4"
          >
            262-HAIL
          </a>
          <p className="text-lg">(262-397-4245)</p>
        </div>

        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a 
            href="sms:+12623974245&body=HAIL"
            className="bg-gray-900 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-800 transition"
          >
            📱 Text "HAIL"
          </a>
          <a 
            href="https://t.me/callrailos_bot"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          >
            💬 Chat on Telegram
          </a>
        </div>

        <div className="max-w-3xl mx-auto text-left bg-white rounded-xl p-8 mb-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Hail Damage Services</h2>
          <ul className="space-y-3 text-lg text-gray-800">
            <li>✅ Free Roof Inspection</li>
            <li>✅ Insurance Documentation</li>
            <li>✅ Claim Assistance</li>
            <li>✅ Licensed Contractors</li>
            <li>✅ Fast Response</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600">
          AI-Powered Damage Assessment • Instant Contractor Matching
        </p>
      </div>
    </div>
  );
}
