
import React from 'react';

const steps = [
  { name: 'Harvesting', status: 'completed', details: 'Farm A, Green Valley - Oct 23, 2023' },
  { name: 'Processing', status: 'completed', details: 'GV Processing Plant - Oct 24, 2023' },
  { name: 'Distribution', status: 'completed', details: 'Regional Hub - Oct 25, 2023' },
  { name: 'Retail', status: 'active', details: 'City Supermarket - In Stock' },
  { name: 'Sold', status: 'pending', details: 'Awaiting consumer purchase' },
];

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
    </svg>
);

export const SupplyChainView: React.FC = () => {
    return (
        <div className="animate-fade-in bg-brand-gray p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-2">Product Traceability</h2>
            <p className="text-gray-400 mb-6">Tracking batch #A4B2-1024 (Organic Tomatoes)</p>

            <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-11 top-2 bottom-2 w-0.5 bg-gray-600"></div>

                {steps.map((step, index) => (
                    <div key={index} className="flex items-start mb-8">
                        <div className="z-10 bg-brand-gray rounded-full p-2">
                             {step.status === 'completed' ? <CheckCircleIcon /> : <DotIcon />}
                        </div>
                        <div className="ml-6">
                            <h3 className={`text-lg font-semibold ${step.status === 'active' ? 'text-brand-green-light' : 'text-white'}`}>{step.name}</h3>
                            <p className="text-gray-400 text-sm">{step.details}</p>
                            {step.status === 'completed' && <p className="text-xs text-green-400 mt-1">Verified on Blockchain</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
