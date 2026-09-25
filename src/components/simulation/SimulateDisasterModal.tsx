import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import { 
  X, 
  Waves, 
  Mountain, 
  Flame, 
  RotateCcw, 
  CheckCircle2, 
  Cpu, 
  Radio, 
  BrainCircuit, 
  Bell, 
  MapPin, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ScenarioType } from '../../types/disaster';

interface SimulateDisasterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulateDisasterModal: React.FC<SimulateDisasterModalProps> = ({ isOpen, onClose }) => {
  const { scenario, simulateScenario, lastSimulatedEvent, isSimulating } = useDisaster();

  if (!isOpen) return null;

  const scenarios: {
    type: ScenarioType;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    impacts: string[];
  }[] = [
    {
      type: 'flood',
      title: 'Simulate Flash Flood Surge',
      description: 'Simulates a 114 mm/hr precipitation deluge, breaching 5.2m river crest in low-lying River Zone A.',
      icon: <Waves className="w-5 h-5 text-cyan-400" />,
      color: 'hover:border-cyan-500/80 bg-cyan-950/20 border-cyan-900/60',
      impacts: [
        'Water level surges to 5.24 m (Critical)',
        'Rainfall rate spikes to 114 mm/hr',
        'Flood probability jumps to 96%',
        'Triggers immediate Swiftwater boat mobilization'
      ]
    },
    {
      type: 'landslide',
      title: 'Simulate Escarpment Landslide',
      description: 'Simulates heavy soil water saturation (91%) triggering rapid geotechnical ground displacement.',
      icon: <Mountain className="w-5 h-5 text-amber-400" />,
      color: 'hover:border-amber-500/80 bg-amber-950/20 border-amber-900/60',
      impacts: [
        'Soil moisture reaches 91% saturation',
        'Slope displacement rate rises to 6.8 mm/hr',
        'Landslide risk score surges to 89%',
        'Triggers mountain transit corridor closure'
      ]
    },
    {
      type: 'wildfire',
      title: 'Simulate Canopy Wildfire',
      description: 'Simulates heatwave (46°C) and 38 km/h dry gusts fueling rapid crown fire expansion.',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      color: 'hover:border-rose-500/80 bg-rose-950/20 border-rose-900/60',
      impacts: [
        'Surface temp hits 46°C, humidity drops to 12%',
        'Optical smoke sensors trigger Heavy Alarm',
        'Fire detection confidence jumps to 98%',
        'Prompts aerial retardant drop & tactical foam dispatch'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                Simulate Environmental Disasters
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  DEMO MODE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Trigger live edge-case scenarios to evaluate the end-to-end response intelligence pipeline.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Workflow Pipeline Breadcrumb */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 block mb-2">
              Full Autonomous Workflow Engine
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Radio className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="font-semibold text-slate-200">1. Sensor Data</span>
                <span className="text-[10px] text-slate-400 mt-0.5">IoT Telemetry</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Cpu className="w-4 h-4 text-purple-400 mb-1" />
                <span className="font-semibold text-slate-200">2. AI Analysis</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Terrain ML</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                <BrainCircuit className="w-4 h-4 text-amber-400 mb-1" />
                <span className="font-semibold text-slate-200">3. Prediction</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Probabilities</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Bell className="w-4 h-4 text-rose-400 mb-1" />
                <span className="font-semibold text-slate-200">4. Alert</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Push Feeds</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="font-semibold text-slate-200">5. Resources</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Smart Dispatch</span>
              </div>
            </div>
          </div>

          {/* Scenario Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Select Disaster Scenario to Trigger
            </label>

            <div className="grid gap-3">
              {scenarios.map((sc) => {
                const isActive = scenario === sc.type;
                return (
                  <div
                    key={sc.type}
                    onClick={() => {
                      simulateScenario(sc.type);
                    }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${sc.color} ${
                      isActive ? 'ring-2 ring-cyan-400 shadow-lg' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/80">
                          {sc.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-slate-100">{sc.title}</h4>
                            {isActive && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{sc.description}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors shrink-0 ${
                          isActive
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {isActive ? 'Simulating' : 'Simulate'}
                      </button>
                    </div>

                    {/* Impact bullet points */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                      {sc.impacts.map((imp, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{imp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              simulateScenario('normal');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Baseline Nominal State
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
          >
            Close & View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
