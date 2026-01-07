import React from 'react';
import type { View } from '../types';
import { 
  DashboardIcon, 
  LeafIcon, 
  BeakerIcon, 
  ChartBarIcon, 
  ChatBubbleIcon, 
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapIcon,
  SparklesIcon,
  BookOpenIcon
} from './IconComponents';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems: { view: View; icon: React.FC<{ className?: string }>; label: string }[] = [
  { view: 'Dashboard', icon: DashboardIcon, label: 'Dashboard' },
  { view: 'Farm Twin', icon: MapIcon, label: 'Farm Twin' },
  { view: 'Disease Doctor', icon: LeafIcon, label: 'Disease Doctor' },
  { view: 'Crop Advisor', icon: BeakerIcon, label: 'Crop Advisor' },
  { view: 'Market Trends', icon: ChartBarIcon, label: 'Market Trends' },
  { view: 'Sustainability', icon: SparklesIcon, label: 'Sustainability' },
  { view: 'Learning Hub', icon: BookOpenIcon, label: 'Learning Hub' },
  { view: 'Supply Chain', icon: LinkIcon, label: 'Supply Chain' },
  { view: 'AI Assistant', icon: ChatBubbleIcon, label: 'AI Assistant' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  return (
    <aside className={`fixed top-0 left-0 h-full bg-brand-gray text-white flex flex-col z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className={`flex items-center justify-between p-4 h-[73px] border-b border-gray-700 ${isOpen ? 'px-6' : 'px-4'}`}>
        <div className={`flex items-center ${!isOpen ? 'w-full justify-center': ''}`}>
            <img src="https://picsum.photos/40/40" alt="Logo" className="rounded-full" />
            {isOpen && <span className="ml-3 text-2xl font-bold">Agri 2.0</span>}
        </div>
      </div>
      
      <nav className="flex-1 mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.view} className="px-4 mb-2">
              <button
                onClick={() => setCurrentView(item.view)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  currentView === item.view
                    ? 'bg-brand-green text-white'
                    : 'text-gray-400 hover:bg-brand-gray-light hover:text-white'
                } ${!isOpen ? 'justify-center' : ''}`}
              >
                <item.icon className="h-6 w-6" />
                {isOpen && <span className="ml-4 font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={`p-4 border-t border-gray-700 flex ${isOpen ? 'justify-end' : 'justify-center'}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-brand-gray-light">
          {isOpen ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
        </button>
      </div>
    </aside>
  );
};
