import React from 'react';
import { 
  Waves, 
  Mountain, 
  Flame, 
  Leaf, 
  CloudRain, 
  ChevronRight, 
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Droplets,
  Wind,
  Thermometer
} from 'lucide-react';
import { RiskLevel } from '../../types/disaster';

interface MetricItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface RiskCardProps {
  type: 'flood' | 'landslide' | 'wildfire' | 'environment' | 'weather';
  title: string;
  status: RiskLevel | string;
  metrics: MetricItem[];
  probability?: number;
  onViewDetails: () => void;
  accentNote?: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({
  type,
  title,
  status,
  metrics,
  probability,
  onViewDetails,
  accentNote
}) => {
  const getIcon = () => {
    switch (type) {
      case 'flood':
        return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'landslide':
        return <Mountain className="w-5 h-5 text-amber-400" />;
      case 'wildfire':
        return <Flame className="w-5 h-5 text-rose-400" />;
      case 'environment':
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusBadge = (lvl: string) => {
    switch (lvl.toUpperCase()) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-950/70 text-rose-300 border border-rose-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            CRITICAL
          </span>
        );
      case 'HIGH':
      case 'HIGH RISK':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-orange-950/70 text-orange-300 border border-orange-800/80">
            <AlertTriangle className="w-3 h-3 text-orange-400" />
            HIGH RISK
          </span>
        );
      case 'MODERATE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-800/80">
            MODERATE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-800/80">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            STABLE
          </span>
        );
    }
  };

  const getBorderGlow = () => {
    if (status === 'CRITICAL') return 'border-rose-900/60 hover:border-rose-600/70 shadow-[0_0_16px_rgba(244,63,94,0.1)]';
    if (status === 'HIGH' || status === 'HIGH RISK') return 'border-orange-900/60 hover:border-orange-600/70 shadow-[0_0_16px_rgba(249,115,22,0.1)]';
    if (status === 'MODERATE') return 'border-amber-900/50 hover:border-amber-600/70';
    return 'border-slate-800 hover:border-slate-700';
  };

  return (
    <div className={`flex flex-col justify-between p-5 rounded-xl bg-slate-900/70 backdrop-blur-md border ${getBorderGlow()} transition-all duration-300 hover:translate-y-[-2px]`}>
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-100 tracking-tight flex items-center gap-1.5">
                {title}
              </h3>
              {accentNote && (
                <p className="text-xs text-slate-400 line-clamp-1">{accentNote}</p>
              )}
            </div>
          </div>
          <div>
            {getStatusBadge(status)}
          </div>
        </div>

        {/* Probability or High Impact Metric Banner if present */}
        {probability !== undefined && (
          <div className="mb-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              Calculated Probability
            </span>
            <span className="font-mono text-sm font-bold text-cyan-300 tabular-nums">
              {probability}%
            </span>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-1 mb-4">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className={`p-2.5 rounded-lg border ${
                m.highlight 
                  ? 'bg-slate-850/80 border-slate-700 text-slate-200' 
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
              }`}
            >
              <div className="text-[11px] font-medium text-slate-400 truncate">
                {m.label}
              </div>
              <div className="font-mono text-sm font-semibold mt-0.5 text-slate-100 tabular-nums">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          IoT Synced
        </span>
        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-md bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-800/40 transition-colors"
        >
          View Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
