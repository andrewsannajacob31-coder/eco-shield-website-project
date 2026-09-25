import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { SensorType, SensorData } from '../types/disaster';
import { 
  Radio, 
  BatteryCharging, 
  Wifi, 
  MapPin, 
  Clock, 
  Filter, 
  Waves, 
  Mountain, 
  Flame, 
  Droplets, 
  Wind, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Layers
} from 'lucide-react';
import { RiskMap } from '../components/map/RiskMap';

export const SensorNetworkPage: React.FC = () => {
  const { sensors } = useDisaster();
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const sensorTypeIcons: Record<SensorType, React.ReactNode> = {
    water_level: <Waves className="w-4 h-4 text-cyan-400" />,
    soil_moisture: <Mountain className="w-4 h-4 text-amber-400" />,
    temperature: <Flame className="w-4 h-4 text-rose-400" />,
    humidity: <Droplets className="w-4 h-4 text-blue-400" />,
    smoke: <Wind className="w-4 h-4 text-slate-300" />,
    rainfall: <Droplets className="w-4 h-4 text-cyan-300" />,
    air_quality: <Activity className="w-4 h-4 text-emerald-400" />,
    seismic: <Activity className="w-4 h-4 text-purple-400" />
  };

  const filteredSensors = sensors.filter(sensor => {
    const matchesType = selectedType === 'ALL' || sensor.type === selectedType;
    const matchesSearch = 
      sensor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const onlineCount = sensors.filter(s => s.status === 'ONLINE').length;
  const offlineCount = sensors.filter(s => s.status === 'OFFLINE').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              Sensor Network
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              {onlineCount} ONLINE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time telemetry feeds from automated field stations, tensiometers, pyrometers, and river transducers.
          </p>
        </div>

        {/* View Toggle (Grid / Sensor Map) */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sensors Grid ({filteredSensors.length})
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'map'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sensor GIS Map
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Sensor ID, location, or telemetry type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All (24)' },
            { id: 'water_level', label: 'Water Level' },
            { id: 'rainfall', label: 'Rainfall' },
            { id: 'temperature', label: 'Temperature' },
            { id: 'soil_moisture', label: 'Soil Moisture' },
            { id: 'smoke', label: 'Smoke' },
            { id: 'air_quality', label: 'Air Quality' },
            { id: 'seismic', label: 'Seismic' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedType === cat.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'map' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing geo-referenced placement of all active IoT nodes</span>
            <span className="font-mono text-cyan-400">Green Pins = Online Sensors</span>
          </div>
          <RiskMap />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSensors.map((sensor) => {
            const isOnline = sensor.status === 'ONLINE';
            const isCritical = sensor.criticalThreshold && sensor.currentValue >= sensor.criticalThreshold;
            const isWarning = sensor.warningThreshold && sensor.currentValue >= sensor.warningThreshold;

            return (
              <div
                key={sensor.id}
                className={`p-4 rounded-xl border backdrop-blur-md transition-all flex flex-col justify-between ${
                  !isOnline
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : isCritical
                    ? 'bg-rose-950/20 border-rose-800/80 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
                    : isWarning
                    ? 'bg-amber-950/20 border-amber-800/80'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar with ID and Online Status */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                      {sensor.id}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      isOnline 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                      {sensor.status}
                    </span>
                  </div>

                  {/* Sensor Name and Location (matching Brief example) */}
                  <h4 className="font-semibold text-sm text-slate-100 line-clamp-1">{sensor.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 mb-3">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{sensor.location}</span>
                  </div>

                  {/* Current Value Display */}
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 mb-3">
                    <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        {sensorTypeIcons[sensor.type]}
                        {sensor.type.replace('_', ' ')}
                      </span>
                      {isCritical && <span className="text-rose-400 font-bold">THRESHOLD EXCEEDED</span>}
                    </div>
                    <div className="font-mono text-2xl font-extrabold text-white mt-1 tabular-nums">
                      {sensor.currentValue}{' '}
                      <span className="text-sm font-normal text-slate-400">{sensor.unit}</span>
                    </div>
                  </div>

                  {/* Mini Sparkline History */}
                  <div className="h-6 flex items-end gap-1 mb-2 px-1">
                    {sensor.history.map((val, idx) => {
                      const maxVal = Math.max(...sensor.history, 1);
                      const minVal = Math.min(...sensor.history, 0);
                      const heightPercent = Math.max(15, Math.min(100, ((val - minVal) / (maxVal - minVal || 1)) * 100));
                      return (
                        <div
                          key={idx}
                          className="flex-1 bg-cyan-500/40 rounded-t-sm transition-all"
                          style={{ height: `${heightPercent}%` }}
                          title={`Reading: ${val} ${sensor.unit}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Footer Telemetry Health */}
                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{sensor.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <Wifi className="w-3 h-3 text-slate-400" />
                      {sensor.signalQuality}%
                    </span>
                    <span className="flex items-center gap-0.5 text-slate-300">
                      <BatteryCharging className="w-3 h-3 text-emerald-400" />
                      {sensor.batteryPercent}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
