import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { 
  Flame, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Navigation, 
  MapPin, 
  Compass, 
  ShieldAlert, 
  Clock, 
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import { RiskMap } from '../components/map/RiskMap';

export const WildfireMonitoringPage: React.FC = () => {
  const { metrics, setActiveTab } = useDisaster();
  const [showSpreadModal, setShowSpreadModal] = useState(false);
  const [spreadTimelineHour, setSpreadTimelineHour] = useState<number>(3);

  const wf = metrics.wildfire;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-900/60 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-rose-950 border border-rose-700 text-rose-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              Wildfire Intelligence
            </h2>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-700 animate-pulse">
              CRITICAL THREAT ACTIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Satellite infrared hot-spot detection coupled with canopy optical sensors and predictive wind propagation vectors.
          </p>
        </div>

        {/* Action Button: View Spread Prediction */}
        <button
          onClick={() => setShowSpreadModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all self-start md:self-auto"
        >
          <Navigation className="w-4 h-4" />
          <span>View Spread Prediction</span>
        </button>
      </div>

      {/* Main Detection Confidence Banner (matching Brief Section 8 exact text) */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-900/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
            Orbital & Ground Pyrometry Status
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            Fire Detection Confidence: <span className="font-mono text-rose-400">{wf.detectionConfidence}%</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Verified by Sentinel-2 thermal band SWIR anomalies and Ridge Forest Alpha optical smoke sensors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-800 text-right">
            <span className="text-[10px] uppercase font-mono text-rose-300 block">Fire Probability</span>
            <span className="font-mono text-xl font-bold text-white">{wf.fireProbability}%</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid (matching Brief Section 8) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Temperature: 42°C */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Temperature</span>
            <Thermometer className="w-4 h-4 text-rose-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {wf.temperature}°C
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">Extreme Heat</span>
        </div>

        {/* Humidity: 18% */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Humidity</span>
            <Droplets className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
            {wf.humidity}%
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">Critically Dry</span>
        </div>

        {/* Smoke: Detected */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Smoke Status</span>
            <Eye className="w-4 h-4 text-slate-300" />
          </div>
          <div className="font-mono text-xl font-bold text-rose-300 mt-1">
            {wf.smoke}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Optical Obscuration</span>
        </div>

        {/* Wind Speed: 24 km/h */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Wind Speed</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {wf.windSpeed} <span className="text-xs text-slate-400 font-normal">km/h</span>
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Gusting to 38 km/h</span>
        </div>

        {/* Wind Direction: Northeast */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Wind Direction</span>
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-lg font-bold text-white mt-1">
            {wf.windDirection}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Bearing 045°</span>
        </div>

        {/* Estimated Spread Direction: Northeast */}
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60 backdrop-blur-md">
          <div className="flex items-center justify-between text-rose-300 text-xs mb-1">
            <span>Estimated Spread</span>
            <Navigation className="w-4 h-4 text-rose-400" />
          </div>
          <div className="font-mono text-lg font-bold text-rose-300 mt-1">
            {wf.spreadDirection}
          </div>
          <span className="text-[11px] text-rose-400 mt-1 block">Advancing 1.4 km/h</span>
        </div>
      </div>

      {/* Satellite-Style Map with Highlighted Fire Zone */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Satellite Thermal Hotspot & Canopy Perimeters
              <span className="text-xs font-mono text-rose-400 font-normal">· Demo Zone B Focus</span>
            </h3>
            <p className="text-xs text-slate-400">
              Highlighted thermal perimeter showing flame front advancing towards the pine valley interface.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('resources')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Deploy Fire Resources →
          </button>
        </div>

        <RiskMap />
      </div>

      {/* Spread Prediction Interactive Modal */}
      {showSpreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-rose-950 border border-rose-800 text-rose-400">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-100">
                    Rothermel Surface-to-Crown Fire Spread Prediction
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Zone B (Ridge Forest Alpha) · High Fuel Model 10 (Timber Litter)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSpreadModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Time Horizon Slider */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Spread Projection Timeline</span>
                <span className="font-mono text-rose-400 font-bold">T + {spreadTimelineHour} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={spreadTimelineHour}
                onChange={(e) => setSpreadTimelineHour(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 Hour (Initial Perimeter)</span>
                <span>3 Hours (Valley Flank)</span>
                <span>6 Hours (Highway Barrier)</span>
              </div>
            </div>

            {/* Spread Telemetry Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Spread Velocity</span>
                <span className="text-slate-100 font-bold text-sm">{(1.4 * (spreadTimelineHour * 0.9)).toFixed(1)} km/h</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Projected Acreage</span>
                <span className="text-rose-400 font-bold text-sm">{(450 * spreadTimelineHour).toLocaleString()} ha</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Flame Length</span>
                <span className="text-amber-400 font-bold text-sm">{(4.2 + spreadTimelineHour * 0.4).toFixed(1)} m</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Spotting Distance</span>
                <span className="text-slate-100 font-bold text-sm">{(1.2 * spreadTimelineHour).toFixed(1)} km</span>
              </div>
            </div>

            {/* Tactical Containment Advisory */}
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-rose-300">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Tactical Recommendation for Incident Command
              </span>
              <p className="leading-relaxed">
                Establish primary dozer containment line 3.5 km northeast along Ridge Ridge Cutoff before T+3h. Dispatch airborne retardant tankers to coat the southern flank to protect downwind settlements.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSpreadModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setShowSpreadModal(false);
                  setActiveTab('resources');
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md"
              >
                Dispatch Fire Units
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
