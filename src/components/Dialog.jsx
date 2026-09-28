import React from 'react';

/**
 * Simple Dialog component using native HTML <dialog> element.
 * Props:
 *  - title: string
 *  - onClose: function to call when dialog is closed
 *  - children: content
 */
export const Dialog = ({ title, onClose, children }) => {
  return (
    <div className="dialog-overlay" style={overlayStyle}>
      <div className="dialog-content" style={contentStyle}>
        <div className="dialog-header" style={headerStyle}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={closeBtnStyle}>✖</button>
        </div>
        <div className="dialog-body" style={{ padding: '12px' }}>{children}</div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const contentStyle = {
  background: '#fff',
  borderRadius: '8px',
  minWidth: '320px',
  maxWidth: '80%',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: '#f4f6f9',
};

const closeBtnStyle = {
  background: 'transparent',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
};

export default Dialog;
