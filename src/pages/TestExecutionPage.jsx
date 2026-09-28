import React, { useState, useMemo } from 'react';
import SectionHeader from '../components/SectionHeader';
import StatusBadge from '../components/StatusBadge';
import { MOCK_RULES, RULE_SET_INFO } from '../data/mockRules';
import { 
  evaluateTestCalculations, 
  evaluateOverallStatus, 
  formatSignedVal,
  calculateError,
  calculateNet,
  calculateChange
} from '../utils/calculationEngine';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ArrowRight, 
  AlertTriangle, 
  Clock, 
  Scale, 
  Thermometer, 
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Calculator,
  FileText,
  Info,
  ShieldAlert
} from 'lucide-react';
import { LAB_INFO } from '../data/mockData';

export const TestExecutionPage = ({ onNavigate }) => {
  // Evaluation Context Info
  const evalInfo = {
    testId: 'NAWI-2026-00131',
    model: 'PWI-500',
    manufacturer: 'Precision Weighing Instruments Pvt. Ltd.',
    serialNumber: 'PWI500-26-01842',
    accuracyClass: 'III',
    maxCapacity: '500 kg',
    minCapacity: '20 kg',
    scaleInterval_e: '0.1 kg',
    engineer: LAB_INFO.currentUser.name,
    reviewer: 'Dr. Rajesh Kumar',
    temperature: '23.4 °C',
    humidity: '48 %RH',
    pressure: '1012 hPa',
    referenceEquipment: 'NMTL-WT-017',
    certNo: 'CAL-2026-0178',
    startTime: '28 Sep 2026 — 10:32',
    lastSavedTime: '28 Sep 2026 — 10:48'
  };

  // 7 Configured Tests Initial State
  const initialTests = [
    { id: 'T1', name: 'Weighing Performance', reference: 'OIML R 76', status: 'Completed' },
    { id: 'T2', name: 'Repeatability', reference: 'OIML R 76', status: 'In Progress' },
    { id: 'T3', name: 'Eccentricity', reference: 'OIML R 76', status: 'Pending' },
    { id: 'T4', name: 'Zero Setting', reference: 'OIML R 76', status: 'Pending' },
    { id: 'T5', name: 'Tare', reference: 'OIML R 76', status: 'Pending' },
    { id: 'T6', name: 'Creep', reference: 'OIML R 76', status: 'Pending' },
    { id: 'T7', name: 'Warm-up / Stabilization', reference: 'OIML R 76', status: 'Pending' }
  ];

  const [tests, setTests] = useState(initialTests);
  const [activeTestId, setActiveTestId] = useState('T2'); // Default to Repeatability

  // Banner Notification State
  const [toastMessage, setToastMessage] = useState(null);
  const [validationErrorSummary, setValidationErrorSummary] = useState(null);

  // Expandable Traceability Panel State
  const [showTraceability, setShowTraceability] = useState(false);

  // Observation State per Test
  const [observations, setObservations] = useState({
    // A. Weighing Performance
    T1: [
      { id: 1, load: '20.0', reference: '20.0', indication: '20.0', remarks: 'Min load test' },
      { id: 2, load: '100.0', reference: '100.0', indication: '100.0', remarks: 'Mid load test' },
      { id: 3, load: '250.0', reference: '250.0', indication: '250.1', remarks: '50% Max load test' },
      { id: 4, load: '500.0', reference: '500.0', indication: '500.0', remarks: 'Max load test' }
    ],

    // B. Repeatability
    T2: [
      { id: 1, obsNo: 1, load: '100.0', indication: '100.0', reference: '100.0', remarks: 'Run 1' },
      { id: 2, obsNo: 2, load: '100.0', indication: '100.1', reference: '100.0', remarks: 'Run 2 (+0.1 e drift)' },
      { id: 3, obsNo: 3, load: '100.0', indication: '100.0', reference: '100.0', remarks: 'Run 3' },
      { id: 4, obsNo: 4, load: '100.0', indication: '99.9', reference: '100.0', remarks: 'Run 4 (-0.1 e drift)' },
      { id: 5, obsNo: 5, load: '100.0', indication: '100.0', reference: '100.0', remarks: 'Run 5' }
    ],

    // C. Eccentricity
    T3: [
      { id: 1, position: 'Center', load: '160.0', indication: '160.0', reference: '160.0', remarks: 'Center position' },
      { id: 2, position: 'Front Left', load: '160.0', indication: '160.1', reference: '160.0', remarks: 'Corner 1' },
      { id: 3, position: 'Front Right', load: '160.0', indication: '160.0', reference: '160.0', remarks: 'Corner 2' },
      { id: 4, position: 'Rear Left', load: '160.0', indication: '159.9', reference: '160.0', remarks: 'Corner 3' },
      { id: 5, position: 'Rear Right', load: '160.0', indication: '160.0', reference: '160.0', remarks: 'Corner 4' }
    ],

    // D. Zero Setting
    T4: [
      { id: 1, obsNo: 1, initialIndication: '0.0', zeroIndication: '0.0', remarks: 'Zero button pressed' },
      { id: 2, obsNo: 2, initialIndication: '0.1', zeroIndication: '0.0', remarks: 'Zero return test' },
      { id: 3, obsNo: 3, initialIndication: '0.0', zeroIndication: '0.0', remarks: 'Automatic zero tracking' }
    ],

    // E. Tare
    T5: [
      { id: 1, obsNo: 1, grossLoad: '150.0', tareValue: '50.0', reference: '100.0', remarks: 'Container tare test' },
      { id: 2, obsNo: 2, grossLoad: '250.0', tareValue: '100.0', reference: '150.0', remarks: 'Preset tare test' },
      { id: 3, obsNo: 3, grossLoad: '400.0', tareValue: '200.0', reference: '200.0', remarks: 'Max tare test' }
    ],

    // F. Creep
    T6: [
      { id: 1, load: '500.0', startIndication: '500.0', endIndication: '500.1', elapsedTime: '30', remarks: '30 min sustained load test' }
    ],

    // G. Warm-up / Stabilization
    T7: [
      { id: 1, time: 'Initial', temperature: '23.4', indication: '100.0', observation: 'Power ON', remarks: 'Cold start' },
      { id: 2, time: '15 min', temperature: '23.5', indication: '100.0', observation: 'Stabilizing', remarks: '15 min elapsed' },
      { id: 3, time: '30 min', temperature: '23.5', indication: '100.0', observation: 'Thermal Equilibrium', remarks: '30 min elapsed' },
      { id: 4, time: '45 min', temperature: '23.6', indication: '100.0', observation: 'Stable', remarks: '45 min elapsed' },
      { id: 5, time: '60 min', temperature: '23.6', indication: '100.0', observation: 'Full Warm-up', remarks: '60 min elapsed' }
    ]
  });

  // Remarks State per Test
  const [remarksState, setRemarksState] = useState({
    T1: 'Linearly within tolerance limits.',
    T2: 'Instrument stabilized before repeated observations.',
    T3: 'Load shifted across 4 corners at 1/3 Max.',
    T4: 'Zero setting device returns within 0.25 e limit.',
    T5: 'Tare subtraction operates correctly.',
    T6: '30 min creep test within allowable change.',
    T7: 'Warm-up period verified at 30 minutes.'
  });

  // DYNAMIC CALCULATION ENGINE EVALUATION FOR ALL 7 TESTS
  const evalResultsMap = useMemo(() => {
    const map = {};
    tests.forEach((t) => {
      const rows = observations[t.id] || [];
      const rule = MOCK_RULES[t.id] || {};
      map[t.id] = evaluateTestCalculations(t.id, rows, evalInfo, rule);
    });
    return map;
  }, [tests, observations]);

  // DYNAMIC OVERALL EVALUATION STATUS
  const overallSummary = useMemo(() => {
    return evaluateOverallStatus(tests, evalResultsMap);
  }, [tests, evalResultsMap]);

  const activeTest = tests.find((t) => t.id === activeTestId) || tests[0];
  const activeRows = observations[activeTestId] || [];
  const activeEvalResult = evalResultsMap[activeTestId] || {};
  const activeRule = MOCK_RULES[activeTestId] || {};

  // Handle Input Changes for active test rows
  const handleInputChange = (rowId, field, value) => {
    setValidationErrorSummary(null);
    setObservations((prev) => ({
      ...prev,
      [activeTestId]: prev[activeTestId].map((row) => 
        row.id === rowId ? { ...row, [field]: value } : row
      )
    }));
  };

  // Add Observation Row
  const handleAddRow = () => {
    setValidationErrorSummary(null);
    setObservations((prev) => {
      const currentRows = prev[activeTestId] || [];
      let newRow = {};

      if (activeTestId === 'T1') {
        newRow = { id: Date.now(), load: '', reference: '', indication: '', remarks: '' };
      } else if (activeTestId === 'T2') {
        newRow = { id: Date.now(), obsNo: currentRows.length + 1, load: '100.0', indication: '', reference: '100.0', remarks: '' };
      } else if (activeTestId === 'T3') {
        newRow = { id: Date.now(), position: `Custom Pos ${currentRows.length + 1}`, load: '160.0', indication: '', reference: '160.0', remarks: '' };
      } else if (activeTestId === 'T4') {
        newRow = { id: Date.now(), obsNo: currentRows.length + 1, initialIndication: '0.0', zeroIndication: '', remarks: '' };
      } else if (activeTestId === 'T5') {
        newRow = { id: Date.now(), obsNo: currentRows.length + 1, grossLoad: '', tareValue: '', reference: '', remarks: '' };
      } else if (activeTestId === 'T6') {
        newRow = { id: Date.now(), load: '500.0', startIndication: '500.0', endIndication: '', elapsedTime: '30', remarks: '' };
      } else if (activeTestId === 'T7') {
        newRow = { id: Date.now(), time: '75 min', temperature: '23.6', indication: '', observation: 'Extended test', remarks: '' };
      }

      return {
        ...prev,
        [activeTestId]: [...currentRows, newRow]
      };
    });
  };

  // Remove Observation Row
  const handleRemoveRow = (rowId) => {
    setValidationErrorSummary(null);
    setObservations((prev) => ({
      ...prev,
      [activeTestId]: prev[activeTestId].filter((r) => r.id !== rowId)
    }));
  };

  // Save Current Test
  const handleSaveTest = () => {
    setToastMessage('Test observations saved');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Mark Test Complete with Input Validation
  const handleMarkComplete = () => {
    setValidationErrorSummary(null);
    const missingFields = [];

    activeRows.forEach((row, index) => {
      const rowNum = index + 1;
      if (activeTestId === 'T1' || activeTestId === 'T2' || activeTestId === 'T3') {
        if (!row.load || !row.load.trim()) missingFields.push(`Row ${rowNum}: Load is required`);
        if (!row.indication || !row.indication.trim()) missingFields.push(`Row ${rowNum}: Indication is required`);
        if (!row.reference || !row.reference.trim()) missingFields.push(`Row ${rowNum}: Reference value is required`);
        if (isNaN(parseFloat(row.indication))) missingFields.push(`Row ${rowNum}: Indication must be numeric`);
      } else if (activeTestId === 'T4') {
        if (!row.zeroIndication || !row.zeroIndication.trim()) missingFields.push(`Row ${rowNum}: Zero Indication is required`);
      } else if (activeTestId === 'T5') {
        if (!row.grossLoad || !row.grossLoad.trim()) missingFields.push(`Row ${rowNum}: Gross Load is required`);
        if (!row.tareValue || !row.tareValue.trim()) missingFields.push(`Row ${rowNum}: Tare Value is required`);
      } else if (activeTestId === 'T6') {
        if (!row.endIndication || !row.endIndication.trim()) missingFields.push(`End Indication is required`);
      } else if (activeTestId === 'T7') {
        if (!row.indication || !row.indication.trim()) missingFields.push(`Row ${rowNum}: Indication is required`);
      }
    });

    if (missingFields.length > 0) {
      setValidationErrorSummary(missingFields);
      return;
    }

    // Update status to Completed
    setTests((prev) => 
      prev.map((t) => t.id === activeTestId ? { ...t, status: 'Completed' } : t)
    );

    setToastMessage('Test completed — Awaiting Evaluation');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Select Next Test
  const handleNextTest = () => {
    const currentIndex = tests.findIndex((t) => t.id === activeTestId);
    if (currentIndex < tests.length - 1) {
      const nextId = tests[currentIndex + 1].id;
      setActiveTestId(nextId);
      setTests((prev) =>
        prev.map((t) => t.id === nextId && t.status === 'Pending' ? { ...t, status: 'In Progress' } : t)
      );
    }
  };

  return (
    <div className="test-execution-page">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-success-banner">
          <span>✓ {toastMessage}</span>
          <button className="btn-text" onClick={() => setToastMessage(null)}>Dismiss</button>
        </div>
      )}

      {/* TOP HEADER BAR */}
      <div className="technical-card" style={{ marginBottom: '16px', padding: '14px 18px', borderLeft: '4px solid #1e3a8a' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a8a' }}>
                {evalInfo.testId}
              </h1>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{evalInfo.model}</span>
              <StatusBadge status="Testing In Progress" />
            </div>
            <div style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
              {evalInfo.manufacturer} — Serial: <span className="font-mono" style={{ fontWeight: 600 }}>{evalInfo.serialNumber}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-secondary" onClick={handleSaveTest}>
              <Save size={13} />
              Save Draft
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('/dashboard')}>
              <ArrowLeft size={13} />
              Exit Test
            </button>
          </div>
        </div>
      </div>

      {/* OVERALL EVALUATION STATUS COMPACT PANEL */}
      <div className="technical-card" style={{ marginBottom: '16px', padding: '12px 18px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
          Overall Evaluation Status — <span className="font-mono">{RULE_SET_INFO.version}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="history-summary-bar" style={{ margin: 0, border: 'none', background: 'transparent', padding: 0 }}>
            <div className="history-summary-item">
              <span className="history-summary-label">Tests Completed:</span>
              <span className="history-summary-value font-mono">{overallSummary.completedCount} / {overallSummary.totalTests}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Passed:</span>
              <span className="history-summary-value font-mono" style={{ color: '#166534' }}>{overallSummary.passedCount}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Failed:</span>
              <span className="history-summary-value font-mono" style={{ color: '#991b1b' }}>{overallSummary.failedCount}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Requiring Review:</span>
              <span className="history-summary-value font-mono" style={{ color: '#92400e' }}>{overallSummary.reviewCount}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155', textTransform: 'uppercase' }}>Overall Status:</span>
            <StatusBadge status={overallSummary.overallStatus} />
          </div>
        </div>
      </div>

      {/* THREE-PANEL TECHNICAL WORKSTATION GRID */}
      <div className="execution-workstation-grid">
        
        {/* 1. LEFT PANEL: TEST PLAN NAVIGATION */}
        <div className="execution-panel">
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>
            Test Plan
          </h3>

          <div>
            {tests.map((t, idx) => {
              const isActive = t.id === activeTestId;
              const res = evalResultsMap[t.id];
              let icon = '○';
              let iconColor = '#64748b';

              if (t.status === 'Completed') {
                icon = '✓';
                iconColor = '#15803d';
              } else if (t.status === 'In Progress') {
                icon = '●';
                iconColor = '#2563eb';
              }

              return (
                <div 
                  key={t.id}
                  className={`test-plan-nav-item ${isActive ? 'active' : ''} ${t.status === 'Completed' ? 'completed' : ''}`}
                  onClick={() => {
                    setActiveTestId(t.id);
                    setValidationErrorSummary(null);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="nav-status-icon" style={{ color: iconColor }}>{icon}</span>
                    <span style={{ fontSize: '11px' }}>{idx + 1}. {t.name}</span>
                  </div>
                  {res && res.result && (
                    <StatusBadge status={res.result} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. CENTER PANEL: MAIN OBSERVATION & CALCULATION SHEET */}
        <div className="execution-panel">
          {/* Active Test Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Test ID: <span className="font-mono" style={{ color: '#1e3a8a' }}>{evalInfo.testId}</span> | Technical Reference: <span className="font-mono" style={{ fontWeight: 700, color: '#0f172a' }}>{activeTest.reference}</span>
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{activeTest.name}</h2>
            </div>
            <StatusBadge status={activeEvalResult.result || activeTest.status} />
          </div>

          {/* Test Purpose Info Block */}
          <div className="info-note-box" style={{ padding: '8px 12px', marginBottom: '14px', fontSize: '12px' }}>
            <strong>Test Purpose:</strong> Record repeated weighing observations for the selected test configuration.
          </div>

          {/* Inline Validation Warning Banner if incomplete */}
          {validationErrorSummary && (
            <div className="validation-summary-box" style={{ padding: '10px 14px', marginBottom: '14px' }}>
              <div className="validation-summary-title" style={{ fontSize: '12px' }}>
                <AlertTriangle size={14} />
                <span>Test cannot be completed</span>
              </div>
              <ul className="validation-summary-list" style={{ fontSize: '11px' }}>
                {validationErrorSummary.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* DYNAMIC OBSERVATION TABLE TEMPLATES */}
          <div style={{ marginBottom: '14px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', marginBottom: '8px' }}>
              Observations
            </h4>

            {/* TEMPLATE A: Weighing Performance */}
            {activeTestId === 'T1' && (
              <table className="obs-table">
                <thead>
                  <tr>
                    <th>Load (kg)</th>
                    <th>Reference Value (kg)</th>
                    <th>Indication (kg)</th>
                    <th>Error (kg)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.load}
                            onChange={(e) => handleInputChange(row.id, 'load', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.reference}
                            onChange={(e) => handleInputChange(row.id, 'reference', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.indication}
                            onChange={(e) => handleInputChange(row.id, 'indication', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td className="font-mono" style={{ fontWeight: 700, color: '#1e3a8a', backgroundColor: '#f8fafc' }}>
                        {formatSignedVal(calculateError(row.indication, row.reference), 'kg')}
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="obs-input"
                          value={row.remarks}
                          onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* TEMPLATE B: Repeatability */}
            {activeTestId === 'T2' && (
              <table className="obs-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>Obs #</th>
                    <th>Load (kg)</th>
                    <th>Indication (kg)</th>
                    <th>Reference Value (kg)</th>
                    <th>Error (kg)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="font-mono" style={{ textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.load}
                            onChange={(e) => handleInputChange(row.id, 'load', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.indication}
                            onChange={(e) => handleInputChange(row.id, 'indication', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.reference}
                            onChange={(e) => handleInputChange(row.id, 'reference', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td className="font-mono" style={{ fontWeight: 700, color: '#1e3a8a', backgroundColor: '#f8fafc' }}>
                        {formatSignedVal(calculateError(row.indication, row.reference), 'kg')}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input 
                            type="text" 
                            className="obs-input"
                            value={row.remarks}
                            onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                          />
                          {activeRows.length > 3 && (
                            <button className="btn-text" style={{ color: '#dc2626', padding: '0 4px' }} onClick={() => handleRemoveRow(row.id)}>
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* TEMPLATE C: Eccentricity */}
            {activeTestId === 'T3' && (
              <table className="obs-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Test Load (kg)</th>
                    <th>Indication (kg)</th>
                    <th>Reference Value (kg)</th>
                    <th>Error (kg)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600 }}>{row.position}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.load}
                            onChange={(e) => handleInputChange(row.id, 'load', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.indication}
                            onChange={(e) => handleInputChange(row.id, 'indication', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.reference}
                            onChange={(e) => handleInputChange(row.id, 'reference', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td className="font-mono" style={{ fontWeight: 700, color: '#1e3a8a', backgroundColor: '#f8fafc' }}>
                        {formatSignedVal(calculateError(row.indication, row.reference), 'kg')}
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="obs-input"
                          value={row.remarks}
                          onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* TEMPLATE D: Zero Setting */}
            {activeTestId === 'T4' && (
              <table className="obs-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>Obs #</th>
                    <th>Initial Indication (kg)</th>
                    <th>Zero Indication (kg)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="font-mono" style={{ textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.initialIndication}
                            onChange={(e) => handleInputChange(row.id, 'initialIndication', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.zeroIndication}
                            onChange={(e) => handleInputChange(row.id, 'zeroIndication', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="obs-input"
                          value={row.remarks}
                          onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* TEMPLATE E: Tare */}
            {activeTestId === 'T5' && (
              <table className="obs-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>Obs #</th>
                    <th>Gross Load (kg)</th>
                    <th>Tare Value (kg)</th>
                    <th>Net Indication (kg)</th>
                    <th>Reference Value (kg)</th>
                    <th>Error (kg)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map((row, idx) => {
                    const net = calculateNet(row.grossLoad, row.tareValue);
                    const netErr = net !== null ? calculateError(net, row.reference) : null;
                    return (
                      <tr key={row.id}>
                        <td className="font-mono" style={{ textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="obs-input font-mono"
                              value={row.grossLoad}
                              onChange={(e) => handleInputChange(row.id, 'grossLoad', e.target.value)}
                            />
                            <span className="obs-unit-label">kg</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="obs-input font-mono"
                              value={row.tareValue}
                              onChange={(e) => handleInputChange(row.id, 'tareValue', e.target.value)}
                            />
                            <span className="obs-unit-label">kg</span>
                          </div>
                        </td>
                        <td className="font-mono" style={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>
                          {net !== null ? `${net.toFixed(1)} kg` : '—'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="obs-input font-mono"
                              value={row.reference}
                              onChange={(e) => handleInputChange(row.id, 'reference', e.target.value)}
                            />
                            <span className="obs-unit-label">kg</span>
                          </div>
                        </td>
                        <td className="font-mono" style={{ fontWeight: 700, color: '#1e3a8a', backgroundColor: '#f8fafc' }}>
                          {formatSignedVal(netErr, 'kg')}
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="obs-input"
                            value={row.remarks}
                            onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* TEMPLATE F: Creep */}
            {activeTestId === 'T6' && (
              <table className="obs-table">
                <thead>
                  <tr>
                    <th>Test Load (kg)</th>
                    <th>Start Indication (kg)</th>
                    <th>End Indication (kg)</th>
                    <th>Elapsed Time (min)</th>
                    <th>Change (kg)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map((row) => {
                    const change = calculateChange(row.startIndication, row.endIndication);
                    return (
                      <tr key={row.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="obs-input font-mono"
                              value={row.load}
                              onChange={(e) => handleInputChange(row.id, 'load', e.target.value)}
                            />
                            <span className="obs-unit-label">kg</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="obs-input font-mono"
                              value={row.startIndication}
                              onChange={(e) => handleInputChange(row.id, 'startIndication', e.target.value)}
                            />
                            <span className="obs-unit-label">kg</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="obs-input font-mono"
                              value={row.endIndication}
                              onChange={(e) => handleInputChange(row.id, 'endIndication', e.target.value)}
                            />
                            <span className="obs-unit-label">kg</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="obs-input font-mono"
                              value={row.elapsedTime}
                              onChange={(e) => handleInputChange(row.id, 'elapsedTime', e.target.value)}
                            />
                            <span className="obs-unit-label">min</span>
                          </div>
                        </td>
                        <td className="font-mono" style={{ fontWeight: 700, color: '#1e3a8a', backgroundColor: '#f8fafc' }}>
                          {formatSignedVal(change, 'kg')}
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="obs-input"
                            value={row.remarks}
                            onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* TEMPLATE G: Warm-up / Stabilization */}
            {activeTestId === 'T7' && (
              <table className="obs-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Temperature (°C)</th>
                    <th>Indication (kg)</th>
                    <th>Observation</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map((row) => (
                    <tr key={row.id}>
                      <td className="font-mono" style={{ fontWeight: 600 }}>{row.time}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.temperature}
                            onChange={(e) => handleInputChange(row.id, 'temperature', e.target.value)}
                          />
                          <span className="obs-unit-label">°C</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            className="obs-input font-mono"
                            value={row.indication}
                            onChange={(e) => handleInputChange(row.id, 'indication', e.target.value)}
                          />
                          <span className="obs-unit-label">kg</span>
                        </div>
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="obs-input"
                          value={row.observation}
                          onChange={(e) => handleInputChange(row.id, 'observation', e.target.value)}
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="obs-input"
                          value={row.remarks}
                          onChange={(e) => handleInputChange(row.id, 'remarks', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Add Observation Button */}
          <div style={{ marginBottom: '16px' }}>
            <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={handleAddRow}>
              <Plus size={12} />
              Add Observation
            </button>
          </div>

          {/* 10. PROTOTYPE INFORMATION BANNER */}
          <div className="info-note-box" style={{ marginBottom: '16px', backgroundColor: '#fffbeb', borderColor: '#fde68a', borderLeft: '4px solid #d97706' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <ShieldAlert size={16} className="text-amber-600" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#92400e' }}>Prototype Rule Configuration — {RULE_SET_INFO.version}</strong>
                <p style={{ marginTop: '2px', fontSize: '11px', color: '#78350f' }}>
                  {RULE_SET_INFO.disclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* 15. CALCULATION SUMMARY PANEL */}
          <div className="technical-card" style={{ marginBottom: '16px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Calculator size={16} className="text-blue-700" />
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', margin: 0 }}>
                Calculation Summary
              </h4>
            </div>

            {activeEvalResult.calculatedMetrics && (
              <div className="kv-grid-3" style={{ marginBottom: '10px' }}>
                {Object.entries(activeEvalResult.calculatedMetrics).map(([key, val]) => {
                  if (key === 'keyResultText') return null;
                  const labelFormatted = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div className="kv-item" key={key}>
                      <span className="kv-label">{labelFormatted}</span>
                      <span className="kv-value font-mono" style={{ fontWeight: 700 }}>
                        {typeof val === 'number' ? formatSignedVal(val, activeEvalResult.unit || 'kg') : String(val)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. REFINED ACCEPTANCE CRITERION PANEL */}
          <div className="technical-card" style={{ marginBottom: '16px', borderLeft: '4px solid #1e3a8a' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', marginBottom: '12px' }}>
              Acceptance Criterion & Compliance
            </h4>

            <div className="kv-grid-3" style={{ marginBottom: '12px' }}>
              <div className="kv-item">
                <span className="kv-label">Technical Reference</span>
                <span className="kv-value font-mono" style={{ fontWeight: 700, color: '#0f172a' }}>
                  {activeRule.reference || 'OIML R 76'}
                </span>
              </div>

              <div className="kv-item">
                <span className="kv-label">Rule Set</span>
                <span className="kv-value font-mono" style={{ color: '#1e3a8a', fontWeight: 600 }}>
                  {activeRule.ruleVersion || RULE_SET_INFO.version}
                </span>
              </div>

              <div className="kv-item">
                <span className="kv-label">Criterion Type</span>
                <span className="kv-value font-mono" style={{ fontWeight: 600, color: '#d97706' }}>
                  {activeRule.criterionSource || 'Demonstration Criterion'}
                </span>
              </div>

              <div className="kv-item">
                <span className="kv-label">Configured Criterion</span>
                <span className="kv-value font-mono" style={{ fontWeight: 600 }}>
                  {activeRule.criterion || 'Criterion not configured'}
                </span>
              </div>

              <div className="kv-item" style={{ gridColumn: 'span 2' }}>
                <span className="kv-label">Verification Status</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '2px', border: '1px solid #fde68a', display: 'inline-block' }}>
                  Not verified as an official OIML acceptance limit
                </span>
              </div>
            </div>

            {/* Subtle Technical Warning Note */}
            <div style={{ fontSize: '11px', color: '#475569', backgroundColor: '#f8fafc', padding: '8px 12px', borderLeft: '3px solid #cbd5e1', marginBottom: '12px', fontStyle: 'italic' }}>
              <strong>Note:</strong> Prototype demonstration criterion. This value is provided for software demonstration and has not been represented as an official OIML R 76 acceptance limit.
            </div>

            {/* Result Box */}
            <div style={{ backgroundColor: '#f1f5f9', padding: '10px 14px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Evaluation Result</div>
                <div style={{ fontSize: '12px', color: '#334155', marginTop: '2px', fontWeight: 500 }}>
                  {activeRule.criterionType === 'prototype_demonstration' ? (
                    <span style={{ color: '#1e3a8a', fontWeight: 600 }}>
                      Based on configured demonstration criterion.
                    </span>
                  ) : (
                    <span>A compliance determination cannot be made because the applicable criterion is not configured.</span>
                  )}
                </div>
              </div>
              <StatusBadge status={activeEvalResult.result || 'REVIEW'} />
            </div>
          </div>

          {/* 8. CALCULATION TRACEABILITY PANEL (Expandable) */}
          <div className="technical-card" style={{ marginBottom: '16px', padding: '12px 16px' }}>
            <div 
              onClick={() => setShowTraceability(!showTraceability)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={15} className="text-slate-600" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase' }}>
                  Calculation Details & Traceability
                </span>
              </div>
              {showTraceability ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>

            {showTraceability && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                <div className="kv-grid-4" style={{ marginBottom: '12px', fontSize: '11px', backgroundColor: '#f8fafc', padding: '8px', border: '1px solid #cbd5e1' }}>
                  <div><span className="kv-label">Technical Reference</span>: <strong className="font-mono">{activeRule.reference || 'OIML R 76'}</strong></div>
                  <div><span className="kv-label">Rule Set</span>: <strong className="font-mono">{RULE_SET_INFO.version}</strong></div>
                  <div><span className="kv-label">Criterion Type</span>: <strong>{activeRule.criterionSource || 'Demonstration Criterion'}</strong></div>
                  <div><span className="kv-label">Verification</span>: <span style={{ color: '#b45309' }}>Not verified as official OIML limit</span></div>
                </div>

                {(activeEvalResult.formulaTraceability || []).map((step, sIdx) => (
                  <div key={sIdx} style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '4px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e3a8a', marginBottom: '4px' }}>
                      {step.label}
                    </div>
                    <div className="kv-grid-2" style={{ fontSize: '11px' }}>
                      <div><span style={{ color: '#64748b' }}>Input:</span> <span className="font-mono">{step.input}</span></div>
                      <div><span style={{ color: '#64748b' }}>Formula:</span> <span className="font-mono">{step.formula}</span></div>
                      <div><span style={{ color: '#64748b' }}>Calculation:</span> <span className="font-mono">{step.calculation}</span></div>
                      <div><span style={{ color: '#64748b' }}>Result:</span> <span className="font-mono" style={{ fontWeight: 700, color: '#15803d' }}>{step.result}</span></div>
                    </div>
                  </div>
                ))}

                <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--font-mono)', marginTop: '8px', display: 'flex', gap: '16px' }}>
                  <span>Calculated: 28 Sep 2026 — 10:52</span>
                  <span>Engineer: {evalInfo.engineer}</span>
                  <span>Rule Set: {RULE_SET_INFO.version}</span>
                </div>
              </div>
            )}
          </div>

          {/* Test Remarks */}
          <div style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ marginBottom: '4px', display: 'block' }}>Test Remarks</label>
            <textarea 
              className="form-control"
              rows={2}
              placeholder="Record relevant observations, setup notes or abnormalities."
              value={remarksState[activeTestId] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setRemarksState((prev) => ({ ...prev, [activeTestId]: val }));
              }}
            />
          </div>

          {/* Main Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #cbd5e1' }}>
            <button className="btn-secondary" onClick={handleSaveTest}>
              <Save size={13} />
              Save Test
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="btn-primary" style={{ backgroundColor: '#15803d', borderColor: '#166534' }} onClick={handleMarkComplete}>
                <CheckCircle2 size={13} />
                Mark Test Complete
              </button>
              <button className="btn-primary" onClick={handleNextTest}>
                Next Test
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. RIGHT PANEL: TEST CONTEXT */}
        <div className="execution-panel test-context-panel">
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>
            Test Context
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="kv-item">
              <span className="kv-label">Instrument</span>
              <span className="kv-value font-mono" style={{ fontWeight: 700, color: '#1e3a8a' }}>
                {evalInfo.model}
              </span>
            </div>

            <div className="kv-item">
              <span className="kv-label">Accuracy Class</span>
              <span className="kv-value font-mono" style={{ fontWeight: 700 }}>
                Class {evalInfo.accuracyClass}
              </span>
            </div>

            <div className="kv-item">
              <span className="kv-label">Max Capacity (Max)</span>
              <span className="kv-value font-mono" style={{ fontWeight: 700 }}>
                {evalInfo.maxCapacity}
              </span>
            </div>

            <div className="kv-item">
              <span className="kv-label">Min Capacity (Min)</span>
              <span className="kv-value font-mono">
                {evalInfo.minCapacity}
              </span>
            </div>

            <div className="kv-item">
              <span className="kv-label">Scale Interval (e)</span>
              <span className="kv-value font-mono">
                {evalInfo.scaleInterval_e}
              </span>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
              <div className="kv-item">
                <span className="kv-label">Environment</span>
                <span className="kv-value font-mono" style={{ fontSize: '12px' }}>
                  {evalInfo.temperature} | {evalInfo.humidity}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
              <div className="kv-item">
                <span className="kv-label">Reference Equipment</span>
                <span className="kv-value font-mono" style={{ color: '#1e3a8a' }}>
                  {evalInfo.referenceEquipment}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. TEST RESULT SUMMARY TABLE WITH PROTOTYPE BADGES */}
      <div className="table-card" style={{ marginTop: '20px' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase' }}>
            Test Result Summary
          </h3>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
            Rule Set: {RULE_SET_INFO.version}
          </span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Status</th>
                <th>Key Result</th>
                <th>Criterion</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => {
                const res = evalResultsMap[t.id] || {};
                const rRule = MOCK_RULES[t.id] || {};
                return (
                  <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => setActiveTestId(t.id)}>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{t.name}</td>
                    <td>
                      <StatusBadge status={t.status === 'Completed' ? 'Completed — Awaiting Evaluation' : t.status} />
                    </td>
                    <td className="font-mono" style={{ fontWeight: 600 }}>
                      {res.calculatedMetrics?.keyResultText || '—'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span className="font-mono" style={{ fontSize: '11px', color: '#475569' }}>
                          {rRule.criterion || 'Criterion not configured'}
                        </span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#b45309', backgroundColor: '#fef3c7', padding: '1px 4px', borderRadius: '2px', width: 'fit-content' }}>
                          PROTOTYPE
                        </span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={res.result || 'REVIEW'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* TECHNICAL AUDIT FOOTER */}
      <div className="audit-footer-bar">
        <div className="audit-footer-item">
          <span>Started:</span>
          <strong className="font-mono">{evalInfo.startTime}</strong>
        </div>
        <div className="audit-footer-item">
          <span>Last saved:</span>
          <strong className="font-mono">{evalInfo.lastSavedTime}</strong>
        </div>
        <div className="audit-footer-item">
          <span>Engineer:</span>
          <strong>{evalInfo.engineer}</strong>
        </div>
        <div className="audit-footer-item">
          <span>Status:</span>
          <StatusBadge status={overallSummary.overallStatus} />
        </div>
      </div>
    </div>
  );
};

export default TestExecutionPage;
