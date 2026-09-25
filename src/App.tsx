/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DisasterProvider, useDisaster } from './context/DisasterContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { NotificationToastStack } from './components/common/NotificationToast';
import { SimulateDisasterModal } from './components/simulation/SimulateDisasterModal';
import { ZoneDetailModal } from './components/map/ZoneDetailModal';

// Pages
import { WelcomeScreen } from './pages/WelcomeScreen';
import { DashboardPage } from './pages/DashboardPage';
import { RiskMapPage } from './pages/RiskMapPage';
import { AlertCenterPage } from './pages/AlertCenterPage';
import { AIPredictionPage } from './pages/AIPredictionPage';
import { SensorNetworkPage } from './pages/SensorNetworkPage';
import { WildfireMonitoringPage } from './pages/WildfireMonitoringPage';
import { FloodMonitoringPage } from './pages/FloodMonitoringPage';
import { LandslideMonitoringPage } from './pages/LandslideMonitoringPage';
import { EmergencyResourcesPage } from './pages/EmergencyResourcesPage';
import { EmergencyInfoPage } from './pages/EmergencyInfoPage';
import { UserProfilePage } from './pages/UserProfilePage';

const AppContent: React.FC = () => {
  const { activeTab, selectedZone, setSelectedZone } = useDisaster();
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If user has not entered app yet, show Welcome / Login screen (Brief Section 1)
  if (!hasEnteredApp) {
    return (
      <WelcomeScreen
        onEnter={() => setHasEnteredApp(true)}
        onEnterDemo={() => setHasEnteredApp(true)}
      />
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardPage />;
      case 'map':
        return <RiskMapPage />;
      case 'alerts':
        return <AlertCenterPage />;
      case 'ai':
        return <AIPredictionPage />;
      case 'sensors':
        return <SensorNetworkPage />;
      case 'wildfire':
        return <WildfireMonitoringPage />;
      case 'flood':
        return <FloodMonitoringPage />;
      case 'landslide':
        return <LandslideMonitoringPage />;
      case 'resources':
        return <EmergencyResourcesPage />;
      case 'emergency':
        return <EmergencyInfoPage />;
      case 'profile':
        return <UserProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navbar Contract */}
      <Navbar
        onOpenSimulate={() => setIsSimulateModalOpen(true)}
        onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Main Workspace Canvas: Sidebar + Viewport */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onOpenSimulate={() => setIsSimulateModalOpen(true)}
        />

        {/* Primary Viewport Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Brief Section 15) */}
      <BottomNav />

      {/* Push Notification Toast Stack (Brief Section 12) */}
      <NotificationToastStack />

      {/* Interactive Zone Detail Inspector Modal (Brief Section 4) */}
      <ZoneDetailModal
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
      />

      {/* Simulate Disaster Modal (Brief Section 18) */}
      <SimulateDisasterModal
        isOpen={isSimulateModalOpen}
        onClose={() => setIsSimulateModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <DisasterProvider>
      <AppContent />
    </DisasterProvider>
  );
}
