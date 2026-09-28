import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import SummaryCard from '../components/SummaryCard';
import DataTable from '../components/DataTable';
import { MOCK_RULES, RULE_SET_INFO } from '../data/mockRules';

/**
 * Analytics page – lightweight prototype analytics using mock reviews data.
 * No external chart libraries; uses simple CSS bar visualizations.
 */
const AnalyticsPage = ({ reviews }) => {
  // Derive counts
  const totalEvaluations = reviews.length;
  const completed = reviews.filter(r => r.reviewStatus !== 'Awaiting Review').length;
  const awaiting = reviews.filter(r => r.reviewStatus === 'Awaiting Review').length;
  const reportsReady = reviews.filter(r => r.reviewStatus === 'Accepted for Reporting').length;

  // Distribution by result
  const resultDist = { PASS: 0, FAIL: 0, OTHER: 0 };
  reviews.forEach(r => {
    const res = r.overallResult.includes('PASS') ? 'PASS' : r.overallResult.includes('FAIL') ? 'FAIL' : 'OTHER';
    resultDist[res]++;
  });

  // Instrument class distribution
  const classDist = {};
  reviews.forEach(r => {
    const cls = r.accuracyClass || 'Unknown';
    classDist[cls] = (classDist[cls] || 0) + 1;
  });

  // Reviewer workload
  const reviewerWork = {};
  reviews.forEach(r => {
    const rev = r.reviewer || 'Unassigned';
    reviewerWork[rev] = (reviewerWork[rev] || 0) + 1;
  });

  const barStyle = (value, total) => ({
    width: `${(value / total) * 100}%`,
    backgroundColor: '#1e3a8a',
    height: '16px',
    borderRadius: '4px'
  });

  return (
    <div className="page-container">
      <SectionHeader title="Analytics" subtitle="Prototype analytics overview of evaluations and reviews" />
      <div className="summary-cards-grid">
        <SummaryCard title="Total Evaluations" value={totalEvaluations} />
        <SummaryCard title="Completed" value={completed} />
        <SummaryCard title="Awaiting Review" value={awaiting} />
        <SummaryCard title="Reports Ready" value={reportsReady} />
      </div>

      <h3>Result Distribution</h3>
      {Object.entries(resultDist).map(([key, val]) => (
        <div key={key} style={{ marginBottom: '8px' }}>
          <span>{key}: {val}</span>
          <div style={barStyle(val, totalEvaluations)} />
        </div>
      ))}

      <h3>Instrument Class Distribution</h3>
      {Object.entries(classDist).map(([cls, val]) => (
        <div key={cls} style={{ marginBottom: '8px' }}>
          <span>{cls}: {val}</span>
          <div style={barStyle(val, totalEvaluations)} />
        </div>
      ))}

      <h3>Reviewer Workload</h3>
      {Object.entries(reviewerWork).map(([rev, val]) => (
        <div key={rev} style={{ marginBottom: '8px' }}>
          <span>{rev}: {val}</span>
          <div style={barStyle(val, totalEvaluations)} />
        </div>
      ))}
    </div>
  );
};

export default AnalyticsPage;
