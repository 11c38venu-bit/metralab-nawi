import React from 'react';
import SectionHeader from '../components/SectionHeader';
import SummaryCard from '../components/SummaryCard';
import DataTable from '../components/DataTable';
import ActivityTimeline from '../components/ActivityTimeline';
import { 
  TESTING_ACTIVITY_STATS, 
  MOCK_TEST_CASES, 
  RECENT_ACTIVITIES 
} from '../data/mockData';
import { Clock, FileCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const DashboardPage = ({ searchQuery }) => {
  // Table column configuration matching exact user spec
  const currentWorkColumns = [
    { header: 'Test ID', accessor: 'id', isMono: true, width: '150px' },
    { header: 'Instrument', accessor: 'instrumentModel', width: '130px' },
    { header: 'Manufacturer', accessor: 'manufacturer' },
    { header: 'Engineer', accessor: 'engineer', width: '140px' },
    { header: 'Test Date', accessor: 'testDate', width: '120px' },
    { header: 'Status', accessor: 'status', width: '140px' }
  ];

  // Filter test cases if search query exists
  const filteredData = searchQuery
    ? MOCK_TEST_CASES.filter((item) =>
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.instrumentModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_TEST_CASES;

  return (
    <div className="dashboard-page">
      {/* 1. TOP SECTION: Testing Activity Summary Blocks */}
      <SectionHeader title="Testing Activity" subtitle="National Metrology Test Laboratory Overview" />
      
      <div className="summary-grid">
        <SummaryCard 
          label="Tests in Progress" 
          value={TESTING_ACTIVITY_STATS.testsInProgress}
          note="Active environmental & accuracy evaluations"
          icon={Clock}
        />
        <SummaryCard 
          label="Awaiting Review" 
          value={TESTING_ACTIVITY_STATS.awaitingReview}
          note="Submitted for Metrologists validation"
          icon={FileCheck}
        />
        <SummaryCard 
          label="Completed" 
          value={TESTING_ACTIVITY_STATS.completed}
          note="Evaluated & pattern approved this quarter"
          icon={CheckCircle2}
        />
        <SummaryCard 
          label="Reports Requiring Attention" 
          value={TESTING_ACTIVITY_STATS.reportsRequiringAttention}
          note="MPE tolerance or tilting non-compliance"
          icon={AlertTriangle}
        />
      </div>

      {/* 2. MIDDLE SECTION: Current Work Table */}
      <SectionHeader 
        title="Current Work" 
        subtitle="Active NAWI Evaluation Test Assignments"
      />

      <DataTable 
        columns={currentWorkColumns} 
        data={filteredData}
      />

      {/* 3. BOTTOM SECTION: Recent Activity Timeline */}
      <SectionHeader 
        title="Recent Activity" 
        subtitle="Chronological Log of Laboratory Testing & Report Events"
      />

      <ActivityTimeline activities={RECENT_ACTIVITIES} />
    </div>
  );
};

export default DashboardPage;
