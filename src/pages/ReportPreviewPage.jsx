// src/pages/ReportPreviewPage.jsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import StatusBadge from '../components/StatusBadge';

/**
 * ReportPreviewPage – renders a printable technical test report for a given evaluation.
 * Props:
 *   evaluationId: string – identifier of the evaluation to preview.
 *   reviews: array – mock review data (includes evaluation details).
 *   evidence: array – all evidence items.
 *   onNavigate: function – navigation handler (used for back button).
 */
export const ReportPreviewPage = ({ evaluationId, reviews, evidence, onNavigate }) => {
  const evaluation = reviews.find(r => r.evaluationId === evaluationId);
  if (!evaluation) return <div>Evaluation not found.</div>;

  const relatedEvidence = evidence.filter(e => e.evaluationId === evaluationId);

  const handlePrint = () => window.print();
  const handlePdf = () => alert('PDF export is available in the production implementation.');
  const handleWord = () => alert('Editable report export is available in the production implementation.');

  return (
    <div className="report-preview" style={{ maxWidth: '850px', margin: '0 auto', padding: '24px', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', color: '#0F172A' }}>
      {/* Header Actions */}
      <div style={{ textAlign: 'right', marginBottom: '12px' }}>
        <button className="btn-link" onClick={handlePrint} style={{ marginRight: '8px' }}>Print Preview</button>
        <button className="btn-link" onClick={handlePdf} style={{ marginRight: '8px' }}>Download PDF</button>
        <button className="btn-link" onClick={handleWord}>Export Word</button>
      </div>

      {/* Report Header */}
      <div style={{ borderBottom: '2px solid #1E3A8A', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#1E3A8A' }}>METRALAB</h1>
        <p style={{ margin: 0, fontSize: '14px' }}>National Metrology Test Laboratory</p>
        <h2 style={{ margin: '12px 0 4px', fontSize: '20px', fontWeight: 'normal' }}>TEST REPORT</h2>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Non‑Automatic Weighing Instrument</h3>
        <p style={{ margin: '8px 0 0', fontSize: '14px' }}><strong>Report / Evaluation No:</strong> {evaluation.evaluationId}</p>
        <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Status:</strong> {evaluation.reviewStatus}</p>
      </div>

      {/* Laboratory Information */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Laboratory Information</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <div>Laboratory: {evaluation.laboratoryName}</div>
          <div>Test Room: {evaluation.testRoom}</div>
          <div>Test Engineer: {evaluation.engineer}</div>
          <div>Reviewer: {evaluation.reviewer}</div>
          <div>Evaluation Date: {evaluation.testDate}</div>
        </div>
      </section>

      {/* Instrument Identification */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Instrument Identification</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
          <div>Instrument ID: {evaluation.instrumentId}</div>
          <div>Manufacturer: {evaluation.manufacturer}</div>
          <div>Model: {evaluation.model}</div>
          <div>Serial Number: {evaluation.serialNumber}</div>
          <div>Instrument Type: {evaluation.instrumentType || 'N/A'}</div>
          <div>Country of Manufacture: {evaluation.countryOfManufacture || 'N/A'}</div>
          <div>Year of Manufacture: {evaluation.yearOfManufacture || 'N/A'}</div>
        </div>
      </section>

      {/* Metrological Characteristics */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Metrological Characteristics</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <div>Accuracy Class: {evaluation.accuracyClass}</div>
          <div>Max Capacity: {evaluation.maxCapacity}</div>
          <div>Min Capacity: {evaluation.minCapacity}</div>
          <div>Scale Interval (e): {evaluation.scaleInterval_e}</div>
          <div>Number of Verification Intervals: {evaluation.verificationIntervals || 'N/A'}</div>
          <div>Number of Ranges: {evaluation.numberOfRanges || 'N/A'}</div>
        </div>
      </section>

      {/* Regulatory / Technical Basis */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Regulatory / Technical Basis</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Legal Metrology Act, 2009</li>
          <li>Legal Metrology (General) Rules, 2011</li>
          <li>OIML Recommendation R 76</li>
        </ul>
        <p style={{ marginTop: '4px' }}><strong>Rule Set:</strong> {evaluation.ruleSet}</p>
        <p style={{ fontStyle: 'italic', fontSize: '12px' }}>
          Prototype report generated from configured demonstration criteria. Production deployment requires validated, version‑controlled regulatory criteria and approved report templates.
        </p>
      </section>

      {/* Laboratory Conditions */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Laboratory Conditions</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <div>Temperature: {evaluation.temperature}</div>
          <div>Relative Humidity: {evaluation.humidity}</div>
          <div>Atmospheric Pressure: {evaluation.pressure}</div>
          <div>Electrical Supply: {evaluation.supplyVoltage}</div>
          <div>Reference Equipment ID: {evaluation.referenceEquipment}</div>
          <div>Calibration Certificate: {evaluation.calibrationCert}</div>
          <div>Calibration Valid Until: {evaluation.calibrationValidUntil}</div>
        </div>
      </section>

      {/* Test Results */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Test Results</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Test</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Reference</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Observations / Result</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Configured Criterion</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Evaluation Result</th>
            </tr>
          </thead>
          <tbody>
            {evaluation.tests?.map((t, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{t.testName}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{t.reference || '—'}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{t.observations || '—'}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{t.criterion || '—'}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{t.result || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Calculation Summary */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Calculation Summary</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Maximum Error: {evaluation.calculation?.maxError || 'Not evaluated'}</li>
          <li>Minimum Error: {evaluation.calculation?.minError || 'Not evaluated'}</li>
          <li>Error Range: {evaluation.calculation?.errorRange || 'Not evaluated'}</li>
          <li>Maximum Deviation: {evaluation.calculation?.maxDeviation || 'Not evaluated'}</li>
          <li>Creep Change: {evaluation.calculation?.creepChange || 'Not evaluated'}</li>
          <li>Warm‑up Drift: {evaluation.calculation?.warmupDrift || 'Not evaluated'}</li>
        </ul>
      </section>

      {/* Evidence */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Evidence &amp; Supporting Documents</h4>
        {relatedEvidence.length === 0 ? (
          <p>No supporting documents attached.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Category</th>
                <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>File Name</th>
                <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Type</th>
                <th style={{ border: '1px solid #cbd5e1', padding: '4px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {relatedEvidence.map(ev => (
                <tr key={ev.id}>
                  <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{ev.category}</td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{ev.fileName}</td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{ev.fileType}</td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '4px' }}>{ev.uploadedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Review Information */}
      <section style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Review Information</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Assigned Engineer: {evaluation.engineer}</li>
          <li>Reviewer: {evaluation.reviewer}</li>
          <li>Review Status: {evaluation.reviewStatus}</li>
          <li>Reviewer Comments: {evaluation.comments?.length ? evaluation.comments.map(c => `${c.author} (${c.date}): ${c.text}`).join(' | ') : 'None'}</li>
          <li>Review Flags: {evaluation.flags?.length ? evaluation.flags.map(f => `[${f.category}] ${f.note}`).join(' | ') : 'None'}</li>
        </ul>
      </section>

      {/* Back Button */}
      <div style={{ textAlign: 'right', marginTop: '24px' }}>
        <button className="btn-primary" onClick={() => onNavigate('/reviews')}>Back to Reviews</button>
      </div>
    </div>
  );
};

export default ReportPreviewPage;
