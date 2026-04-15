import Navigation from '@/components/Navigation';
import CommsControlCenter from '@/components/CommsControlCenter';

export default function ControlCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CommsControlCenter />
    </div>
  );
}
