import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import DataTable from '../components/DataTable';
import { MOCK_AUDIT_EVENTS } from '../data/mockAudit';

/**
 * Audit Trail page – prototype view of system activity.
 * Uses mock audit data; provides search and simple filters.
 */
const AuditTrailPage = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterModule, setFilterModule] = useState('');

  // Derive distinct values for filters
  const eventTypes = Array.from(new Set(MOCK_AUDIT_EVENTS.map(e => e.action)));
  const users = Array.from(new Set(MOCK_AUDIT_EVENTS.map(e => e.user)));
  const modules = Array.from(new Set(MOCK_AUDIT_EVENTS.map(e => e.module)));

  const filtered = MOCK_AUDIT_EVENTS.filter(event => {
    const matchesSearch =
      event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.object?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent ? event.action === filterEvent : true;
    const matchesUser = filterUser ? event.user === filterUser : true;
    const matchesModule = filterModule ? event.module === filterModule : true;
    return matchesSearch && matchesEvent && matchesUser && matchesModule;
  });

  const columns = [
    { header: 'Timestamp', accessor: 'timestamp', isMono: true },
    { header: 'User', accessor: 'user', isMono: true },
    { header: 'Module', accessor: 'module' },
    { header: 'Action', accessor: 'action' },
    { header: 'Object', accessor: 'object' },
    { header: 'Details', accessor: 'details' }
  ];

  return (
    <div className="page-container">
      <SectionHeader
        title="Audit Trail"
        subtitle="Prototype audit log of system activity (non‑persistent)"
        actionButton={
          <input
            type="text"
            placeholder="Search audit…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-search"
          />
        }
      />
      <div className="filters-bar" style={{ marginBottom: '12px' }}>
        <select value={filterEvent} onChange={e => setFilterEvent(e.target.value)} className="select-filter">
          <option value="">All Events</option>
          {eventTypes.map(ev => (
            <option key={ev} value={ev}>{ev}</option>
          ))}
        </select>
        <select value={filterUser} onChange={e => setFilterUser(e.target.value)} className="select-filter">
          <option value="">All Users</option>
          {users.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <select value={filterModule} onChange={e => setFilterModule(e.target.value)} className="select-filter">
          <option value="">All Modules</option>
          {modules.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
};

export default AuditTrailPage;
