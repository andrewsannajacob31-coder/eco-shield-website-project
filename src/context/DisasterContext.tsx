import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DisasterMetrics, 
  SensorData, 
  ZoneRisk, 
  AlertItem, 
  EmergencyResource, 
  NavigationTab, 
  ScenarioType,
  HazardType
} from '../types/disaster';
import { 
  INITIAL_METRICS, 
  INITIAL_SENSORS, 
  INITIAL_ZONES, 
  INITIAL_ALERTS, 
  INITIAL_RESOURCES,
  INITIAL_TREND_DATA 
} from '../data/mockDisasterData';

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  type: HazardType;
  timestamp: string;
}

interface DisasterContextType {
  metrics: DisasterMetrics;
  sensors: SensorData[];
  zones: ZoneRisk[];
  alerts: AlertItem[];
  resources: EmergencyResource[];
  scenario: ScenarioType;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedZone: ZoneRisk | null;
  setSelectedZone: (zone: ZoneRisk | null) => void;
  trendData: typeof INITIAL_TREND_DATA;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  alertPreferences: {
    flood: boolean;
    landslide: boolean;
    wildfire: boolean;
    environment: boolean;
  };
  setAlertPreferences: React.Dispatch<React.SetStateAction<{
    flood: boolean;
    landslide: boolean;
    wildfire: boolean;
    environment: boolean;
  }>>;
  pushNotifications: PushNotification[];
  dismissNotification: (id: string) => void;
  acknowledgeAlert: (id: string) => void;
  simulateScenario: (scenario: ScenarioType) => void;
  aiRecommendationApproved: boolean;
  approveRecommendation: () => void;
  resetAllData: () => void;
  isSimulating: boolean;
  lastSimulatedEvent: string | null;
}

const DisasterContext = createContext<DisasterContextType | undefined>(undefined);

