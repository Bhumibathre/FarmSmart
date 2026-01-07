
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MarketData } from '../types';

const wheatData: MarketData[] = [
  { month: 'Jan', price: 220 },
  { month: 'Feb', price: 230 },
  { month: 'Mar', price: 225 },
  { month: 'Apr', price: 240 },
  { month: 'May', price: 250 },
  { month: 'Jun', price: 245 },
];

const cornData: MarketData[] = [
  { month: 'Jan', price: 150 },
  { month: 'Feb', price: 155 },
  { month: 'Mar', price: 160 },
  { month: 'Apr', price: 158 },
  { month: 'May', price: 165 },
  { month: 'Jun', price: 170 },
];

export const MarketTrends: React.FC = () => {
  const [crop, setCrop] = useState<'wheat' | 'corn'>('wheat');
  const data = crop === 'wheat' ? wheatData : cornData;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Market Price Trends ($/ton)</h3>
        <select 
            value={crop} 
            onChange={(e) => setCrop(e.target.value as 'wheat' | 'corn')}
            className="bg-brand-gray-light border border-gray-600 rounded-md p-2"
        >
          <option value="wheat">Wheat</option>
          <option value="corn">Corn</option>
        </select>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                borderColor: '#374151',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#10B981" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
