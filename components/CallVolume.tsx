'use client';

interface CallVolumeData {
  total: number;
  storm: number;
  hail: number;
  lastHour: number;
}

interface CallVolumeProps {
  data: CallVolumeData;
}

export default function CallVolume({ data }: CallVolumeProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Volume</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Today</span>
          <span className="text-lg font-semibold text-gray-900">
            {data.total.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">STORM Calls</span>
          <span className="text-lg font-semibold text-blue-600">
            {data.storm.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">HAIL Calls</span>
          <span className="text-lg font-semibold text-yellow-600">
            {data.hail.toLocaleString()}
          </span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Hour</span>
            <span className="text-lg font-semibold text-green-600">
              {data.lastHour}
            </span>
          </div>
        </div>
      </div>

      {/* Mini chart placeholder */}
      <div className="mt-4 h-16 bg-gray-50 rounded flex items-end justify-around">
        {[20, 35, 45, 60, 55, 70, 65, 80, 75, 90, 85, 95].map((height, i) => (
          <div
            key={i}
            className="bg-blue-500 w-2 rounded-t"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center mt-1">Hourly call volume</p>
    </div>
  );
}