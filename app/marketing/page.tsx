import Navigation from '../../components/Navigation';

export default function Marketing() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">AI Marketing & Advertising</h1>
        <p className="text-xl text-gray-700 mb-8">
          We don't just provide AI-powered phone numbers. We actively market and advertise them to generate qualified leads for your business.
        </p>

        <div className="bg-blue-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Our AI Marketing System Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Targeted Campaigns</h3>
              <p className="text-gray-700 text-sm">AI identifies and targets potential customers based on behavior, location, and intent signals.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold text-gray-900 mb-2">Direct Call Routing</h3>
              <p className="text-gray-700 text-sm">Every call from our marketing campaigns routes directly to your business with full context.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Qualification</h3>
              <p className="text-gray-700 text-sm">Our AI answers calls instantly, qualifies leads, and routes only the best opportunities to you.</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industry-Specific Marketing Campaigns</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Legal Marketing */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Legal Marketing</h2>
            <div className="mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">888-505-LAW-AI</div>
              <div className="text-gray-600">Targeted legal lead generation</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Personal injury case identification
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Workers' compensation leads
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Medical malpractice inquiries
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Real-time case qualification
              </li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Marketing Channels</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Google Ads for injury-related searches</li>
                <li>• Social media targeting accident victims</li>
                <li>• Local SEO for "personal injury lawyer"</li>
                <li>• TV and radio spots in high-accident areas</li>
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Start Legal Marketing Campaign
            </button>
          </div>

          {/* Auto Claims Marketing */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Auto Claims Marketing</h2>
            <div className="mb-6">
              <div className="text-3xl font-bold text-green-600 mb-2">855-771-AUTO</div>
              <div className="text-gray-600">Post-accident claim processing</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Immediate accident response
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Injury assessment and documentation
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Insurance claim initiation
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Towing and repair coordination
              </li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Marketing Channels</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• GPS-triggered accident alerts</li>
                <li>• Partnership with towing companies</li>
                <li>• Emergency roadside assistance ads</li>
                <li>• Auto insurance comparison sites</li>
              </ul>
            </div>
            <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              Start Auto Claims Campaign
            </button>
          </div>

          {/* Roofing Marketing */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Roofing & Storm Damage</h2>
            <div className="mb-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">909-488-ROOF</div>
              <div className="text-gray-600">Storm damage response</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                Storm damage assessment
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                Insurance claim filing
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                Emergency repair coordination
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✓</span>
                Contractor matching and routing
              </li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Marketing Channels</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Weather API triggered campaigns</li>
                <li>• Storm tracking and alert systems</li>
                <li>• Insurance company partnerships</li>
                <li>• Local emergency response networks</li>
              </ul>
            </div>
            <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700">
              Start Roofing Campaign
            </button>
          </div>

          {/* Insurance Claims */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Insurance Claims</h2>
            <div className="mb-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">844-725-CLAIM</div>
              <div className="text-gray-600">Structured claims processing</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                Multi-line insurance claims
              </li>
              <li className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                Evidence collection and documentation
              </li>
              <li className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                Adjuster routing and coordination
              </li>
              <li className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                Claim status tracking and updates
              </li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Marketing Channels</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Insurance comparison websites</li>
                <li>• Partnership with insurance agents</li>
                <li>• Social media claims assistance</li>
                <li>• Local community disaster response</li>
              </ul>
            </div>
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
              Start Claims Campaign
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Marketing Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Targeting</h3>
              <p className="text-gray-600 text-sm">Machine learning identifies high-intent prospects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-600 text-sm">Live campaign performance and conversion tracking</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Dynamic Optimization</h3>
              <p className="text-gray-600 text-sm">AI adjusts campaigns based on real-time results</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Conversion Attribution</h3>
              <p className="text-gray-600 text-sm">Track every lead from ad click to case closure</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complete Marketing Solution</h2>
          <p className="text-gray-700 mb-6">
            We offer both the AI-powered phone numbers AND the marketing campaigns that drive calls to them.
            Choose from our pre-built campaigns or work with us to create custom marketing strategies for your industry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Phone Numbers Only</h3>
              <p className="text-gray-600 text-sm mb-4">License our AI-powered numbers and handle your own marketing</p>
              <div className="text-2xl font-bold text-gray-900">$500/month</div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Numbers + Marketing</h3>
              <p className="text-gray-600 text-sm mb-4">Full-service solution with AI-driven lead generation</p>
              <div className="text-2xl font-bold text-green-600">$2,500/month</div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Enterprise Solution</h3>
              <p className="text-gray-600 text-sm mb-4">Custom campaigns with dedicated account management</p>
              <div className="text-2xl font-bold text-blue-600">Custom Pricing</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Generating Qualified Leads?</h2>
          <p className="text-gray-700 mb-6">
            Contact us to discuss your marketing goals and see how our AI-powered system can drive qualified calls to your business.
          </p>
          <a
            href="/contact"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 text-lg"
          >
            Start Your Marketing Campaign
          </a>
        </div>
      </main>
    </div>
  );
}