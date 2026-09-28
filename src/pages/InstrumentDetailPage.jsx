import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import StatusBadge from '../components/StatusBadge';
import ActivityTimeline from '../components/ActivityTimeline';
import { ArrowLeft, Play, Edit3, Image, FileText, CheckCircle2 } from 'lucide-react';

export const InstrumentDetailPage = ({ instrumentId, instruments, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Find instrument by ID or model fallback
  const instrument = instruments.find(
    (item) => item.id === instrumentId || item.model === instrumentId
  ) || instruments[0]; // fallback to first instrument if not matched

  if (!instrument) {
    return (
      <div className="placeholder-container">
        <h2>Instrument Not Found</h2>
        <p>The requested instrument ID (<code className="font-mono">{instrumentId}</code>) could not be located in the laboratory registry.</p>
        <button className="btn-secondary" onClick={() => onNavigate('/instruments')}>
          <ArrowLeft size={14} /> Back to Registry
        </button>
      </div>
    );
  }

  const handleEditClick = () => {
    setNotification("Instrument editing enabled in laboratory record editor.");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStartTest = () => {
    onNavigate('/test-cases/new');
  };

  return (
    <div className="instrument-detail-page">
      {/* Toast Notification if triggered */}
      {notification && (
        <div className="toast-success-banner">
          <span>{notification}</span>
          <button className="btn-text" onClick={() => setNotification(null)}>Dismiss</button>
        </div>
      )}

      {/* Top Breadcrumb & Action Bar */}
      <div style={{ marginBottom: '16px' }}>
        <button className="btn-secondary" onClick={() => onNavigate('/instruments')}>
          <ArrowLeft size={13} />
          Back to Instrument Registry
        </button>
      </div>

      {/* Header Banner */}
      <div className="technical-card" style={{ marginBottom: '20px', borderLeft: '4px solid #1e3a8a' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{instrument.model}</h1>
              <StatusBadge status={instrument.status} />
              <span className="font-mono" style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', border: '1px solid #cbd5e1' }}>
                {instrument.id}
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              {instrument.manufacturer}
            </div>
            <div className="font-mono" style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Serial Number: <strong>{instrument.serialNumber}</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="btn-secondary" onClick={handleEditClick}>
              <Edit3 size={14} />
              Edit Instrument
            </button>
            <button className="btn-primary" onClick={handleStartTest}>
              <Play size={14} />
              Start New Test
            </button>
          </div>
        </div>
      </div>

      {/* 1. IDENTIFICATION SECTION */}
      <SectionHeader title="Identification" subtitle="Official Laboratory Registration & Manufacturer Specifications" />
      <div className="technical-card">
        <div className="kv-grid-4">
          <div className="kv-item">
            <span className="kv-label">Instrument ID</span>
            <span className="kv-value font-mono" style={{ color: '#1e3a8a', fontWeight: 700 }}>{instrument.id}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Manufacturer</span>
            <span className="kv-value">{instrument.manufacturer}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Model</span>
            <span className="kv-value font-mono">{instrument.model}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Serial Number</span>
            <span className="kv-value font-mono">{instrument.serialNumber}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Instrument Type</span>
            <span className="kv-value">{instrument.instrumentType}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Country of Manufacture</span>
            <span className="kv-value">{instrument.countryOfManufacture || 'India'}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Year of Manufacture</span>
            <span className="kv-value font-mono">{instrument.yearOfManufacture || '2025'}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Registration Date</span>
            <span className="kv-value font-mono">{instrument.registrationDate}</span>
          </div>
        </div>
      </div>

      {/* 2. METROLOGICAL CHARACTERISTICS */}
      <SectionHeader title="Metrological Characteristics" subtitle="OIML R76 Accuracy Limits & Capacity Boundaries" />
      <div className="technical-card">
        <div className="kv-grid-3">
          <div className="kv-item">
            <span className="kv-label">Accuracy Class</span>
            <span className="kv-value font-mono" style={{ fontWeight: 700 }}>{instrument.accuracyClass}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Maximum Capacity (Max)</span>
            <span className="kv-value font-mono" style={{ fontWeight: 700, color: '#0f172a' }}>{instrument.maxCapacity}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Minimum Capacity (Min)</span>
            <span className="kv-value font-mono">{instrument.minCapacity}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Verification Scale Interval (e)</span>
            <span className="kv-value font-mono">{instrument.scaleInterval_e}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Number of Verification Intervals (n)</span>
            <span className="kv-value font-mono">{instrument.scaleInterval_n || '5000'}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Number of Ranges</span>
            <span className="kv-value font-mono">{instrument.numberOfRanges || '1'}</span>
          </div>
        </div>
      </div>

      {/* 3. TECHNICAL DETAILS */}
      <SectionHeader title="Technical Details" subtitle="Load Cell Configuration, Display & Electrical Parameters" />
      <div className="technical-card">
        <div className="kv-grid-3">
          <div className="kv-item">
            <span className="kv-label">Load Cell Type</span>
            <span className="kv-value">{instrument.loadCellType}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Number of Load Cells</span>
            <span className="kv-value font-mono">{instrument.numberOfLoadCells}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Platform Size</span>
            <span className="kv-value font-mono">{instrument.platformSize}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Display Type</span>
            <span className="kv-value">{instrument.displayType}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Display Resolution</span>
            <span className="kv-value font-mono">{instrument.displayResolution}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Power Supply</span>
            <span className="kv-value">{instrument.powerSupply}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Frequency</span>
            <span className="kv-value font-mono">{instrument.frequency}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Operating Temperature</span>
            <span className="kv-value font-mono">{instrument.operatingTemperature}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Software / Hardware Version</span>
            <span className="kv-value font-mono">{instrument.softwareVersion} / {instrument.hardwareVersion}</span>
          </div>
        </div>
      </div>

      {/* 4. REFERENCE & CALIBRATION INFORMATION */}
      <SectionHeader title="Reference & Calibration" subtitle="Standard Traceability & Calibration Validity" />
      <div className="technical-card">
        <div className="kv-grid-4">
          <div className="kv-item">
            <span className="kv-label">Reference Equipment ID</span>
            <span className="kv-value font-mono" style={{ color: '#1e3a8a', fontWeight: 600 }}>{instrument.referenceEquipmentId}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Calibration Certificate No.</span>
            <span className="kv-value font-mono">{instrument.calibrationCertificateNo}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Calibration Date</span>
            <span className="kv-value font-mono">{instrument.calibrationDate}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Calibration Valid Until</span>
            <span className="kv-value font-mono" style={{ color: '#15803d', fontWeight: 600 }}>{instrument.calibrationValidUntil}</span>
          </div>
        </div>
      </div>

      {/* 5. PHOTOGRAPH / EVIDENCE */}
      <SectionHeader title="Instrument Evidence" subtitle="Attached Visual Photographic Records & Nameplate Data" />
      <div className="evidence-grid">
        <div className="evidence-box">
          <div className="evidence-placeholder-icon">
            <Image size={20} />
          </div>
          <div className="evidence-caption">Instrument Front View</div>
          <div className="evidence-meta">Uploaded: {instrument.evidenceFrontDate || '28 Sep 2026'}</div>
        </div>

        <div className="evidence-box">
          <div className="evidence-placeholder-icon">
            <FileText size={20} />
          </div>
          <div className="evidence-caption">Identification / Nameplate</div>
          <div className="evidence-meta">Uploaded: {instrument.evidenceNameplateDate || '28 Sep 2026'}</div>
        </div>
      </div>

      {/* 6. TEST HISTORY & SUMMARY */}
      <SectionHeader title="Test History" subtitle="Chronological OIML Evaluation Reports & Verification Records" />
      
      {/* Test History Summary Bar */}
      <div className="history-summary-bar">
        <div className="history-summary-item">
          <span className="history-summary-label">Total Evaluations:</span>
          <span className="history-summary-value font-mono">{instrument.testSummary?.totalEvaluations || 3}</span>
        </div>
        <div className="history-summary-item">
          <span className="history-summary-label">Last Evaluation:</span>
          <span className="history-summary-value font-mono">{instrument.testSummary?.lastEvaluationDate || '28 Sep 2026'}</span>
        </div>
        <div className="history-summary-item">
          <span className="history-summary-label">Previous Result:</span>
          <StatusBadge status={instrument.testSummary?.previousResult || 'PASS'} />
        </div>
        <div className="history-summary-item">
          <span className="history-summary-label">Current Evaluation:</span>
          <StatusBadge status={instrument.testSummary?.currentEvaluation || 'Under Review'} />
        </div>
      </div>

      {/* Test History Table */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Test Date</th>
              <th>Evaluation Type</th>
              <th>Engineer</th>
              <th>Result</th>
              <th style={{ textAlign: 'center' }}>Report</th>
            </tr>
          </thead>
          <tbody>
            {(instrument.testHistory || []).map((test, index) => (
              <tr key={index}>
                <td className="font-mono" style={{ fontWeight: 600, color: '#1e3a8a' }}>{test.testId}</td>
                <td className="font-mono">{test.testDate}</td>
                <td>{test.evaluationType}</td>
                <td>{test.engineer}</td>
                <td>
                  <StatusBadge status={test.result} />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button className="btn-text" onClick={() => onNavigate('/reports')}>
                    View ({test.reportNo})
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 7. ACTIVITY / AUDIT TIMELINE */}
      <SectionHeader title="Instrument Activity" subtitle="Audit Log Trail for Instrument Modifications & Test Events" />
      <ActivityTimeline activities={instrument.activities || []} />
    </div>
  );
};

export default InstrumentDetailPage;
