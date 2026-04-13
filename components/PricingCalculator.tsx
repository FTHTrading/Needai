'use client';

import { useState } from 'react';

interface PricingCalculatorProps {
  className?: string;
}

interface CalculationResult {
  leadRevenue: number;
  licensingRevenue: number;
  aiRevenue: number;
  stormRevenue: number;
  totalRevenue: number;
  totalCosts: number;
  netProfit: number;
  roi: number;
}

export default function PricingCalculator({ className = '' }: PricingCalculatorProps) {
  const [inputs, setInputs] = useState({
    licensedNumbers: 5,
    monthlyCalls: 200,
    stormEvents: 2,
    avgLeadValue: 200,
    conversionRate: 60,
    avgLicensePrice: 350,
    aiCostPerCall: 0.75,
    stormFee: 149,
    monthlyMarketingCost: 500
  });

  const calculateRevenue = (): CalculationResult => {
    const leadRevenue = inputs.monthlyCalls * (inputs.conversionRate / 100) * inputs.avgLeadValue;
    const licensingRevenue = inputs.licensedNumbers * inputs.avgLicensePrice;
    const aiRevenue = inputs.monthlyCalls * inputs.aiCostPerCall;
    const stormRevenue = inputs.stormEvents * inputs.stormFee;

    const totalRevenue = leadRevenue + licensingRevenue + aiRevenue + stormRevenue;
    const totalCosts = inputs.monthlyMarketingCost;
    const netProfit = totalRevenue - totalCosts;
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

    return {
      leadRevenue,
      licensingRevenue,
      aiRevenue,
      stormRevenue,
      totalRevenue,
      totalCosts,
      netProfit,
      roi
    };
  };

  const result = calculateRevenue();

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Business Assumptions</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Licensed Numbers</label>
              <input
                type="number"
                value={inputs.licensedNumbers}
                onChange={(e) => handleInputChange('licensedNumbers', parseInt(e.target.value) || 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Calls</label>
              <input
                type="number"
                value={inputs.monthlyCalls}
                onChange={(e) => handleInputChange('monthlyCalls', parseInt(e.target.value) || 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Storm Events/Month</label>
              <input
                type="number"
                value={inputs.stormEvents}
                onChange={(e) => handleInputChange('stormEvents', parseInt(e.target.value) || 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Avg Lead Value ($)</label>
              <input
                type="number"
                value={inputs.avgLeadValue}
                onChange={(e) => handleInputChange('avgLeadValue', parseInt(e.target.value) || 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Conversion Rate (%)</label>
              <input
                type="number"
                value={inputs.conversionRate}
                onChange={(e) => handleInputChange('conversionRate', parseInt(e.target.value) || 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Avg License Price ($)</label>
              <input
                type="number"
                value={inputs.avgLicensePrice}
                onChange={(e) => handleInputChange('avgLicensePrice', parseInt(e.target.value) || 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue Projection</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Lead Generation:</span>
              <span className="font-semibold text-green-600">${result.leadRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Licensing:</span>
              <span className="font-semibold text-green-600">${result.licensingRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">AI Services:</span>
              <span className="font-semibold text-green-600">${result.aiRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Storm Fees:</span>
              <span className="font-semibold text-green-600">${result.stormRevenue.toLocaleString()}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-800">Total Revenue:</span>
              <span className="font-bold text-green-600">${result.totalRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Costs:</span>
              <span className="font-semibold text-red-600">${result.totalCosts.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-800">Net Profit:</span>
              <span className="font-bold text-blue-600">${result.netProfit.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">ROI:</span>
              <span className="font-semibold text-purple-600">{result.roi.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> Adjust the inputs above to model different scenarios.
          The calculator assumes 60% of calls convert to qualified leads at an average value of $200 each.
        </p>
      </div>
    </div>
  );
}