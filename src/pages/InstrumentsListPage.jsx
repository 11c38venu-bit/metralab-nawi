import React, { useState, useMemo } from 'react';
import SectionHeader from '../components/SectionHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { Plus, Search, RotateCcw, Filter } from 'lucide-react';
import { MOCK_MANUFACTURERS, INSTRUMENT_TYPES } from '../data/mockData';

export const InstrumentsListPage = ({ instruments, onNavigate, searchQuery, setSearchQuery }) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Combined search and filtering logic
  const filteredInstruments = useMemo(() => {
    return instruments.filter((inst) => {
      // Search matching: Instrument ID, Model, Serial number, Manufacturer
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        (inst.id && inst.id.toLowerCase().includes(query)) ||
        (inst.model && inst.model.toLowerCase().includes(query)) ||
        (inst.serialNumber && inst.serialNumber.toLowerCase().includes(query)) ||
        (inst.manufacturer && inst.manufacturer.toLowerCase().includes(query));

      // Filter matching
      const matchesMfg = !selectedManufacturer || inst.manufacturer === selectedManufacturer;
      const matchesClass = !selectedClass || (inst.accuracyClassCode && inst.accuracyClassCode === selectedClass) || (inst.accuracyClass && inst.accuracyClass.includes(selectedClass));
      const matchesType = !selectedType || (inst.instrumentType && inst.instrumentType.toLowerCase().includes(selectedType.toLowerCase()));
      const matchesStatus = !selectedStatus || inst.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesMfg && matchesClass && matchesType && matchesStatus;
    });
  }, [instruments, searchQuery, selectedManufacturer, selectedClass, selectedType, selectedStatus]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedManufacturer('');
    setSelectedClass('');
    setSelectedType('');
    setSelectedStatus('');
  };

  const hasActiveFilters = searchQuery || selectedManufacturer || selectedClass || selectedType || selectedStatus;

  // Exact DataTable columns specified by user:
  // | Instrument ID | Model | Manufacturer | Serial Number | Class | Max | Min | e | Status | Last Test |
  const columns = [
    { header: 'Instrument ID', accessor: 'id', isMono: true, width: '130px' },
    { header: 'Model', accessor: 'model', isMono: true, width: '110px' },
    { header: 'Manufacturer', accessor: 'manufacturer' },
    { header: 'Serial Number', accessor: 'serialNumber', isMono: true, width: '150px' },
    { 
      header: 'Class', 
      accessor: 'accuracyClassCode', 
      isMono: true, 
      width: '70px',
      render: (row) => row.accuracyClassCode || row.accuracyClass
    },
    { header: 'Max', accessor: 'maxCapacity', isMono: true, width: '90px' },
    { header: 'Min', accessor: 'minCapacity', isMono: true, width: '80px' },
    { header: 'e', accessor: 'scaleInterval_e', isMono: true, width: '80px' },
    { 
      header: 'Status', 
      accessor: 'status', 
      width: '120px',
      render: (row) => <StatusBadge status={row.status} />
    },
    { header: 'Last Test', accessor: 'lastTestDate', isMono: true, width: '110px' }
  ];

  return (
    <div className="instruments-list-page">
      {/* Page Header */}
      <SectionHeader 
        title="Instrument Registry" 
        subtitle="Registered non-automatic weighing instruments"
        actionButton={
          <button className="btn-primary" onClick={() => onNavigate('/instruments/new')}>
            <Plus size={14} />
            Register Instrument
          </button>
        }
      />

      {/* Compact Filter Bar */}
      <div className="filter-bar-card">
        <div className="filter-row">
          {/* Search Box */}
          <div className="search-box" style={{ width: '280px' }}>
            <Search size={14} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search model, serial number, manufacturer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Manufacturer Filter */}
          <div className="filter-group">
            <span className="filter-label">Manufacturer:</span>
            <select 
              className="filter-select"
              value={selectedManufacturer} 
              onChange={(e) => setSelectedManufacturer(e.target.value)}
            >
              <option value="">All Manufacturers</option>
              {MOCK_MANUFACTURERS.map((mfg) => (
                <option key={mfg.id} value={mfg.name}>{mfg.name}</option>
              ))}
            </select>
          </div>

          {/* Accuracy Class Filter */}
          <div className="filter-group">
            <span className="filter-label">Class:</span>
            <select 
              className="filter-select"
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All Classes</option>
              <option value="I">Class I</option>
              <option value="II">Class II</option>
              <option value="III">Class III</option>
              <option value="IIII">Class IIII</option>
            </select>
          </div>

          {/* Instrument Type Filter */}
          <div className="filter-group">
            <span className="filter-label">Type:</span>
            <select 
              className="filter-select"
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Platform">Platform Scale</option>
              <option value="Bench">Bench Scale</option>
              <option value="Weighbridge">Weighbridge</option>
              <option value="Electronic Scale">Electronic Scale</option>
              <option value="Micro-Balance">Micro-Balance</option>
              <option value="Retail">Retail Scale</option>
              <option value="Crane">Crane Scale</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            <select 
              className="filter-select"
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Evaluation">Under Evaluation</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button className="btn-secondary" style={{ padding: '4px 10px' }} onClick={handleClearFilters}>
              <RotateCcw size={12} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Instruments DataTable or Empty State */}
      {filteredInstruments.length > 0 ? (
        <DataTable 
          columns={columns} 
          data={filteredInstruments}
          onRowClick={(row) => onNavigate(`/instruments/${row.id}`)}
        />
      ) : (
        <div className="placeholder-container" style={{ margin: '20px auto', padding: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
            No instruments found
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
            Try changing the search or filter criteria.
          </p>
          <button className="btn-secondary" onClick={handleClearFilters}>
            <RotateCcw size={13} />
            Reset Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default InstrumentsListPage;
