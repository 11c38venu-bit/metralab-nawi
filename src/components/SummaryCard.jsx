import React from 'react';

/**
 * Compact summary metric block for test workstation dashboards
 */
export const SummaryCard = ({ label, value, note, icon: Icon, badgeText, badgeType }) => {
  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <span>{label}</span>
        {Icon && <Icon size={16} strokeWidth={2} className="text-slate-400" />}
      </div>
      <div className="summary-card-value">{value}</div>
      {note && <div className="summary-card-footer">{note}</div>}
    </div>
  );
};

export default SummaryCard;
