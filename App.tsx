import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { DiseaseDoctorView } from './views/DiseaseDoctorView';
import { CropAdvisorView } from './views/CropAdvisorView';
import { MarketView } from './views/MarketView';
import { AssistantView } from './views/AssistantView';
import { SupplyChainView } from './views/SupplyChainView';
import { FarmTwinView } from './views/FarmTwinView';
import { SustainabilityView } from './views/SustainabilityView';
import { LearningHubView } from './views/LearningHubView';
import type { View } from './types';
import { MenuIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <DashboardView setActiveView={setCurrentView} />;
      case 'Disease Doctor':
        return <DiseaseDoctorView />;
      case 'Crop Advisor':
        return <CropAdvisorView />;
      case 'Market Trends':
        return <MarketView />;
      case 'AI Assistant':
        return <AssistantView />;
      case 'Supply Chain':
        return <SupplyChainView />;
      case 'Farm Twin':
        return <FarmTwinView />;
      case 'Sustainability':
        return <SustainabilityView />;
      case 'Learning Hub':
        return <LearningHubView />;
      default:
        return <DashboardView setActiveView={setCurrentView} />;
    }
  };
  
  const viewTitles: { [key in View]: string } = {
    'Dashboard': 'Farm Overview Dashboard',
    'Disease Doctor': 'AI Disease Diagnosis',
    'Crop Advisor': 'Crop & Fertilizer Advisor',
    'Market Trends': 'Agricultural Market Trends',
    'AI Assistant': 'Your AI Farming Assistant',
    'Supply Chain': 'Blockchain Supply Chain Tracker',
    'Farm Twin': 'AI Farm Twin & GIS Analysis',
    'Sustainability': 'Sustainability & Rewards Hub',
    'Learning Hub': 'AI Farming Academy'
  };

  return (
    <div className="flex h-screen bg-brand-gray-dark font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-20'}`}>
        <div className="flex flex-col h-full">
            <header className="bg-brand-gray p-4 shadow-md flex items-center">
                 <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 mr-4 text-gray-300 hover:text-white focus:outline-none">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-white">{viewTitles[currentView]}</h1>
            </header>
            <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                {renderView()}
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
