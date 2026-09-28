import React from 'react';
import StatusBadge from './StatusBadge';

/**
 * Technical data table for displaying NAWI records, test cases, and reports
 */
export const DataTable = ({ columns, data, onRowClick }) => {
  if (!data || data.length === 0) {
    return (
      <div className="table-card" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
        No laboratory records found.
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} style={{ width: col.width || 'auto', textAlign: col.align || 'left' }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((col, colIndex) => {
                  const cellValue = row[col.accessor];

                  if (col.accessor === 'status') {
                    return (
                      <td key={colIndex} style={{ textAlign: col.align || 'left' }}>
                        <StatusBadge status={cellValue} />
                      </td>
                    );
                  }

                  if (col.isMono || col.accessor === 'id' || col.accessor === 'reportNo' || col.accessor === 'serialNumber') {
                    return (
                      <td key={colIndex} className="font-mono" style={{ fontWeight: 600, color: '#1e3a8a', textAlign: col.align || 'left' }}>
                        {cellValue}
                      </td>
                    );
                  }

                  return (
                    <td key={colIndex} style={{ textAlign: col.align || 'left' }}>
                      {col.render ? col.render(row) : cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
