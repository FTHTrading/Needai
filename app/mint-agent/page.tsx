'use client';

import MintAIAgent from '../../components/MintAIAgent';
import GrowAIAgent from '../../components/GrowAIAgent';
import StablecoinPayment from '../../components/StablecoinPayment';

export default function MintAgentPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <MintAIAgent />
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Grow Your AI Agent</h3>
          <GrowAIAgent tokenId={0} /> {/* Replace with actual tokenId */}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Premium Features - 10 USDC</h3>
          <StablecoinPayment amount="10" onPayment={() => {}} />
        </div>
      </div>
    </div>
  );
}