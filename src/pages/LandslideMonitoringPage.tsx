import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { 
  Mountain, 
  Droplets, 
  Activity, 
  Compass, 
  AlertTriangle, 
  ShieldAlert, 
  TrendingUp, 
  MapPin, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { RiskMap } from '../components/map/RiskMap';

export const LandslideMonitoringPage: React.FC = () => {
  const { metrics, setActiveTab } = useDisaster();
  const ls = metrics.landslide;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-900/60 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-amber-950 border border-amber-700 text-amber-400">
              <Mountain className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              Landslide Intelligence
            </h2>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700">
              GEOTECHNICAL ALERT
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Subsurface piezometers, borehole inclinometers, and micro-seismic geophones monitoring slope stability.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('resources')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all self-start md:self-auto"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Deploy Geotech Units</span>
        </button>
      </div>

      {/* Primary Calculated Score Banner (matching Brief Section 10) */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1">
            Geotechnical Slope Stability Index
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            Landslide Risk Score: <span className="font-mono text-amber-400">{ls.riskScore}%</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Factor of Safety (FS): <span className="font-mono font-bold text-rose-400">1.08</span> (Critical threshold: 1.00). Pore-water saturation weakening shear strength of bedding planes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-amber-950/80 border border-amber-800 text-right">
            <span className="text-[10px] uppercase font-mono text-amber-300 block">Slope Stability Status</span>
            <span className="font-mono text-xl font-bold text-amber-400">{ls.status} RISK</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid (matching Brief Section 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Soil Moisture: 82% */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Soil Moisture</span>
            <Droplets className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {ls.soilMoisture}%
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">Critical Saturation</span>
        </div>

        {/* Rainfall Intensity: High */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Rainfall Intensity</span>
            <Droplets className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="font-mono text-xl font-bold text-cyan-300 mt-1">
            {ls.rainfallIntensity}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">92 mm/hr Inflow</span>
        </div>

        {/* Terrain Slope: 38° */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Terrain Slope Angle</span>
            <Compass className="w-4 h-4 text-slate-300" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {ls.slopeAngle}°
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">Steep Escarpment</span>
        </div>

        {/* Ground Stability: Critical displacement */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Ground Stability</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="font-mono text-xl font-bold text-rose-400 mt-1">
            {ls.groundDisplacement} <span className="text-xs font-normal text-slate-400">mm/hr</span>
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">Active Slip Rate</span>
        </div>

        {/* Seismic Activity: 1.2 ML */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Seismic Micro-Tremor</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-purple-300 tabular-nums">
            {ls.seismicActivity} <span className="text-xs font-normal text-slate-400">ML</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Richter Micro-fracture</span>
        </div>
      </div>

      {/* Terrain Map with Risk Zones (matching Brief Section 10) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Terrain Topographical Map & Hazard Zones
              <span className="text-xs font-mono text-amber-400 font-normal">· Zone C Escarpment</span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive slope angle contours, road closures, and downslope residential threat boundaries.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('map')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Full GIS Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <RiskMap />
      </div>
    </div>
  );
};
