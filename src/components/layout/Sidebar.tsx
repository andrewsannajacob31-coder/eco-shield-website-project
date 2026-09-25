import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { NavigationTab } from '../../types/disaster';
import { 
  LayoutDashboard, 
  Map, 
  Bell, 
  BrainCircuit, 
  Radio, 
  Flame, 
  Waves, 
  Mountain, 
  ShieldCheck, 
  PhoneCall, 
  User, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenSimulate: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpenMobile = false, 
  onCloseMobile, 
  onOpenSimulate 
}) => {
  const { activeTab, setActiveTab, alerts } = useDisaster();

  const navItems: {
    id: NavigationTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    color?: string;
  }[] = [
    { id: 'home', label: 'Home Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'map', label: 'Live Risk Map', icon: <Map className="w-4 h-4" /> },
    { 
      id: 'alerts', 
      label: 'Alert Center', 
      icon: <Bell className="w-4 h-4" />, 
      badge: alerts.filter(a => !a.acknowledged).length 
    },
    { id: 'ai', label: 'AI Risk Prediction', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'sensors', label: 'Sensor Network', icon: <Radio className="w-4 h-4" /> },
    { id: 'wildfire', label: 'Wildfire Intelligence', icon: <Flame className="w-4 h-4 text-rose-400" /> },
    { id: 'flood', label: 'Flood Intelligence', icon: <Waves className="w-4 h-4 text-cyan-400" /> },
    { id: 'landslide', label: 'Landslide Intelligence', icon: <Mountain className="w-4 h-4 text-amber-400" /> },
    { id: 'resources', label: 'Emergency Resources', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { id: 'emergency', label: 'Emergency Information', icon: <PhoneCall className="w-4 h-4 text-rose-400" /> },
    { id: 'profile', label: 'Profile & Settings', icon: <User className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[53px] left-0 z-50 h-screen lg:h-[calc(100vh-53px)] w-64 bg-slate-950/95 lg:bg-slate-950/80 backdrop-blur-md border-r border-slate-800/80 p-3.5 flex flex-col justify-between transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-4 overflow-y-auto">
          {/* Quick Header on Mobile */}
          <div className="lg:hidden flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-sm text-slate-100">Eco-Shield Navigation</span>
            <button
              onClick={onCloseMobile}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 px-3 block mb-1">
              Command Modules
            </span>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isEmergency = item.id === 'emergency';

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? isEmergency
                        ? 'bg-rose-950/80 text-rose-200 border border-rose-700/80 shadow-md'
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      : isEmergency
                      ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Simulation Callout */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Demonstration Mode</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
              Simulate sensor spikes, alert escalations, and automated resource suggestions.
            </p>
            <button
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                onOpenSimulate();
              }}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 transition-colors"
            >
              <span>Simulate Disaster</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
