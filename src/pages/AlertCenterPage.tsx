import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { AlertSeverity, AlertItem } from '../types/disaster';
import { 
  Bell, 
  Flame, 
  Waves, 
  Mountain, 
  Leaf, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  Info, 
  Clock, 
  Check, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AlertCenterPage: React.FC = () => {
  const { alerts, acknowledgeAlert, setActiveTab, setSelectedZone, zones } = useDisaster();
  const [filter, setFilter] = useState<'ALL' | AlertSeverity>('ALL');
  const [selectedAlertModal, setSelectedAlertModal] = useState<AlertItem | null>(null);

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    return a.severity === filter;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'wildfire':
        return <Flame className="w-5 h-5 text-rose-400" />;
      case 'flood':
        return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'landslide':
        return <Mountain className="w-5 h-5 text-amber-400" />;
      default:
        return <Leaf className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getSeverityBadge = (sev: AlertSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            CRITICAL ALERT
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-orange-950/80 text-orange-300 border border-orange-700">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
            HIGH ALERT
          </span>
        );
      case 'MODERATE':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700">
            MODERATE
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            RESOLVED
          </span>
        );
    }
  };

  const handleViewLocation = (alert: AlertItem) => {
    const targetZone = zones.find(z => z.id === alert.zoneId) || zones[0];
    setSelectedZone(targetZone);
    setActiveTab('map');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <span>Alert Center</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              PRIORITY QUEUE
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time emergency broadcast feed categorized by threat level and autonomous sensor validation.
          </p>
        </div>

        {/* Filter Segmented Control: All | Critical | High | Moderate | Resolved */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto self-start sm:self-auto">
          {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'RESOLVED'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all whitespace-nowrap ${
                filter === lvl
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-200">No Active Alerts In Category</h3>
            <p className="text-xs text-slate-400 mt-1">
              All sensors and prediction thresholds are within normal baseline ranges.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
                  isCritical 
                    ? 'bg-rose-950/20 border-rose-900/70 hover:border-rose-600/80 shadow-[0_0_20px_rgba(244,63,94,0.08)]' 
                    : isHigh 
                    ? 'bg-orange-950/20 border-orange-900/70 hover:border-orange-600/80 shadow-[0_0_20px_rgba(249,115,22,0.08)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {getSeverityBadge(alert.severity)}
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {alert.timestamp}
                        </span>
                        {alert.verifiedByDrone && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
                            Drone Verified
                          </span>
                        )}
                        {alert.acknowledged && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            Acknowledged
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-100">{alert.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                        {alert.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{alert.zoneName}</span>
                      </div>

                      {/* Key Metric Highlights */}
                      <div className="flex flex-wrap gap-2.5 mt-3 pt-3 border-t border-slate-800/80">
                        {alert.metricsSummary.map((m, idx) => (
                          <div 
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-xs font-mono"
                          >
                            <span className="text-slate-400 mr-1.5">{m.label}:</span>
                            <span className="font-bold text-slate-100">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Alert Action Buttons (matching Brief Sections 5) */}
                  <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => handleViewLocation(alert)}
                      className="px-3.5 py-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isHigh ? 'View Risk Zone' : 'View Location'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedAlertModal(alert)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>View Details</span>
                    </button>

                    {isHigh && (
                      <button
                        onClick={() => setActiveTab('emergency')}
                        className="px-3.5 py-2 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-bold transition-colors"
                      >
                        Emergency Information
                      </button>
                    )}

                    {!alert.acknowledged && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="text-[11px] text-slate-400 hover:text-slate-200 underline mt-1"
                      >
                        Mark Acknowledged
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alert Detailed Modal */}
      {selectedAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {getAlertIcon(selectedAlertModal.type)}
                <h3 className="font-bold text-base text-slate-100">
                  {selectedAlertModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAlertModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {selectedAlertModal.description}
              </p>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Incident Verification Telemetry
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedAlertModal.metricsSummary.map((m, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 font-mono">
                      <span className="text-slate-400 block text-[10px]">{m.label}</span>
                      <span className="text-slate-100 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/60 text-amber-200">
                <span className="font-bold block mb-1">Civil Defense Advisory</span>
                <span>Immediate evacuation warning issued for downstream river basin and canyon interfaces. Emergency broadcasts deployed via cellular tower mesh.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  handleViewLocation(selectedAlertModal);
                  setSelectedAlertModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
              >
                Locate On GIS Map
              </button>
              <button
                onClick={() => setSelectedAlertModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
