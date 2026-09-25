import React from 'react';

interface CircularGaugeProps {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  color?: 'cyan' | 'amber' | 'rose' | 'emerald' | 'orange';
  sublabel?: string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  percentage,
  label,
  size = 140,
  strokeWidth = 10,
  color = 'cyan',
  sublabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  const colorMap = {
    cyan: {
      stroke: 'stroke-cyan-500',
      text: 'text-cyan-400',
      glow: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]',
      bg: 'stroke-cyan-950/40'
    },
    amber: {
      stroke: 'stroke-amber-500',
      text: 'text-amber-400',
      glow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]',
      bg: 'stroke-amber-950/40'
    },
    orange: {
      stroke: 'stroke-orange-500',
      text: 'text-orange-400',
      glow: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]',
      bg: 'stroke-orange-950/40'
    },
    rose: {
      stroke: 'stroke-rose-500',
      text: 'text-rose-400',
      glow: 'drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]',
      bg: 'stroke-rose-950/40'
    },
    emerald: {
      stroke: 'stroke-emerald-500',
      text: 'text-emerald-400',
      glow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]',
      bg: 'stroke-emerald-950/40'
    }
  };

  const scheme = colorMap[color];

  return (
    <div className="flex flex-col items-center justify-center p-3 text-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`${scheme.bg}`}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Dynamic Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`${scheme.stroke} ${scheme.glow} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${scheme.text}`}>
            {percentage}%
          </span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Probability
          </span>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-semibold text-slate-200 tracking-wide">{label}</h4>
        {sublabel && (
          <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
};
