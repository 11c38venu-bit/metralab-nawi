import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { LAB_INFO } from '../data/mockData';

const PAGE_TITLES = {
  '/dashboard': 'Laboratory Dashboard',
  '/test-cases': 'NAWI Test Cases Registry',
  '/test-cases/new': 'New NAWI Type Evaluation Test',
  '/test-cases/in-progress': 'Tests Currently In Progress',
  '/test-cases/completed': 'Completed Test Cases',
  '/test-cases/history': 'Test Execution History & Archives',
  '/instruments': 'NAWI Instruments Database',
  '/reports': 'Type Evaluation Test Reports',
  '/reviews': 'Technical Report Reviews',
  '/rules': 'OIML R76 & Legal Metrology Rule Library',
  '/analytics': 'Laboratory Workload & Compliance Analytics',
  '/audit': 'System Audit Trail & Calibration Logs',
  '/settings': 'Laboratory Workstation Settings'
};

export const Topbar = ({ currentPath, searchQuery, setSearchQuery }) => {
  const pageTitle = PAGE_TITLES[currentPath] || 'Metrology Workstation';

  return (
    <header className="topbar">
      {/* Left: Page Title & Workstation Indicator */}
      <div className="topbar-left">
        <h1 className="page-title">{pageTitle}</h1>
        <div className="lab-status-tag">
          <span className="status-dot-green"></span>
          <span>NMTL-LAB-01 | OIML R76 Ready</span>
        </div>
      </div>

      {/* Right: Search, Notification, User */}
      <div className="topbar-right">
        {/* Search box */}
        <div className="search-box">
          <Search size={14} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Test ID, Model, Serial..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Notifications */}
        <button className="topbar-action-btn" title="System Notifications">
          <Bell size={16} />
          <span className="notification-badge-dot"></span>
        </button>

        {/* User Pill */}
        <div className="topbar-user-pill">
          <User size={14} className="text-slate-600" />
          <span>{LAB_INFO.currentUser.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
