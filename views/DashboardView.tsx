import React from 'react';
import { WeatherWidget } from '../components/WeatherWidget';
import { MarketTrends } from '../components/MarketTrends';
import { SustainabilityScore } from '../components/SustainabilityScore';
import type { View } from '../types';
import { LeafIcon, BeakerIcon, MapIcon, SparklesIcon } from '../components/IconComponents';

interface DashboardViewProps {
  setActiveView: (view: View) => void;
}

const FarmScorecard: React.FC = () => {
    const score = 92;
    return (
        <div className="bg-brand-gray p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-semibold text-white mb-2">AI Farm Scorecard</h3>
            <p className="text-5xl font-bold text-brand-green">{score}<span className="text-2xl">%</span></p>
            <p className="text-sm text-gray-400 mt-1">Excellent Performance</p>
             <button className="mt-3 text-sm text-brand-green-light hover:underline">View Full Audit</button>
        </div>
    );
};


export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView }) => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeatherWidget />
            <SustainabilityScore />
            <FarmScorecard />
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <button 
                        onClick={() => setActiveView('Farm Twin')}
                        className="flex items-center justify-center p-4 bg-brand-gray-light hover:bg-brand-green-dark transition-all rounded-lg text-center"
                    >
                        <MapIcon className="h-8 w-8 mr-3 text-purple-400" />
                        <div>
                            <p className="font-semibold">View Farm Twin</p>
                            <p className="text-xs text-gray-400">GIS & Drone Data</p>
                        </div>
                    </button>
                    <button 
                        onClick={() => setActiveView('Disease Doctor')}
                        className="flex items-center justify-center p-4 bg-brand-gray-light hover:bg-brand-green-dark transition-all rounded-lg text-center"
                    >
                        <LeafIcon className="h-8 w-8 mr-3 text-brand-green-light" />
                        <div>
                            <p className="font-semibold">Diagnose Disease</p>
                            <p className="text-xs text-gray-400">Upload an image</p>
                        </div>
                    </button>
                     <button 
                        onClick={() => setActiveView('Crop Advisor')}
                        className="flex items-center justify-center p-4 bg-brand-gray-light hover:bg-brand-green-dark transition-all rounded-lg text-center"
                    >
                        <BeakerIcon className="h-8 w-8 mr-3 text-blue-400" />
                        <div>
                            <p className="font-semibold">Get Advice</p>
                            <p className="text-xs text-gray-400">Crops & Fertilizers</p>
                        </div>
                    </button>
                    <button 
                        onClick={() => setActiveView('Sustainability')}
                        className="flex items-center justify-center p-4 bg-brand-gray-light hover:bg-brand-green-dark transition-all rounded-lg text-center"
                    >
                        <SparklesIcon className="h-8 w-8 mr-3 text-yellow-400" />
                        <div>
                            <p className="font-semibold">Eco Hub</p>
                            <p className="text-xs text-gray-400">Credits & Schemes</p>
                        </div>
                    </button>
                </div>
            </div>
             <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Farm Alerts</h3>
                 <div className="space-y-3">
                    <div className="flex items-start p-3 bg-red-900/50 rounded-lg">
                        <span className="text-red-400 font-bold mr-3">!!</span>
                        <div>
                            <p className="font-semibold text-red-300">Climate Disaster Alert</p>
                            <p className="text-sm text-red-400">Heatwave warning: Temperatures to exceed 40°C in next 48 hours. Increase irrigation.</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 bg-yellow-900/50 rounded-lg">
                        <span className="text-yellow-400 font-bold mr-3">!</span>
                        <div>
                            <p className="font-semibold text-yellow-300">Pest Alert: Aphids</p>
                            <p className="text-sm text-yellow-400">High probability in Sector B. Recommended action: Neem oil spray.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
            <MarketTrends />
        </div>
    </div>
  );
};
