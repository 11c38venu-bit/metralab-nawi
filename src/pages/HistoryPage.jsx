import React from 'react';
import SectionHeader from '../components/SectionHeader';
import SummaryCard from '../components/SummaryCard';
import DataTable from '../components/DataTable';


/**
 * Test History page – displays completed evaluations and generated reports.
 * Uses the existing `reviews` state as the source of truth.
 */
const HistoryPage = ({ reviews, onNavigate }) => {
  // Completed evaluations are those with a final status (Accepted for Reporting, Returned for Correction, etc.)
  const completed = reviews.filter(r => r.reviewStatus !== 'Awaiting Review');
  const passed = completed.filter(r => r.overallResult.includes('PASS'));
  const failed = completed.filter(r => r.overallResult.includes('FAIL'));
  const requiresReview = completed.filter(r => r.reviewStatus === 'Returned for Correction');

  const columns = [
    { header: 'Evaluation ID', accessor: 'evaluationId', isMono: true },
    { header: 'Instrument', accessor: 'instrumentId', isMono: true },
    { header: 'Model', accessor: 'model' },
    { header: 'Serial Number', accessor: 'serialNumber', isMono: true },
    { header: 'Date', accessor: 'testDate' },
    { header: 'Result', accessor: 'overallResult' },
    { header: 'Reviewer', accessor: 'reviewer' },
    {
      header: 'Report',
      accessor: 'reportNo',
      render: row => (
        <button
          className="btn-primary"
          onClick={e => {
            e.stopPropagation();
            onNavigate(`/reports/preview/${row.evaluationId}`);
          }}
        >
          View Report
        </button>
      )
    },
    {
      header: 'Details',
      accessor: 'details',
      render: row => (
        <button
          className="btn-secondary"
          onClick={e => {
            e.stopPropagation();
            onNavigate(`/reviews/${row.evaluationId}`);
          }}
        >
          View Evaluation
        </button>
      )
    }
  ];

  return (
    <div className="page-container">
      <SectionHeader
        title="Test History"
        subtitle="Completed NAWI evaluations and generated reports are listed here."
      />
      <div className="summary-cards-grid">
        <SummaryCard title="Total Completed" value={completed.length} />
        <SummaryCard title="Passed" value={passed.length} />
        <SummaryCard title="Failed" value={failed.length} />
        <SummaryCard title="Requires Review" value={requiresReview.length} />
      </div>
      <DataTable
        columns={columns}
        data={completed}
        onRowClick={row => onNavigate(`/reviews/${row.evaluationId}`)}
      />
    </div>
  );
};

export default HistoryPage;
