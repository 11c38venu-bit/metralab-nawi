import React from 'react';

/**
 * Restrained technical status indicator for metrology test states
 * Types: pass/completed, fail/attention, progress/registered, review
 */
export const StatusBadge = ({ status, customLabel }) => {
  if (!status) return null;

  const normalized = status.toLowerCase().trim();
  let badgeClass = 'review';
  let label = customLabel || status;

  if (normalized.includes('pass') || normalized.includes('completed') || normalized.includes('approved') || normalized.includes('verified')) {
    badgeClass = 'pass';
  } else if (normalized.includes('fail') || normalized.includes('attention') || normalized.includes('rejected')) {
    badgeClass = 'fail';
  } else if (normalized.includes('progress') || normalized.includes('registered') || normalized.includes('testing')) {
    badgeClass = 'progress';
  } else if (normalized.includes('review') || normalized.includes('pending')) {
    badgeClass = 'review';
  }

  return (
    <span className={`status-badge ${badgeClass}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
