export default function HVACPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-600 to-orange-500 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">AC Broken?</h1>
        <p className="text-2xl mb-12">Emergency HVAC Service • 24/7 Response</p>
        
        <div className="bg-white text-orange-800 rounded-xl p-12 mb-8 inline-block">
          <p className="text-xl mb-4">Call Now</p>
          <a 
            href="tel:+18336024822"
            className="text-6xl font-bold hover:underline block mb-4"
          >
            833-HVAC-NOW
          </a>
          <p className="text-lg">(833-602-4822)</p>
        </div>

        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a 
            href="sms:+18336024822&body=HVAC"
            className="bg-white text-orange-800 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          >
            📱 Text "HVAC"
          </a>
          <a 
            href="https://t.me/callrailos_bot"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          >
            💬 Chat on Telegram
          </a>
        </div>

        <div className="max-w-3xl mx-auto text-left bg-white/10 backdrop-blur rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">HVAC Services</h2>
          <ul className="space-y-3 text-lg">
            <li>✅ Emergency Repairs</li>
            <li>✅ AC & Heating Service</li>
            <li>✅ Licensed Technicians</li>
            <li>✅ Same-Day Service</li>
            <li>✅ 24/7 Availability</li>
          </ul>
        </div>

        <p className="text-sm opacity-80">
          AI-Powered Dispatch • Instant Technician Routing
        </p>
      </div>
    </div>
  );
}
