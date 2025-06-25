import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DailyCheckIn from './components/DailyCheckIn';
import AIChat from './components/AIChat';
import HealthSystems from './components/HealthSystems';
import Reports from './components/Reports';
import MedicalImaging from './components/MedicalImaging';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'checkin':
        return <DailyCheckIn />;
      case 'chat':
        return <AIChat />;
      case 'systems':
        return <HealthSystems />;
      case 'reports':
        return <Reports />;
      case 'imaging':
        return <MedicalImaging />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      
      <main className="pb-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;