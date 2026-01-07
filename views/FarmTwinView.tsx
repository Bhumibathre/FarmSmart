import React from 'react';
import { DroneIcon } from '../components/IconComponents';

export const FarmTwinView: React.FC = () => {
  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Map Display */}
      <div className="lg:col-span-2 bg-brand-gray p-4 rounded-xl shadow-lg h-[calc(100vh-200px)] flex flex-col">
        <h2 className="text-xl font-bold text-white mb-4">Digital Farm Twin: Sector B</h2>
        <div 
          className="flex-1 bg-cover bg-center rounded-lg border-2 border-brand-gray-light" 
          style={{ backgroundImage: "url('https://i.imgur.com/5uVn5Vf.png')" }}
        >
          <div className="bg-black/50 p-2 rounded-br-lg rounded-tl-lg inline-block">
            <p className="text-white font-semibold">Live Simulation</p>
          </div>
        </div>
      </div>

      {/* Controls and Data */}
      <div className="space-y-6">
        <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Layers & Controls</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-300">NDVI Health Index</span>
              <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Soil Nutrient Map</span>
              <input type="checkbox" className="toggle-checkbox" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Pest Hotspots</span>
              <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </label>
             <label className="flex items-center justify-between">
              <span className="text-gray-300">Climate Resilience (Drought)</span>
              <input type="checkbox" className="toggle-checkbox" />
            </label>
          </div>
        </div>

        <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Drone Vision Analyzer</h3>
          <button className="w-full flex items-center justify-center p-3 bg-brand-gray-light hover:bg-brand-green-dark transition-all rounded-lg">
            <DroneIcon className="h-6 w-6 mr-3 text-cyan-400" />
            Upload Drone Imagery
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">Last analysis: 2 hours ago</p>
        </div>
        
        <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Field Insights</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Avg. Health Index:</span> <span className="font-bold text-green-400">0.82 (Good)</span></li>
            <li className="flex justify-between"><span>Water Stress:</span> <span className="font-bold text-yellow-400">Low</span></li>
            <li className="flex justify-between"><span>Nitrogen Level:</span> <span className="font-bold text-orange-400">Slightly Low</span></li>
          </ul>
        </div>
      </div>
      <style>{`
        .toggle-checkbox {
          appearance: none;
          width: 40px;
          height: 20px;
          background-color: #374151;
          border-radius: 9999px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .toggle-checkbox::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: white;
          top: 2px;
          left: 2px;
          transition: transform 0.2s;
        }
        .toggle-checkbox:checked {
          background-color: #10B981;
        }
        .toggle-checkbox:checked::before {
          transform: translateX(20px);
        }
      `}</style>
    </div>
  );
};
