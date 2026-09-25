import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { 
  User, 
  Bell, 
  MapPin, 
  ShieldCheck, 
  Sliders, 
  Globe, 
  Moon, 
  Radio, 
  CheckCircle2, 
  Save, 
  RotateCcw
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { 
    notificationsEnabled, 
    setNotificationsEnabled, 
    alertPreferences, 
    setAlertPreferences, 
    zones,
    resetAllData 
  } = useDisaster();

  const [profileName, setProfileName] = useState('Commander Sarah Jenkins');
  const [profileRole, setProfileRole] = useState('Senior Operations Director · Regional Emergency Taskforce');
  const [profileLocation, setProfileLocation] = useState('Sector 4 Regional Command Hub, Pacific Northwest');
  const [locationAccess, setLocationAccess] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            User Profile & System Preferences
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure incident dispatcher credentials, monitored geographical sectors, and push notification thresholds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile settings and alert dispatch rules saved successfully.</span>
        </div>
      )}

      {/* User Card */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shrink-0">
          SJ
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-100">{profileName}</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              VERIFIED COMMANDER
            </span>
          </div>
          <p className="text-xs text-slate-300">{profileRole}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{profileLocation}</span>
          </div>
        </div>
      </div>

      {/* Notification Preferences (matching Brief Section 12 & 14) */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-sm text-slate-100">Notification Preferences</h3>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600" />
          </label>
        </div>

        <p className="text-xs text-slate-400">
          Enable or disable real-time push banners for autonomous threat detection events across connected sectors.
        </p>

        {/* Hazard alert toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { key: 'flood', label: '🌊 Flood Inundation Warnings', desc: 'Alert when water level breaches 4.0m threshold' },
            { key: 'landslide', label: '⛰️ Landslide Hazard Alerts', desc: 'Alert when soil moisture exceeds 75% on steep slopes' },
            { key: 'wildfire', label: '🔥 Wildfire Detection Alerts', desc: 'Alert upon thermal anomaly and smoke detection' },
            { key: 'environment', label: '🌱 Environmental & Air Quality Alerts', desc: 'Alert when AQI exceeds 150 or smoke inversions occur' }
          ].map((item) => (
            <div 
              key={item.key}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-3"
            >
              <div>
                <span className="text-xs font-semibold text-slate-200 block">{item.label}</span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">{item.desc}</span>
              </div>
              <input
                type="checkbox"
                checked={alertPreferences[item.key as keyof typeof alertPreferences]}
                onChange={(e) => setAlertPreferences(p => ({ ...p, [item.key]: e.target.checked }))}
                className="mt-1 accent-cyan-500 cursor-pointer h-4 w-4"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Monitored Zones */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-slate-100">Monitored Geographical Zones ({zones.length})</h3>
        </div>
        <p className="text-xs text-slate-400">
          Sectors actively subscribed to your command dispatch queue.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {zones.map(z => (
            <div key={z.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-cyan-400 block">{z.code}</span>
                <span className="text-xs font-semibold text-slate-200">{z.name}</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400">
                {z.probability}% Risk
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Settings (Dark Mode, Location, Language) */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-sm text-slate-100">Application Settings</h3>
        </div>

        <div className="space-y-3">
          {/* Dark Mode */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Moon className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Dark Mode</span>
                <span className="text-[11px] text-slate-400">High-contrast tactical emergency UI enabled</span>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">LOCKED DARK</span>
          </div>

          {/* Location Access */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Location Access</span>
                <span className="text-[11px] text-slate-400">Used to center GIS map on command headquarters</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={locationAccess}
              onChange={(e) => setLocationAccess(e.target.checked)}
              className="accent-cyan-500 cursor-pointer h-4 w-4"
            />
          </div>

          {/* Language */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Interface Language</span>
                <span className="text-[11px] text-slate-400">Tactical alerts language translation</span>
              </div>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-medium focus:outline-none"
            >
              <option>English (US)</option>
              <option>Español (ES)</option>
              <option>Français (FR)</option>
              <option>Deutsch (DE)</option>
              <option>日本語 (JA)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reset State */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-200 block">Reset Demonstration Environment</span>
          <span className="text-[11px] text-slate-400">Restore all metrics, sensors, and alerts to clean default demo data</span>
        </div>
        <button
          onClick={() => {
            resetAllData();
            handleSave();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </div>
  );
};
