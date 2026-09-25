import React from 'react';
import { 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  Radio, 
  Cpu, 
  Waves, 
  Flame, 
  Mountain, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import earthSatelliteImg from '../assets/images/welcome_earth_satellite_1790358862957.jpg';

interface WelcomeScreenProps {
  onEnter: () => void;
  onEnterDemo: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter, onEnterDemo }) => {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden">
      {/* Background Satellite/Earth Visualization */}
      <div className="absolute inset-0 z-0">
        <img
          src={earthSatelliteImg}
          alt="Planet Earth Satellite Remote Sensing"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
        />
        {/* Dark Scrim overlay for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/80" />
      </div>

      {/* Top Bar Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <ShieldAlert className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">Eco-Shield</span>
            <span className="block text-[11px] font-mono tracking-widest uppercase text-cyan-400">
              Disaster Intelligence
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-mono">24/7 Global GIS Grid</span>
          </div>
          <button
            onClick={onEnterDemo}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-md transition-all"
          >
            Instant Demo
          </button>
        </div>
      </header>

      {/* Main Hero Center Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">
        {/* Anti-Slop Clean Subtitle */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/80 backdrop-blur-md text-xs font-semibold text-cyan-300 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Generation Environmental Monitoring & Autonomous Risk AI</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 text-balance">
          Eco-Shield
        </h1>

        <p className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-300 mb-4">
          Intelligence for a Safer Environment
        </p>

        {/* Core Tagline Description */}
        <p className="text-lg sm:text-xl font-mono tracking-widest text-slate-300 uppercase mb-8">
          Monitor. Predict. Alert. Protect.
        </p>

        <p className="max-w-2xl text-sm sm:text-base text-slate-300/90 leading-relaxed mb-10 text-balance">
          A unified planetary platform detecting and predicting hazards from floods, landslides, wildfires, and environmental threats using IoT telemetry, GIS remote sensing, and automated decision-support intelligence.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-102"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onEnterDemo}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-white font-semibold text-sm border border-slate-700/80 backdrop-blur-md shadow-lg transition-all hover:scale-102"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Demo Dashboard</span>
          </button>
        </div>

        {/* Multi-Hazard Sensor Capabilities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 w-full max-w-3xl">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
            <Waves className="w-5 h-5 text-cyan-400 mb-1.5" />
            <div className="text-xs font-semibold text-slate-100">Flood Intelligence</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Hydraulic crest & flow sensors</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
            <Mountain className="w-5 h-5 text-amber-400 mb-1.5" />
            <div className="text-xs font-semibold text-slate-100">Landslide Prediction</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Soil saturation & slip gauges</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
            <Flame className="w-5 h-5 text-rose-400 mb-1.5" />
            <div className="text-xs font-semibold text-slate-100">Wildfire Detection</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Thermal FLIR & smoke optical</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
            <Activity className="w-5 h-5 text-emerald-400 mb-1.5" />
            <div className="text-xs font-semibold text-slate-100">Resource Routing</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Autonomous CAD dispatch</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div>
          <span>© 2026 Eco-Shield Intelligence Systems · Built for Environmental Defense</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-amber-400/90 font-semibold">DEMO DATASET ACTIVE</span>
          <span>·</span>
          <span>Remote Sensing & GIS Verified</span>
        </div>
      </footer>
    </div>
  );
};
