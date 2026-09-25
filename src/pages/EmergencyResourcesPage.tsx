import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { 
  ShieldCheck, 
  Ambulance, 
  Truck, 
  Ship, 
  Navigation, 
  Users, 
  Building2, 
  MapPin, 
  Phone, 
  Battery, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { RiskMap } from '../components/map/RiskMap';

export const EmergencyResourcesPage: React.FC = () => {
  const { 
    resources, 
    aiRecommendationApproved, 
    approveRecommendation, 
    setActiveTab 
  } = useDisaster();

  const [filterType, setFilterType] = useState<string>('ALL');

  const resourceTypeConfig = {
    ambulance: { label: 'Ambulances', icon: <Ambulance className="w-4 h-4 text-cyan-400" /> },
    fire_truck: { label: 'Fire & Rescue Vehicles', icon: <Truck className="w-4 h-4 text-orange-400" /> },
    rescue_boat: { label: 'Rescue Boats', icon: <Ship className="w-4 h-4 text-blue-400" /> },
    drone: { label: 'Drones', icon: <Navigation className="w-4 h-4 text-purple-400" /> },
    response_team: { label: 'Response Teams', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    shelter: { label: 'Emergency Shelters', icon: <Building2 className="w-4 h-4 text-amber-400" /> }
  };

  const filteredResources = resources.filter(r => {
    if (filterType === 'ALL') return true;
    return r.type === filterType;
  });

  const deployedCount = resources.filter(r => r.status === 'deployed').length;
  const availableCount = resources.filter(r => r.status === 'available').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              Emergency Resources & Tactical Allocation
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              CAD DISPATCH SYNCED
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time readiness telemetry, geolocated asset staging, and autonomous AI deployment recommendations.
          </p>
        </div>

        {/* Readiness Ticker */}
        <div className="flex items-center gap-3 self-start md:self-auto text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400">Deployed: </span>
            <span className="font-bold text-amber-400">{deployedCount}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400">Available: </span>
            <span className="font-bold text-emerald-400">{availableCount}</span>
          </div>
        </div>
      </div>

      {/* AI RECOMMENDATION BOX (matching Brief Section 11 exact text) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/80 backdrop-blur-md space-y-4 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  AI Recommendation
                </h3>
                {/* Clearly labeled as decision-support */}
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Decision-Support Recommendation · Not Automatic Deployment
                </span>
              </div>
              <blockquote className="text-base sm:text-lg font-bold text-white leading-snug">
                "Deploy 2 response teams and 1 emergency vehicle near the high-risk flood zone."
              </blockquote>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Rationale: Water level at River Zone A has reached 4.8 m with continuing 92 mm/hr rainfall. Early staging at Marina Docks reduces evac response latency by 14 minutes.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {aiRecommendationApproved ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deployment Proposal Approved</span>
              </div>
            ) : (
              <button
                onClick={approveRecommendation}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize Deployment</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resource Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            filterType === 'ALL'
              ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Resources ({resources.length})
        </button>

        {Object.entries(resourceTypeConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setFilterType(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              filterType === key
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {config.icon}
            <span>{config.label}</span>
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => {
          const isDeployed = res.status === 'deployed';

          return (
            <div
              key={res.id}
              className={`p-4 rounded-xl border backdrop-blur-md flex flex-col justify-between transition-all ${
                isDeployed
                  ? 'bg-amber-950/20 border-amber-900/70'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      {resourceTypeConfig[res.type as keyof typeof resourceTypeConfig]?.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 block">{res.id}</span>
                      <h4 className="font-bold text-sm text-slate-100">{res.name}</h4>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    isDeployed 
                      ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {res.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mt-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Crew / Specs</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{res.capacityOrCrew}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 pt-1">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {res.locationName}
                    </span>
                    {res.batteryOrFuel !== undefined && (
                      <span className="flex items-center gap-1 font-mono text-slate-300 shrink-0">
                        <Battery className="w-3.5 h-3.5 text-emerald-400" />
                        {res.batteryOrFuel}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  {res.contact}
                </span>

                <button
                  onClick={() => setActiveTab('map')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                >
                  Locate on Map
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map showing resource locations (matching Brief Section 11) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            Resource Deployment Map
            <span className="text-xs font-mono text-purple-400 font-normal">· Purple Pins = Emergency Units</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">15 Assets Visualized</span>
        </div>
        <RiskMap />
      </div>
    </div>
  );
};
