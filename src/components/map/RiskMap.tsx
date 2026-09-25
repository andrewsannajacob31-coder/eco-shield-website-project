import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  ZoneRisk, 
  SensorData, 
  EmergencyResource, 
  HazardType 
} from '../../types/disaster';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  MapPin, 
  Radio, 
  Shield, 
  Waves, 
  Mountain, 
  Flame, 
  Ambulance, 
  Truck, 
  Navigation,
  Info
} from 'lucide-react';
import satelliteTerrainImg from '../../assets/images/satellite_gis_terrain_1790358877613.jpg';

interface RiskMapProps {
  onSelectZone?: (zone: ZoneRisk) => void;
  fullScreen?: boolean;
}

type MapFilter = 'all' | 'flood' | 'landslide' | 'wildfire' | 'sensors';

export const RiskMap: React.FC<RiskMapProps> = ({ onSelectZone, fullScreen = false }) => {
  const { zones, sensors, resources, setSelectedZone, selectedZone } = useDisaster();

  // Active filter buttons: All | Flood | Landslide | Wildfire | Sensors
  const [activeFilter, setActiveFilter] = useState<MapFilter>('all');
  
  // Layer toggles
  const [layers, setLayers] = useState({
    flood: true,
    landslide: true,
    wildfire: true,
    sensors: true,
    resources: true,
    satellite: true
  });

  const [hoveredItem, setHoveredItem] = useState<{
    type: 'zone' | 'sensor' | 'resource';
    title: string;
    subtitle: string;
    risk?: string;
    x: number;
    y: number;
  } | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoneClick = (zone: ZoneRisk) => {
    setSelectedZone(zone);
    if (onSelectZone) onSelectZone(zone);
  };

  // Filter logic
  const isLayerVisible = (hazard: HazardType | 'sensors' | 'resources') => {
    if (activeFilter === 'flood') return hazard === 'flood';
    if (activeFilter === 'landslide') return hazard === 'landslide';
    if (activeFilter === 'wildfire') return hazard === 'wildfire';
    if (activeFilter === 'sensors') return hazard === 'sensors';
    return true;
  };

  const filteredZones = zones.filter(z => {
    if (!layers[z.hazardType as keyof typeof layers]) return false;
    return isLayerVisible(z.hazardType);
  });

  const filteredSensors = sensors.filter(s => {
    if (!layers.sensors) return false;
    if (activeFilter === 'all' || activeFilter === 'sensors') return true;
    if (activeFilter === 'flood' && (s.type === 'water_level' || s.type === 'rainfall')) return true;
    if (activeFilter === 'landslide' && (s.type === 'soil_moisture' || s.type === 'seismic')) return true;
    if (activeFilter === 'wildfire' && (s.type === 'temperature' || s.type === 'smoke' || s.type === 'humidity')) return true;
    return false;
  });

  const filteredResources = resources.filter(r => {
    if (!layers.resources) return false;
    if (activeFilter === 'sensors') return false;
    return true;
  });

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col ${fullScreen ? 'h-[calc(100vh-8.5rem)]' : 'h-[540px]'}`}>
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Filter buttons: All | Flood | Landslide | Wildfire | Sensors */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-750 shadow-xl">
          {(['all', 'flood', 'landslide', 'wildfire', 'sensors'] as MapFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all whitespace-nowrap ${
                activeFilter === f
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {f === 'all' ? 'All Hazards' : f}
            </button>
          ))}
        </div>

        {/* Right side: Layer Toggles & Zoom */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Satellite Layer Toggle */}
          <button
            onClick={() => setLayers(l => ({ ...l, satellite: !l.satellite }))}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition-all shadow-lg ${
              layers.satellite
                ? 'bg-slate-900/90 text-cyan-300 border-cyan-800 backdrop-blur-md'
                : 'bg-slate-900/60 text-slate-400 border-slate-800'
            }`}
          >
            <span>🛰️ Satellite Layer</span>
            {layers.satellite ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-750 rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setZoomLevel(z => Math.min(1.6, z + 0.15))}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-400 tabular-nums">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(z => Math.max(0.85, z - 0.15))}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive GIS Canvas Area */}
      <div className="relative w-full h-full overflow-hidden flex-1 cursor-grab active:cursor-grabbing select-none">
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* Base Layer: Satellite Orthophoto Image or Dark Vector Grid */}
          {layers.satellite ? (
            <div className="absolute inset-0 z-0">
              <img
                src={satelliteTerrainImg}
                alt="Satellite GIS Terrain Earth Observation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 bg-[#0B132B]">
              {/* Tactical Contour Grid lines */}
              <div 
                className="w-full h-full opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 60%),
                    linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '100% 100%, 40px 40px, 40px 40px'
                }}
              />
            </div>
          )}

          {/* SVG Overlay for Topographical Contours, River paths, and Hazards */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {/* Pulsing Radar Ring Filter */}
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Simulated River Network */}
            <path
              d="M 15,20 Q 24,35 28,45 T 32,58 T 35,70 T 38,88"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1.8"
              strokeOpacity="0.7"
              strokeDasharray="4 1"
            />
            <path
              d="M 28,45 Q 22,50 18,60 T 15,75"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />

            {/* Escarpment Contour Ridge Lines */}
            <path
              d="M 40,25 Q 48,32 55,28 T 68,22"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              strokeOpacity="0.6"
            />
            <path
              d="M 42,32 Q 50,40 58,35 T 70,28"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              strokeOpacity="0.5"
            />

            {/* Hazard Zones (Interactive SVG Polygons/Circles) */}
            {filteredZones.map(zone => {
              const isSelected = selectedZone?.id === zone.id;
              const isFire = zone.hazardType === 'wildfire';
              const isFlood = zone.hazardType === 'flood';
              const isLandslide = zone.hazardType === 'landslide';

              let fillColor = 'rgba(234, 179, 8, 0.2)';
              let strokeColor = '#eab308';
              if (isFire) {
                fillColor = 'rgba(239, 68, 68, 0.25)';
                strokeColor = '#ef4444';
              } else if (isFlood) {
                fillColor = 'rgba(6, 182, 212, 0.25)';
                strokeColor = '#06b6d4';
              }

              return (
                <g key={zone.id} className="pointer-events-auto cursor-pointer" onClick={() => handleZoneClick(zone)}>
                  {/* Outer Pulsing Halo */}
                  <circle
                    cx={zone.x}
                    cy={zone.y}
                    r={zone.radius * 1.3}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="0.6"
                    strokeDasharray={zone.riskLevel === 'CRITICAL' ? '2 2' : 'none'}
                    className={zone.riskLevel === 'CRITICAL' ? 'animate-ping-slow' : ''}
                    opacity={isSelected ? 0.8 : 0.4}
                  />

                  {/* Primary Zone Boundary */}
                  <circle
                    cx={zone.x}
                    cy={zone.y}
                    r={zone.radius}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? '1.8' : '1.0'}
                    opacity={isSelected ? 0.9 : 0.65}
                    onMouseEnter={() => setHoveredItem({
                      type: 'zone',
                      title: zone.name,
                      subtitle: `${zone.hazardType.toUpperCase()} · ${zone.probability}% PROBABILITY`,
                      risk: zone.riskLevel,
                      x: zone.x,
                      y: zone.y
                    })}
                    onMouseLeave={() => setHoveredItem(null)}
                  />

                  {/* Wildfire Spread Vector Arrow */}
                  {isFire && (
                    <line
                      x1={zone.x}
                      y1={zone.y}
                      x2={zone.x + 8}
                      y2={zone.y - 7}
                      stroke="#f87171"
                      strokeWidth="1.2"
                      strokeDasharray="2 1"
                      markerEnd="url(#arrow)"
                    />
                  )}

                  {/* Zone Label inside SVG */}
                  <text
                    x={zone.x}
                    y={zone.y - zone.radius - 1.5}
                    fill={strokeColor}
                    fontSize="2.4"
                    fontWeight="700"
                    textAnchor="middle"
                    className="select-none font-mono"
                  >
                    {zone.name} ({zone.probability}%)
                  </text>
                </g>
              );
            })}
          </svg>

          {/* HTML Overlay Markers for Sensors, Resources, and Pinpoints */}
          <div className="absolute inset-0 z-15 pointer-events-none">
            {/* IoT Sensor Pins */}
            {filteredSensors.map(sensor => {
              const isOffline = sensor.status === 'OFFLINE';
              return (
                <div
                  key={sensor.id}
                  style={{ left: `${sensor.x}%`, top: `${sensor.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                  onMouseEnter={() => setHoveredItem({
                    type: 'sensor',
                    title: `${sensor.id} · ${sensor.name}`,
                    subtitle: `Current Reading: ${sensor.currentValue} ${sensor.unit}`,
                    risk: sensor.status,
                    x: sensor.x,
                    y: sensor.y
                  })}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`relative flex items-center justify-center w-5 h-5 rounded-full border shadow-md transition-transform group-hover:scale-125 ${
                    isOffline 
                      ? 'bg-slate-800 border-slate-600 text-slate-500' 
                      : 'bg-emerald-950/90 border-emerald-400 text-emerald-300'
                  }`}>
                    {!isOffline && (
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    )}
                    <Radio className="w-3 h-3 relative z-10" />
                  </div>
                </div>
              );
            })}

            {/* Emergency Resources Pins */}
            {filteredResources.map(res => {
              const isAmbulance = res.type === 'ambulance';
              const isFireTruck = res.type === 'fire_truck';
              const isBoat = res.type === 'rescue_boat';
              const isDrone = res.type === 'drone';

              return (
                <div
                  key={res.id}
                  style={{ left: `${res.x}%`, top: `${res.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                  onMouseEnter={() => setHoveredItem({
                    type: 'resource',
                    title: res.name,
                    subtitle: `${res.capacityOrCrew} · ${res.status.toUpperCase()}`,
                    risk: res.status === 'deployed' ? 'DEPLOYED' : 'STANDBY',
                    x: res.x,
                    y: res.y
                  })}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="p-1 rounded-md bg-purple-950/90 border border-purple-500 text-purple-200 shadow-md group-hover:scale-125 transition-transform">
                    {isAmbulance && <Ambulance className="w-3 h-3 text-cyan-300" />}
                    {isFireTruck && <Truck className="w-3 h-3 text-orange-300" />}
                    {isBoat && <Waves className="w-3 h-3 text-blue-300" />}
                    {isDrone && <Navigation className="w-3 h-3 text-purple-300" />}
                    {!isAmbulance && !isFireTruck && !isBoat && !isDrone && <Shield className="w-3 h-3 text-emerald-300" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hover Tooltip Card */}
          {hoveredItem && (
            <div
              style={{ 
                left: `${Math.min(80, Math.max(15, hoveredItem.x))}%`, 
                top: `${Math.min(80, Math.max(15, hoveredItem.y))}%` 
              }}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-full mb-3 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-slate-700 p-2.5 rounded-xl shadow-2xl min-w-[210px]"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                  {hoveredItem.type}
                </span>
                {hoveredItem.risk && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${
                    hoveredItem.risk === 'CRITICAL' ? 'bg-rose-950 text-rose-300' :
                    hoveredItem.risk === 'HIGH' ? 'bg-orange-950 text-orange-300' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {hoveredItem.risk}
                  </span>
                )}
              </div>
              <h5 className="text-xs font-semibold text-slate-100">{hoveredItem.title}</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">{hoveredItem.subtitle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Map Legend and Live Telemetry Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 pointer-events-auto text-xs">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-slate-300 text-[11px]">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Layers:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_6px_#06b6d4]" />
            Flood Risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
            Landslide Risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
            Wildfire Risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            IoT Sensors (24)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
            Emergency Assets
          </span>
        </div>

        {/* Quick Hint */}
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any zone or pin for detailed risk metrics</span>
        </div>
      </div>
    </div>
  );
};
