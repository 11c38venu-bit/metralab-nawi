import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardPage from './pages/DashboardPage';
import InstrumentsListPage from './pages/InstrumentsListPage';
import InstrumentDetailPage from './pages/InstrumentDetailPage';
import RegisterInstrumentPage from './pages/RegisterInstrumentPage';
import NewTestPage from './pages/NewTestPage';
import TestExecutionPage from './pages/TestExecutionPage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import { MOCK_INSTRUMENTS, LAB_INFO } from './data/mockData';
import { INITIAL_REVIEWS } from './data/mockReviews';
import { INITIAL_EVIDENCE } from './data/mockEvidence';
import ReportPreviewPage from './pages/ReportPreviewPage';
import ReportsRepositoryPage from './pages/ReportsRepositoryPage';

export function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [instruments, setInstruments] = useState(MOCK_INSTRUMENTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [evidence, setEvidence] = useState(INITIAL_EVIDENCE);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);

  const handleNavigate = (path, extraState) => {
    if (extraState && extraState.selectedInstrumentId) {
      setSelectedInstrumentId(extraState.selectedInstrumentId);
    }
    setCurrentPath(path);
  };

  const handleAddInstrument = (newInstData) => {
    // Generate new ID e.g., NMTL-INS-00251
    const nextIdNum = 240 + instruments.length + 1;
    const newId = `NMTL-INS-0${nextIdNum}`;

    const newInstrument = {
      id: newId,
      model: newInstData.model,
      name: `${newInstData.manufacturer} ${newInstData.model}`,
      manufacturer: newInstData.manufacturer,
      serialNumber: newInstData.serialNumber,
      accuracyClass: newInstData.accuracyClass,
      accuracyClassCode: newInstData.accuracyClassCode || 'III',
      maxCapacity: newInstData.maxCapacity,
      minCapacity: newInstData.minCapacity,
      scaleInterval_e: newInstData.scaleInterval_e,
      scaleInterval_d: newInstData.scaleInterval_e,
      scaleInterval_n: newInstData.scaleInterval_n || '5000',
      numberOfRanges: newInstData.numberOfRanges || '1',
      instrumentType: newInstData.instrumentType,
      status: 'Active',
      lastTestDate: '28 Sep 2026',
      registrationDate: '28 Sep 2026',
      countryOfManufacture: newInstData.countryOfManufacture || 'India',
      yearOfManufacture: newInstData.yearOfManufacture || '2026',
      loadCellType: newInstData.loadCellType || 'Strain Gauge Load Cell',
      numberOfLoadCells: newInstData.numberOfLoadCells || '4',
      platformSize: newInstData.platformSize || '600 × 600 mm',
      displayType: newInstData.displayType || 'Backlit LCD Display',
      displayResolution: newInstData.displayResolution || newInstData.scaleInterval_e,
      powerSupply: newInstData.powerSupply || '230 V AC',
      frequency: newInstData.frequency || '50 Hz',
      operatingTemperature: newInstData.operatingTemperature || '-10 °C to +40 °C',
      softwareVersion: newInstData.softwareVersion || 'v1.0.0',
      hardwareVersion: newInstData.hardwareVersion || 'HW-01',
      referenceEquipmentId: newInstData.referenceEquipmentId || 'NMTL-WT-017',
      calibrationCertificateNo: newInstData.calibrationCertificateNo || 'CAL-2026-0250',
      calibrationDate: newInstData.calibrationDate || '28 Sep 2026',
      calibrationValidUntil: newInstData.calibrationValidUntil || '27 Sep 2027',
      evidenceFrontDate: '28 Sep 2026',
      evidenceNameplateDate: '28 Sep 2026',
      testSummary: {
        totalEvaluations: 1,
        lastEvaluationDate: '28 Sep 2026',
        previousResult: 'PASS',
        currentEvaluation: 'Active'
      },
      testHistory: [
        {
          testId: `NAWI-2026-00${125 + instruments.length}`,
          testDate: '28 Sep 2026',
          evaluationType: 'Initial Registration & Pattern Verification',
          engineer: LAB_INFO.currentUser.name,
          result: 'PASS',
          reportNo: `NMTL/TR/2026/0${125 + instruments.length}`
        }
      ],
      activities: [
        {
          id: `ACT-INS-NEW-${Date.now()}`,
          time: '11:15',
          date: '28 Sep 2026',
          description: `Instrument ${newInstData.model} registered successfully`,
          category: 'Registry',
          user: LAB_INFO.currentUser.name
        }
      ]
    };

    setInstruments((prev) => [newInstrument, ...prev]);
    return newInstrument;
  };

  const renderContent = () => {
    // Dynamic instrument detail route matching e.g. /instruments/NMTL-INS-00241 or /instruments/PWI-500
    if (currentPath.startsWith('/instruments/')) {
      const subPath = currentPath.replace('/instruments/', '');
      if (subPath === 'new') {
        return (
          <RegisterInstrumentPage 
            onAddInstrument={handleAddInstrument}
            onNavigate={handleNavigate}
          />
        );
      }
      return (
        <InstrumentDetailPage 
          instrumentId={subPath}
          instruments={instruments}
          onNavigate={(path) => {
            if (path === '/test-cases/new') {
              handleNavigate('/test-cases/new', { selectedInstrumentId: subPath });
            } else {
              handleNavigate(path);
            }
          }}
        />
      );
    }

    switch (currentPath) {
      case '/dashboard':
        return <DashboardPage searchQuery={searchQuery} />;
      
      case '/instruments':
        return (
          <InstrumentsListPage 
            instruments={instruments}
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );

      case '/test-cases':
      case '/test-cases/new':
        return (
          <NewTestPage 
            instruments={instruments}
            initialInstrumentId={selectedInstrumentId || 'NMTL-INS-00241'}
            onNavigate={handleNavigate}
          />
        );

      case '/test-cases/in-progress':
        return (
          <TestExecutionPage 
            onNavigate={handleNavigate}
          />
        );

      case '/test-cases/completed':
        return (
          <PlaceholderModule 
            moduleName="Completed Test Records" 
            path="/test-cases/completed"
            onBackToDashboard={() => handleNavigate('/dashboard')} 
          />
        );

      case '/test-cases/history':
        return (
          <PlaceholderModule 
            moduleName="Test Execution History" 
            path="/test-cases/history"
            onBackToDashboard={() => handleNavigate('/dashboard')} 
          />
        );

      case '/reports':
        if (currentPath.startsWith('/reports/preview/')) {
          const evaluationId = currentPath.replace('/reports/preview/', '');
          return (
            <ReportPreviewPage
              evaluationId={evaluationId}
              reviews={reviews}
              evidence={evidence}
              onNavigate={handleNavigate}
            />
          );
        }
        return (
          <ReportsRepositoryPage
            reviews={reviews}
            onNavigate={handleNavigate}
          />
        );

      // Review Detail Page with evaluationId parameter
      if (currentPath.startsWith('/reviews/')) {
        const evaluationId = currentPath.replace('/reviews/', '');
        return (
          <ReviewDetailPage
            evaluationId={evaluationId}
            reviews={INITIAL_REVIEWS}
            onNavigate={handleNavigate}
          />
        );
      }

      // Review Detail Page with evaluationId parameter
      if (currentPath.startsWith('/reviews/')) {
        const evaluationId = currentPath.replace('/reviews/', '');
        return (
          <ReviewDetailPage
            evaluationId={evaluationId}
            reviews={reviews}
            setReviews={setReviews}
            onNavigate={handleNavigate}
          />
        );
      }

      case '/rules':
        return (
          <PlaceholderModule 
            moduleName="Rule Library (OIML R76 / Legal Metrology)" 
            path="/rules"
            onBackToDashboard={() => handleNavigate('/dashboard')} 
          />
        );

      case '/analytics':
        return (
          <PlaceholderModule 
            moduleName="Laboratory Workload Analytics" 
            path="/analytics"
            onBackToDashboard={() => handleNavigate('/dashboard')} 
          />
        );

      case '/audit':
        return (
          <PlaceholderModule 
            moduleName="System Audit Trail & Calibration Log" 
            path="/audit"
            onBackToDashboard={() => handleNavigate('/dashboard')} 
          />
        );

      case '/settings':
        return (
          <PlaceholderModule 
            moduleName="Workstation Settings" 
            path="/settings"
            onBackToDashboard={() => handleNavigate('/dashboard')} 
          />
        );

      default:
        return <DashboardPage searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top bar */}
        <Topbar 
          currentPath={currentPath} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content Viewport */}
        <main className="content-viewport">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
