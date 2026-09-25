import React from 'react';
import { RiskMap } from '../components/map/RiskMap';
import { useDisaster } from '../context/DisasterContext';
import { Layers, ShieldAlert, Sparkles, MapPin, Radio, AlertTriangle } from 'lucide-react';

export const RiskMapPage: React.FC = () => {
  const { zones, setSelectedZone } = useDisaster();

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>Live Interactive GIS Risk Map</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              ORBITAL & SENSOR FUSED
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Geospatial overlay of real-time hydrologic, thermal, seismic, and municipal protection layers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            {zones.length} Active Hazard Sectors
          </span>
        </div>
      </div>

      {/* Main Full View Map */}
      <RiskMap fullScreen={true} onSelectZone={(zone) => setSelectedZone(zone)} />
    </div>
  );
};
