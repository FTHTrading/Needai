import { Suspense } from 'react';
import Dashboard from '@/components/Dashboard';
import { NUMBER_TO_PERSONA } from '@/lib/routing/engine';

export default function DashboardPage() {
  const canonicalCount = Object.keys(NUMBER_TO_PERSONA).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>}>
        <Dashboard canonicalCount={canonicalCount} />
      </Suspense>
    </div>
  );
}
