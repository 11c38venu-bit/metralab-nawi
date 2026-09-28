import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';

export const PlaceholderModule = ({ moduleName, path, onBackToDashboard }) => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-badge">METRALAB MODULE PLACEHOLDER</div>
      
      <h2 className="placeholder-title">Module Under Construction</h2>
      
      <p className="placeholder-desc">
        The <strong>{moduleName}</strong> module (<code className="font-mono">{path}</code>) is scheduled for incremental development in subsequent testing phases.
      </p>

      <div className="placeholder-spec-box">
        <strong>Upcoming System Capability Specification:</strong>
        <ul>
          <li>Interactive data filtering & export in ISO/IEC 17025 standard format.</li>
          <li>Formal metrological evaluation sheet generators.</li>
          <li>Multi-level approval workflows with digital signatures.</li>
        </ul>
      </div>

      <button className="btn-secondary" onClick={onBackToDashboard}>
        <ArrowLeft size={14} />
        Return to Dashboard
      </button>
    </div>
  );
};

export default PlaceholderModule;
