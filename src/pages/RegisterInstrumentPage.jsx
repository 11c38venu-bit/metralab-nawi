import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { ArrowLeft, Save, Upload, AlertCircle } from 'lucide-react';
import { MOCK_MANUFACTURERS, INSTRUMENT_TYPES } from '../data/mockData';

export const RegisterInstrumentPage = ({ onAddInstrument, onNavigate }) => {
  const [formData, setFormData] = useState({
    manufacturer: 'Precision Weighing Instruments Pvt. Ltd.',
    model: '',
    serialNumber: '',
    instrumentType: 'Electronic Platform Weighing Instrument',
    countryOfManufacture: 'India',
    yearOfManufacture: '2026',
    
    accuracyClass: 'Class III',
    accuracyClassCode: 'III',
    maxCapacity: '',
    minCapacity: '',
    scaleInterval_e: '',
    scaleInterval_n: '5000',
    numberOfRanges: '1',

    loadCellType: 'Strain Gauge Load Cell',
    numberOfLoadCells: '4',
    platformSize: '600 × 600 mm',
    displayType: 'Backlit LCD Display',
    displayResolution: '0.1 kg',
    powerSupply: '230 V AC',
    frequency: '50 Hz',
    operatingTemperature: '-10 °C to +40 °C',
    softwareVersion: 'v1.0.0',
    hardwareVersion: 'HW-01',

    referenceEquipmentId: 'NMTL-WT-017',
    calibrationCertificateNo: 'CAL-2026-0250',
    calibrationDate: '28 Sep 2026',
    calibrationValidUntil: '27 Sep 2027',

    frontPhotoName: '',
    nameplatePhotoName: '',
    datasheetName: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'Manufacturer is required';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    }
    if (!formData.instrumentType.trim()) {
      newErrors.instrumentType = 'Instrument type is required';
    }
    if (!formData.accuracyClass.trim()) {
      newErrors.accuracyClass = 'Accuracy class is required';
    }
    if (!formData.maxCapacity.trim()) {
      newErrors.maxCapacity = 'Maximum capacity is required';
    }
    if (!formData.minCapacity.trim()) {
      newErrors.minCapacity = 'Minimum capacity is required';
    }
    if (!formData.scaleInterval_e.trim()) {
      newErrors.scaleInterval_e = 'Verification scale interval is required';
    }

    // Quantitative range check if numeric parsing is possible
    const maxVal = parseFloat(formData.maxCapacity);
    const minVal = parseFloat(formData.minCapacity);
    if (!isNaN(maxVal) && !isNaN(minVal) && maxVal <= minVal) {
      newErrors.maxCapacity = 'Maximum capacity must be greater than minimum capacity';
    }

    const eVal = parseFloat(formData.scaleInterval_e);
    if (!isNaN(eVal) && eVal <= 0) {
      newErrors.scaleInterval_e = 'Verification scale interval must be greater than 0';
    }

    const nVal = parseInt(formData.scaleInterval_n, 10);
    if (!isNaN(nVal) && nVal <= 0) {
      newErrors.scaleInterval_n = 'Number of verification intervals must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Call state handler to create instrument & return newly created object
    const newInstrument = onAddInstrument(formData);

    // Navigate immediately to its Instrument Details page
    if (newInstrument && newInstrument.id) {
      onNavigate(`/instruments/${newInstrument.id}`, {
        successToast: 'Instrument registered successfully'
      });
    } else {
      onNavigate('/instruments');
    }
  };

  return (
    <div className="register-instrument-page">
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <button className="btn-secondary" onClick={() => onNavigate('/instruments')}>
          <ArrowLeft size={13} />
          Cancel & Return to Registry
        </button>
      </div>

      <SectionHeader title="Register Instrument" subtitle="Create a new instrument record in NMTL database" />

      <form onSubmit={handleSubmit}>
        {/* 1. IDENTIFICATION */}
        <div className="form-card">
          <h3 className="form-section-title">1. Identification</h3>
          
          <div className="form-grid-2">
            {/* Manufacturer */}
            <div className="form-field">
              <label className="form-label required">Manufacturer</label>
              <select 
                className={`form-control ${errors.manufacturer ? 'is-invalid' : ''}`}
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
              >
                {MOCK_MANUFACTURERS.map((mfg) => (
                  <option key={mfg.id} value={mfg.name}>{mfg.name}</option>
                ))}
              </select>
              {errors.manufacturer && <span className="error-text">{errors.manufacturer}</span>}
            </div>

            {/* Model */}
            <div className="form-field">
              <label className="form-label required">Model</label>
              <input 
                type="text" 
                className={`form-control font-mono ${errors.model ? 'is-invalid' : ''}`}
                name="model"
                placeholder="e.g. PWI-500"
                value={formData.model}
                onChange={handleChange}
              />
              {errors.model && <span className="error-text">{errors.model}</span>}
            </div>

            {/* Serial Number */}
            <div className="form-field">
              <label className="form-label required">Serial Number</label>
              <input 
                type="text" 
                className={`form-control font-mono ${errors.serialNumber ? 'is-invalid' : ''}`}
                name="serialNumber"
                placeholder="e.g. PWI500-26-01842"
                value={formData.serialNumber}
                onChange={handleChange}
              />
              {errors.serialNumber && <span className="error-text">{errors.serialNumber}</span>}
            </div>

            {/* Instrument Type */}
            <div className="form-field">
              <label className="form-label required">Instrument Type</label>
              <select 
                className={`form-control ${errors.instrumentType ? 'is-invalid' : ''}`}
                name="instrumentType"
                value={formData.instrumentType}
                onChange={handleChange}
              >
                {INSTRUMENT_TYPES.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
              {errors.instrumentType && <span className="error-text">{errors.instrumentType}</span>}
            </div>

            {/* Country of Manufacture */}
            <div className="form-field">
              <label className="form-label">Country of Manufacture</label>
              <input 
                type="text" 
                className="form-control"
                name="countryOfManufacture"
                value={formData.countryOfManufacture}
                onChange={handleChange}
              />
            </div>

            {/* Year of Manufacture */}
            <div className="form-field">
              <label className="form-label">Year of Manufacture</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="yearOfManufacture"
                value={formData.yearOfManufacture}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* 2. METROLOGICAL CHARACTERISTICS */}
        <div className="form-card">
          <h3 className="form-section-title">2. Metrological Characteristics</h3>
          
          <div className="form-grid-3">
            {/* Accuracy Class */}
            <div className="form-field">
              <label className="form-label required">Accuracy Class</label>
              <select 
                className={`form-control font-mono ${errors.accuracyClass ? 'is-invalid' : ''}`}
                name="accuracyClass"
                value={formData.accuracyClass}
                onChange={(e) => {
                  const val = e.target.value;
                  const code = val.replace('Class ', '');
                  setFormData((prev) => ({ ...prev, accuracyClass: val, accuracyClassCode: code }));
                }}
              >
                <option value="Class I">Class I (Special)</option>
                <option value="Class II">Class II (High)</option>
                <option value="Class III">Class III (Medium)</option>
                <option value="Class IIII">Class IIII (Ordinary)</option>
              </select>
              {errors.accuracyClass && <span className="error-text">{errors.accuracyClass}</span>}
            </div>

            {/* Maximum Capacity */}
            <div className="form-field">
              <label className="form-label required">Maximum Capacity (Max)</label>
              <input 
                type="text" 
                className={`form-control font-mono ${errors.maxCapacity ? 'is-invalid' : ''}`}
                name="maxCapacity"
                placeholder="e.g. 500 kg"
                value={formData.maxCapacity}
                onChange={handleChange}
              />
              {errors.maxCapacity && <span className="error-text">{errors.maxCapacity}</span>}
            </div>

            {/* Minimum Capacity */}
            <div className="form-field">
              <label className="form-label required">Minimum Capacity (Min)</label>
              <input 
                type="text" 
                className={`form-control font-mono ${errors.minCapacity ? 'is-invalid' : ''}`}
                name="minCapacity"
                placeholder="e.g. 20 kg"
                value={formData.minCapacity}
                onChange={handleChange}
              />
              {errors.minCapacity && <span className="error-text">{errors.minCapacity}</span>}
            </div>

            {/* Verification Scale Interval (e) */}
            <div className="form-field">
              <label className="form-label required">Verification Scale Interval (e)</label>
              <input 
                type="text" 
                className={`form-control font-mono ${errors.scaleInterval_e ? 'is-invalid' : ''}`}
                name="scaleInterval_e"
                placeholder="e.g. 0.1 kg"
                value={formData.scaleInterval_e}
                onChange={handleChange}
              />
              {errors.scaleInterval_e && <span className="error-text">{errors.scaleInterval_e}</span>}
            </div>

            {/* Number of Verification Intervals (n) */}
            <div className="form-field">
              <label className="form-label">Number of Verification Intervals (n)</label>
              <input 
                type="text" 
                className={`form-control font-mono ${errors.scaleInterval_n ? 'is-invalid' : ''}`}
                name="scaleInterval_n"
                placeholder="e.g. 5000"
                value={formData.scaleInterval_n}
                onChange={handleChange}
              />
              {errors.scaleInterval_n && <span className="error-text">{errors.scaleInterval_n}</span>}
            </div>

            {/* Number of Ranges */}
            <div className="form-field">
              <label className="form-label">Number of Ranges</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="numberOfRanges"
                placeholder="e.g. 1"
                value={formData.numberOfRanges}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* 3. TECHNICAL DETAILS */}
        <div className="form-card">
          <h3 className="form-section-title">3. Technical Details</h3>
          
          <div className="form-grid-3">
            <div className="form-field">
              <label className="form-label">Load Cell Type</label>
              <input 
                type="text" 
                className="form-control"
                name="loadCellType"
                value={formData.loadCellType}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Number of Load Cells</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="numberOfLoadCells"
                value={formData.numberOfLoadCells}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Platform Size</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="platformSize"
                value={formData.platformSize}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Display Type</label>
              <input 
                type="text" 
                className="form-control"
                name="displayType"
                value={formData.displayType}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Display Resolution</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="displayResolution"
                value={formData.displayResolution}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Power Supply</label>
              <input 
                type="text" 
                className="form-control"
                name="powerSupply"
                value={formData.powerSupply}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Frequency</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Operating Temperature</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="operatingTemperature"
                value={formData.operatingTemperature}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Software / Hardware Version</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  className="form-control font-mono"
                  placeholder="SW e.g. v1.0.0"
                  name="softwareVersion"
                  value={formData.softwareVersion}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  className="form-control font-mono"
                  placeholder="HW e.g. HW-01"
                  name="hardwareVersion"
                  value={formData.hardwareVersion}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. CALIBRATION / REFERENCE INFORMATION */}
        <div className="form-card">
          <h3 className="form-section-title">4. Calibration & Traceability Reference</h3>
          
          <div className="form-grid-2">
            <div className="form-field">
              <label className="form-label">Reference Equipment ID</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="referenceEquipmentId"
                value={formData.referenceEquipmentId}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Calibration Certificate Number</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="calibrationCertificateNo"
                value={formData.calibrationCertificateNo}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Calibration Date</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="calibrationDate"
                value={formData.calibrationDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Calibration Valid Until</label>
              <input 
                type="text" 
                className="form-control font-mono"
                name="calibrationValidUntil"
                value={formData.calibrationValidUntil}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* 5. EVIDENCE UPLOADS */}
        <div className="form-card">
          <h3 className="form-section-title">5. Instrument Evidence</h3>
          
          <div className="form-grid-3">
            <div className="form-field">
              <label className="form-label">Instrument Photograph</label>
              <div className="evidence-box" style={{ padding: '16px' }}>
                <Upload size={18} className="text-slate-400" />
                <span style={{ fontSize: '11px', color: '#64748b' }}>Upload front view image</span>
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  id="frontPhoto" 
                  onChange={(e) => setFormData((prev) => ({ ...prev, frontPhotoName: e.target.files[0]?.name || 'front_view.jpg' }))}
                />
                <button type="button" className="btn-secondary" style={{ padding: '3px 8px', fontSize: '11px' }} onClick={() => document.getElementById('frontPhoto').click()}>
                  Select File
                </button>
                {formData.frontPhotoName && <span className="font-mono" style={{ fontSize: '10px', color: '#1e3a8a' }}>{formData.frontPhotoName}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Nameplate Photograph</label>
              <div className="evidence-box" style={{ padding: '16px' }}>
                <Upload size={18} className="text-slate-400" />
                <span style={{ fontSize: '11px', color: '#64748b' }}>Upload nameplate / spec tag</span>
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  id="nameplatePhoto" 
                  onChange={(e) => setFormData((prev) => ({ ...prev, nameplatePhotoName: e.target.files[0]?.name || 'nameplate.jpg' }))}
                />
                <button type="button" className="btn-secondary" style={{ padding: '3px 8px', fontSize: '11px' }} onClick={() => document.getElementById('nameplatePhoto').click()}>
                  Select File
                </button>
                {formData.nameplatePhotoName && <span className="font-mono" style={{ fontSize: '10px', color: '#1e3a8a' }}>{formData.nameplatePhotoName}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Manufacturer Datasheet</label>
              <div className="evidence-box" style={{ padding: '16px' }}>
                <Upload size={18} className="text-slate-400" />
                <span style={{ fontSize: '11px', color: '#64748b' }}>Upload technical PDF</span>
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  id="datasheet" 
                  onChange={(e) => setFormData((prev) => ({ ...prev, datasheetName: e.target.files[0]?.name || 'datasheet.pdf' }))}
                />
                <button type="button" className="btn-secondary" style={{ padding: '3px 8px', fontSize: '11px' }} onClick={() => document.getElementById('datasheet').click()}>
                  Select File
                </button>
                {formData.datasheetName && <span className="font-mono" style={{ fontSize: '10px', color: '#1e3a8a' }}>{formData.datasheetName}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginBottom: '32px' }}>
          <button type="button" className="btn-secondary" onClick={() => onNavigate('/instruments')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>
            <Save size={14} />
            Save Instrument
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterInstrumentPage;
