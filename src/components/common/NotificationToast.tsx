import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { X, ArrowRight, Bell, AlertTriangle } from 'lucide-react';

export const NotificationToastStack: React.FC = () => {
  const { pushNotifications, dismissNotification, setActiveTab, setSelectedZone, zones } = useDisaster();

  if (pushNotifications.length === 0) return null;

  return (
    <aside aria-label="Incident Notifications" className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {pushNotifications.slice(0, 3).map((item) => {
        const isFire = item.type === 'wildfire';
        const isFlood = item.type === 'flood';
        const isLandslide = item.type === 'landslide';

        const borderColor = isFire 
          ? 'border-rose-600/80 bg-slate-900/95 shadow-[0_4px_20px_rgba(244,63,94,0.25)]' 
          : isFlood 
          ? 'border-cyan-600/80 bg-slate-900/95 shadow-[0_4px_20px_rgba(6,182,212,0.25)]'
          : isLandslide
          ? 'border-amber-600/80 bg-slate-900/95 shadow-[0_4px_20px_rgba(245,158,11,0.25)]'
          : 'border-blue-600/80 bg-slate-900/95';

        return (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderColor}`}
          >
            <div className="p-2 rounded-lg bg-slate-800/80 shrink-0 text-amber-400 mt-0.5">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-100 truncate">{item.title}</h4>
                <span className="text-[10px] text-slate-400 shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {item.message}
              </p>

              <div className="mt-2.5 flex items-center gap-3">
                <button
                  onClick={() => {
                    dismissNotification(item.id);
                    setActiveTab('map');
                    const targetZone = zones.find(z => z.hazardType === item.type);
                    if (targetZone) setSelectedZone(targetZone);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  View on Map
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => {
                    dismissNotification(item.id);
                    setActiveTab('alerts');
                  }}
                  className="text-[11px] font-medium text-slate-400 hover:text-slate-200"
                >
                  Alert Details
                </button>
              </div>
            </div>

            <button
              onClick={() => dismissNotification(item.id)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
