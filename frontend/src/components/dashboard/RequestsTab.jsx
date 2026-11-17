import React, { useState } from 'react';
import { Icon } from '../common/Icons';

export const RequestsTab = ({ requests, onUpdateRequestStatus }) => {
  const [filter, setFilter] = useState('all');

  const filteredRequests = requests.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'open', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              className={`category-tab-btn ${filter === st ? 'active' : ''}`}
              onClick={() => setFilter(st)}
            >
              {st === 'all' ? 'All Tickets' : st.replace('_', ' ').toUpperCase()} ({requests.filter(r => st === 'all' ? true : r.status === st).length})
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Average Butler Response Time: <strong style={{ color: 'var(--gold-300)' }}>4.2 min</strong>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            style={{
              background: 'var(--navy-850)',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--gold-400)', fontSize: '1.1rem' }}>
                  {req.id}
                </span>
                <span className="badge-gold">{req.room}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: req.urgency.includes('VIP') ? 'rgba(244, 63, 94, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                    color: req.urgency.includes('VIP') ? 'var(--status-rose)' : 'var(--gold-300)',
                    fontWeight: 700
                  }}
                >
                  {req.urgency}
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', color: 'var(--warm-white)', marginBottom: '4px' }}>
                {req.title}
              </h4>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Guest: <strong style={{ color: 'var(--cream-100)' }}>{req.guest}</strong> • Category: {req.type} • Requested: {req.time}
              </div>

              {req.notes && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(6, 11, 20, 0.5)', padding: '6px 12px', borderRadius: '4px', borderLeft: '2px solid var(--gold-400)' }}>
                  Note: {req.notes}
                </div>
              )}
            </div>

            {/* Assigned Staff & Action */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--cream-200)' }}>
                <Icon name="users" size={15} color="var(--gold-400)" />
                <span>Assigned: <strong>{req.assignedStaff}</strong></span>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className={`status-change-btn ${req.status === 'open' ? 'current' : ''}`}
                  onClick={() => onUpdateRequestStatus(req.id, 'open')}
                >
                  Open
                </button>
                <button
                  className={`status-change-btn ${req.status === 'in_progress' ? 'current' : ''}`}
                  onClick={() => onUpdateRequestStatus(req.id, 'in_progress')}
                >
                  In Progress
                </button>
                <button
                  className={`status-change-btn ${req.status === 'completed' ? 'current' : ''}`}
                  onClick={() => onUpdateRequestStatus(req.id, 'completed')}
                >
                  Resolved
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
