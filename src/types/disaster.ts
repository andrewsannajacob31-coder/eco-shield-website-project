export type HazardType = 'flood' | 'landslide' | 'wildfire' | 'environment' | 'weather';

export type RiskLevel = 'SAFE' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'RESOLVED';

export type SensorType = 
  | 'water_level'
  | 'soil_moisture'
  | 'temperature'
  | 'humidity'
  | 'smoke'
  | 'rainfall'
  | 'air_quality'
  | 'seismic';

export interface SensorData {
  id: string;
  name: string;
  type: SensorType;
  location: string;
  currentValue: number;
  unit: string;
  status: 'ONLINE' | 'OFFLINE';
  lastUpdated: string;
  batteryPercent: number;
  signalQuality: number; // 0 - 100
  x: number; // 0-100 percentage for GIS map projection
  y: number; // 0-100 percentage for GIS map projection
  history: number[];
  warningThreshold?: number;
  criticalThreshold?: number;
}

export interface ZoneRisk {
  id: string;
  name: string;
  code: string;
  hazardType: HazardType;
  riskLevel: RiskLevel;
  probability: number; // 0 - 100
  x: number; // center coordinate on map (0-100)
  y: number; // center coordinate on map (0-100)
  radius: number;
  lastUpdated: string;
  recommendedAction: string;
  areaDesc: string;
  populationAtRisk: number;
  keySensors: string[];
}

export interface AlertItem {
  id: string;
  title: string;
  type: HazardType;
  severity: AlertSeverity;
  description: string;
  zoneId: string;
  zoneName: string;
  metricsSummary: {
    label: string;
    value: string;
  }[];
  timestamp: string;
  detectionConfidence?: number;
  verifiedByDrone: boolean;
  acknowledged: boolean;
}

export interface EmergencyResource {
  id: string;
  name: string;
  type: 'ambulance' | 'fire_truck' | 'rescue_boat' | 'drone' | 'response_team' | 'shelter';
  status: 'available' | 'deployed' | 'standby';
  locationName: string;
  x: number; // map coordinate
  y: number; // map coordinate
  capacityOrCrew: string;
  contact: string;
  batteryOrFuel?: number;
}

export interface EmergencyFacility {
  id: string;
  name: string;
  type: 'hospital' | 'shelter' | 'fire_station' | 'police' | 'rescue_center';
  address: string;
  phone: string;
  capacity: string;
  occupancyRate?: number; // 0-100
  distanceKm: number;
  status: 'OPERATIONAL' | 'FULL' | 'STANDBY';
  suppliesStatus: 'Adequate' | 'Critical' | 'Surplus';
  coordinates: { lat: number; lng: number };
}

export interface DisasterMetrics {
  flood: {
    waterLevel: number; // meters
    rainfall: number; // mm/hr
    floodProbability: number; // percent
    reservoirLevel: number; // percent
    flowRate: number; // m3/s
    status: RiskLevel;
  };
  landslide: {
    soilMoisture: number; // percent
    rainfallIntensity: 'Low' | 'Moderate' | 'High' | 'Extreme';
    slopeRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
    riskScore: number; // percent
    groundDisplacement: number; // mm/hr
    seismicActivity: number; // ML Richter
    slopeAngle: number; // degrees
    status: RiskLevel;
  };
  wildfire: {
    temperature: number; // °C
    humidity: number; // percent
    smoke: 'Normal' | 'Trace' | 'Detected' | 'Heavy';
    fireProbability: number; // percent
    windSpeed: number; // km/h
    windDirection: string;
    spreadDirection: string;
    detectionConfidence: number; // percent
    status: RiskLevel;
  };
  environment: {
    temperature: number;
    humidity: number;
    airQuality: number; // AQI
    airQualityStatus: string;
    soilMoisture: number;
    co2Ppm: number;
    uvIndex: number;
  };
  weather: {
    rainfall: number;
    windSpeed: number;
    temperature: number;
    barometricHpa: number;
    forecast: string;
  };
}

export type ScenarioType = 'normal' | 'flood' | 'landslide' | 'wildfire';

export type NavigationTab = 
  | 'home'
  | 'map'
  | 'alerts'
  | 'ai'
  | 'sensors'
  | 'wildfire'
  | 'flood'
  | 'landslide'
  | 'resources'
  | 'emergency'
  | 'profile';
