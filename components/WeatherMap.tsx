'use client';

interface WeatherAlert {
  region: string;
  severity: 'hail' | 'storm';
  size?: string;
  winds?: string;
}

interface WeatherMapProps {
  alerts: WeatherAlert[];
}

export default function WeatherMap({ alerts }: WeatherMapProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Weather Map</h2>

      {/* Placeholder for actual map - in real implementation, integrate with weather API */}
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
        <div className="text-center">
          <div className="text-6xl mb-2">🌩️</div>
          <p className="text-gray-600">Interactive Weather Map</p>
          <p className="text-sm text-gray-500">Real-time storm tracking integration</p>
        </div>
      </div>

      {/* Active Alerts */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Active Weather Alerts</h3>
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'hail'
                  ? 'border-l-yellow-500 bg-yellow-50'
                  : 'border-l-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{alert.region}</p>
                  <p className="text-sm text-gray-600">
                    {alert.severity === 'hail'
                      ? `Hail: ${alert.size}`
                      : `Storm: ${alert.winds} winds`
                    }
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    alert.severity === 'hail'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {alert.severity.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}