import React, { useState } from 'react';
import { EMERGENCY_FACILITIES } from '../data/mockDisasterData';
import { 
  PhoneCall, 
  Building2, 
  Ambulance, 
  ShieldAlert, 
  MapPin, 
  Flame, 
  Shield, 
  AlertTriangle, 
  Clock, 
  ExternalLink,
  Search,
  CheckCircle2,
  LifeBuoy
} from 'lucide-react';

export const EmergencyInfoPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [activeCallSim, setActiveCallSim] = useState<string | null>(null);

  const emergencyHotlines = [
    { title: 'National Emergency Dispatch (CAD)', number: '911', desc: 'Life-threatening emergencies & immediate rescue' },
    { title: 'State Disaster Management Operations Cell', number: '+1 (800) 555-0190', desc: 'Regional evacuation coordinating command' },
    { title: 'River Basin Flood Response Hotline', number: '+1 (800) 555-0192', desc: 'Levee breach reports & boat extraction' },
    { title: 'Wildfire Incident Dispatch Center', number: '+1 (800) 555-0194', desc: 'Canopy fire sightings & smoke shelter routing' },
    { title: 'Hazardous Materials & Poison Control', number: '+1 (800) 555-0199', desc: 'Chemical spill & water contamination advice' }
  ];

  const filteredFacilities = EMERGENCY_FACILITIES.filter(f => {
    const matchesFilter = filterType === 'ALL' || f.type === filterType;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.address.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return <Ambulance className="w-5 h-5 text-rose-400" />;
      case 'shelter':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'fire_station':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'police':
        return <Shield className="w-5 h-5 text-cyan-400" />;
      default:
        return <LifeBuoy className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleSimulateCall = (num: string) => {
    setActiveCallSim(num);
    setTimeout(() => {
      setActiveCallSim(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Prominent Emergency Button Banner (matching Brief Section 13) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950/80 border-2 border-rose-600 shadow-[0_0_30px_rgba(244,63,94,0.3)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-3.5 rounded-2xl bg-rose-600 text-white shadow-xl animate-bounce">
            <PhoneCall className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              🚨 EMERGENCY INFORMATION
            </h1>
            <p className="text-xs sm:text-sm text-rose-200/90 mt-1 max-w-2xl">
              Instant contact routing to civil protection commanders, nearest emergency evacuation shelters, and trauma facilities.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSimulateCall('911')}
          className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-2xl transition-transform hover:scale-105 shrink-0 flex items-center gap-2"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Call 911 Dispatch</span>
        </button>
      </div>

      {/* Mandatory Demo Disclaimer Banner (matching Brief Section 13) */}
      <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-900/60 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">DEMO ENVIRONMENT NOTICE: </span>
          <span>All locations, phone numbers, and facility capacities shown below are simulated for demonstration purposes unless connected to a verified emergency database. In a real life-threatening emergency, dial your local emergency services directly.</span>
        </div>
      </div>

      {/* Simulated Call Active Banner */}
      {activeCallSim && (
        <div className="p-4 rounded-xl bg-rose-950/90 border border-rose-600 text-white flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-rose-300" />
            <span className="font-bold text-sm">Simulating Outbound Emergency Call to: {activeCallSim}...</span>
          </div>
          <span className="text-xs text-rose-300 font-mono">Routing to CAD Dispatch Console</span>
        </div>
      )}

      {/* Emergency Hotlines Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Direct Operational Hotlines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {emergencyHotlines.map((hl, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-100">{hl.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{hl.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-rose-400">{hl.number}</span>
                <button
                  onClick={() => handleSimulateCall(hl.number)}
                  className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span>Call Hotline</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearest Facilities Directory (Shelters, Hospitals, Fire, Police, Rescue) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Verified Emergency Facilities Directory
            </h3>
            <p className="text-xs text-slate-400">
              Nearest shelters, trauma centers, and rescue command stations with live occupancy status.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto self-start sm:self-auto">
            {[
              { id: 'ALL', label: 'All' },
              { id: 'shelter', label: 'Shelters' },
              { id: 'hospital', label: 'Hospitals' },
              { id: 'fire_station', label: 'Fire' },
              { id: 'police', label: 'Police' },
              { id: 'rescue_center', label: 'Rescue' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  filterType === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search facility name, address, or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((fac) => (
            <div key={fac.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 mt-0.5 shrink-0">
                      {getFacilityIcon(fac.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                          {fac.type.replace('_', ' ')}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-xs font-mono text-slate-300">{fac.distanceKm} km away</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-100 mt-0.5">{fac.name}</h4>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {fac.status}
                  </span>
                </div>

                <div className="space-y-1.5 mt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{fac.address}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-slate-300">
                    <div className="text-[10px] uppercase font-mono text-slate-500">Capacity & Supplies</div>
                    <div className="font-medium mt-0.5">{fac.capacity}</div>
                    {fac.occupancyRate !== undefined && (
                      <div className="mt-1.5 flex items-center justify-between text-[11px]">
                        <span>Current Occupancy:</span>
                        <span className="font-mono text-cyan-300 font-bold">{fac.occupancyRate}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300 font-medium">{fac.phone}</span>
                <button
                  onClick={() => handleSimulateCall(fac.phone)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call Station</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
