import React, { useState, useMemo } from 'react';
import { ORDER_STATUS_STAGES } from '../../data/sampleData';
import { Icon } from '../common/Icons';

export const OrdersTab = ({ orders, onUpdateOrderStatus }) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const normalizeStatus = (status) => {
    if (!status) return 'placed';
    if (status === 'pending') return 'placed';
    if (status === 'delivered') return 'served';
    return status;
  };

  const statuses = ORDER_STATUS_STAGES.map((s) => ({
    id: s.id,
    label: s.label
  }));

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter((o) => normalizeStatus(o.status) === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div className="animate-fade-in">
      {/* Sub-filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`category-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Tickets ({orders.length})
          </button>
          {statuses.map((st) => {
            const count = orders.filter((o) => normalizeStatus(o.status) === st.id).length;
            return (
              <button
                key={st.id}
                className={`category-tab-btn ${statusFilter === st.id ? 'active' : ''}`}
                onClick={() => setStatusFilter(st.id)}
              >
                {st.label} ({count})
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-emerald)' }} />
          <span>Real-Time Kitchen Sync Active (Synced with Customer Tracking)</span>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--navy-850)', borderRadius: 'var(--radius-lg)' }}>
          <Icon name="utensils" size={40} color="var(--navy-600)" style={{ margin: '0 auto 1rem' }} />
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm-white)', marginBottom: '4px' }}>
            No Orders Found in this State
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Orders placed via the QR Menu, Café, or In-Room Dining appear here automatically.
          </p>
        </div>
      ) : (
        <div className="orders-stream-grid">
          {filteredOrders.map((order) => {
            const currentNorm = normalizeStatus(order.status);
            return (
              <div key={order.id} className="order-ticket-card">
                <div className="ticket-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-300)' }}>
                        #{order.id}
                      </span>
                      <span className="badge-navy">{order.type}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--warm-white)', fontWeight: 600 }}>
                      {order.location}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Guest: {order.guest} • Server: {order.server || 'Floor Brigade'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {order.time}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--warm-white)', marginTop: '4px' }}>
                      ${order.total ? order.total.toFixed(2) : '0.00'}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="ticket-items-list">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="ticket-item-row">
                      <div>
                        <span style={{ fontWeight: 700, color: 'var(--gold-400)', marginRight: '8px' }}>
                          {item.qty || item.quantity}x
                        </span>
                        <span>{item.name}</span>
                        {(item.note || item.selectedOption) && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', paddingLeft: '22px' }}>
                            ↳ {item.note || item.selectedOption}
                          </div>
                        )}
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                        ${((item.price) * (item.qty || item.quantity)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {order.specialNote && (
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--gold-300)',
                      background: 'rgba(212, 175, 55, 0.08)',
                      padding: '6px 10px',
                      borderRadius: '4px',
                      marginBottom: '1rem',
                      borderLeft: '2px solid var(--gold-400)'
                    }}
                  >
                    Note: {order.specialNote}
                  </div>
                )}

                {/* Status Update Control */}
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Kitchen & Delivery Status:</span>
                    <span style={{ color: 'var(--gold-400)', fontWeight: 600 }}>
                      Current: {statuses.find((s) => s.id === currentNorm)?.label || currentNorm}
                    </span>
                  </div>
                  <div className="ticket-status-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                    {statuses.map((s) => {
                      const isCurrent = currentNorm === s.id;
                      return (
                        <button
                          key={s.id}
                          className={`status-change-btn ${isCurrent ? 'current' : ''}`}
                          style={{
                            padding: '6px 4px',
                            fontSize: '0.68rem',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                          }}
                          onClick={() => onUpdateOrderStatus(order.id, s.id)}
                          title={`Update order status to ${s.label}`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
