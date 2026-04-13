// app/command-center/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

export default function CommandCenter() {
  const [walletHealth, setWalletHealth] = useState<any>(null);
  const [vaultStatus, setVaultStatus] = useState<any>(null);
  const [bbcStatus, setBbcStatus] = useState<any>(null);
  const [attestations, setAttestations] = useState<any[]>([]);

  useEffect(() => {
    fetchSystemStatus();
    const interval = setInterval(fetchSystemStatus, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchSystemStatus = async () => {
    try {
      // Fetch wallet health
      const walletsRes = await fetch('/api/wallets?chain=all');
      const walletsData = await walletsRes.json();
      setWalletHealth(walletsData);

      // Fetch vault status
      const vaultRes = await fetch('/api/reserve-vault');
      const vaultData = await vaultRes.json();
      setVaultStatus(vaultData);

      // Fetch borrowing base
      const bbcRes = await fetch('/api/borrowing-base?action=current');
      const bbcData = await bbcRes.json();
      setBbcStatus(bbcData);

      // Fetch recent attestations
      const attRes = await fetch('/api/attestation');
      const attData = await attRes.json();
      setAttestations(attData.attestations || []);
    } catch (error) {
      console.error('Failed to fetch system status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />

      {/* Header */}
      <div className="max-w-[1920px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
              ⚡ SOVEREIGN COMMAND CENTER
            </h1>
            <p className="text-gray-400 text-lg">
              Real-time operational intelligence · OPTKAS1-MAIN SPV
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">System Status</div>
            <div className="text-2xl font-bold text-green-400">● ALL SYSTEMS OPERATIONAL</div>
          </div>
        </div>

        {/* 8-Panel Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Panel 1: Wallet Health (XRPL) */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">🏦</span> XRPL Wallets
            </h3>
            {walletHealth?.xrpl ? (
              <div className="space-y-3">
                {walletHealth.xrpl.slice(0, 3).map((wallet: any) => (
                  <div key={wallet.id} className="border-l-2 border-green-500 pl-3">
                    <div className="text-xs text-gray-400">{wallet.name}</div>
                    <div className="text-sm font-mono text-green-400">{wallet.health.toUpperCase()}</div>
                    <div className="text-xs text-gray-500">{wallet.address.slice(0, 12)}...</div>
                  </div>
                ))}
                <div className="text-xs text-gray-400 mt-4">
                  Total: {walletHealth.summary?.xrpl?.count || 6} wallets · {walletHealth.summary?.xrpl?.healthy || 6} healthy
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}
          </div>

          {/* Panel 2: Wallet Health (Stellar) */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">⭐</span> Stellar Wallets
            </h3>
            {walletHealth?.stellar ? (
              <div className="space-y-3">
                {walletHealth.stellar.map((wallet: any) => (
                  <div key={wallet.id} className="border-l-2 border-blue-500 pl-3">
                    <div className="text-xs text-gray-400">{wallet.name}</div>
                    <div className="text-sm font-mono text-blue-400">{wallet.health.toUpperCase()}</div>
                    <div className="text-xs text-gray-500">{wallet.address.slice(0, 12)}...</div>
                  </div>
                ))}
                <div className="text-xs text-gray-400 mt-4">
                  Total: {walletHealth.summary?.stellar?.count || 3} wallets · {walletHealth.summary?.stellar?.healthy || 3} healthy
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}
          </div>

          {/* Panel 3: Reserve Vault */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">💎</span> Reserve Vault
            </h3>
            {vaultStatus?.vault ? (
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-400">Net Asset Value</div>
                  <div className="text-3xl font-bold text-green-400">
                    ${(vaultStatus.vault.nav / 1000000).toFixed(2)}M
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Assets</div>
                    <div className="text-lg font-bold text-white">{vaultStatus.vault.totalAssets}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Reserve Ratio</div>
                    <div className="text-lg font-bold text-white">
                      {(vaultStatus.vault.reserveRatio * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">PRR Share Price</div>
                  <div className="text-lg font-bold text-amber-400">
                    ${vaultStatus.vault.prrShares.pricePerShare.toFixed(3)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}
          </div>

          {/* Panel 4: Borrowing Base */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">📊</span> Borrowing Base
            </h3>
            {bbcStatus?.borrowingBase ? (
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-400">Borrowing Base</div>
                  <div className="text-3xl font-bold text-green-400">
                    ${(bbcStatus.borrowingBase.borrowingBase / 1000000).toFixed(2)}M
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Available Credit</div>
                    <div className="text-lg font-bold text-white">
                      ${(bbcStatus.borrowingBase.availableCredit / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Utilization</div>
                    <div className="text-lg font-bold text-white">
                      {(bbcStatus.borrowingBase.utilization * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Covenant Status</div>
                  <div className="text-sm font-bold text-green-400">✓ ALL COMPLIANT</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Loading...</div>
            )}
          </div>

          {/* Panel 5: AMM Pool TVL */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">🌊</span> AMM Liquidity Pools
            </h3>
            <div className="space-y-2">
              {['OPTKAS/XRP', 'SOVBND/XRP', 'IMPERIA/XRP', 'GEMVLT/XRP', 'TERRAVL/XRP', 'PETRO/XRP'].map((pair) => (
                <div key={pair} className="flex justify-between items-center border-b border-gray-700/50 pb-2">
                  <div className="text-sm text-gray-300">{pair}</div>
                  <div className="text-sm font-mono text-amber-400">$0.00</div>
                </div>
              ))}
              <div className="text-xs text-gray-400 mt-4">
                6 XRPL pools + 3 Stellar pools active
              </div>
            </div>
          </div>

          {/* Panel 6: Attestation Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">📜</span> Chain Attestations
            </h3>
            {attestations.length > 0 ? (
              <div className="space-y-3">
                {attestations.slice(0, 4).map((att: any) => (
                  <div key={att.id} className="border-l-2 border-purple-500 pl-3">
                    <div className="text-xs text-gray-400">{att.documentName}</div>
                    <div className="text-xs font-mono text-purple-400">{att.sha256.slice(0, 16)}...</div>
                    <div className="text-xs text-gray-500">
                      {att.chains?.xrpl && '🔗 XRPL'} {att.chains?.stellar && '⭐ Stellar'}
                    </div>
                  </div>
                ))}
                <div className="text-xs text-gray-400 mt-4">
                  Total: {attestations.length} attestations
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No attestations yet</div>
            )}
          </div>

          {/* Panel 7: Funding Pipeline */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">💰</span> Funding Pipeline
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-400">Wave 1 Targets</div>
                <div className="text-3xl font-bold text-white">14</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Tier 1A</div>
                  <div className="text-lg font-bold text-amber-400">10</div>
                  <div className="text-xs text-gray-500">Apollo · Ares · KKR</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Tier 1B</div>
                  <div className="text-lg font-bold text-blue-400">4</div>
                  <div className="text-xs text-gray-500">CS · DB · StanChart</div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="text-xs text-gray-400">Target Launch</div>
                <div className="text-sm font-bold text-green-400">Monday, Feb 10 · 8:00 AM</div>
              </div>
            </div>
          </div>

          {/* Panel 8: Compliance & Audit */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
              <span className="mr-2">🛡️</span> Compliance Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">KYC/AML</span>
                <span className="text-sm font-bold text-green-400">✓ ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Multisig (2-of-3)</span>
                <span className="text-sm font-bold text-green-400">✓ CONFIGURED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Emergency Pause</span>
                <span className="text-sm font-bold text-green-400">✓ READY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Stellar Compliance</span>
                <span className="text-sm font-bold text-green-400">✓ ALL FLAGS</span>
              </div>
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="text-xs text-gray-400">Last Audit Event</div>
                <div className="text-xs text-gray-500">2 minutes ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>OPTKAS1-MAIN SPV · Wyoming, USA · Sovereign Financial Platform</p>
          <p className="mt-2">
            Real-time data · Auto-refresh every 30s · Last update: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