export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<DisasterMetrics>(INITIAL_METRICS);
  const [sensors, setSensors] = useState<SensorData[]>(INITIAL_SENSORS);
  const [zones, setZones] = useState<ZoneRisk[]>(INITIAL_ZONES);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [resources, setResources] = useState<EmergencyResource[]>(INITIAL_RESOURCES);
  const [trendData, setTrendData] = useState(INITIAL_TREND_DATA);
  const [scenario, setScenario] = useState<ScenarioType>('normal');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedZone, setSelectedZone] = useState<ZoneRisk | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [aiRecommendationApproved, setAiRecommendationApproved] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastSimulatedEvent, setLastSimulatedEvent] = useState<string | null>(null);

  const [alertPreferences, setAlertPreferences] = useState({
    flood: true,
    landslide: true,
    wildfire: true,
    environment: true,
  });

  const [pushNotifications, setPushNotifications] = useState<PushNotification[]>([
    {
      id: 'push-init-1',
      title: '🔥 Wildfire Alert',
      message: 'Possible wildfire detected. Check the risk map for details.',
      type: 'wildfire',
      timestamp: 'Just now'
    }
  ]);

  // Subtle live telemetry fluctuation to give the real-time IoT feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(s => {
        if (s.status === 'OFFLINE') return s;
        // subtle jitter ±1%
        const delta = (Math.random() - 0.48) * (s.unit === '°C' ? 0.2 : s.unit === 'm' ? 0.02 : 0.4);
        const nextVal = Math.max(0, parseFloat((s.currentValue + delta).toFixed(2)));
        const newHist = [...s.history.slice(1), nextVal];
        return {
          ...s,
          currentValue: nextVal,
          history: newHist,
          lastUpdated: 'Few seconds ago'
        };
      }));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const dismissNotification = (id: string) => {
    setPushNotifications(prev => prev.filter(n => n.id !== id));
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const approveRecommendation = () => {
    setAiRecommendationApproved(true);
    // Mark resources as deployed
    setResources(prev => prev.map(r => {
      if (r.id === 'res-amb-03' || r.id === 'res-team-03') {
        return { ...r, status: 'deployed' };
      }
      return r;
    }));

    if (notificationsEnabled) {
      setPushNotifications(prev => [
        {
          id: `push-deploy-${Date.now()}`,
          title: '🚨 Resource Deployment Dispatched',
          message: '2 Response Teams & 1 Heavy EMS unit mobilized to River Zone A.',
          type: 'flood',
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }
  };

  const simulateScenario = (type: ScenarioType) => {
    setIsSimulating(true);
    setScenario(type);
    setAiRecommendationApproved(false);

    if (type === 'flood') {
      setLastSimulatedEvent('Flash Flood Surge Simulation Active');
      setMetrics(prev => ({
        ...prev,
        flood: {
          waterLevel: 5.24,
          rainfall: 114,
          floodProbability: 96,
          reservoirLevel: 97.8,
          flowRate: 580,
          status: 'CRITICAL'
        },
        landslide: {
          ...prev.landslide,
          soilMoisture: 88,
          riskScore: 84,
          status: 'HIGH'
        },
        weather: {
          ...prev.weather,
          rainfall: 114,
          forecast: 'Extreme Torrential Downpour & Flood Inundation Alert'
        }
      }));

      // Update sensors
      setSensors(prev => prev.map(s => {
        if (s.id === 'SENSOR-024') return { ...s, currentValue: 5.24, history: [...s.history.slice(1), 5.24] };
        if (s.id === 'SENSOR-019') return { ...s, currentValue: 114, history: [...s.history.slice(1), 114] };
        if (s.id === 'SENSOR-112') return { ...s, currentValue: 5.1, history: [...s.history.slice(1), 5.1] };
        return s;
      }));

      // Update Zones
      setZones(prev => prev.map(z => {
        if (z.id === 'zone-a') {
          return {
            ...z,
            riskLevel: 'CRITICAL',
            probability: 96,
            recommendedAction: 'Mandatory lowlands evacuation. Deploy rescue boats immediately.'
          };
        }
        return z;
      }));

      // Prepend Flood Alert
      const newAlert: AlertItem = {
        id: `alert-flood-${Date.now()}`,
        title: 'FLASH FLOOD SURGE IN PROGRESS',
        type: 'flood',
        severity: 'CRITICAL',
        description: 'Water level breached 5.2m critical crest threshold at River Zone A. Imminent levee overtopping.',
        zoneId: 'zone-a',
        zoneName: 'Demo Zone A (River Basin Sector 4)',
        metricsSummary: [
          { label: 'Water Level', value: '5.24 m (CRITICAL)' },
          { label: 'Rainfall', value: '114 mm/hr' },
          { label: 'Flood Probability', value: '96%' }
        ],
        timestamp: 'Just now',
        detectionConfidence: 96,
        verifiedByDrone: true,
        acknowledged: false
      };
      setAlerts(prev => [newAlert, ...prev.filter(a => a.id !== newAlert.id)]);

      // Push Notification
      if (notificationsEnabled && alertPreferences.flood) {
        setPushNotifications(prev => [
          {
            id: `push-flood-${Date.now()}`,
            title: '⚠️ Severe Flood Warning',
            message: 'High flood probability detected near River Zone A. Water level exceeds 5.2m!',
            type: 'flood',
            timestamp: 'Just now'
          },
          ...prev
        ]);
      }
    } else if (type === 'landslide') {
      setLastSimulatedEvent('Critical Escarpment Landslide Triggered');
      setMetrics(prev => ({
        ...prev,
        landslide: {
          soilMoisture: 91,
          rainfallIntensity: 'Extreme',
          slopeRisk: 'Critical',
          riskScore: 89,
          groundDisplacement: 6.8,
          seismicActivity: 2.1,
          slopeAngle: 38,
          status: 'CRITICAL'
        }
      }));

      // Update sensors
      setSensors(prev => prev.map(s => {
        if (s.id === 'SENSOR-011') return { ...s, currentValue: 91, history: [...s.history.slice(1), 91] };
        if (s.id === 'SENSOR-012') return { ...s, currentValue: 2.1, history: [...s.history.slice(1), 2.1] };
        return s;
      }));

      // Update Zones
      setZones(prev => prev.map(z => {
        if (z.id === 'zone-c') {
          return {
            ...z,
            riskLevel: 'CRITICAL',
            probability: 89,
            recommendedAction: 'Immediate road closure on Mountain Corridor. Evacuate downslope residences.'
          };
        }
        return z;
      }));

      const newAlert: AlertItem = {
        id: `alert-landslide-${Date.now()}`,
        title: 'CATASTROPHIC SLOPE FAILURE IMMINENT',
        type: 'landslide',
        severity: 'CRITICAL',
        description: 'Escarpment displacement jumped to 6.8 mm/hr with 91% soil saturation. Debris flow imminent.',
        zoneId: 'zone-c',
        zoneName: 'Demo Zone C (North Escarpment Slope)',
        metricsSummary: [
          { label: 'Soil Moisture', value: '91% (Extreme)' },
          { label: 'Displacement', value: '6.8 mm/hr' },
          { label: 'Risk Score', value: '89%' }
        ],
        timestamp: 'Just now',
        detectionConfidence: 89,
        verifiedByDrone: true,
        acknowledged: false
      };
      setAlerts(prev => [newAlert, ...prev]);

      if (notificationsEnabled && alertPreferences.landslide) {
        setPushNotifications(prev => [
          {
            id: `push-landslide-${Date.now()}`,
            title: '⛰️ Landslide Warning',
            message: 'Heavy rainfall and high soil moisture detected in a landslide-prone zone.',
            type: 'landslide',
            timestamp: 'Just now'
          },
          ...prev
        ]);
      }
    } else if (type === 'wildfire') {
      setLastSimulatedEvent('Wildfire Outbreak Simulation Active');
      setMetrics(prev => ({
        ...prev,
        wildfire: {
          temperature: 46,
          humidity: 12,
          smoke: 'Heavy',
          fireProbability: 98,
          windSpeed: 38,
          windDirection: 'Northeast',
          spreadDirection: 'Northeast Valley',
          detectionConfidence: 98,
          status: 'CRITICAL'
        },
        environment: {
          ...prev.environment,
          airQuality: 285,
          airQualityStatus: 'Hazardous'
        }
      }));

      setSensors(prev => prev.map(s => {
        if (s.id === 'SENSOR-042') return { ...s, currentValue: 46, history: [...s.history.slice(1), 46] };
        if (s.id === 'SENSOR-043') return { ...s, currentValue: 98, history: [...s.history.slice(1), 98] };
        if (s.id === 'SENSOR-088') return { ...s, currentValue: 12, history: [...s.history.slice(1), 12] };
        if (s.id === 'SENSOR-077') return { ...s, currentValue: 285, history: [...s.history.slice(1), 285] };
        return s;
      }));

      setZones(prev => prev.map(z => {
        if (z.id === 'zone-b') {
          return {
            ...z,
            riskLevel: 'CRITICAL',
            probability: 98,
            recommendedAction: 'Rapid aerial retardant drop and defensible perimeter containment.'
          };
        }
        return z;
      }));

      const newAlert: AlertItem = {
        id: `alert-fire-${Date.now()}`,
        title: 'EXTREME CANOPY WILDFIRE ADVANCE',
        type: 'wildfire',
        severity: 'CRITICAL',
        description: 'Crown fire expanding northeast rapidly under 38 km/h gusts and 46°C surface heat.',
        zoneId: 'zone-b',
        zoneName: 'Demo Zone B (Ridge Forest Alpha)',
        metricsSummary: [
          { label: 'Temperature', value: '46°C' },
          { label: 'Humidity', value: '12%' },
          { label: 'Wind Gusts', value: '38 km/h NE' },
          { label: 'Confidence', value: '98%' }
        ],
        timestamp: 'Just now',
        detectionConfidence: 98,
        verifiedByDrone: true,
        acknowledged: false
      };
      setAlerts(prev => [newAlert, ...prev]);

      if (notificationsEnabled && alertPreferences.wildfire) {
        setPushNotifications(prev => [
          {
            id: `push-fire-${Date.now()}`,
            title: '🔥 Wildfire Alert',
            message: 'Possible wildfire detected. Check the risk map for details.',
            type: 'wildfire',
            timestamp: 'Just now'
          },
          ...prev
        ]);
      }
    } else {
      // Normal baseline
      resetAllData();
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const resetAllData = () => {
    setMetrics(INITIAL_METRICS);
    setSensors(INITIAL_SENSORS);
    setZones(INITIAL_ZONES);
    setAlerts(INITIAL_ALERTS);
    setResources(INITIAL_RESOURCES);
    setTrendData(INITIAL_TREND_DATA);
    setScenario('normal');
    setLastSimulatedEvent('Reset to Baseline Nominal State');
    setAiRecommendationApproved(false);
  };

  return (
    <DisasterContext.Provider
      value={{
        metrics,
        sensors,
        zones,
        alerts,
        resources,
        scenario,
        activeTab,
        setActiveTab,
        selectedZone,
        setSelectedZone,
        trendData,
        notificationsEnabled,
        setNotificationsEnabled,
        alertPreferences,
        setAlertPreferences,
        pushNotifications,
        dismissNotification,
        acknowledgeAlert,
        simulateScenario,
        aiRecommendationApproved,
        approveRecommendation,
        resetAllData,
        isSimulating,
        lastSimulatedEvent
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error('useDisaster must be used within a DisasterProvider');
  }
  return context;
};
