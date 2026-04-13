'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const StablecoinPayment = ({ amount, onPayment }: { amount: string; onPayment: () => void }) => {
  const [isPaying, setIsPaying] = useState(false);

  const payWithStablecoin = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }

    setIsPaying(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // USDC contract on Ethereum mainnet (example)
      const usdcAddress = '0xA0b86a33E6441e88C5F2712C3E9b74F5b8b6b8b8'; // Replace with actual
      const usdcAbi = ['function transfer(address,uint256) returns (bool)'];
      const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, signer);

      const tx = await usdcContract.transfer(process.env.NEXT_PUBLIC_TREASURY_ADDRESS, ethers.parseUnits(amount, 6));
      await tx.wait();

      onPayment();
      alert('Payment successful!');
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
    setIsPaying(false);
  };

  return (
    <button
      onClick={payWithStablecoin}
      disabled={isPaying}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
    >
      {isPaying ? 'Processing...' : `Pay ${amount} USDC`}
    </button>
  );
};

export default StablecoinPayment;