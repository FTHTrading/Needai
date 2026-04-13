import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Billboards That Answer Themselves
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Premium vanity numbers + AI-powered intake + Billboard campaigns = Qualified leads while you sleep
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            We operate 42 memorable phone numbers across storm restoration, legal, HVAC, insurance claims, and financial services.
            Each number routes to a purpose-built AI system that qualifies callers 24/7.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#billboards"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              See Billboard Examples
            </Link>
            <Link
              href="#how-it-works"
              className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition border-2 border-white"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">

        {/* Stats Bar */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">42</div>
              <div className="text-gray-700">Active Numbers</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">7</div>
              <div className="text-gray-700">AI Personas</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700">Auto-Answering</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-orange-600 mb-2">Instant</div>
              <div className="text-gray-700">AI Answering</div>
            </div>
          </div>
        </section>

        {/* Billboard Showcase Section */}
        <section id="billboards" className="mb-20 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Billboard Campaigns</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We design and deploy billboard campaigns that drive calls to your licensed numbers. 
              Each campaign is optimized for maximum recall and immediate action.
            </p>
          </div>

          {/* Storm Campaign */}
          <div className="mb-16 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">⛈️</div>
              <div>
                <h3 className="text-3xl font-bold">STORM DAMAGE Campaign</h3>
                <p className="text-slate-300">Emergency Property Restoration</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Billboard 1 */}
              <div className="bg-white text-gray-900 rounded-lg p-8 shadow-xl border-4 border-yellow-400">
                <div className="text-center mb-4">
                  <div className="text-6xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    STORM DAMAGE?
                  </div>
                  <div className="text-5xl font-bold text-blue-600 mb-4" style={{fontFamily: "Impact, sans-serif"}}>
                    470-STORM
                  </div>
                  <div className="text-2xl font-semibold text-gray-700">
                    24/7 Emergency Response
                  </div>
                </div>
              </div>

              {/* Billboard 2 */}
              <div className="bg-blue-600 text-white rounded-lg p-8 shadow-xl border-4 border-white">
                <div className="text-center mb-4">
                  <div className="text-5xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    ROOF DAMAGE?
                  </div>
                  <div className="text-5xl font-bold mb-4" style={{fontFamily: "Impact, sans-serif"}}>
                    678-ROOF-FIX
                  </div>
                  <div className="text-2xl font-semibold">
                    Free AI Assessment
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3">📊 Campaign Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><div className="text-3xl font-bold text-yellow-400">11</div><div className="text-sm">Active Numbers</div></div>
                <div><div className="text-3xl font-bold text-green-400">3</div><div className="text-sm">States Live</div></div>
                <div><div className="text-3xl font-bold text-blue-400">20+</div><div className="text-sm">Billboard Locations</div></div>
                <div><div className="text-3xl font-bold text-purple-400">24/7</div><div className="text-sm">AI Answering</div></div>
              </div>
            </div>
          </div>

          {/* Legal Campaign */}
          <div className="mb-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">⚖️</div>
              <div>
                <h3 className="text-3xl font-bold">LEGAL SERVICES Campaign</h3>
                <p className="text-blue-200">Law Firm Lead Generation</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Billboard 1 */}
              <div className="bg-white text-gray-900 rounded-lg p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    NEED A LAWYER?
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    888-LAW-AI
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    Free Case Review
                  </div>
                </div>
              </div>

              {/* Billboard 2 */}
              <div className="bg-black text-white rounded-lg p-6 shadow-xl border-2 border-yellow-400">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2 text-yellow-400" style={{fontFamily: "Impact, sans-serif"}}>
                    INJURED?
                  </div>
                  <div className="text-4xl font-bold text-white mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    844-SUE-NOW
                  </div>
                  <div className="text-lg font-semibold text-yellow-400">
                    No Win, No Fee
                  </div>
                </div>
              </div>

              {/* Billboard 3 */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    CAR WRECK?
                  </div>
                  <div className="text-4xl font-bold mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    888-CRASH-AI
                  </div>
                  <div className="text-lg font-semibold">
                    24/7 Legal Help
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3">📊 Campaign Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><div className="text-3xl font-bold text-yellow-400">8</div><div className="text-sm">Active Numbers</div></div>
                <div><div className="text-3xl font-bold text-green-400">Multi-State</div><div className="text-sm">Coverage</div></div>
                <div><div className="text-3xl font-bold text-blue-400">Dozens</div><div className="text-sm">Billboard Locations</div></div>
                <div><div className="text-3xl font-bold text-purple-400">AI</div><div className="text-sm">Case Screening</div></div>
              </div>
            </div>
          </div>

          {/* HVAC Campaign */}
          <div className="mb-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">🌡️</div>
              <div>
                <h3 className="text-3xl font-bold">HVAC SERVICES Campaign</h3>
                <p className="text-orange-100">Heating & Cooling</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Billboard 1 */}
              <div className="bg-white text-gray-900 rounded-lg p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-5xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    AC BROKEN?
                  </div>
                  <div className="text-5xl font-bold text-red-600 mb-3" style={{fontFamily: "Impact, sans-serif"}}>
                    888-HVAC-NOW
                  </div>
                  <div className="text-2xl font-semibold text-gray-700">
                    Same-Day Service
                  </div>
                </div>
              </div>

              {/* Billboard 2 */}
              <div className="bg-blue-500 text-white rounded-lg p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-5xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    HEATER OUT?
                  </div>
                  <div className="text-5xl font-bold mb-3" style={{fontFamily: "Impact, sans-serif"}}>
                    844-HEAT-NOW
                  </div>
                  <div className="text-2xl font-semibold">
                    24/7 Emergency
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3">📊 Campaign Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><div className="text-3xl font-bold text-yellow-400">3</div><div className="text-sm">Active Numbers</div></div>
                <div><div className="text-3xl font-bold text-green-400">Regional</div><div className="text-sm">Targeting</div></div>
                <div><div className="text-3xl font-bold text-blue-400">15+</div><div className="text-sm">Billboard Locations</div></div>
                <div><div className="text-3xl font-bold text-purple-400">AI</div><div className="text-sm">Dispatch Routing</div></div>
              </div>
            </div>
          </div>

          {/* Money/Financial Campaign */}
          <div className="mb-16 bg-gradient-to-r from-green-700 to-emerald-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">💰</div>
              <div>
                <h3 className="text-3xl font-bold">FINANCIAL SERVICES Campaign</h3>
                <p className="text-green-200">Cash & Funding Solutions</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white text-gray-900 rounded-lg p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    NEED MONEY?
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    888-CASH-AI
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    Fast Funding
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-gray-900 rounded-lg p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    NEED CASH?
                  </div>
                  <div className="text-4xl font-bold mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    888-BUCK-AI
                  </div>
                  <div className="text-lg font-semibold">
                    Instant Quotes
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white rounded-lg p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    FINANCING?
                  </div>
                  <div className="text-4xl font-bold text-yellow-400 mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    866-BANK-AI
                  </div>
                  <div className="text-lg font-semibold">
                    Quick Approval
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-900 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3">📊 Campaign Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><div className="text-3xl font-bold text-yellow-400">3</div><div className="text-sm">Active Numbers</div></div>
                <div><div className="text-3xl font-bold text-green-400">Multi-State</div><div className="text-sm">Coverage</div></div>
                <div><div className="text-3xl font-bold text-blue-400">Dozens</div><div className="text-sm">Billboard Locations</div></div>
                <div><div className="text-3xl font-bold text-purple-400">AI</div><div className="text-sm">Qualification</div></div>
              </div>
            </div>
          </div>

          {/* NEED Crisis Campaign */}
          <div className="mb-16 bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">🆘</div>
              <div>
                <h3 className="text-3xl font-bold">UNIVERSAL CRISIS Campaign</h3>
                <p className="text-purple-200">Multi-Service Intake Hub</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white text-gray-900 rounded-lg p-8 shadow-xl border-4 border-purple-500">
                <div className="text-center">
                  <div className="text-5xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    NEED HELP?
                  </div>
                  <div className="text-5xl font-bold text-purple-600 mb-3" style={{fontFamily: "Impact, sans-serif"}}>
                    844-NEED
                  </div>
                  <div className="text-2xl font-semibold text-gray-700">
                    24/7 AI Support
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-5xl font-black mb-2" style={{fontFamily: "Impact, sans-serif"}}>
                    EMERGENCY?
                  </div>
                  <div className="text-5xl font-bold mb-3" style={{fontFamily: "Impact, sans-serif"}}>
                    912-NEED
                  </div>
                  <div className="text-2xl font-semibold">
                    Instant Routing
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-900 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3">📊 Campaign Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><div className="text-3xl font-bold text-yellow-400">2</div><div className="text-sm">NEED Numbers</div></div>
                <div><div className="text-3xl font-bold text-green-400">Universal</div><div className="text-sm">Coverage</div></div>
                <div><div className="text-3xl font-bold text-blue-400">Dozens</div><div className="text-sm">Billboard Locations</div></div>
                <div><div className="text-3xl font-bold text-purple-400">AI</div><div className="text-sm">Smart Routing</div></div>
              </div>
              <div className="mt-4 bg-purple-800 rounded p-4 text-sm">
                <p className="font-semibold mb-2">How Universal Intake Works:</p>
                <p>844-NEED and 912-NEED are universal intake routers. The AI determines whether the caller needs legal, financial, storm, HVAC, or claims assistance and routes them to the appropriate service.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 mb-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">📋 How Billboard Messaging Works</h3>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 mb-4">
                <strong>Billboard headlines describe the problem.</strong> The phone number provides the path.
              </p>
              <p className="text-gray-700 mb-4">
                For example, a billboard may say <span className="font-bold">"NEED MONEY?"</span> but the dial instruction is <span className="font-bold text-blue-600">"CALL 888-CASH-AI."</span>
              </p>
              <p className="text-gray-700">
                Phones automatically convert vanity letters to digits. Carriers route only numeric phone numbers. 
                Our system maps the resulting digits to the correct AI intake persona.
              </p>
            </div>
          </div>

          <div className="text-center bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want These Billboards Working For You?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              License exclusive territory rights and get instant access to our billboard network, 
              AI call handling, and qualified lead delivery.
            </p>
            <Link
              href="#pricing"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              See Pricing & Packages
            </Link>
          </div>
        </section>

        {/* How It Works - Visual Flow */}
        <section id="how-it-works" className="mb-20 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How The System Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From billboard to qualified lead in 8 automated layers
            </p>
          </div>

          <div className="space-y-6">
            {/* Layer 1 */}
            <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">📺 Billboard Display</h3>
                <p className="text-gray-700">
                  Driver sees: <span className="font-mono font-bold text-blue-600">"STORM DAMAGE? CALL 470-STORM"</span>
                  <br />
                  <span className="text-sm text-gray-600">Memorable, easy to recall, high-intent messaging</span>
                </p>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🧠 Human Memory</h3>
                <p className="text-gray-700">
                  Caller remembers: <span className="font-mono font-bold">"470-STORM"</span>
                  <br />
                  <span className="text-sm text-gray-600">Much easier than remembering 470-287-8676</span>
                </p>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">📱 Phone Keypad Input</h3>
                <p className="text-gray-700">
                  Caller types: <span className="font-mono font-bold">4-7-0-S-T-O-R-M</span>
                  <br />
                  <span className="text-sm text-gray-600">Phone keyboard accepts both letters and numbers</span>
                </p>
              </div>
            </div>

            {/* Layer 4 - Key Conversion */}
            <div className="flex items-start gap-6 bg-yellow-50 p-6 rounded-xl shadow-md border-2 border-yellow-400">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">⚡ Phone OS Conversion (AUTOMATIC)</h3>
                <p className="text-gray-700 mb-2">
                  Phone converts: <span className="font-mono font-bold">STORM → 78676</span>
                  <br />
                  Final number: <span className="font-mono font-bold text-green-600">470-287-8676</span>
                </p>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-3">
                  <p className="text-sm font-semibold text-yellow-900">
                    ⚠️ THIS IS WHERE THE MAGIC HAPPENS - The phone does this automatically. 
                    No special setup needed. It&apos;s built into every phone since the 1980s.
                  </p>
                </div>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                5
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">📡 Carrier Network Routing</h3>
                <p className="text-gray-700">
                  Call routes through network to: <span className="font-mono font-bold">+1-470-287-8676</span>
                  <br />
                  <span className="text-sm text-gray-600">Standard E.164 format - only digits, never letters</span>
                </p>
              </div>
            </div>

            {/* Layer 6 */}
            <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                6
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">☁️ Telnyx Receives Call</h3>
                <p className="text-gray-700">
                  Telnyx sees: <span className="font-mono font-bold bg-gray-100 px-2 py-1 rounded">{`{ "to": "+14702878676" }`}</span>
                  <br />
                  <span className="text-sm text-gray-600">Only digits - Telnyx never sees "STORM"</span>
                </p>
              </div>
            </div>

            {/* Layer 7 */}
            <div className="flex items-start gap-6 bg-green-50 p-6 rounded-xl shadow-md border-2 border-green-400">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                7
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🎯 Our Webhook Handler Routes</h3>
                <p className="text-gray-700 mb-2">
                  Looks up: <span className="font-mono font-bold">"4702878676"</span> → <span className="font-mono font-bold text-green-600">"STORM" persona</span>
                  <br />
                  <span className="text-sm text-gray-600">NUMBER_TO_PERSONA mapping table</span>
                </p>
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mt-3">
                  <p className="text-sm font-semibold text-green-900">
                    ✅ THIS IS OUR ONLY CONFIGURATION - Simple digit-to-persona mapping. That&apos;s it.
                  </p>
                </div>
              </div>
            </div>

            {/* Layer 8 */}
            <div className="flex items-start gap-6 bg-purple-50 p-6 rounded-xl shadow-md border-2 border-purple-400">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                8
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🤖 AI System Responds</h3>
                <p className="text-gray-700">
                  Loads: <span className="font-mono font-bold">personas/STORM.md</span>
                  <br />
                  AI answers with storm damage intake script
                  <br />
                  <span className="text-sm text-gray-600">Qualifies emergency, documents damage, routes to contractors</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">🎯 The Bottom Line</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">✅ What Works Automatically:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>✓ Vanity letter conversion (phone does it)</li>
                  <li>✓ Call routing to Telnyx (network does it)</li>
                  <li>✓ Webhook delivery (Telnyx does it)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-2">⚙️ What We Configure:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>✓ NUMBER_TO_PERSONA mapping</li>
                  <li>✓ AI persona scripts</li>
                  <li>✓ Call intake logic</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer - Detailed */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What You Get</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete turnkey system - just license your territory and start receiving qualified leads
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Numbers */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">📞</span>
                Premium Vanity Numbers
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Exclusive territorial rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Memorable vanity format (470-STORM, 888-LAW-AI, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Already active and tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Instant call routing setup</span>
                </li>
              </ul>
            </div>

            {/* AI System */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                AI Call Handling
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>24/7 automated answering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Purpose-built personas (legal, storm, HVAC, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Intent qualification & lead scoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Full call transcripts & data capture</span>
                </li>
              </ul>
            </div>

            {/* Billboard Marketing */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">📺</span>
                Billboard Campaigns
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Professional billboard designs (ready to print)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Strategic placement recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Multiple size formats (14×48, 10×20, digital)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vendor coordination support</span>
                </li>
              </ul>
            </div>

            {/* Dashboard & Analytics */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">📊</span>
                Analytics Dashboard
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Real-time call monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Lead qualification metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>ROI tracking per campaign</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Downloadable call transcripts</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mb-20 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              License numbers in your territory. Pay per qualified lead. No setup fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                $500<span className="text-xl text-gray-600">/mo</span>
              </div>
              <div className="text-gray-600 mb-6">+ $25 per qualified lead</div>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>1 vanity number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>1 territory (state or metro)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>AI call handling 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>5 billboard designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Basic analytics dashboard</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Professional (Popular) */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 shadow-2xl border-4 border-yellow-400 transform scale-105">
              <div className="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <div className="text-4xl font-bold text-white mb-4">
                $1,500<span className="text-xl text-blue-200">/mo</span>
              </div>
              <div className="text-blue-200 mb-6">+ $20 per qualified lead</div>
              <ul className="space-y-3 text-white mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>3 vanity numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>3 territories (regional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>AI call handling 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>20 billboard designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>Advanced analytics + API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">Custom</div>
              <div className="text-gray-600 mb-6">Volume discounts available</div>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Unlimited numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>National coverage available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>White-label options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Custom AI persona development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>SLA guarantees</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-green-50 rounded-xl p-8 max-w-4xl mx-auto border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">💰 ROI Example</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Your Investment:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Professional Plan:</span>
                    <span className="font-bold">$1,500/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50 qualified leads × $20:</span>
                    <span className="font-bold">$1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billboard spend:</span>
                    <span className="font-bold">$3,000/mo</span>
                  </div>
                  <div className="flex justify-between border-t-2 border-gray-300 pt-2 mt-2 font-bold">
                    <span>Total Investment:</span>
                    <span className="text-xl">$5,500/mo</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Your Return:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>50 qualified leads</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>30% close rate:</span>
                    <span className="font-bold">15 clients</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg client value:</span>
                    <span className="font-bold">$3,500</span>
                  </div>
                  <div className="flex justify-between border-t-2 border-green-300 pt-2 mt-2 font-bold">
                    <span>Total Revenue:</span>
                    <span className="text-xl text-green-600">$52,500/mo</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg">
                <div className="text-sm font-semibold mb-1">NET PROFIT</div>
                <div className="text-4xl font-bold">$47,000/mo</div>
                <div className="text-sm mt-1">9.5x ROI</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vanity Numbers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Available Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">888-505-LAW-AI</h3>
              <p className="text-gray-700 mb-4">
                Legal AI intake system. Screens cases by jurisdiction, severity, and eligibility.
              </p>
              <Link href="/numbers" className="text-blue-600 hover:underline">
                View All Legal Numbers →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-2xl mb-2">🌩️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">470-287-8676</h3>
              <p className="text-gray-700 mb-4">
                Storm-intake AI for emergency routing and property damage qualification.
              </p>
              <Link href="/numbers" className="text-blue-600 hover:underline">
                View All Storm Numbers →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">844-725-CLAIM</h3>
              <p className="text-gray-700 mb-4">Structured claims intake with evidence prompts and insurer routing.</p>
              <Link href="/numbers" className="text-blue-600 hover:underline">
                View All Claims Numbers →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">888-676-BUCK</h3>
              <p className="text-gray-700 mb-4">
                Funding qualification with settlement verification and payment routing.
              </p>
              <Link href="/numbers" className="text-blue-600 hover:underline">
                View All Money Numbers →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-2xl mb-2">🌨️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">909-488-7663</h3>
              <p className="text-gray-700 mb-4">Hail intake and damage assessment with claims correlation.</p>
              <Link href="/numbers" className="text-blue-600 hover:underline">
                View All Hail Numbers →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-2xl mb-2">🌡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">888-HVAC-NOW</h3>
              <p className="text-gray-700 mb-4">HVAC emergency intake with same-day dispatch routing.</p>
              <Link href="/numbers" className="text-blue-600 hover:underline">
                View All HVAC Numbers →
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/numbers"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              Browse All 42 Numbers
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready To Start Generating Qualified Leads?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            License your territory today and start receiving AI-qualified leads from billboard campaigns tomorrow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/numbers"
              className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition border-2 border-white"
            >
              Browse Available Numbers
            </Link>
          </div>
        </section>

        {/* What This Is */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">This is not just a vanity number marketplace.</h2>
          <p className="text-gray-700 mb-4">
            Each number on this platform is paired with a dedicated AI system designed to handle a specific category of
            high-intent calls, including:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Legal intake</li>
            <li>Storm intake</li>
            <li>Hail intake</li>
            <li>HVAC intake</li>
            <li>Insurance claims</li>
            <li>Payments and funding</li>
            <li>Overflow and routing</li>
          </ul>
          <p className="text-gray-700 mt-4">When a call comes in, the AI does the work before a human ever gets involved.</p>
          <p className="text-gray-700 mt-4">
            <strong>And we actively market these numbers to generate qualified leads for your business.</strong>
          </p>
          <table className="w-full max-w-md mx-auto mt-8 table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Vanity Numbers</th>
                <th className="border border-gray-300 px-4 py-2 text-left">This Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Ring and hope</td>
                <td className="border border-gray-300 px-4 py-2">AI answers instantly</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Raw calls</td>
                <td className="border border-gray-300 px-4 py-2">Qualified outcomes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Call centers</td>
                <td className="border border-gray-300 px-4 py-2">Automated intake</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">No records</td>
                <td className="border border-gray-300 px-4 py-2">Full audit trail</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Additional Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ultimate AI Hub</h3>
              <p className="text-gray-700 mb-4">24/7 Agentic RAG Systems with algorithmic targeting</p>
              <Link href="/ai-marketing-hub" className="text-blue-600 hover:underline font-semibold">
                Launch AI Hub →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">State Coverage</h3>
              <p className="text-gray-700 mb-4">AI systems registered across all states</p>
              <Link href="/states" className="text-blue-600 hover:underline font-semibold">
                View States →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mint New Numbers</h3>
              <p className="text-gray-700 mb-4">Create custom vanity numbers with AI</p>
              <Link href="/mint" className="text-blue-600 hover:underline font-semibold">
                Get Started →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SIM Cards</h3>
              <p className="text-gray-700 mb-4">Physical and digital SIMs for instant activation</p>
              <Link href="/sims" className="text-blue-600 hover:underline font-semibold">
                Order Now →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Configuration</h3>
              <p className="text-gray-700 mb-4">Custom AI assistants with routing logic</p>
              <Link href="/intake" className="text-blue-600 hover:underline font-semibold">
                Configure AI →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Proof</h3>
              <p className="text-gray-700 mb-4">Real-time system behavior and metrics</p>
              <Link href="/proof/live" className="text-blue-600 hover:underline font-semibold">
                View Dashboard →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Statement */}
        <footer className="text-center text-gray-600">
          <p>We operate inbound decision infrastructure. Phone numbers are the entry point. AI systems deliver the outcome.</p>
        </footer>
      </main>
    </div>
  );
}

