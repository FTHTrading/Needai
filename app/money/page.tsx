export default function MoneyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-600 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Need Money?</h1>
        <p className="text-2xl mb-12">Cash Advances • Funding • Payment Assistance</p>
        
        <div className="bg-white text-green-800 rounded-xl p-12 mb-8 inline-block">
          <p className="text-xl mb-4">Call Now</p>
          <a 
            href="tel:+18886780645"
            className="text-6xl font-bold hover:underline block mb-4"
          >
            888-CASH-AI
          </a>
          <p className="text-lg">(888-678-0645)</p>
        </div>

        <div className="flex gap-6 justify-center flex-wrap mb-12">
          <a 
            href="sms:+18886780645&body=CASH"
            className="bg-white text-green-800 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          >
            📱 Text "CASH"
          </a>
          <a 
            href="https://t.me/callrailos_bot"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition"
          >
            💬 Chat on Telegram
          </a>
        </div>

        <div className="max-w-3xl mx-auto text-left bg-white/10 backdrop-blur rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Financial Services</h2>
          <ul className="space-y-3 text-lg">
            <li>✅ Pre-Settlement Funding</li>
            <li>✅ Insurance Cash Advances</li>
            <li>✅ Quick Qualification</li>
            <li>✅ No Upfront Fees</li>
            <li>✅ Same-Day Approvals</li>
          </ul>
        </div>

        <p className="text-sm opacity-80">
          AI-Powered Financial Qualification • Instant Assessment
        </p>
      </div>
    </div>
  );
}
