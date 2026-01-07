
import React from 'react';
import { MarketTrends } from '../components/MarketTrends';

export const MarketView: React.FC = () => {
  return (
    <div className="animate-fade-in bg-brand-gray p-6 rounded-xl shadow-lg">
      <MarketTrends />
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Market Insights</h3>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
            <li>Wheat prices show strong seasonal correlation with harvest times.</li>
            <li>Corn futures are up 3% this week due to increased demand for ethanol.</li>
            <li>Consider diversifying with soybeans as international demand is projected to grow.</li>
        </ul>
      </div>
    </div>
  );
};
