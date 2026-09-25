import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { RiskCard } from '../components/common/RiskCard';
import { RiskChart } from '../components/common/RiskChart';
import { RiskMap } from '../components/map/RiskMap';
import { 
  Radio, 
  Layers, 
  Bell, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Cpu,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    metrics, 
    sensors, 
    zones, 
    alerts, 
    setActiveTab, 
    setSelectedZone, 
    aiRecommendationApproved, 
    approveRecommendation 
  } = useDisaster();

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning 👋';
    if (hr < 17) return 'Good Afternoon 👋';
    return 'Good Evening 👋';
  };

  const activeSensorsCount = sensors.filter(s => s.status === 'ONLINE').length;
  const activeAlertsCount = alerts.filter(a => !a.acknowledged && a.severity !== 'RESOLVED').length;
  const highRiskZonesCount = zones.filter(z => z.riskLevel === 'HIGH' || z.riskLevel === 'CRITICAL').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/80 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              {getGreeting()}
            </h2>
            {/* LIVE Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-[11px] font-bold text-emerald-400 font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Environmental conditions are being monitored across all connected zones.
          </p>
        </div>

        {/* System Health Status Badges */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="font-semibold">Monitoring Systems Online</span>
          </div>
        </div>
      </div>

      {/* Primary Key Stats Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Active Sensors */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Active Sensors</span>
            <Radio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              {activeSensorsCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ {sensors.length} Nodes</span>
          </div>
          <span className="text-[11px] text-emerald-400/90 font-medium block mt-1">
            🟢 98% Telemetry Health
          </span>
        </div>

        {/* Monitored Hazard Types */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Hazard Types</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300 tabular-nums">
              5
            </span>
            <span className="text-xs text-slate-400">Hazard Vectors</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Flood · Landslide · Fire · Air · Storm
          </span>
        </div>

        {/* Active Alerts */}
        <div 
          onClick={() => setActiveTab('alerts')}
          className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md cursor-pointer hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Active Alerts</span>
            <Bell className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 tabular-nums">
              {activeAlertsCount}
            </span>
            <span className="text-xs text-slate-400">Active Warnings</span>
          </div>
          <span className="text-[11px] text-rose-400/90 font-medium block mt-1">
            🔴 Priority Dispatch Active
          </span>
        </div>

        {/* High-Risk Zones */}
        <div 
          onClick={() => setActiveTab('map')}
          className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md cursor-pointer hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">High-Risk Zones</span>
            <MapPin className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
              {highRiskZonesCount}
            </span>
            <span className="text-xs text-slate-400">/ {zones.length} Sectors</span>
          </div>
          <span className="text-[11px] text-amber-400/90 font-medium block mt-1">
            Zone A, B, C under alert
          </span>
        </div>
      </div>

      {/* AI Decision-Support Recommendation Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                AI Recommendation Engine
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                Decision-Support · Non-Automated
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100">
              Deploy 2 response teams and 1 emergency vehicle near the high-risk flood zone.
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Target: Demo Zone A (River Basin Sector 4). Water level is approaching 4.8m threshold.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {aiRecommendationApproved ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Deployment Dispatched</span>
            </div>
          ) : (
            <button
              onClick={approveRecommendation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Approve Deployment</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('resources')}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            Review Resources
          </button>
        </div>
      </div>

      {/* DISASTER RISK CARDS SECTION (Brief Section 3) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-100 tracking-tight">
              Interactive Hazard Risk Monitors
            </h3>
            <p className="text-xs text-slate-400">
              Real-time multi-hazard telemetry and probabilistic AI threat scores
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            5 Vectors Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. FLOOD CARD */}
          <RiskCard
            type="flood"
            title="Flood Risk Intelligence"
            status={metrics.flood.status === 'CRITICAL' ? 'CRITICAL' : 'HIGH RISK'}
            probability={metrics.flood.floodProbability}
            accentNote="River Basin Sector 4 & Dam Catchment"
            metrics={[
              { label: 'Water Level', value: `${metrics.flood.waterLevel} m`, highlight: true },
              { label: 'Rainfall Rate', value: `${metrics.flood.rainfall} mm/hr`, highlight: true },
              { label: 'Reservoir Level', value: `${metrics.flood.reservoirLevel}%` },
              { label: 'River Flow Rate', value: `${metrics.flood.flowRate} m³/s` },
            ]}
            onViewDetails={() => setActiveTab('flood')}
          />

          {/* 2. LANDSLIDE CARD */}
          <RiskCard
            type="landslide"
            title="Landslide Risk Intelligence"
            status={metrics.landslide.status === 'CRITICAL' ? 'CRITICAL' : 'HIGH RISK'}
            probability={metrics.landslide.riskScore}
            accentNote="North Escarpment Slope & Highway Corridor"
            metrics={[
              { label: 'Soil Moisture', value: `${metrics.landslide.soilMoisture}%`, highlight: true },
              { label: 'Rainfall Intensity', value: metrics.landslide.rainfallIntensity, highlight: true },
              { label: 'Slope Risk', value: metrics.landslide.slopeRisk },
              { label: 'Displacement', value: `${metrics.landslide.groundDisplacement} mm/hr` },
            ]}
            onViewDetails={() => setActiveTab('landslide')}
          />

          {/* 3. WILDFIRE CARD */}
          <RiskCard
            type="wildfire"
            title="Wildfire Risk Intelligence"
            status="CRITICAL"
            probability={metrics.wildfire.fireProbability}
            accentNote="Ridge Forest Alpha & Eastern Timberline"
            metrics={[
              { label: 'Temperature', value: `${metrics.wildfire.temperature}°C`, highlight: true },
              { label: 'Humidity', value: `${metrics.wildfire.humidity}%`, highlight: true },
              { label: 'Optical Smoke', value: metrics.wildfire.smoke },
              { label: 'Wind Vector', value: `${metrics.wildfire.windSpeed} km/h ${metrics.wildfire.windDirection}` },
            ]}
            onViewDetails={() => setActiveTab('wildfire')}
          />

          {/* 4. ENVIRONMENT CARD */}
          <RiskCard
            type="environment"
            title="Environmental Health"
            status="MODERATE"
            accentNote="Regional Air Quality & Canopy Biosensors"
            metrics={[
              { label: 'Temperature', value: `${metrics.environment.temperature}°C` },
              { label: 'Humidity', value: `${metrics.environment.humidity}%` },
              { label: 'Air Quality (AQI)', value: `${metrics.environment.airQuality} AQI`, highlight: true },
              { label: 'Soil Moisture', value: `${metrics.environment.soilMoisture}%` },
            ]}
            onViewDetails={() => setActiveTab('sensors')}
          />

          {/* 5. WEATHER CARD */}
          <div className="md:col-span-2 lg:col-span-2">
            <RiskCard
              type="weather"
              title="Regional Weather & Severe Atmospheric Radar"
              status="HIGH RISK"
              accentNote={metrics.weather.forecast}
              metrics={[
                { label: 'Precipitation', value: `${metrics.weather.rainfall} mm/hr`, highlight: true },
                { label: 'Wind Velocity', value: `${metrics.weather.windSpeed} km/h` },
                { label: 'Ambient Temperature', value: `${metrics.weather.temperature}°C` },
                { label: 'Atmospheric Pressure', value: `${metrics.weather.barometricHpa} hPa` },
              ]}
              onViewDetails={() => setActiveTab('ai')}
            />
          </div>
        </div>
      </div>

      {/* GIS Live Risk Map Preview Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
              Live GIS Tactical Map
              <span className="text-xs font-mono font-normal text-slate-400">· Interactive Remote Sensing</span>
            </h3>
            <p className="text-xs text-slate-400">
              Multi-layer visualization of flood zones, thermal anomalies, terrain escarpments, and sensor nodes
            </p>
          </div>

          <button
            onClick={() => setActiveTab('map')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <span>Expand Full GIS View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <RiskMap 
          onSelectZone={(zone) => {
            setSelectedZone(zone);
          }} 
        />
      </div>

      {/* 24-Hour Trend Chart Section */}
      <div>
        <RiskChart />
      </div>
    </div>
  );
};
