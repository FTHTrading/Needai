'use client';

interface StormModeToggleProps {
  stormMode: boolean;
  hailMode: boolean;
  onToggle: (type: 'storm' | 'hail', enabled: boolean) => void;
}

export default function StormModeToggle({ stormMode, hailMode, onToggle }: StormModeToggleProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggle('storm', !stormMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            stormMode ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              stormMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-900">
          STORM Mode {stormMode ? 'ACTIVE' : 'OFF'}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggle('hail', !hailMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            hailMode ? 'bg-yellow-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              hailMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-900">
          HAIL Mode {hailMode ? 'ACTIVE' : 'OFF'}
        </span>
      </div>
    </div>
  );
}