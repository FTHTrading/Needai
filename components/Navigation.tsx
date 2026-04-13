'use client';

import { usePathname, useRouter } from 'next/navigation';

interface NavigationProps {
  showBackButton?: boolean;
  backTo?: string;
  backLabel?: string;
}

export default function Navigation({ showBackButton = false, backTo = '/', backLabel = 'Back' }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={() => router.push(backTo)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {backLabel}
              </button>
            )}
            <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              CallRail OS
            </a>
          </div>
          <div className="space-x-6 hidden md:flex">
            <a href="/" className={`transition-colors ${pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Home</a>
            <a href="/numbers" className={`transition-colors ${pathname === '/numbers' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Numbers</a>
            <a href="/marketplace" className={`transition-colors ${pathname === '/marketplace' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Marketplace</a>
            <a href="/dashboard" className={`transition-colors ${pathname === '/dashboard' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Dashboard</a>
            <a href="/states" className={`transition-colors ${pathname === '/states' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>States</a>
            <a href="/ai-marketing-hub" className={`transition-colors ${pathname === '/ai-marketing-hub' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>AI Hub</a>
            <a href="/marketing" className={`transition-colors ${pathname === '/marketing' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Marketing</a>
            <a href="/mint" className={`transition-colors ${pathname === '/mint' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Mint Numbers</a>
            <a href="/sims" className={`transition-colors ${pathname === '/sims' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>SIM Cards</a>
            <a href="/intake" className={`transition-colors ${pathname === '/intake' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>AI Setup</a>
            <a href="/ai-assistant" className={`transition-colors ${pathname === '/ai-assistant' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>AI Assistant</a>
            <a href="/contact" className={`transition-colors ${pathname === '/contact' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Contact</a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}