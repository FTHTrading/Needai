'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MintAIAgent = () => {
  const [name, setName] = useState('');
  const [persona, setPersona] = useState('');
  const [vanityNumber, setVanityNumber] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  const mintAgent = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }

    setIsMinting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // Contract address would be set after deployment
      const contractAddress = process.env.NEXT_PUBLIC_AI_AGENT_CONTRACT;
      if (!contractAddress) {
        alert('Contract address not configured');
        return;
      }
      const contract = new ethers.Contract(contractAddress, [
        "function mintAgent(address,string,string,string,string) returns (uint256)"
      ], signer);

      const tokenURI = `https://vanity.ai/api/metadata/${Date.now()}`; // Dynamic metadata

      const tx = await contract.mintAgent(
        await signer.getAddress(),
        name,
        persona,
        vanityNumber,
        tokenURI
      );

      await tx.wait();
      alert('AI Agent minted successfully!');
    } catch (error) {
      console.error(error);
      alert('Minting failed');
    }
    setIsMinting(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Mint Your AI Agent</h2>
      <input
        type="text"
        placeholder="Agent Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        value={persona}
        onChange={(e) => setPersona(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="">Select Persona</option>
        <option value="storm">Storm</option>
        <option value="law">Law</option>
        <option value="money">Money</option>
        <option value="hvac">HVAC</option>
        <option value="hail">Hail</option>
        <option value="claims">Claims</option>
        <option value="need">Need</option>
      </select>
      <input
        type="text"
        placeholder="Vanity Number"
        value={vanityNumber}
        onChange={(e) => setVanityNumber(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={mintAgent}
        disabled={isMinting}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isMinting ? 'Minting...' : 'Mint AI Agent'}
      </button>
    </div>
  );
};

export default MintAIAgent;