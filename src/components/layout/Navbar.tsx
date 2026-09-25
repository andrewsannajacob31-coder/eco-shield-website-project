import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  ShieldAlert, 
  Sparkles, 
  Bell, 
  PhoneCall, 
  Radio, 
  Layers,
  Menu
} from 'lucide-react';

interface NavbarProps {
  onOpenSimulate: () => void;
  onToggleSidebar?: () => void;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSimulate, 
  onToggleSidebar, 
  onOpenNotifications 
}) => {
  const { 
    scenario, 
    pushNotifications, 
    alerts, 
    setActiveTab, 
    activeTab 
  } = useDisaster();

  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title Wordmark & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div className="leading-none">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Eco-Shield
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                AI Disaster Intelligence
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: System Telemetry Status (Desktop) */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-200">LIVE SATELLITE & IOT FEED</span>
            <span className="text-slate-500">·</span>
            <span className="font-mono text-cyan-400">24 Nodes</span>
          </div>

          {/* Active Simulation Pill if triggered */}
          {scenario !== 'normal' && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/80 text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                Active Sim: {scenario}
              </span>
            </div>
          )}
        </div>

        {/* Zone 3: Actions - DEMO MODE indicator, Simulate, Alerts, Emergency */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Visible DEMO MODE Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            DEMO MODE
          </div>

          {/* Simulate Disaster Button */}
          <button
            onClick={onOpenSimulate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span className="hidden sm:inline">Simulate Disaster</span>
            <span className="sm:hidden">Simulate</span>
          </button>

          {/* Alert Center Trigger */}
          <button
            onClick={() => setActiveTab('alerts')}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="Alert Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white font-mono">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Quick Emergency Button */}
          <button
            onClick={() => setActiveTab('emergency')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-700/80 text-rose-200 font-bold text-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency</span>
          </button>
        </div>
      </div>
    </header>
  );
};
