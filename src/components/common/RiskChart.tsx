import React, { useState } from 'react';
import { TREND_HOURS, INITIAL_TREND_DATA } from '../../data/mockDisasterData';
import { useDisaster } from '../../context/DisasterContext';

interface RiskChartProps {
  compact?: boolean;
}

export const RiskChart: React.FC<RiskChartProps> = ({ compact = false }) => {
  const { trendData, metrics } = useDisaster();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCurves, setActiveCurves] = useState({
    flood: true,
    landslide: true,
    wildfire: true
  });

  const hours = TREND_HOURS;
  const height = compact ? 180 : 260;
  const width = 640;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Coordinate conversion
  const getX = (index: number) => padding.left + (index / (hours.length - 1)) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - (val / 100) * innerHeight;

  // Path generator
  const createPath = (data: number[]) => {
    return data.reduce((acc, curr, idx) => {
      const x = getX(idx);
      const y = getY(curr);
      if (idx === 0) return `M ${x},${y}`;
      // Smooth cubic bezier
      const prevX = getX(idx - 1);
      const prevY = getY(data[idx - 1]);
      const cpX1 = prevX + (x - prevX) / 2;
      const cpX2 = prevX + (x - prevX) / 2;
      return `${acc} C ${cpX1},${prevY} ${cpX2},${y} ${x},${y}`;
    }, '');
  };

  const createAreaPath = (data: number[]) => {
    const linePath = createPath(data);
    const lastX = getX(data.length - 1);
    const firstX = getX(0);
    const bottomY = padding.top + innerHeight;
    return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  };

  return (
    <div className="w-full bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-4">
      {/* Header and Filter Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            24-Hour Risk Evolution Trend
            <span className="text-[11px] font-normal text-slate-400">· Forecast Interval</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuous multi-hazard probability curve based on meteorological radar & telemetry
          </p>
        </div>

        {/* Legend / Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveCurves(p => ({ ...p, flood: !p.flood }))}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${
              activeCurves.flood 
                ? 'bg-cyan-950/70 border-cyan-800 text-cyan-300' 
                : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Flood ({metrics.flood.floodProbability}%)
          </button>

          <button
            onClick={() => setActiveCurves(p => ({ ...p, landslide: !p.landslide }))}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${
              activeCurves.landslide 
                ? 'bg-amber-950/70 border-amber-800 text-amber-300' 
                : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Landslide ({metrics.landslide.riskScore}%)
          </button>

          <button
            onClick={() => setActiveCurves(p => ({ ...p, wildfire: !p.wildfire }))}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${
              activeCurves.wildfire 
                ? 'bg-rose-950/70 border-rose-800 text-rose-300' 
                : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Wildfire ({metrics.wildfire.fireProbability}%)
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {/* Flood Gradient */}
            <linearGradient id="floodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            {/* Landslide Gradient */}
            <linearGradient id="landslideGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
            {/* Wildfire Gradient */}
            <linearGradient id="wildfireGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y axis */}
          {[0, 25, 50, 75, 100].map(val => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray={val === 50 || val === 80 ? '4 4' : '2 2'}
                  opacity={0.35}
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Critical Threshold Indicator Line at 80% */}
          <line
            x1={padding.left}
            y1={getY(80)}
            x2={width - padding.right}
            y2={getY(80)}
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity={0.6}
          />
          <text
            x={width - padding.right}
            y={getY(80) - 4}
            fill="#f87171"
            fontSize="9"
            textAnchor="end"
            fontFamily="monospace"
          >
            CRITICAL THRESHOLD (80%)
          </text>

          {/* Area Fills */}
          {activeCurves.flood && (
            <path d={createAreaPath(trendData.flood)} fill="url(#floodGrad)" />
          )}
          {activeCurves.landslide && (
            <path d={createAreaPath(trendData.landslide)} fill="url(#landslideGrad)" />
          )}
          {activeCurves.wildfire && (
            <path d={createAreaPath(trendData.wildfire)} fill="url(#wildfireGrad)" />
          )}

          {/* Lines */}
          {activeCurves.flood && (
            <path
              d={createPath(trendData.flood)}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]"
            />
          )}
          {activeCurves.landslide && (
            <path
              d={createPath(trendData.landslide)}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
            />
          )}
          {activeCurves.wildfire && (
            <path
              d={createPath(trendData.wildfire)}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]"
            />
          )}

          {/* Hover scrubber vertical line */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={padding.top}
                x2={getX(hoveredIndex)}
                y2={padding.top + innerHeight}
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Highlight points */}
              {activeCurves.flood && (
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(trendData.flood[hoveredIndex])}
                  r="4.5"
                  fill="#06b6d4"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
              {activeCurves.landslide && (
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(trendData.landslide[hoveredIndex])}
                  r="4.5"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
              {activeCurves.wildfire && (
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(trendData.wildfire[hoveredIndex])}
                  r="4.5"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
            </g>
          )}

          {/* X Axis time labels and hover target hit areas */}
          {hours.map((hr, idx) => {
            const x = getX(idx);
            return (
              <g key={hr}>
                <text
                  x={x}
                  y={padding.top + innerHeight + 18}
                  fill={hoveredIndex === idx ? '#38bdf8' : '#64748b'}
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight={hoveredIndex === idx ? '600' : '400'}
                >
                  {hr}
                </text>
                {/* Transparent hit column for easy hover */}
                <rect
                  x={x - (innerWidth / (hours.length - 1)) / 2}
                  y={padding.top}
                  width={innerWidth / (hours.length - 1)}
                  height={innerHeight + 25}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div 
            className="absolute top-2 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs space-y-1 pointer-events-none z-10"
          >
            <div className="font-semibold text-slate-300 border-b border-slate-800 pb-1">
              Timeline: {hours[hoveredIndex]} (T-{(12 - hoveredIndex) * 2}h)
            </div>
            {activeCurves.wildfire && (
              <div className="flex items-center justify-between gap-4 text-rose-400 font-mono">
                <span>🔥 Wildfire:</span>
                <span className="font-bold">{trendData.wildfire[hoveredIndex]}%</span>
              </div>
            )}
            {activeCurves.flood && (
              <div className="flex items-center justify-between gap-4 text-cyan-400 font-mono">
                <span>🌊 Flood:</span>
                <span className="font-bold">{trendData.flood[hoveredIndex]}%</span>
              </div>
            )}
            {activeCurves.landslide && (
              <div className="flex items-center justify-between gap-4 text-amber-400 font-mono">
                <span>⛰️ Landslide:</span>
                <span className="font-bold">{trendData.landslide[hoveredIndex]}%</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
