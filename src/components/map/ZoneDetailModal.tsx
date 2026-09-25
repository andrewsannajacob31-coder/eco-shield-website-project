import React from 'react';
import { ZoneRisk } from '../../types/disaster';
import { useDisaster } from '../../context/DisasterContext';
import { 
  X, 
  AlertTriangle, 
  Clock, 
  Users, 
  Radio, 
  ArrowRight, 
  ShieldAlert,
  Waves,
  Mountain,
  Flame,
  Leaf
} from 'lucide-react';

interface ZoneDetailModalProps {
  zone: ZoneRisk | null;
  onClose: () => void;
}

export const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({ zone, onClose }) => {
  const { setActiveTab } = useDisaster();

  if (!zone) return null;

  const getHazardIcon = () => {
    switch (zone.hazardType) {
      case 'flood':
        return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'landslide':
        return <Mountain className="w-5 h-5 text-amber-400" />;
      case 'wildfire':
        return <Flame className="w-5 h-5 text-rose-400" />;
      default:
        return <Leaf className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getRiskBadge = () => {
    if (zone.riskLevel === 'CRITICAL') {
      return (
        <span className="px-2.5 py-1 rounded text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-700/80">
          CRITICAL RISK
        </span>
      );
    }
    if (zone.riskLevel === 'HIGH') {
      return (
        <span className="px-2.5 py-1 rounded text-xs font-bold bg-orange-950/80 text-orange-300 border border-orange-700/80">
          HIGH RISK
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700/80">
        MODERATE RISK
      </span>
    );
  };

  const handleNavigateToHazard = () => {
    onClose();
    if (zone.hazardType === 'flood') setActiveTab('flood');
    else if (zone.hazardType === 'landslide') setActiveTab('landslide');
    else if (zone.hazardType === 'wildfire') setActiveTab('wildfire');
    else setActiveTab('ai');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
              {getHazardIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">{zone.code}</span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-cyan-400 capitalize">{zone.hazardType} Zone</span>
              </div>
              <h3 className="font-bold text-lg text-slate-100">{zone.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Risk & Probability Banner */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">Current Risk Assessment</span>
              {getRiskBadge()}
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-slate-400 block mb-1">Probability</span>
              <span className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
                {zone.probability}%
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Topography & Area</span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
              {zone.areaDesc}
            </p>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last Updated</span>
              </div>
              <span className="font-mono font-medium text-slate-200">{zone.lastUpdated}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Population at Risk</span>
              </div>
              <span className="font-mono font-medium text-slate-200 tabular-nums">
                ~{zone.populationAtRisk.toLocaleString()} residents
              </span>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/60">
            <div className="flex items-center gap-2 mb-1.5 text-amber-300 font-semibold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>Recommended Action</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {zone.recommendedAction}
            </p>
          </div>

          {/* Connected Sensors */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Connected Telemetry Nodes ({zone.keySensors.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {zone.keySensors.map((sid) => (
                <span
                  key={sid}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300"
                >
                  <Radio className="w-3 h-3 text-emerald-400" />
                  {sid}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5"
          >
            Close Map Inspector
          </button>

          <button
            onClick={handleNavigateToHazard}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-colors"
          >
            <span>View Detailed Risk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
