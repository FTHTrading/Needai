export default function LawPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-600 to-yellow-500">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 text-gray-900">Need a Lawyer?</h1>
        <p className="text-2xl mb-12 text-gray-800">Legal Intake • Case Screening • Attorney Matching</p>
        
        <div className="bg-gray-900 text-white rounded-xl p-12 mb-8 inline-block">
          <p className="text-xl mb-4">Call Now</p>
          <a 
            href="tel:+18885052924"
            className="text-6xl font-bold hover:underline block mb-4"
          >
            888-LAW-AI
          </a>
          <p className="text-lg">(888-529-2924)</p>
        </div>

        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a 
            href="sms:+18885052924&body=LAW"
            className="bg-gray-900 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-800 transition"
          >
            📱 Text "LAW"
          </a>
          <a 
            href="https://t.me/callrailos_bot"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          >
            💬 Chat on Telegram
          </a>
        </div>

        <div className="max-w-3xl mx-auto text-left bg-white rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Legal Services</h2>
          <ul className="space-y-3 text-lg text-gray-800">
            <li>✅ Personal Injury Cases</li>
            <li>✅ Property Damage Claims</li>
            <li>✅ Contract Disputes</li>
            <li>✅ Free Case Review</li>
            <li>✅ Attorney Network Access</li>
          </ul>
        </div>

        <p className="text-sm text-gray-700">
          AI-Powered Legal Intake • Instant Case Screening
        </p>
      </div>
    </div>
  );
}
