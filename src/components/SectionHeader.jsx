import React from 'react';

/**
 * Standard section header for lab modules
 */
export const SectionHeader = ({ title, subtitle, actionButton }) => {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-title">
          {title}
          {subtitle && <span className="section-subtitle">— {subtitle}</span>}
        </h2>
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};

export default SectionHeader;
