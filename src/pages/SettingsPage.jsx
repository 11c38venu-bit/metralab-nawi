import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import SummaryCard from '../components/SummaryCard';

/**
 * Settings page prototype – all data lives in local component state.
 * Provides several grouped sections with input fields and Save / Reset actions.
 */
const SettingsPage = ({ onNavigate }) => {
  // Default mock values – could be extracted to a constants file later.
  const defaultState = {
    labProfile: {
      name: 'Metralab Ltd.',
      code: 'MTL001',
      address: '123 Science Ave, Bangalore, India',
      contact: '+91 98765 43210',
    },
    appConfig: {
      appName: 'METRALAB Demo',
      environment: 'Development',
      ruleSetVersion: 'v1.0',
      defaultEvaluationType: 'Standard',
    },
    workflowDefaults: {
      engineer: 'Venu Prasath',
      reviewer: 'Dr. Rajesh Kumar',
      priority: 'Normal',
    },
    reportConfig: {
      labNameOnReport: true,
      reportPrefix: 'MTL',
      dateFormat: 'YYYY-MM-DD',
      includeDisclaimer: true,
    },
    uiPrefs: {
      tableDensity: 'comfortable',
      showTechnicalIds: true,
      showPrototypeNotice: true,
    },
  };

  const [settings, setSettings] = useState(defaultState);
  const [saved, setSaved] = useState(false);

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleReset = () => {
    setSettings(defaultState);
    setSaved(false);
  };

  const handleSave = () => {
    // No persistence – just show a temporary success UI.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-container">
      <SectionHeader title="Settings" subtitle="Application configuration (prototype only)" />

      {/* Lab Profile */}
      <div className="settings-section">
        <h3>Laboratory Profile</h3>
        <div className="settings-grid">
          <input placeholder="Lab Name" value={settings.labProfile.name} onChange={e => handleChange('labProfile', 'name', e.target.value)} className="input-field" />
          <input placeholder="Lab Code" value={settings.labProfile.code} onChange={e => handleChange('labProfile', 'code', e.target.value)} className="input-field" />
          <input placeholder="Address" value={settings.labProfile.address} onChange={e => handleChange('labProfile', 'address', e.target.value)} className="input-field" />
          <input placeholder="Contact" value={settings.labProfile.contact} onChange={e => handleChange('labProfile', 'contact', e.target.value)} className="input-field" />
        </div>
      </div>

      {/* Application Configuration */}
      <div className="settings-section">
        <h3>Application Configuration</h3>
        <div className="settings-grid">
          <input placeholder="App Name" value={settings.appConfig.appName} onChange={e => handleChange('appConfig', 'appName', e.target.value)} className="input-field" />
          <select value={settings.appConfig.environment} onChange={e => handleChange('appConfig', 'environment', e.target.value)} className="select-field">
            <option value="Development">Development</option>
            <option value="Staging">Staging</option>
            <option value="Production">Production</option>
          </select>
          <input placeholder="Rule Set Version" value={settings.appConfig.ruleSetVersion} onChange={e => handleChange('appConfig', 'ruleSetVersion', e.target.value)} className="input-field" />
          <input placeholder="Default Evaluation Type" value={settings.appConfig.defaultEvaluationType} onChange={e => handleChange('appConfig', 'defaultEvaluationType', e.target.value)} className="input-field" />
        </div>
      </div>

      {/* Workflow Defaults */}
      <div className="settings-section">
        <h3>Test Workflow Defaults</h3>
        <div className="settings-grid">
          <input placeholder="Engineer" value={settings.workflowDefaults.engineer} onChange={e => handleChange('workflowDefaults', 'engineer', e.target.value)} className="input-field" />
          <input placeholder="Reviewer" value={settings.workflowDefaults.reviewer} onChange={e => handleChange('workflowDefaults', 'reviewer', e.target.value)} className="input-field" />
          <select value={settings.workflowDefaults.priority} onChange={e => handleChange('workflowDefaults', 'priority', e.target.value)} className="select-field">
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="settings-section">
        <h3>Report Configuration</h3>
        <div className="settings-grid">
          <label className="checkbox-label">
            <input type="checkbox" checked={settings.reportConfig.labNameOnReport} onChange={e => handleChange('reportConfig', 'labNameOnReport', e.target.checked)} /> Include lab name on reports
          </label>
          <input placeholder="Report Prefix" value={settings.reportConfig.reportPrefix} onChange={e => handleChange('reportConfig', 'reportPrefix', e.target.value)} className="input-field" />
          <input placeholder="Date Format" value={settings.reportConfig.dateFormat} onChange={e => handleChange('reportConfig', 'dateFormat', e.target.value)} className="input-field" />
          <label className="checkbox-label">
            <input type="checkbox" checked={settings.reportConfig.includeDisclaimer} onChange={e => handleChange('reportConfig', 'includeDisclaimer', e.target.checked)} /> Include disclaimer
          </label>
        </div>
      </div>

      {/* UI Preferences */}
      <div className="settings-section">
        <h3>UI Preferences</h3>
        <div className="settings-grid">
          <select value={settings.uiPrefs.tableDensity} onChange={e => handleChange('uiPrefs', 'tableDensity', e.target.value)} className="select-field">
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>
          <label className="checkbox-label">
            <input type="checkbox" checked={settings.uiPrefs.showTechnicalIds} onChange={e => handleChange('uiPrefs', 'showTechnicalIds', e.target.checked)} /> Show technical IDs
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={settings.uiPrefs.showPrototypeNotice} onChange={e => handleChange('uiPrefs', 'showPrototypeNotice', e.target.checked)} /> Show prototype notice
          </label>
        </div>
      </div>

      <div className="settings-actions" style={{ marginTop: '24px' }}>
        <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        <button className="btn-secondary" onClick={handleReset} style={{ marginLeft: '12px' }}>Reset</button>
        {saved && <span style={{ marginLeft: '16px', color: 'green' }}>Saved!</span>}
      </div>
    </div>
  );
};

export default SettingsPage;
