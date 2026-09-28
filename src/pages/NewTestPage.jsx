import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import StatusBadge from '../components/StatusBadge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  RotateCcw, 
  Info,
  Scale,
  Shield,
  FileText,
  Clock
} from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export const NewTestPage = ({ instruments, initialInstrumentId, onNavigate }) => {
  // 1. Workflow Step State (1 to 6)
  // Step 1: Evaluation Information
  // Step 2: Instrument Selection
  // Step 3: Regulatory Basis
  // Step 4: Laboratory Conditions & Reference Equipment
  // Step 5: Test Plan
  // Step 6: Evaluation Summary
  const [currentStep, setCurrentStep] = useState(1);

  // 2. Draft Save Timestamp State
  const [draftSavedTime, setDraftSavedTime] = useState(null);

  // 3. Instrument Picker Modal State
  const [showInstrumentPicker, setShowInstrumentPicker] = useState(false);
  const [pickerSearchQuery, setPickerSearchQuery] = useState('');

  // 4. Test Execution Modal State
  const [activeTestModal, setActiveTestModal] = useState(null);

  // 5. Workflow Data State
  const [evalData, setEvalData] = useState({
    evaluationType: 'Type Evaluation / Model Approval',
    evaluationNumber: 'NAWI-2026-00131',
    evaluationDate: '28 Sep 2026',
    assignedEngineer: 'Venu Prasath',
    reviewer: 'Dr. Rajesh Kumar',
    priority: 'Normal',
    
    // Selected Instrument (default to initialInstrumentId or first instrument PWI-500)
    selectedInstrument: null,

    // Regulatory Basis
    regulatoryAck: false,
    ruleConfiguration: 'Prototype Rule Set — 2026.1',

    // Laboratory Conditions
    laboratoryName: 'National Metrology Test Laboratory',
    testRoom: 'NAWI Test Room — 02',
    temperature: '23.4',
    relativeHumidity: '48',
    atmosphericPressure: '1012',
    supplyVoltage: '230 V AC',
    frequency: '50 Hz',

    // Reference Equipment
    referenceEquipmentId: 'NMTL-WT-017',
    calibrationCertificate: 'CAL-2026-0178',
    calibrationDate: '12 Aug 2026',
    calibrationValidUntil: '11 Aug 2027',
    calibrationStatus: 'Calibration Valid',

    // Laboratory Remarks
    remarks: 'Instrument was allowed to stabilize before commencement of observations.',

    // Test Plan items
    tests: [
      { id: 'T1', name: 'Weighing Performance', reference: 'OIML R 76', applicability: 'Applicable', status: 'Pending', included: true },
      { id: 'T2', name: 'Repeatability', reference: 'OIML R 76', applicability: 'Applicable', status: 'Pending', included: true },
      { id: 'T3', name: 'Eccentricity', reference: 'OIML R 76', applicability: 'Applicable', status: 'Pending', included: true },
      { id: 'T4', name: 'Zero Setting', reference: 'OIML R 76', applicability: 'Applicable', status: 'Pending', included: true },
      { id: 'T5', name: 'Tare', reference: 'OIML R 76', applicability: 'Applicable', status: 'Pending', included: true },
      { id: 'T6', name: 'Creep', reference: 'OIML R 76', applicability: 'Applicable', status: 'Pending', included: true },
      { id: 'T7', name: 'Warm-up / Stabilization', reference: 'OIML R 76', applicability: 'Applicable', status: 'Pending', included: true }
    ]
  });

  // Step 3 Regulatory Ack Inline Error State
  const [regError, setRegError] = useState(null);

  // Initialize selected instrument
  useEffect(() => {
    if (instruments && instruments.length > 0) {
      let target = instruments.find(
        (inst) => inst.id === initialInstrumentId || inst.model === initialInstrumentId
      );
      if (!target) {
        target = instruments[0]; // PWI-500 default
      }
      setEvalData((prev) => ({ ...prev, selectedInstrument: target }));
    }
  }, [initialInstrumentId, instruments]);

  // Handle Save Draft
  const handleSaveDraft = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setDraftSavedTime(`${hours}:${minutes}`);
  };

  // Toggle Test Plan Inclusion
  const handleToggleTest = (testId) => {
    setEvalData((prev) => ({
      ...prev,
      tests: prev.tests.map((t) => t.id === testId ? { ...t, included: !t.included } : t)
    }));
  };

  // Pre-execution Validation Check
  const getValidationErrors = () => {
    const missing = [];
    if (!evalData.evaluationType) missing.push('Evaluation type must be selected');
    if (!evalData.selectedInstrument) missing.push('Instrument selection is required');
    if (!evalData.assignedEngineer) missing.push('Assigned engineer is required');
    if (!evalData.reviewer) missing.push('Reviewer is required');
    if (!evalData.regulatoryAck) missing.push('Regulatory reference set acknowledgement required');
    if (!evalData.temperature.trim()) missing.push('Laboratory temperature is required');
    if (!evalData.relativeHumidity.trim()) missing.push('Relative humidity is required');
    if (!evalData.atmosphericPressure.trim()) missing.push('Atmospheric pressure is required');
    if (!evalData.supplyVoltage.trim()) missing.push('Supply voltage is required');
    if (!evalData.frequency.trim()) missing.push('Electrical frequency is required');
    if (!evalData.referenceEquipmentId.trim()) missing.push('Reference equipment ID is required');

    const includedCount = evalData.tests.filter((t) => t.included).length;
    if (includedCount === 0) missing.push('Test plan is empty (at least one test must be included)');

    return missing;
  };

  const validationErrors = getValidationErrors();
  const isValidToBegin = validationErrors.length === 0;

  // Handle Navigation Step Click
  const handleNextStep = () => {
    if (currentStep === 3 && !evalData.regulatoryAck) {
      setRegError('Please acknowledge the configured regulatory reference set before continuing.');
      return;
    }
    setRegError(null);
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step Progress Bar Data
  const stepsList = [
    { num: '01', name: 'Evaluation' },
    { num: '02', name: 'Instrument' },
    { num: '03', name: 'Regulatory Basis' },
    { num: '04', name: 'Laboratory Conditions' },
    { num: '05', name: 'Test Plan' },
    { num: '06', name: 'Summary & Execution' }
  ];

  const selectedInst = evalData.selectedInstrument;

  // Filter instruments for picker modal
  const filteredPickerInstruments = instruments.filter((inst) => {
    const q = pickerSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      inst.id.toLowerCase().includes(q) ||
      inst.model.toLowerCase().includes(q) ||
      inst.serialNumber.toLowerCase().includes(q) ||
      inst.manufacturer.toLowerCase().includes(q)
    );
  });

  return (
    <div className="new-test-page">
      {/* Top Bar Actions & Save Draft Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="btn-secondary" onClick={() => onNavigate('/dashboard')}>
          <ArrowLeft size={13} />
          Return to Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {draftSavedTime && (
            <span className="font-mono" style={{ fontSize: '11px', color: '#166534', backgroundColor: '#f0fdf4', padding: '4px 8px', border: '1px solid #bbf7d0', borderRadius: '2px' }}>
              ✓ Draft saved {draftSavedTime}
            </span>
          )}
          <button className="btn-secondary" onClick={handleSaveDraft}>
            <Save size={14} />
            Save Draft
          </button>
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <SectionHeader 
        title="Create New Evaluation" 
        subtitle="Register a new NAWI type evaluation for laboratory testing" 
      />

      {/* RESTRAINED TECHNICAL PROGRESS INDICATOR */}
      <div className="workflow-progress-bar">
        {stepsList.map((step, idx) => {
          const stepIndex = idx + 1;
          const isActive = currentStep === stepIndex;
          const isCompleted = currentStep > stepIndex;

          return (
            <React.Fragment key={step.num}>
              <div 
                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setCurrentStep(stepIndex)}
              >
                <span className="step-num">{step.num}</span>
                <span>{step.name}</span>
              </div>
              {idx < stepsList.length - 1 && <span className="step-arrow">→</span>}
            </React.Fragment>
          );
        })}
      </div>

      {/* STEP 1: EVALUATION INFORMATION */}
      {currentStep === 1 && (
        <div className="form-card">
          <h3 className="form-section-title">Evaluation Information</h3>
          
          <div className="form-grid-2">
            {/* Evaluation Type */}
            <div className="form-field">
              <label className="form-label required">Evaluation Type</label>
              <select 
                className="form-control"
                value={evalData.evaluationType}
                onChange={(e) => setEvalData((prev) => ({ ...prev, evaluationType: e.target.value }))}
              >
                <option value="Type Evaluation / Model Approval">Type Evaluation / Model Approval</option>
                <option value="Verification">Verification</option>
                <option value="Re-verification">Re-verification</option>
              </select>
            </div>

            {/* Evaluation Number (Auto Generated) */}
            <div className="form-field">
              <label className="form-label">Evaluation Number (Auto-Generated)</label>
              <input 
                type="text" 
                className="form-control font-mono" 
                style={{ backgroundColor: '#f1f5f9', fontWeight: 700, color: '#1e3a8a' }}
                value={evalData.evaluationNumber}
                readOnly
              />
            </div>

            {/* Evaluation Date */}
            <div className="form-field">
              <label className="form-label">Evaluation Date</label>
              <input 
                type="text" 
                className="form-control font-mono"
                value={evalData.evaluationDate}
                onChange={(e) => setEvalData((prev) => ({ ...prev, evaluationDate: e.target.value }))}
              />
            </div>

            {/* Priority */}
            <div className="form-field">
              <label className="form-label">Priority</label>
              <select 
                className="form-control"
                value={evalData.priority}
                onChange={(e) => setEvalData((prev) => ({ ...prev, priority: e.target.value }))}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Assigned Engineer */}
            <div className="form-field">
              <label className="form-label required">Assigned Engineer</label>
              <select 
                className="form-control"
                value={evalData.assignedEngineer}
                onChange={(e) => setEvalData((prev) => ({ ...prev, assignedEngineer: e.target.value }))}
              >
                <option value="Venu Prasath">Venu Prasath</option>
                <option value="Ananya Sharma">Ananya Sharma</option>
                <option value="Vikramaditya Singh">Vikramaditya Singh</option>
                <option value="Priya Nair">Priya Nair</option>
              </select>
            </div>

            {/* Reviewer */}
            <div className="form-field">
              <label className="form-label required">Reviewer</label>
              <select 
                className="form-control"
                value={evalData.reviewer}
                onChange={(e) => setEvalData((prev) => ({ ...prev, reviewer: e.target.value }))}
              >
                <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: INSTRUMENT SELECTION */}
      {currentStep === 2 && (
        <div className="form-card">
          <h3 className="form-section-title">Instrument Under Evaluation</h3>
          
          {selectedInst ? (
            <div>
              <div className="info-note-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>Selected Instrument for Evaluation:</strong>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a', marginTop: '2px' }}>
                    {selectedInst.model} — {selectedInst.manufacturer}
                  </div>
                </div>
                <button type="button" className="btn-secondary" onClick={() => setShowInstrumentPicker(true)}>
                  Change Instrument
                </button>
              </div>

              {/* Compact Instrument Technical Summary */}
              <div className="technical-card" style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}>
                <div className="kv-grid-4">
                  <div className="kv-item">
                    <span className="kv-label">Instrument ID</span>
                    <span className="kv-value font-mono" style={{ color: '#1e3a8a', fontWeight: 700 }}>{selectedInst.id}</span>
                  </div>
                  <div className="kv-item">
                    <span className="kv-label">Model</span>
                    <span className="kv-value font-mono">{selectedInst.model}</span>
                  </div>
                  <div className="kv-item">
                    <span className="kv-label">Manufacturer</span>
                    <span className="kv-value">{selectedInst.manufacturer}</span>
                  </div>
                  <div className="kv-item">
                    <span className="kv-label">Serial Number</span>
                    <span className="kv-value font-mono">{selectedInst.serialNumber}</span>
                  </div>
                  <div className="kv-item">
                    <span className="kv-label">Accuracy Class</span>
                    <span className="kv-value font-mono" style={{ fontWeight: 700 }}>{selectedInst.accuracyClass}</span>
                  </div>
                  <div className="kv-item">
                    <span className="kv-label">Max Capacity</span>
                    <span className="kv-value font-mono" style={{ fontWeight: 700 }}>{selectedInst.maxCapacity}</span>
                  </div>
                  <div className="kv-item">
                    <span className="kv-label">Min Capacity</span>
                    <span className="kv-value font-mono">{selectedInst.minCapacity}</span>
                  </div>
                  <div className="kv-item">
                    <span className="kv-label">Interval (e)</span>
                    <span className="kv-value font-mono">{selectedInst.scaleInterval_e}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>No instrument currently selected.</p>
              <button type="button" className="btn-primary" onClick={() => setShowInstrumentPicker(true)}>
                Select Existing Instrument
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: REGULATORY BASIS */}
      {currentStep === 3 && (
        <div>
          <SectionHeader title="Regulatory Basis" subtitle="Reference framework used for this evaluation" />
          
          {/* 4 Technical Reference Blocks */}
          <div className="regulatory-card-grid">
            {/* Block 1 */}
            <div className="regulatory-card">
              <div className="regulatory-card-header">
                <span className="regulatory-type-badge">Legal Framework</span>
                <StatusBadge status="Reference" />
              </div>
              <div className="regulatory-card-title">Legal Metrology Act, 2009</div>
              <div className="regulatory-card-desc">
                National legal framework governing weights and measures and related legal metrology activities across India.
              </div>
            </div>

            {/* Block 2 */}
            <div className="regulatory-card">
              <div className="regulatory-card-header">
                <span className="regulatory-type-badge">Rules</span>
                <StatusBadge status="Reference" />
              </div>
              <div className="regulatory-card-title">Legal Metrology (General) Rules, 2011</div>
              <div className="regulatory-card-desc">
                Rules prescribing technical requirements, verification procedures, and tolerances applicable to commercial weighing instruments.
              </div>
            </div>

            {/* Block 3 */}
            <div className="regulatory-card">
              <div className="regulatory-card-header">
                <span className="regulatory-type-badge">Technical Reference</span>
                <StatusBadge status="Reference" />
              </div>
              <div className="regulatory-card-title">OIML Recommendation R 76</div>
              <div className="regulatory-card-desc">
                International technical and metrological reference for Non-Automatic Weighing Instruments (OIML R 76-1 / R 76-2).
              </div>
            </div>

            {/* Block 4 */}
            <div className="regulatory-card" style={{ borderColor: '#1e3a8a', backgroundColor: '#eff6ff' }}>
              <div className="regulatory-card-header">
                <span className="regulatory-type-badge" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>Evaluation Context</span>
                <StatusBadge status="Selected" />
              </div>
              <div className="regulatory-card-title">Model Approval / Type Evaluation</div>
              <div className="regulatory-card-desc">
                This evaluation is being created in the context of pattern/model approval testing for the selected NAWI instrument.
              </div>
            </div>
          </div>

          {/* Configured Reference Set Panel */}
          <div className="technical-card">
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', marginBottom: '12px' }}>
              Configured Reference Set
            </h4>
            
            <div className="kv-grid-2" style={{ marginBottom: '16px' }}>
              <div className="kv-item">
                <span className="kv-label">Legal Framework</span>
                <span className="kv-value">Legal Metrology Act, 2009</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Rules</span>
                <span className="kv-value">Legal Metrology (General) Rules, 2011</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Technical Reference</span>
                <span className="kv-value font-mono">OIML R 76</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Configuration</span>
                <span className="kv-value font-mono" style={{ color: '#1e3a8a', fontWeight: 700 }}>
                  {evalData.ruleConfiguration}
                </span>
              </div>
            </div>

            <div className="info-note-box" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Info size={16} className="text-blue-600" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Regulatory Disclaimer:</strong> Production deployment should use a controlled and versioned regulatory rule repository and should be updated when applicable legal, regulatory or technical requirements are revised.
                </div>
              </div>
            </div>

            {/* Regulatory Acknowledgement Checkbox */}
            <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '2px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, color: '#0f172a' }}>
                <input 
                  type="checkbox" 
                  checked={evalData.regulatoryAck} 
                  onChange={(e) => {
                    setEvalData((prev) => ({ ...prev, regulatoryAck: e.target.checked }));
                    if (e.target.checked) setRegError(null);
                  }}
                  style={{ width: '16px', height: '16px' }}
                />
                <span>I have reviewed the configured regulatory reference set for this evaluation.</span>
              </label>
            </div>

            {regError && (
              <div className="error-text" style={{ marginTop: '8px', fontWeight: 600 }}>
                {regError}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: LABORATORY CONDITIONS & REFERENCE EQUIPMENT */}
      {currentStep === 4 && (
        <div>
          {/* Laboratory & Environmental Conditions */}
          <div className="form-card">
            <h3 className="form-section-title">Laboratory & Environmental Conditions</h3>
            
            {/* Laboratory Information */}
            <div className="kv-grid-4" style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div className="kv-item">
                <span className="kv-label">Laboratory</span>
                <span className="kv-value" style={{ fontWeight: 700 }}>{evalData.laboratoryName}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Test Room</span>
                <span className="kv-value font-mono">{evalData.testRoom}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Test Engineer</span>
                <span className="kv-value">{evalData.assignedEngineer}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Reviewer</span>
                <span className="kv-value">{evalData.reviewer}</span>
              </div>
            </div>

            {/* Environmental Conditions Inputs */}
            <div className="form-grid-3">
              <div className="form-field">
                <label className="form-label required">Temperature (°C)</label>
                <input 
                  type="text" 
                  className={`form-control font-mono ${!evalData.temperature.trim() ? 'is-invalid' : ''}`}
                  value={evalData.temperature}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, temperature: e.target.value }))}
                />
                {!evalData.temperature.trim() && <span className="error-text">Temperature is required.</span>}
                {parseFloat(evalData.temperature) > 35 && <span style={{ fontSize: '11px', color: '#d97706' }}>Review environmental condition.</span>}
              </div>

              <div className="form-field">
                <label className="form-label required">Relative Humidity (%RH)</label>
                <input 
                  type="text" 
                  className={`form-control font-mono ${!evalData.relativeHumidity.trim() ? 'is-invalid' : ''}`}
                  value={evalData.relativeHumidity}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, relativeHumidity: e.target.value }))}
                />
                {!evalData.relativeHumidity.trim() && <span className="error-text">Relative humidity is required.</span>}
              </div>

              <div className="form-field">
                <label className="form-label required">Atmospheric Pressure (hPa)</label>
                <input 
                  type="text" 
                  className={`form-control font-mono ${!evalData.atmosphericPressure.trim() ? 'is-invalid' : ''}`}
                  value={evalData.atmosphericPressure}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, atmosphericPressure: e.target.value }))}
                />
                {!evalData.atmosphericPressure.trim() && <span className="error-text">Atmospheric pressure is required.</span>}
              </div>

              <div className="form-field">
                <label className="form-label required">Supply Voltage</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={evalData.supplyVoltage}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, supplyVoltage: e.target.value }))}
                />
              </div>

              <div className="form-field">
                <label className="form-label required">Frequency</label>
                <input 
                  type="text" 
                  className="form-control font-mono"
                  value={evalData.frequency}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, frequency: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Reference Equipment */}
          <div className="form-card">
            <h3 className="form-section-title">Reference Equipment</h3>
            
            <div className="kv-grid-4" style={{ marginBottom: '12px' }}>
              <div className="kv-item">
                <span className="kv-label">Reference Equipment ID</span>
                <input 
                  type="text" 
                  className="form-control font-mono"
                  value={evalData.referenceEquipmentId}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, referenceEquipmentId: e.target.value }))}
                />
              </div>

              <div className="kv-item">
                <span className="kv-label">Calibration Certificate</span>
                <input 
                  type="text" 
                  className="form-control font-mono"
                  value={evalData.calibrationCertificate}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, calibrationCertificate: e.target.value }))}
                />
              </div>

              <div className="kv-item">
                <span className="kv-label">Calibration Date</span>
                <input 
                  type="text" 
                  className="form-control font-mono"
                  value={evalData.calibrationDate}
                  onChange={(e) => setEvalData((prev) => ({ ...prev, calibrationDate: e.target.value }))}
                />
              </div>

              <div className="kv-item">
                <span className="kv-label">Calibration Valid Until</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="text" 
                    className="form-control font-mono"
                    value={evalData.calibrationValidUntil}
                    onChange={(e) => setEvalData((prev) => ({ ...prev, calibrationValidUntil: e.target.value }))}
                  />
                  <StatusBadge status="Valid" customLabel="Calibration Valid" />
                </div>
              </div>
            </div>
          </div>

          {/* Laboratory Remarks */}
          <div className="form-card">
            <h3 className="form-section-title">Laboratory Remarks</h3>
            <div className="form-field">
              <label className="form-label">Setup & Environmental Observations</label>
              <textarea 
                className="form-control"
                rows={3}
                placeholder="Record relevant observations regarding laboratory conditions, instrument stabilization, setup or test preparation."
                value={evalData.remarks}
                onChange={(e) => setEvalData((prev) => ({ ...prev, remarks: e.target.value }))}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: PROPOSED TEST PLAN */}
      {currentStep === 5 && (
        <div>
          <SectionHeader title="Proposed Test Plan" subtitle="Tests configured for this prototype evaluation" />

          {/* Test Plan Summary Bar */}
          <div className="history-summary-bar" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div className="history-summary-item">
              <span className="history-summary-label">Evaluation:</span>
              <span className="history-summary-value font-mono">{evalData.evaluationNumber}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Instrument:</span>
              <span className="history-summary-value font-mono">{selectedInst?.model || 'N/A'}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Manufacturer:</span>
              <span className="history-summary-value">{selectedInst?.manufacturer || 'N/A'}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Class:</span>
              <span className="history-summary-value font-mono">{selectedInst?.accuracyClass || 'Class III'}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Max / Min / e:</span>
              <span className="history-summary-value font-mono">{selectedInst?.maxCapacity} / {selectedInst?.minCapacity} / {selectedInst?.scaleInterval_e}</span>
            </div>
            <div className="history-summary-item">
              <span className="history-summary-label">Rule Set:</span>
              <span className="history-summary-value font-mono" style={{ color: '#1e3a8a' }}>{evalData.ruleConfiguration}</span>
            </div>
          </div>

          {/* Test Applicability Info Panel */}
          <div className="info-note-box" style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#0f172a' }}>Test Applicability Notice:</strong>
            <p style={{ marginTop: '4px', fontSize: '12px' }}>
              The displayed test plan represents the configured demonstration test set for this prototype evaluation. Production implementation should derive test applicability from a validated and version-controlled rule engine based on instrument characteristics and applicable regulatory requirements.
            </p>
          </div>

          {/* Test Plan Table */}
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>Include</th>
                  <th>Test</th>
                  <th>Reference</th>
                  <th>Applicability</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {evalData.tests.map((test) => (
                  <tr key={test.id} style={{ opacity: test.included ? 1 : 0.5 }}>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={test.included} 
                        onChange={() => handleToggleTest(test.id)} 
                      />
                    </td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{test.name}</td>
                    <td className="font-mono">{test.reference}</td>
                    <td>
                      <span className="font-mono" style={{ fontSize: '11px', color: test.included ? '#166534' : '#64748b' }}>
                        {test.included ? test.applicability : 'Not Included'}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={test.status} />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-text" 
                        onClick={() => setActiveTestModal(test)}
                        disabled={!test.included}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEP 6: EVALUATION SUMMARY & TEST EXECUTION PREPARATION */}
      {currentStep === 6 && (
        <div>
          <SectionHeader title="Evaluation Summary" subtitle="Review evaluation configuration before test execution" />

          {/* Validation Warnings Box if not ready */}
          {!isValidToBegin && (
            <div className="validation-summary-box">
              <div className="validation-summary-title">
                <AlertTriangle size={16} />
                <span>Evaluation cannot begin yet</span>
              </div>
              <ul className="validation-summary-list">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Summary Card */}
          <div className="technical-card" style={{ borderLeft: '4px solid #1e3a8a', marginBottom: '24px' }}>
            <div className="kv-grid-3" style={{ marginBottom: '16px' }}>
              <div className="kv-item">
                <span className="kv-label">Test ID</span>
                <span className="kv-value font-mono" style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '15px' }}>
                  {evalData.evaluationNumber}
                </span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Instrument</span>
                <span className="kv-value font-mono" style={{ fontWeight: 700 }}>
                  {selectedInst?.model || 'PWI-500'}
                </span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Manufacturer</span>
                <span className="kv-value">{selectedInst?.manufacturer || 'N/A'}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Serial Number</span>
                <span className="kv-value font-mono">{selectedInst?.serialNumber || 'N/A'}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Evaluation Type</span>
                <span className="kv-value">{evalData.evaluationType}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Priority</span>
                <span className="kv-value">{evalData.priority}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Assigned Engineer</span>
                <span className="kv-value">{evalData.assignedEngineer}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Reviewer</span>
                <span className="kv-value">{evalData.reviewer}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Status</span>
                <StatusBadge status={isValidToBegin ? "Ready for Testing" : "Incomplete Setup"} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginTop: '14px' }}>
              <div className="kv-grid-2">
                <div className="kv-item">
                  <span className="kv-label">Regulatory Basis</span>
                  <span className="kv-value">
                    Legal Metrology Act, 2009 / Legal Metrology (General) Rules, 2011 / OIML R 76
                  </span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Rule Configuration</span>
                  <span className="kv-value font-mono" style={{ color: '#1e3a8a', fontWeight: 600 }}>
                    {evalData.ruleConfiguration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER STEP NAVIGATION BUTTONS */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #cbd5e1' }}>
        <button 
          className="btn-secondary" 
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          style={{ opacity: currentStep === 1 ? 0.5 : 1 }}
        >
          <ArrowLeft size={14} />
          Previous Step
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentStep < 6 ? (
            <button className="btn-primary" onClick={handleNextStep}>
              Continue Step
              <ArrowRight size={14} />
            </button>
          ) : (
            <button 
              className="btn-primary" 
              style={{ backgroundColor: isValidToBegin ? '#15803d' : '#94a3b8', borderColor: isValidToBegin ? '#166534' : '#64748b', padding: '8px 20px' }}
              disabled={!isValidToBegin}
              onClick={() => onNavigate('/test-cases/in-progress')}
            >
              <Play size={14} />
              Begin Test Execution
            </button>
          )}
        </div>
      </div>

      {/* INSTRUMENT PICKER MODAL */}
      {showInstrumentPicker && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            width: '650px',
            maxWidth: '90%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Select Instrument for Evaluation</h3>
              <button className="btn-secondary" style={{ padding: '2px 8px' }} onClick={() => setShowInstrumentPicker(false)}>✕</button>
            </div>

            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
              <div className="search-box" style={{ width: '100%' }}>
                <Search size={14} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by Instrument ID, Model, Serial Number, Manufacturer..."
                  value={pickerSearchQuery}
                  onChange={(e) => setPickerSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
              {filteredPickerInstruments.map((inst) => (
                <div 
                  key={inst.id}
                  onClick={() => {
                    setEvalData((prev) => ({ ...prev, selectedInstrument: inst }));
                    setShowInstrumentPicker(false);
                  }}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: evalData.selectedInstrument?.id === inst.id ? '#eff6ff' : '#ffffff'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '13px' }}>
                      {inst.model} — <span className="font-mono">{inst.id}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#334155' }}>{inst.manufacturer}</div>
                    <div className="font-mono" style={{ fontSize: '11px', color: '#64748b' }}>
                      Serial: {inst.serialNumber} | Class: {inst.accuracyClass} | Max: {inst.maxCapacity}
                    </div>
                  </div>

                  {evalData.selectedInstrument?.id === inst.id ? (
                    <StatusBadge status="Selected" />
                  ) : (
                    <button className="btn-secondary" style={{ padding: '2px 8px', fontSize: '11px' }}>
                      Select
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
              <button className="btn-secondary" onClick={() => setShowInstrumentPicker(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* TEST EXECUTION MODAL PLACEHOLDER */}
      {activeTestModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            width: '500px',
            padding: '24px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e3a8a', marginBottom: '8px' }}>
              Test Execution Module
            </h3>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>
              {activeTestModal.name} ({activeTestModal.reference})
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px', lineHeight: 1.5 }}>
              This test will be completed during the Test Execution stage after launching evaluation execution.
            </p>
            <div style={{ textAlign: 'right' }}>
              <button className="btn-primary" onClick={() => setActiveTestModal(null)}>
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTestPage;
