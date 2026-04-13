export default function StormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Storm Damage?</h1>
        <p className="text-2xl mb-12">Emergency Property Restoration • Available 24/7</p>
        
        {/* Primary CTA - Call */}
        <div className="bg-yellow-400 text-blue-900 rounded-xl p-12 mb-8 inline-block">
          <p className="text-xl mb-4">Call Now</p>
          <a 
            href="tel:+14702878676"
            className="text-6xl font-bold hover:underline block mb-4"
          >
            470-STORM
          </a>
          <p className="text-lg">(470-786-7676)</p>
        </div>

        {/* Secondary CTAs */}
        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a 
            href="sms:+14702878676"
            className="bg-white text-blue-900 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          >
            📱 Text "STORM"
          </a>
          <a 
            href="https://t.me/callrailos_bot"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          >
            💬 Chat on Telegram
          </a>
        </div>

        {/* Service Description */}
        <div className="max-w-3xl mx-auto text-left bg-white/10 backdrop-blur rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Emergency Storm Response</h2>
          <ul className="space-y-3 text-lg">
            <li>✅ 24/7 Emergency Response</li>
            <li>✅ Licensed Contractors</li>
            <li>✅ Insurance Claim Assistance</li>
            <li>✅ Free Damage Assessment</li>
            <li>✅ Same-Day Service Available</li>
          </ul>
        </div>

        {/* AI Intake Notice */}
        <p className="text-sm opacity-80">
          Powered by AI • Your call is answered instantly by our intelligent system
        </p>
      </div>
    </div>
  );
}
