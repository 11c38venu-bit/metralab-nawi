import React, { useState, useMemo } from 'react';
import SectionHeader from '../components/SectionHeader';
import SummaryCard from '../components/SummaryCard';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { FileCheck, RotateCcw, CheckCircle2, Clock, Search } from 'lucide-react';

export const ReviewsPage = ({ reviews, onNavigate, searchQuery, setSearchQuery }) => {
  const [statusFilter, setStatusFilter] = useState('');

  // Calculate dynamic summary metrics from reviews state
  const metrics = useMemo(() => {
    const awaiting = reviews.filter((r) => r.reviewStatus === 'Awaiting Review' || r.reviewStatus === 'Under Review').length;
    const returned = reviews.filter((r) => r.reviewStatus === 'Returned for Correction').length;
    const accepted = reviews.filter((r) => r.reviewStatus === 'Accepted for Reporting').length;
    const reviewedToday = accepted + returned;

    return { awaiting, returned, reviewedToday, accepted };
  }, [reviews]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        r.evaluationId.toLowerCase().includes(q) ||
        r.model.toLowerCase().includes(q) ||
        r.manufacturer.toLowerCase().includes(q) ||
        r.engineer.toLowerCase().includes(q) ||
        r.reviewStatus.toLowerCase().includes(q);

      const matchesStatus = !statusFilter || r.reviewStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reviews, searchQuery, statusFilter]);

  // Table columns
  const columns = [
    { header: 'Evaluation ID', accessor: 'evaluationId', isMono: true, width: '140px' },
    { header: 'Instrument', accessor: 'model', isMono: true, width: '110px' },
    { header: 'Manufacturer', accessor: 'manufacturer' },
    { header: 'Engineer', accessor: 'engineer', width: '130px' },
    { header: 'Test Date', accessor: 'testDate', isMono: true, width: '110px' },
    { header: 'Tests', accessor: 'testsCompletedText', isMono: true, width: '70px', align: 'center' },
    { 
      header: 'Overall Result', 
      accessor: 'overallResult',
      width: '180px',
      render: (row) => <StatusBadge status={row.overallResult} />
    },
    { 
      header: 'Review Status', 
      accessor: 'reviewStatus',
      width: '160px',
      render: (row) => <StatusBadge status={row.reviewStatus} />
    },
    { header: 'Last Updated', accessor: 'lastUpdated', isMono: true, width: '150px' },
    { 
      header: 'Action', 
      accessor: 'action',
      width: '110px',
      align: 'center',
      render: (row) => (
        <button 
          className="btn-primary" 
          style={{ padding: '3px 10px', fontSize: '11px' }}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(`/reviews/${row.evaluationId}`);
          }}
        >
          Open Review
        </button>
      )
    }
  ];

  return (
    <div className="reviews-page">
      {/* Page Header */}
      <SectionHeader 
        title="Technical Review" 
        subtitle="Evaluation reports awaiting technical review and approval" 
      />

      {/* TOP 4 SUMMARY METRIC CARDS */}
      <div className="summary-grid">
        <SummaryCard 
          label="Awaiting Review" 
          value={metrics.awaiting}
          note="Completed evaluations queued for inspection"
          icon={Clock}
        />
        <SummaryCard 
          label="Returned for Correction" 
          value={metrics.returned}
          note="Evaluations sent back for issue resolution"
          icon={RotateCcw}
        />
        <SummaryCard 
          label="Reviewed Today" 
          value={metrics.reviewedToday}
          note="Total technical inspections completed today"
          icon={FileCheck}
        />
        <SummaryCard 
          label="Accepted for Reporting" 
          value={metrics.accepted}
          note="Passed technical review & ready for report generation"
          icon={CheckCircle2}
        />
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <span className="filter-label">Review Status:</span>
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Review Statuses</option>
              <option value="Awaiting Review">Awaiting Review</option>
              <option value="Under Review">Under Review</option>
              <option value="Returned for Correction">Returned for Correction</option>
              <option value="Accepted for Reporting">Accepted for Reporting</option>
            </select>
          </div>

          {(searchQuery || statusFilter) && (
            <button 
              className="btn-secondary" 
              style={{ padding: '4px 10px' }}
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('');
              }}
            >
              <RotateCcw size={12} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Review Queue DataTable */}
      <SectionHeader title="Review Queue" subtitle="Technical Inspection Workstation Table" />
      
      <DataTable 
        columns={columns}
        data={filteredReviews}
        onRowClick={(row) => onNavigate(`/reviews/${row.evaluationId}`)}
      />
    </div>
  );
};

export default ReviewsPage;
