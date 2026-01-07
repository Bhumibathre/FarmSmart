import React from 'react';
import { SparklesIcon } from '../components/IconComponents';

const CarbonTracker: React.FC = () => {
  const score = 68; // in tons of CO2e / year
  const maxScore = 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className="bg-brand-gray-light p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-4">Smart Carbon Tracker</h3>
      <div className="relative">
        <svg className="transform -rotate-90" width="120" height="120">
          <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="10" className="text-gray-700" fill="transparent" />
          <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="text-yellow-500" fill="transparent" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{score}t</span>
      </div>
      <p className="mt-3 text-sm text-gray-400">CO2e footprint this year</p>
    </div>
  );
};


export const SustainabilityView: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-brand-gray p-6 rounded-xl shadow-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Sustainability Score</h3>
                    <p className="text-5xl font-bold text-brand-green">85</p>
                    <p className="text-sm text-gray-400 mt-1">Excellent ecological balance</p>
                </div>
                <CarbonTracker />
                 <div className="bg-brand-gray p-6 rounded-xl shadow-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Water Usage Efficiency</h3>
                    <p className="text-5xl font-bold text-blue-400">95%</p>
                    <p className="text-sm text-gray-400 mt-1">Smart irrigation active</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <SparklesIcon className="h-6 w-6 mr-3 text-yellow-400" />
                        AgroCoin Reward System
                    </h2>
                    <div className="bg-brand-gray-dark p-4 rounded-lg text-center mb-4">
                        <p className="text-gray-400 text-sm">Your Balance</p>
                        <p className="text-3xl font-bold text-yellow-400">1,250 AC</p>
                    </div>
                    <h4 className="font-semibold mb-2">Recent Transactions</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between p-2 bg-brand-gray-light rounded"><span>Reduced fertilizer use</span> <span className="font-semibold text-green-400">+50 AC</span></li>
                        <li className="flex justify-between p-2 bg-brand-gray-light rounded"><span>Installed solar water pump</span> <span className="font-semibold text-green-400">+200 AC</span></li>
                        <li className="flex justify-between p-2 bg-brand-gray-light rounded"><span>Redeemed for supplies</span> <span className="font-semibold text-red-400">-100 AC</span></li>
                    </ul>
                     <button className="mt-4 w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 transition">
                        Redeem on Marketplace
                    </button>
                </div>
                <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
                     <h2 className="text-2xl font-bold text-white mb-4">AI Scheme Finder</h2>
                     <p className="text-gray-400 mb-4">Our AI has identified government subsidy and insurance programs you may be eligible for.</p>
                     <div className="space-y-4">
                        <div className="bg-brand-gray-dark p-4 rounded-lg border-l-4 border-brand-green">
                            <h4 className="font-semibold text-brand-green-light">PM-KISAN Scheme</h4>
                            <p className="text-sm text-gray-300">Income support for small farmers. <a href="#" className="underline">Details here</a>.</p>
                            <p className="text-xs text-green-400 mt-1 font-bold">Match: 95% (Recommended)</p>
                        </div>
                         <div className="bg-brand-gray-dark p-4 rounded-lg border-l-4 border-blue-400">
                            <h4 className="font-semibold text-blue-300">National Organic Farming Grant</h4>
                            <p className="text-sm text-gray-300">Subsidy for organic certification. <a href="#" className="underline">Details here</a>.</p>
                             <p className="text-xs text-blue-400 mt-1 font-bold">Match: 80%</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
