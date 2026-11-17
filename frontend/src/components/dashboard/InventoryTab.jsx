import React, { useState } from 'react';
import { Icon } from '../common/Icons';

export const InventoryTab = ({ inventory, onReorderItem }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Fine Wine & Cellar', 'Butchery & Steaks', 'Fresh Gourmet Produce', 'Artisan Coffee Roastery', 'Guest Suite Amenities'];

  const filteredItems = inventory.filter((item) => {
    if (categoryFilter === 'All') return true;
    return item.category === categoryFilter;
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab-btn ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Autonomous Reorder Thresholds: <strong style={{ color: 'var(--gold-300)' }}>Active Threshold Monitoring</strong>
        </div>
      </div>

      <div className="inventory-grid">
        {filteredItems.map((item) => {
          const ratio = Math.min(100, Math.round((item.inStock / (item.minThreshold * 1.8)) * 100));
          const isCritical = item.status === 'critical';
          const isWarning = item.status === 'warning';

          const barColor = isCritical
            ? 'var(--status-rose)'
            : isWarning
            ? 'var(--status-amber)'
            : 'var(--status-emerald)';

          return (
            <div key={item.id} className={`inventory-card ${item.status}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span className="badge-navy">{item.sku}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: isCritical
                      ? 'rgba(244, 63, 94, 0.15)'
                      : isWarning
                      ? 'rgba(245, 158, 11, 0.15)'
                      : 'rgba(16, 185, 129, 0.15)',
                    color: barColor
                  }}
                >
                  {item.status}
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', color: 'var(--warm-white)', lineHeight: 1.3, marginBottom: '6px' }}>
                {item.name}
              </h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Category: {item.category} • Supplier: {item.supplier}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 'auto' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    In Cellar / Pantry
                  </span>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--warm-white)' }}>
                    {item.inStock} <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.unit}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Safety Buffer
                  </span>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Min {item.minThreshold} {item.unit}
                  </div>
                </div>
              </div>

              {/* Stock Bar */}
              <div className="inventory-stock-bar-wrap">
                <div
                  className="inventory-stock-bar-fill"
                  style={{ width: `${ratio}%`, background: barColor }}
                />
              </div>

              <button
                className={isCritical ? 'btn-gold-primary' : 'btn-luxury-outline'}
                style={{ width: '100%', padding: '9px', fontSize: '0.8rem' }}
                onClick={() => onReorderItem(item)}
              >
                <Icon name="refresh" size={14} />
                <span>Trigger Expedited Restock</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
