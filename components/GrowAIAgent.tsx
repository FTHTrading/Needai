'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const GrowAIAgent = ({ tokenId }: { tokenId: number }) => {
  const [isGrowing, setIsGrowing] = useState(false);

  const growAgent = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }

    setIsGrowing(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = process.env.NEXT_PUBLIC_AI_AGENT_CONTRACT;
      if (!contractAddress) {
        alert('Contract address not configured');
        return;
      }
      const contract = new ethers.Contract(contractAddress, [
        "function growAgent(uint256,uint256)"
      ], signer);

      const tx = await contract.growAgent(tokenId, 10); // 10 experience points
      await tx.wait();

      alert('AI Agent grew successfully!');
    } catch (error) {
      console.error(error);
      alert('Growth failed');
    }
    setIsGrowing(false);
  };

  return (
    <button
      onClick={growAgent}
      disabled={isGrowing}
      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
    >
      {isGrowing ? 'Growing...' : 'Grow Agent'}
    </button>
  );
};

export default GrowAIAgent;