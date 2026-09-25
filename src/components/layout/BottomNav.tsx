import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { NavigationTab } from '../../types/disaster';
import { LayoutDashboard, Map, Bell, BrainCircuit, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, alerts } = useDisaster();

  const tabs: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'map', label: 'Map', icon: <Map className="w-5 h-5" /> },
    { 
      id: 'alerts', 
      label: 'Alerts', 
      icon: <Bell className="w-5 h-5" />,
      badge: alerts.filter(a => !a.acknowledged).length
    },
    { id: 'ai', label: 'AI', icon: <BrainCircuit className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around shadow-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-center justify-center p-1.5 min-w-[56px] rounded-lg transition-colors ${
              isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 flex h-3.5 min-w-3.5 px-0.5 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white font-mono">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
