export default function NeedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-700 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Need Help?</h1>
        <p className="text-2xl mb-12">Universal Assistance • AI Determines Your Need</p>
        
        <div className="bg-white text-purple-900 rounded-xl p-12 mb-8 inline-block">
          <p className="text-xl mb-4">Call Now</p>
          <a 
            href="tel:+18446336333"
            className="text-6xl font-bold hover:underline block mb-4"
          >
            844-NEED
          </a>
          <p className="text-lg">(844-633-6333)</p>
        </div>

        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a 
            href="sms:+18446336333&body=HELP"
            className="bg-white text-purple-900 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          >
            📱 Text "HELP"
          </a>
          <a 
            href="https://t.me/callrailos_bot"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          >
            💬 Chat on Telegram
          </a>
        </div>

        <div className="max-w-3xl mx-auto text-left bg-white/10 backdrop-blur rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Universal Intake Router</h2>
          <p className="text-lg mb-4">
            Not sure which service you need? Our AI asks about your situation and routes you to:
          </p>
          <ul className="space-y-3 text-lg">
            <li>🌪️ <strong>Storm Damage</strong> - Property restoration</li>
            <li>⚖️ <strong>Legal Services</strong> - Attorney matching</li>
            <li>💰 <strong>Financial Help</strong> - Cash advances</li>
            <li>🏠 <strong>HVAC Service</strong> - Emergency repairs</li>
            <li>📋 <strong>Insurance Claims</strong> - Filing assistance</li>
            <li>🏚️ <strong>Hail Damage</strong> - Roof assessment</li>
          </ul>
          <p className="text-lg mt-4 font-semibold">
            One number. All services. AI determines the best fit.
          </p>
        </div>

        <p className="text-sm opacity-80">
          AI-Powered Universal Router • Instant Service Detection
        </p>
      </div>
    </div>
  );
}
