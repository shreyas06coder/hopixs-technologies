import React, { useState } from 'react';
import { OrdersTab } from './OrdersTab';
import { RequestsTab } from './RequestsTab';
import { InventoryTab } from './InventoryTab';
import { AnalyticsTab } from './AnalyticsTab';
import { Icon } from '../common/Icons';
import '../../styles/dashboard.css';

export const AdminDashboard = ({
  orders,
  onUpdateOrderStatus,
  guestRequests,
  onUpdateRequestStatus,
  inventory,
  onReorderItem,
  onResetSampleData,
  onNavigateToDining,
  onNavigateToHotel
}) => {
  const [activeTab, setActiveTab] = useState('orders');

  // Compute live KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 34850);
  const activeOrdersCount = orders.filter((o) => o.status !== 'served' && o.status !== 'delivered').length;
  const openRequestsCount = guestRequests.filter((r) => r.status !== 'completed').length;

  const tabs = [
    { id: 'orders', label: 'Live Orders Stream', icon: 'utensils', badge: activeOrdersCount },
    { id: 'requests', label: 'Guest Service Tickets', icon: 'hotel', badge: openRequestsCount },
    { id: 'inventory', label: 'Cellar & Inventory', icon: 'box', badge: inventory.filter(i => i.status !== 'optimal').length },
    { id: 'analytics', label: 'Yield & Reviews', icon: 'trending-up', badge: null }
  ];

  return (
    <div className="admin-dashboard-page animate-fade-in">
      {/* Top Header */}
      <div className="dashboard-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-gold">
              <Icon name="sliders" size={13} color="#D4AF37" />
              HOSPICS TECHNOLOGIES OPERATIONS
            </span>
            <span className="badge-navy">Connected: Azure Resort, L'Ambroisie, Café Valois</span>
          </div>
          <h1 className="dashboard-title">General Manager Command Center</h1>
          <p className="dashboard-subtitle">
            Synchronized operational intelligence across front desk, kitchen brigade, and cellar stores.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={onResetSampleData} title="Reset all state to initial demo data">
            <Icon name="refresh" size={14} />
            <span>Reset Demo Data</span>
          </button>
          <button className="btn-secondary" onClick={onNavigateToHotel} title="Jump to Suite 704 in-room portal">
            <Icon name="hotel" size={14} color="var(--gold-300)" />
            <span>Inspect Suite 704</span>
          </button>
          <button className="btn-gold-primary" onClick={onNavigateToDining}>
            <Icon name="plus" size={15} />
            <span>Simulate Order Entry</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="kpi-cards-grid">
        <div className="kpi-card">
          <div className="kpi-label">
            <span>Today's Gross Settle</span>
            <Icon name="trending-up" size={14} color="var(--gold-400)" />
          </div>
          <div className="kpi-val text-gold-gradient">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="kpi-trend positive">
            <Icon name="arrow-right" size={12} style={{ transform: 'rotate(-45deg)' }} />
            <span>+24.8% vs last Thursday</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            <span>Active Kitchen Tickets</span>
            <Icon name="clock" size={14} color="var(--status-amber)" />
          </div>
          <div className="kpi-val" style={{ color: activeOrdersCount > 0 ? 'var(--status-amber)' : 'var(--warm-white)' }}>
            {activeOrdersCount}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Across Restaurant & Suites
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            <span>Open Guest Tickets</span>
            <Icon name="bell" size={14} color="var(--status-blue)" />
          </div>
          <div className="kpi-val" style={{ color: openRequestsCount > 0 ? 'var(--status-blue)' : 'var(--warm-white)' }}>
            {openRequestsCount}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            All within 15-min SLA
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            <span>Table Turnaround</span>
            <Icon name="refresh" size={14} color="var(--cream-200)" />
          </div>
          <div className="kpi-val">41 min</div>
          <div className="kpi-trend positive">
            <span>12 min faster with digital bill</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            <span>Guest Rating</span>
            <Icon name="star" size={14} color="var(--gold-400)" />
          </div>
          <div className="kpi-val">4.94</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--gold-400)' }}>
            99.2% Positive Sentiment
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs-bar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`dash-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon
                name={tab.icon}
                size={16}
                color={isActive ? 'var(--gold-300)' : 'var(--text-secondary)'}
              />
              <span>{tab.label}</span>
              {tab.badge !== null && tab.badge > 0 && (
                <span className="dash-tab-badge">{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'orders' && (
        <OrdersTab
          orders={orders}
          onUpdateOrderStatus={onUpdateOrderStatus}
        />
      )}

      {activeTab === 'requests' && (
        <RequestsTab
          requests={guestRequests}
          onUpdateRequestStatus={onUpdateRequestStatus}
        />
      )}

      {activeTab === 'inventory' && (
        <InventoryTab
          inventory={inventory}
          onReorderItem={onReorderItem}
        />
      )}

      {activeTab === 'analytics' && <AnalyticsTab />}
    </div>
  );
};
