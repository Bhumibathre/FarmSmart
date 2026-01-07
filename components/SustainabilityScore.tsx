
import React from 'react';

export const SustainabilityScore: React.FC = () => {
  const score = 85;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-brand-gray p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-4">Sustainability Score</h3>
      <div className="relative">
        <svg className="transform -rotate-90" width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            className="text-gray-700"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-brand-green"
            fill="transparent"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{score}</span>
      </div>
      <p className="mt-3 text-sm text-gray-400">Excellent ecological balance</p>
    </div>
  );
};
