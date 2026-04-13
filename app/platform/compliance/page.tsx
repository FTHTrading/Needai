import Navigation from '../../../components/Navigation';

export default function Compliance() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Compliance & Security</h1>
        <p className="text-xl text-gray-700 mb-8">
          Enterprise-grade compliance with full audit trails and regulatory adherence.
        </p>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Regulatory Compliance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">TCPA Compliance</h3>
                <p className="text-gray-700">All calls are inbound opt-in, with proper consent verification.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">HIPAA Ready</h3>
                <p className="text-gray-700">Medical information handling meets HIPAA standards.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">FCRA Compliant</h3>
                <p className="text-gray-700">Credit and background information handled per FCRA requirements.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">State Insurance Laws</h3>
                <p className="text-gray-700">Claims processing compliant with all 50 state insurance regulations.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security Measures</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>End-to-end encryption for all call data and recordings</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>SOC 2 Type II certified infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Regular security audits and penetration testing</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>GDPR and CCPA compliant data handling</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Multi-factor authentication for all admin access</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Audit & Transparency</h2>
            <p className="text-gray-700 mb-4">
              Every interaction is logged with full traceability:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Call recordings with AI transcription</li>
              <li>• Complete metadata logs (timestamps, IP addresses, device info)</li>
              <li>• AI decision rationale and confidence scores</li>
              <li>• Routing history and escalation records</li>
              <li>• Data retention policies (configurable per licensee)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Licensees receive monthly compliance reports and can request full audit logs at any time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}