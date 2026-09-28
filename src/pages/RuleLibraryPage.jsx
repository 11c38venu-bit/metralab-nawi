import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import DataTable from '../components/DataTable';
import { MOCK_RULES, RULE_SET_INFO } from '../data/mockRules';
import { Dialog } from '../components/Dialog'; // assume a simple Dialog component exists, else use native modal

/**
 * Rule Library page – displays prototype rule configuration.
 * Uses MOCK_RULES and RULE_SET_INFO from data.
 */
const RuleLibraryPage = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTestType, setFilterTestType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedRule, setSelectedRule] = useState(null);

  const rulesArray = Object.values(MOCK_RULES);

  const filtered = rulesArray.filter(rule => {
    const matchesSearch =
      rule.ruleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rule.criterion && rule.criterion.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTestType = filterTestType ? rule.testType === filterTestType : true;
    const matchesStatus = filterStatus ? rule.status === filterStatus : true;
    return matchesSearch && matchesTestType && matchesStatus;
  });

  const columns = [
    { header: 'Rule ID', accessor: 'ruleId', isMono: true },
    { header: 'Test Type', accessor: 'testType' },
    { header: 'Reference', accessor: 'reference' },
    { header: 'Version', accessor: 'ruleVersion' },
    { header: 'Criterion', accessor: 'criterion' },
    { header: 'Criterion Type', accessor: 'criterionType' },
    { header: 'Verification', accessor: 'verified', render: r => (r.verified ? 'Verified' : 'Not Verified') },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Details',
      accessor: 'details',
      render: row => (
        <button className="btn-secondary" onClick={e => { e.stopPropagation(); setSelectedRule(row); }}>
          View
        </button>
      )
    }
  ];

  return (
    <div className="page-container">
      <SectionHeader
        title="Rule Library"
        subtitle="Version‑controlled technical and regulatory rule configuration."
        actionButton={
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search rules…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-search"
            />
          </div>
        }
      />
      <div className="filters-bar">
        <select value={filterTestType} onChange={e => setFilterTestType(e.target.value)} className="select-filter">
          <option value="">All Test Types</option>
          {Array.from(new Set(rulesArray.map(r => r.testType))).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="select-filter">
          <option value="">All Statuses</option>
          {Array.from(new Set(rulesArray.map(r => r.status))).map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>
      <DataTable columns={columns} data={filtered} onRowClick={row => setSelectedRule(row)} />

      {selectedRule && (
        <Dialog onClose={() => setSelectedRule(null)} title={`Rule ${selectedRule.ruleId} Details`}>
          <pre className="rule-detail" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
{JSON.stringify(selectedRule, null, 2)}
          </pre>
        </Dialog>
      )}
    </div>
  );
};

export default RuleLibraryPage;
