import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { 
  Waves, 
  Droplets, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  Gauge, 
  Clock, 
  Ship, 
  ShieldAlert, 
  Activity,
  SlidersHorizontal
} from 'lucide-react';

export const FloodMonitoringPage: React.FC = () => {
  const { metrics, setActiveTab } = useDisaster();
  const [sluiceGateOpenPercent, setSluiceGateOpenPercent] = useState<number>(35);

  const fl = metrics.flood;

  // Hydrograph 6-hour projection data
  const hydroPoints = [
    { time: 'T-4h', level: 3.8 },
    { time: 'T-2h', level: 4.2 },
    { time: 'Now', level: fl.waterLevel },
    { time: 'T+2h', level: 5.02 },
    { time: 'T+4h', level: 5.18 },
    { time: 'T+6h', level: 4.95 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-slate-950 border border-cyan-900/60 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400">
              <Waves className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              Flood Intelligence
            </h2>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-orange-950 text-orange-300 border border-orange-700">
              HIGH RISK SURGE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time ultrasonic transducer river gauges, reservoir catchment influx, and dynamic floodplain hydrographs.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('resources')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all self-start md:self-auto"
        >
          <Ship className="w-4 h-4" />
          <span>Stage Rescue Boats</span>
        </button>
      </div>

      {/* Main Banner (matching Brief Section 9 exact text) */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-900/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
            Hydrometric Basin Alert
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-orange-400 flex items-center gap-2">
            <span>Flood Risk: HIGH</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
            Water levels are approaching the predefined warning threshold.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-right">
            <span className="text-[10px] uppercase font-mono text-cyan-300 block">Flood Probability</span>
            <span className="font-mono text-2xl font-bold text-cyan-400">{fl.floodProbability}%</span>
          </div>
        </div>
      </div>

      {/* Primary Key Metrics Grid (matching Brief Section 9) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* River Water Level */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>River Water Level</span>
            <Waves className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {fl.waterLevel} <span className="text-sm font-normal text-slate-400">m</span>
          </div>
          <span className="text-[11px] text-orange-400 mt-1 block">Danger Crest: 5.0 m</span>
        </div>

        {/* Rainfall */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Rainfall Rate</span>
            <Droplets className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {fl.rainfall} <span className="text-sm font-normal text-slate-400">mm/hr</span>
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Torrential Storm</span>
        </div>

        {/* Reservoir Level */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Reservoir Level</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
            {fl.reservoirLevel}%
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">91.4% Capacity</span>
        </div>

        {/* Flow Rate */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Discharge Flow Rate</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {fl.flowRate} <span className="text-sm font-normal text-slate-400">m³/s</span>
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">+85 m³/s / hr</span>
        </div>

        {/* Flood Probability */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Flood Probability</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
            {fl.floodProbability}%
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">ML Ensemble Score</span>
        </div>
      </div>

      {/* Animated Hydrograph & Historical Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Animated Water Level Graph (Hydrograph) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                River Water Level Hydrograph & Inundation Curve
              </h3>
              <p className="text-xs text-slate-400">
                Live gauge readings vs projected water crest elevation over time
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">Station SENSOR-024</span>
          </div>

          {/* SVG Hydrograph */}
          <div className="w-full h-52 bg-slate-950/60 rounded-xl border border-slate-800 p-3 relative overflow-hidden flex flex-col justify-end">
            {/* Warning and Danger lines */}
            <div className="absolute top-[28%] left-0 right-0 border-b border-rose-500/60 border-dashed z-0">
              <span className="text-[9px] font-mono text-rose-400 ml-2 bg-slate-950/80 px-1 rounded">
                DANGER LEVEL (5.0 m)
              </span>
            </div>
            <div className="absolute top-[48%] left-0 right-0 border-b border-amber-500/60 border-dashed z-0">
              <span className="text-[9px] font-mono text-amber-400 ml-2 bg-slate-950/80 px-1 rounded">
                WARNING THRESHOLD (4.0 m)
              </span>
            </div>

            {/* Bars / Wave Level Chart */}
            <div className="relative z-10 flex items-end justify-between gap-4 h-36 px-4">
              {hydroPoints.map((pt, idx) => {
                const isCurrent = pt.time === 'Now';
                const heightPercent = Math.min(100, (pt.level / 6.0) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[11px] font-mono font-bold text-slate-300">
                      {pt.level}m
                    </span>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ${
                        pt.level >= 5.0
                          ? 'bg-gradient-to-t from-rose-600 to-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                          : pt.level >= 4.0
                          ? 'bg-gradient-to-t from-cyan-600 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                          : 'bg-gradient-to-t from-cyan-700 to-cyan-400'
                      } ${isCurrent ? 'ring-2 ring-white animate-pulse' : ''}`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className={`text-[10px] font-mono ${isCurrent ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                      {pt.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Historical Comparison & Sluice Gate Control */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-1">
              Historical Benchmark Comparison
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Benchmarked against 50-year regional flood records.
            </p>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Current Reading (2026):</span>
                <span className="font-bold text-cyan-300">{fl.waterLevel} m (Active)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">2021 50-Yr Record Flood:</span>
                <span className="font-bold text-rose-400">5.12 m (Peak)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Normal Seasonal Baseline:</span>
                <span className="font-bold text-emerald-400">2.10 m (Nominal)</span>
              </div>
            </div>
          </div>

          {/* Sluice Gate Simulation Control */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                Auxiliary Spillway Gate:
              </span>
              <span className="font-mono text-cyan-400 font-bold">{sluiceGateOpenPercent}% Open</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sluiceGateOpenPercent}
              onChange={(e) => setSluiceGateOpenPercent(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block leading-tight">
              Relieves reservoir pressure by {(sluiceGateOpenPercent * 4.2).toFixed(0)} m³/s into bypass retention basins.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
