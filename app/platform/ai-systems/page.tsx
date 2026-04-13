import Navigation from '../../../components/Navigation';

export default function AISystems() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">AI Systems</h1>
        <p className="text-xl text-gray-700 mb-8">
          Behind each vanity number is a specialized AI agent designed for its category.
        </p>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal Intake Agent</h2>
            <p className="text-gray-700 mb-4">
              Handles personal injury, accident, and legal consultation calls. Qualifies cases by jurisdiction, severity, and evidence requirements.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Multi-state jurisdiction recognition</li>
              <li>Case severity scoring (1-10)</li>
              <li>Evidence collection prompts</li>
              <li>Attorney matching algorithms</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Auto Incident Agent</h2>
            <p className="text-gray-700 mb-4">
              Processes post-accident calls with focus on injury assessment and claim initiation.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Accident type classification</li>
              <li>Injury severity detection</li>
              <li>Insurance policy verification</li>
              <li>Emergency service coordination</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Claims Agent</h2>
            <p className="text-gray-700 mb-4">
              Manages insurance claims intake with detailed documentation and routing.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Claim type identification</li>
              <li>Policy number validation</li>
              <li>Damage assessment prompts</li>
              <li>Adjuster assignment logic</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payments Agent</h2>
            <p className="text-gray-700 mb-4">
              Handles funding and payment qualification calls with verification processes.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Creditworthiness assessment</li>
              <li>Settlement verification</li>
              <li>Payment routing decisions</li>
              <li>Fraud detection algorithms</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property Damage Agent</h2>
            <p className="text-gray-700 mb-4">
              Processes property damage and restoration calls with contractor matching.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Damage type classification</li>
              <li>Insurance claim correlation</li>
              <li>Contractor qualification</li>
              <li>Emergency response coordination</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}