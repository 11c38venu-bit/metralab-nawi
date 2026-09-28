import React, { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import SummaryCard from '../components/SummaryCard';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { Search, RotateCcw } from 'lucide-react';

export const ReportsRepositoryPage = ({ reviews, onNavigate }) => {
  // Summary metrics
  const metrics = useMemo(() => {
    const total = reviews.length;
    const ready = reviews.filter(r => r.reviewStatus === 'Accepted for Reporting').length;
    const underReview = reviews.filter(r => r.reviewStatus === 'Under Review' || r.reviewStatus === 'Awaiting Review').length;
    const inProgress = reviews.filter(r => r.reviewStatus === 'Returned for Correction' || r.overallResult === 'Not Evaluated').length;
    return { total, ready, underReview, inProgress };
  }, [reviews]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filtered data for table
  const filtered = useMemo(() => {
    return reviews.filter(r => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        r.evaluationId.toLowerCase().includes(q) ||
        r.model.toLowerCase().includes(q) ||
        r.manufacturer.toLowerCase().includes(q) ||
        r.engineer.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || r.reviewStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reviews, searchQuery, statusFilter]);

  const columns = [
    { header: 'Evaluation ID', accessor: 'evaluationId', isMono: true, width: '140px' },
    { header: 'Instrument', accessor: 'model', isMono: true, width: '110px' },
    { header: 'Manufacturer', accessor: 'manufacturer' },
    { header: 'Engineer', accessor: 'engineer', width: '130px' },
    { header: 'Test Date', accessor: 'testDate', isMono: true, width: '110px' },
    { header: 'Overall Result', accessor: 'overallResult', width: '150px', render: row => <StatusBadge status={row.overallResult} /> },
    { header: 'Report Status', accessor: 'reviewStatus', width: '150px', render: row => <StatusBadge status={row.reviewStatus} /> },
    { header: 'Action', accessor: 'action', width: '120px', align: 'center', render: row => (
        <button
          className="btn-primary"
          style={{ padding: '3px 10px', fontSize: '11px' }}
          onClick={e => { e.stopPropagation(); onNavigate(`/reports/preview/${row.evaluationId}`); }}
        >
          View Report
        </button>
      )
    }
  ];

  return (
    <div className="reports-repo-page">
      {/* Page Header */}
      <SectionHeader
        title="Reports & Test Records"
        subtitle="Generated test reports and evaluation history"
      />

      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard label="Total Evaluations" value={metrics.total} note="All evaluations in the system" />
        <SummaryCard label="Reports Ready" value={metrics.ready} note="Accepted for reporting" />
        <SummaryCard label="Under Review" value={metrics.underReview} note="Pending technical review" />
        <SummaryCard label="In Progress" value={metrics.inProgress} note="Evaluations still being processed" />
      </div>

      {/* Filter Bar */}
      <div className="filter-bar-card">
        <div className="filter-row">
          <div className="search-box" style={{ width: '300px' }}>
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search Evaluation ID, Model, Engineer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <span className="filter-label">Report Status:</span>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Accepted for Reporting">Ready</option>
              <option value="Under Review">Under Review</option>
              <option value="Awaiting Review">Awaiting Review</option>
              <option value="Returned for Correction">Returned</option>
            </select>
          </div>
          {(searchQuery || statusFilter) && (
            <button
              className="btn-secondary"
              style={{ padding: '4px 10px' }}
              onClick={() => { setSearchQuery(''); setStatusFilter(''); }}
            >
              <RotateCcw size={12} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Reports Table */}
      <SectionHeader title="Report List" subtitle="All generated reports and their status" />
      <DataTable columns={columns} data={filtered} onRowClick={row => onNavigate(`/reports/preview/${row.evaluationId}`)} />
    </div>
  );
};

export default ReportsRepositoryPage;
