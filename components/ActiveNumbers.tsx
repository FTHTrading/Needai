'use client';

const activeNumbers = [
  { number: '+1-888-675-HAIL', type: 'hail', status: 'active', calls: 156 },
  { number: '+1-470-287-STORM', type: 'storm', status: 'active', calls: 234 },
  { number: '+1-727-387-STORM', type: 'storm', status: 'active', calls: 189 },
  { number: '+1-786-677-STORM', type: 'storm', status: 'active', calls: 145 },
  { number: '+1-844-967-HAIL', type: 'hail', status: 'active', calls: 98 },
  { number: '+1-470-887-STORM', type: 'storm', status: 'standby', calls: 0 },
  { number: '+1-229-398-HAIL', type: 'hail', status: 'standby', calls: 0 },
];

export default function ActiveNumbers() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Numbers</h3>

      <div className="space-y-3">
        {activeNumbers.map((num, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  num.status === 'active'
                    ? num.type === 'hail'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                    : 'bg-gray-400'
                }`}
              />
              <div>
                <p className="font-medium text-gray-900">{num.number}</p>
                <p className="text-sm text-gray-600 capitalize">{num.type} intake</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{num.calls}</p>
              <p className="text-xs text-gray-500">calls</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Active</span>
          <span className="font-semibold text-gray-900">
            {activeNumbers.filter(n => n.status === 'active').length} / {activeNumbers.length}
          </span>
        </div>
      </div>
    </div>
  );
}