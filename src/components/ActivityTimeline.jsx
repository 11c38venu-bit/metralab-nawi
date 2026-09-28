import React from 'react';
import StatusBadge from './StatusBadge';

/**
 * Engineering timeline logging recent laboratory events
 */
export const ActivityTimeline = ({ activities }) => {
  return (
    <div className="activity-card">
      <div className="activity-list">
        {activities.map((item) => (
          <div key={item.id} className="activity-item">
            <div className="activity-time">{item.time}</div>
            <div className="activity-content">
              <div className="activity-desc">
                {item.description}
              </div>
              <div className="activity-meta">
                {item.user && <span>by {item.user}</span>}
                {item.badge && <StatusBadge status={item.badge} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
