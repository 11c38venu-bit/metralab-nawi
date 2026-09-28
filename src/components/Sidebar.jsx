import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  History, 
  Scale, 
  FileText, 
  FileCheck, 
  BookOpen, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';
import { LAB_INFO } from '../data/mockData';

export const Sidebar = ({ currentPath, onNavigate }) => {
  const [testCasesOpen, setTestCasesOpen] = useState(true);

  const isTestCasesActive = currentPath.startsWith('/test-cases');

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Scale size={20} color="#3b82f6" />
          <span>METRALAB</span>
        </div>
        <div className="sidebar-subtitle">
          NAWI Type Evaluation & Test Report Management
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        <div className="nav-group-label">Core Modules</div>
        
        {/* Dashboard */}
        <a 
          className={`nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('/dashboard')}
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </a>

        {/* Test Cases Group */}
        <div>
          <a 
            className={`nav-item ${isTestCasesActive ? 'active' : ''}`}
            onClick={() => {
              onNavigate('/test-cases');
              setTestCasesOpen(!testCasesOpen);
            }}
            style={{ justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FlaskConical size={16} />
              <span>Test Cases</span>
            </div>
            {testCasesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </a>

          {testCasesOpen && (
            <div className="nav-subgroup">
              <a 
                className={`nav-subitem ${currentPath === '/test-cases/new' ? 'active' : ''}`}
                onClick={() => onNavigate('/test-cases/new')}
              >
                <PlusCircle size={13} />
                <span>New Test</span>
              </a>
              <a 
                className={`nav-subitem ${currentPath === '/test-cases/in-progress' ? 'active' : ''}`}
                onClick={() => onNavigate('/test-cases/in-progress')}
              >
                <Clock size={13} />
                <span>In Progress</span>
              </a>
              <a 
                className={`nav-subitem ${currentPath === '/test-cases/completed' ? 'active' : ''}`}
                onClick={() => onNavigate('/test-cases/completed')}
              >
                <CheckCircle2 size={13} />
                <span>Completed</span>
              </a>
              <a 
                className={`nav-subitem ${currentPath === '/test-cases/history' ? 'active' : ''}`}
                onClick={() => onNavigate('/test-cases/history')}
              >
                <History size={13} />
                <span>History</span>
              </a>
            </div>
          )}
        </div>

        {/* Instruments */}
        <a 
          className={`nav-item ${currentPath === '/instruments' ? 'active' : ''}`}
          onClick={() => onNavigate('/instruments')}
        >
          <Scale size={16} />
          <span>Instruments</span>
        </a>

        {/* Reports */}
        <a 
          className={`nav-item ${currentPath === '/reports' ? 'active' : ''}`}
          onClick={() => onNavigate('/reports')}
        >
          <FileText size={16} />
          <span>Reports</span>
        </a>

        {/* Reviews */}
        <a 
          className={`nav-item ${currentPath === '/reviews' ? 'active' : ''}`}
          onClick={() => onNavigate('/reviews')}
        >
          <FileCheck size={16} />
          <span>Reviews</span>
        </a>

        <div className="nav-group-label" style={{ marginTop: '12px' }}>Knowledge & Audit</div>

        {/* Rule Library */}
        <a 
          className={`nav-item ${currentPath === '/rules' ? 'active' : ''}`}
          onClick={() => onNavigate('/rules')}
        >
          <BookOpen size={16} />
          <span>Rule Library</span>
        </a>

        {/* Analytics */}
        <a 
          className={`nav-item ${currentPath === '/analytics' ? 'active' : ''}`}
          onClick={() => onNavigate('/analytics')}
        >
          <BarChart3 size={16} />
          <span>Analytics</span>
        </a>

        {/* Audit Trail */}
        <a 
          className={`nav-item ${currentPath === '/audit' ? 'active' : ''}`}
          onClick={() => onNavigate('/audit')}
        >
          <ShieldCheck size={16} />
          <span>Audit Trail</span>
        </a>

        {/* Settings */}
        <a 
          className={`nav-item ${currentPath === '/settings' ? 'active' : ''}`}
          onClick={() => onNavigate('/settings')}
        >
          <Settings size={16} />
          <span>Settings</span>
        </a>
      </nav>

      {/* User Footer Profile Box */}
      <div className="sidebar-user-footer">
        <div className="user-name">{LAB_INFO.currentUser.name}</div>
        <div className="user-role">{LAB_INFO.currentUser.role}</div>
        <div className="user-lab">{LAB_INFO.currentUser.lab}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
