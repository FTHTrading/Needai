export default function ClaimsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">File a Claim?</h1>
        <p className="text-2xl mb-12">Insurance Claims Processing • Documentation Assistance</p>
        
        <div className="bg-white text-blue-900 rounded-xl p-12 mb-8 inline-block">
          <p className="text-xl mb-4">Call Now</p>
          <a 
            href="tel:+18447252460"
            className="text-6xl font-bold hover:underline block mb-4"
          >
            844-CLAIM
          </a>
          <p className="text-lg">(844-725-2460)</p>
        </div>

        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a 
            href="sms:+18447252460&body=CLAIM"
            className="bg-white text-blue-900 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          >
            📱 Text "CLAIM"
          </a>
          <a 
            href="https://t.me/callrailos_bot"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          >
            💬 Chat on Telegram
          </a>
        </div>

        <div className="max-w-3xl mx-auto text-left bg-white/10 backdrop-blur rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Claims Services</h2>
          <ul className="space-y-3 text-lg">
            <li>✅ Claims Filing Assistance</li>
            <li>✅ Documentation Support</li>
            <li>✅ Evidence Collection</li>
            <li>✅ Insurer Communication</li>
            <li>✅ Status Tracking</li>
          </ul>
        </div>

        <p className="text-sm opacity-80">
          AI-Powered Claims Processing • Instant Documentation
        </p>
      </div>
    </div>
  );
}
