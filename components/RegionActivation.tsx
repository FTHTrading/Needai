'use client';

interface RegionActivationProps {
  regions: string[];
}

const allRegions = [
  { name: 'Georgia', status: 'active', numbers: ['470-287-STORM', '470-887-STORM', '229-398-HAIL'] },
  { name: 'Florida', status: 'active', numbers: ['727-387-STORM', '786-677-STORM'] },
  { name: 'Oklahoma', status: 'active', numbers: ['580-967-STORM'] },
  { name: 'Arizona', status: 'standby', numbers: ['520-347-STORM', '623-777-STORM'] },
  { name: 'Wisconsin', status: 'standby', numbers: ['262-397-HAIL'] },
];

export default function RegionActivation({ regions }: RegionActivationProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Region Activation</h3>

      <div className="space-y-4">
        {allRegions.map((region, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{region.name}</h4>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  region.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {region.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-1">
              {region.numbers.map((number, numIndex) => (
                <div key={numIndex} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{number}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      region.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Active Regions</span>
          <span className="font-semibold text-gray-900">
            {regions.length} / {allRegions.length}
          </span>
        </div>
      </div>
    </div>
  );
}