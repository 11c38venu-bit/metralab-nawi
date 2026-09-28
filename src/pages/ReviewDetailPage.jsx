import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import SummaryCard from '../components/SummaryCard';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { Clock, CheckCircle2, RotateCcw, FileCheck, AlertTriangle } from 'lucide-react';

/**
 * ReviewDetailPage - detailed technical review view for a single evaluation.
 * Props:
 *   evaluationId: string – ID of the evaluation to review.
 *   reviews: array – full list of review objects (mock data).
 *   setReviews: function – state setter to update the reviews list.
 *   onNavigate: function – navigation handler from App.
 */
export const ReviewDetailPage = ({ evaluationId, reviews, setReviews, onNavigate }) => {
  const [evaluation, setEvaluation] = useState(null);
  const [openTestId, setOpenTestId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newCommentCategory, setNewCommentCategory] = useState('Technical Observation');
  const [newFlagCategory, setNewFlagCategory] = useState('Technical Observation');
  const [newFlagNote, setNewFlagNote] = useState('');
  const [ruleAckChecked, setRuleAckChecked] = useState(false);

  // Load evaluation on mount or when reviews change
  useEffect(() => {
    const ev = reviews.find(r => r.evaluationId === evaluationId);
    if (ev) {
      setEvaluation({ ...ev });
      setRuleAckChecked(ev.checklist?.ruleAckChecked || false);
    }
  }, [evaluationId, reviews]);

  if (!evaluation) return <div>Loading...</div>;

  // Helper to persist changes back to the global reviews state
  const persistChanges = (updatedEval) => {
    const updatedReviews = reviews.map(r => r.evaluationId === updatedEval.evaluationId ? updatedEval : r);
    setReviews(updatedReviews);
    setEvaluation(updatedEval);
  };

  // Checklist handling
  const toggleChecklist = (key) => {
    const updated = {
      ...evaluation,
      checklist: { ...evaluation.checklist, [key]: !evaluation.checklist[key] }
    };
    persistChanges(updated);
  };

  // Comment handling
  const addComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: `c${Date.now()}`,
      author: evaluation.reviewer,
      date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ' —'),
      category: newCommentCategory,
      text: newComment.trim()
    };
    const updated = { ...evaluation, comments: [...evaluation.comments, comment] };
    persistChanges(updated);
    setNewComment('');
  };

  // Flag handling
  const addFlag = () => {
    if (!newFlagNote.trim()) return;
    const flag = { id: `f${Date.now()}`, category: newFlagCategory, note: newFlagNote.trim() };
    const updated = { ...evaluation, flags: [...evaluation.flags, flag] };
    persistChanges(updated);
    setNewFlagNote('');
  };

  // Return for correction flow
  const returnForCorrection = (reason) => {
    const audit = {
      id: `e${Date.now()}`,
      date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ' —'),
      user: evaluation.reviewer,
      action: `Evaluation returned for correction (Reason: ${reason})`
    };
    const updated = {
      ...evaluation,
      reviewStatus: 'Returned for Correction',
      auditEvents: [...evaluation.auditEvents, audit]
    };
    persistChanges(updated);
    onNavigate('/reviews');
  };

  // Accept for reporting flow
  const acceptForReporting = (withAttention = false) => {
    const audit = {
      id: `e${Date.now()}`,
      date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ' —'),
      user: evaluation.reviewer,
      action: withAttention ? 'Accepted for Reporting — Review Attention Recorded' : 'Evaluation accepted for report generation'
    };
    const updated = {
      ...evaluation,
      reviewStatus: 'Accepted for Reporting',
      auditEvents: [...evaluation.auditEvents, audit]
    };
    persistChanges(updated);
    onNavigate('/reviews');
  };

  // Determine if checklist is complete
  const checklistItems = Object.keys(evaluation.checklist || {});
  const incompleteChecklist = checklistItems.filter(k => !evaluation.checklist[k]);

  // Render helpers
  const renderProgress = () => {
    const steps = ['Evaluation', 'Instrument', 'Regulatory Basis', 'Laboratory', 'Test Results', 'Review', 'Decision'];
    return (
      <div className="review-progress" style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: i === 5 ? '#1E3A8A' : '#F4F6F9', color: i === 5 ? '#fff' : '#0F172A', fontSize: '12px' }}>
            {('0' + (i + 1)).slice(-2)} {s}
          </div>
        ))}
      </div>
    );
  };

  const renderTestResults = () => {
    const columns = [
      { header: 'Test', accessor: 'testName' },
      { header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
      { header: 'Key Result', accessor: 'keyResult' },
      { header: 'Criterion', accessor: 'criterion' },
      { header: 'Result', accessor: 'result' },
      { header: 'Action', accessor: 'action', render: row => (
        <button className="btn-link" onClick={() => setOpenTestId(row.testId)} style={{ fontSize: '12px' }}>View Details</button>
      ) }
    ];
    const testData = [
      { testId: 'weighing', testName: 'Weighing Performance', status: evaluation.overallResult, keyResult: 'Max Error: +0.12 kg', criterion: evaluation.ruleSet, result: evaluation.overallResult },
      { testId: 'repeatability', testName: 'Repeatability', status: evaluation.overallResult, keyResult: 'Error Range: 0.05 kg', criterion: evaluation.ruleSet, result: evaluation.overallResult },
    ];
    return <DataTable columns={columns} data={testData} />;
  };

  const renderTestDetailPanel = () => {
    if (!openTestId) return null;
    const testInfo = {
      observationCount: 5,
      calculatedResult: { maxError: '+0.12 kg', minError: '-0.08 kg', errorRange: '0.20 kg', maxDeviation: '0.03 kg' },
      criterion: { technicalReference: 'OIML R 76', ruleSet: evaluation.ruleSet, type: 'Demonstration Criterion', verification: 'Not verified as an official OIML acceptance limit' },
      evaluationResult: evaluation.overallResult,
      explanation: 'Observations fall within configured prototype limits.'
    };
    return (
      <div className="test-detail-panel" style={{ border: '1px solid #e5e7eb', padding: '12px', marginTop: '8px' }}>
        <h4>{openTestId} Details</h4>
        <p><strong>Observation Summary:</strong> {testInfo.observationCount} observations recorded.</p>
        <p><strong>Calculated Result:</strong> Max Error {testInfo.calculatedResult.maxError}, Min Error {testInfo.calculatedResult.minError}, Range {testInfo.calculatedResult.errorRange}, Deviation {testInfo.calculatedResult.maxDeviation}.</p>
        <p><strong>Criterion:</strong> {testInfo.criterion.technicalReference} | {testInfo.criterion.ruleSet} | {testInfo.criterion.type}.</p>
        <p><strong>Verification:</strong> {testInfo.criterion.verification}</p>
        <p><strong>Evaluation Result:</strong> {testInfo.evaluationResult}</p>
        <p><strong>Explanation:</strong> {testInfo.explanation}</p>
        <button className="btn-secondary" style={{ marginRight: '8px' }} onClick={() => setOpenTestId(null)}>Close</button>
      </div>
    );
  };

  return (
    <div className="review-detail-page" style={{ padding: '20px' }}>
      <SectionHeader title="Technical Review" subtitle={`Evaluation ${evaluation.evaluationId}`} />
      <div className="header-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '16px' }}>
        <div><strong>Instrument:</strong> {evaluation.model}</div>
        <div><strong>Manufacturer:</strong> {evaluation.manufacturer}</div>
        <div><strong>Engineer:</strong> {evaluation.engineer}</div>
        <div><strong>Reviewer:</strong> {evaluation.reviewer}</div>
        <div><strong>Status:</strong> <StatusBadge status={evaluation.reviewStatus} /></div>
        <div><strong>Test Date:</strong> {evaluation.testDate}</div>
        <div><strong>Rule Set:</strong> {evaluation.ruleSet}</div>
      </div>
      <button className="btn-link" style={{ marginTop: '8px' }} onClick={() => onNavigate(`/reports/preview/${evaluation.evaluationId}`)}>Preview Report</button>
      {renderProgress()}
      <section style={{ marginBottom: '24px' }}>
        <h3>Evaluation Summary</h3>
        <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          <SummaryCard label="Evaluation ID" value={evaluation.evaluationId} />
          <SummaryCard label="Instrument ID" value={evaluation.instrumentId} />
          <SummaryCard label="Model" value={evaluation.model} />
          <SummaryCard label="Manufacturer" value={evaluation.manufacturer} />
          <SummaryCard label="Serial Number" value={evaluation.serialNumber} />
          <SummaryCard label="Accuracy Class" value={evaluation.accuracyClass} />
          <SummaryCard label="Max Capacity" value={evaluation.maxCapacity} />
          <SummaryCard label="Min Capacity" value={evaluation.minCapacity} />
          <SummaryCard label="Engineer" value={evaluation.engineer} />
          <SummaryCard label="Reviewer" value={evaluation.reviewer} />
          <SummaryCard label="Evaluation Date" value={evaluation.testDate} />
          <SummaryCard label="Laboratory" value={evaluation.laboratoryName} />
          <SummaryCard label="Test Room" value={evaluation.testRoom} />
          <SummaryCard label="Rule Set" value={evaluation.ruleSet} />
          <SummaryCard label="Overall Status" value={evaluation.overallResult} />
        </div>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <details open>
          <summary><strong>Regulatory Basis</strong></summary>
          <ul>
            <li>Legal Metrology Act, 2009</li>
            <li>Legal Metrology (General) Rules, 2011</li>
            <li>OIML Recommendation R 76 (Technical Reference)</li>
            <li>Model Approval / Type Evaluation</li>
          </ul>
          <p><em>Prototype Rule Set — 2026.1</em> (Demonstration Configuration)</p>
        </details>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <details open>
          <summary><strong>Laboratory Conditions</strong></summary>
          <div className="lab-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
            <div>Temperature: {evaluation.temperature}</div>
            <div>Relative Humidity: {evaluation.humidity}</div>
            <div>Atmospheric Pressure: {evaluation.pressure}</div>
            <div>Electrical Supply: {evaluation.supplyVoltage}</div>
            <div>Frequency: {evaluation.frequency}</div>
            <div>Test Room: {evaluation.testRoom}</div>
            <div>Test Engineer: {evaluation.engineer}</div>
            <div>Reviewer: {evaluation.reviewer}</div>
            <div>Reference Equipment: {evaluation.referenceEquipment}</div>
            <div>Calibration Certificate: {evaluation.calibrationCert}</div>
            <div>Calibration Valid Until: {evaluation.calibrationValidUntil}</div>
            <div>Lab Remarks: {evaluation.labRemarks}</div>
          </div>
        </details>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h4>Reference Equipment</h4>
        <p>ID: {evaluation.referenceEquipment}</p>
        <p>Calibration Certificate: {evaluation.calibrationCert}</p>
        <p>Calibration Date: {evaluation.calibrationDate || 'N/A'}</p>
        <p>Valid Until: {evaluation.calibrationValidUntil}</p>
        <p>Status: Calibration Valid</p>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h3>Test Results</h3>
        {renderTestResults()}
        {renderTestDetailPanel()}
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h4>Review Flags</h4>
        <ul>
          {evaluation.flags.map(f => (
            <li key={f.id}>[{f.category}] {f.note}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select value={newFlagCategory} onChange={e => setNewFlagCategory(e.target.value)}>
            <option>Technical Observation</option>
            <option>Calculation</option>
            <option>Documentation</option>
            <option>Regulatory Reference</option>
            <option>Other</option>
          </select>
          <input type="text" placeholder="Flag note" value={newFlagNote} onChange={e => setNewFlagNote(e.target.value)} />
          <button className="btn-primary" onClick={addFlag}>Add Flag</button>
        </div>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h4>Reviewer Comments</h4>
        <div style={{ marginBottom: '8px' }}>
          {evaluation.comments.map(c => (
            <div key={c.id} style={{ borderBottom: '1px solid #e5e7eb', padding: '4px 0' }}>
              <strong>{c.author}</strong> ({c.date}) - <em>{c.category}</em>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <select value={newCommentCategory} onChange={e => setNewCommentCategory(e.target.value)}>
            <option>Technical Observation</option>
            <option>Calculation Issue</option>
            <option>Documentation</option>
            <option>Regulatory Reference</option>
            <option>Other</option>
          </select>
          <textarea placeholder="Enter technical review observations..." value={newComment} onChange={e => setNewComment(e.target.value)} rows={3} style={{ resize: 'vertical' }} />
          <button className="btn-primary" onClick={addComment}>Add Comment</button>
        </div>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h4>Technical Review Checklist</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(evaluation.checklist || {}).map(([key, value]) => (
            <li key={key} style={{ marginBottom: '4px' }}>
              <label>
                <input type="checkbox" checked={!!value} onChange={() => toggleChecklist(key)} />
                {' '}{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            </li>
          ))}
        </ul>
        {incompleteChecklist.length > 0 && (
          <div style={{ color: '#d97706' }}>
            <strong>Review cannot be completed.</strong> {incompleteChecklist.length} checklist items remain.
          </div>
        )}
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h4>Rule Configuration Notice</h4>
        <p>This evaluation contains prototype demonstration criteria. Production use requires validated and version‑controlled regulatory criteria.</p>
        <label>
          <input type="checkbox" checked={ruleAckChecked} onChange={() => {
            const updated = { ...evaluation, checklist: { ...evaluation.checklist, ruleAckChecked: !ruleAckChecked } };
            persistChanges(updated);
            setRuleAckChecked(!ruleAckChecked);
          }} />
          I have reviewed the configured rule context for this prototype evaluation.
        </label>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h4>Review Decision</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={() => {
            const reason = prompt('Enter reason/category for returning to engineer');
            if (reason) returnForCorrection(reason);
          }}>Return for Correction</button>
          <button className="btn-primary" disabled={incompleteChecklist.length > 0 || !ruleAckChecked} onClick={() => {
            if (evaluation.overallResult.includes('REVIEW')) {
              const confirmAttention = window.confirm('One or more tests have REVIEW results. Accept with Review Attention?');
              if (confirmAttention) acceptForReporting(true);
            } else {
              acceptForReporting();
            }
          }}>Accept for Reporting</button>
        </div>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h4>Review Activity</h4>
        <ul>
          {evaluation.auditEvents.map(ev => (
            <li key={ev.id}>[{ev.date}] {ev.user}: {ev.action}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ReviewDetailPage;
