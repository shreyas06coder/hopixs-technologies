import React, { useState } from 'react';
import { ORDER_STATUS_STAGES } from '../../data/sampleData';
import { Icon } from '../common/Icons';

export const OrderTrackingPage = ({
  orders = [],
  activeOrderId,
  onSelectOrderToTrack,
  onUpdateOrderStatus,
  onNavigateToMenu,
  onReorderItems,
  onNavigateToAdmin
}) => {
  const [activeTab, setActiveTab] = useState('tracking'); // 'tracking' | 'history'

  // Determine which order to track
  const currentOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;

  // Normalize order status to match the 5 stages
  const getNormalizedStatus = (status) => {
    if (!status) return 'placed';
    if (status === 'pending') return 'placed';
    if (status === 'delivered') return 'served';
    return status;
  };

  const currentStatusId = currentOrder ? getNormalizedStatus(currentOrder.status) : 'placed';
  const currentStageObj = ORDER_STATUS_STAGES.find((s) => s.id === currentStatusId) || ORDER_STATUS_STAGES[0];
  const currentStepNum = currentStageObj.step;

  const getStatusBadgeClass = (status) => {
    const s = getNormalizedStatus(status);
    if (s === 'served') return 'status-badge-pill completed';
    if (s === 'ready') return 'status-badge-pill in_progress';
    if (s === 'preparing') return 'status-badge-pill in_progress';
    return 'status-badge-pill open';
  };

  const getStatusLabel = (status) => {
    const s = getNormalizedStatus(status);
    const stage = ORDER_STATUS_STAGES.find((st) => st.id === s);
    return stage ? stage.label : status;
  };

  return (
    <div className="restaurant-demo-page animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <button
            onClick={onNavigateToMenu}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.84rem',
              color: 'var(--gold-400)',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              marginBottom: '6px'
            }}
          >
            <Icon name="arrow-right" size={14} style={{ transform: 'rotate(180deg)' }} />
            <span>Back to Dining & Café Menu</span>
          </button>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--warm-white)', margin: 0 }}>
            Order Tracking & History
          </h1>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(14, 26, 46, 0.8)', padding: '5px', borderRadius: 'var(--radius-full)', border: '1px solid var(--surface-border)' }}>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`dash-tab-btn ${activeTab === 'tracking' ? 'active' : ''}`}
            style={{ padding: '8px 18px', fontSize: '0.82rem' }}
          >
            <Icon name="clock" size={15} color={activeTab === 'tracking' ? 'var(--gold-300)' : 'currentColor'} />
            <span>Live Tracking</span>
            {currentOrder && currentOrder.status !== 'served' && (
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-emerald)', display: 'inline-block' }} />
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`dash-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            style={{ padding: '8px 18px', fontSize: '0.82rem' }}
          >
            <Icon name="grid" size={15} color={activeTab === 'history' ? 'var(--gold-300)' : 'currentColor'} />
            <span>Order History ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: LIVE TRACKING */}
      {activeTab === 'tracking' && (
        <>
          {!currentOrder ? (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: 'var(--navy-850)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--surface-border)' }}>
              <Icon name="bag" size={48} color="var(--navy-600)" style={{ margin: '0 auto 1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm-white)', marginBottom: '8px' }}>
                No Active Orders Found
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '360px', margin: '0 auto 1.5rem' }}>
                Select items from the QR menu and place an order to see live real-time preparation tracking.
              </p>
              <button className="btn-gold-primary" onClick={onNavigateToMenu}>
                <Icon name="utensils" size={15} />
                <span>Browse Dining Menu</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Order Quick Selector (if customer has multiple orders) */}
              {orders.length > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Select Order:
                  </span>
                  {orders.map((ord) => {
                    const isSelected = ord.id === currentOrder.id;
                    return (
                      <button
                        key={ord.id}
                        onClick={() => onSelectOrderToTrack(ord.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          background: isSelected ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
                          color: isSelected ? '#0A1121' : 'var(--cream-200)',
                          border: isSelected ? '1px solid var(--gold-400)' : '1px solid var(--surface-border)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <span>{ord.id}</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>({ord.location.split(' ')[0]})</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Main Stepper Card */}
              <div
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.1) 0%, rgba(14, 26, 46, 0.95) 70%)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
                }}
              >
                {/* Order Top Summary */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span className="badge-gold">
                        <Icon name="check-circle" size={13} color="#D4AF37" />
                        ORDER CONFIRMED
                      </span>
                      <span className={getStatusBadgeClass(currentOrder.status)}>
                        {getStatusLabel(currentOrder.status)}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--warm-white)', margin: 0 }}>
                      Ticket #{currentOrder.id}
                    </h2>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Seating: <strong style={{ color: 'var(--gold-300)' }}>{currentOrder.location}</strong> • Placed: {currentOrder.time}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Total Settle
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-300)' }}>
                      ${currentOrder.total ? currentOrder.total.toFixed(2) : '0.00'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--cream-200)', marginTop: '2px' }}>
                      {currentOrder.items.length} {currentOrder.items.length === 1 ? 'item' : 'items'} in order
                    </div>
                  </div>
                </div>

                {/* 5-Stage Visual Stepper */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      position: 'relative',
                      gap: '8px'
                    }}
                  >
                    {ORDER_STATUS_STAGES.map((stage) => {
                      const isCompleted = stage.step < currentStepNum;
                      const isCurrent = stage.step === currentStepNum;

                      return (
                        <div
                          key={stage.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative'
                          }}
                        >
                          {/* Step Number Circle */}
                          <div
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              background: isCompleted
                                ? 'var(--gold-gradient)'
                                : isCurrent
                                ? 'rgba(212, 175, 55, 0.25)'
                                : 'var(--navy-900)',
                              border: isCompleted || isCurrent
                                ? '2px solid var(--gold-400)'
                                : '2px solid var(--navy-700)',
                              color: isCompleted ? '#0A1121' : isCurrent ? 'var(--gold-200)' : 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              boxShadow: isCurrent ? '0 0 20px rgba(212, 175, 55, 0.4)' : 'none',
                              marginBottom: '10px',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {isCompleted ? <Icon name="check" size={20} /> : stage.step}
                          </div>

                          <div
                            style={{
                              fontSize: '0.82rem',
                              fontWeight: isCurrent ? 700 : 600,
                              color: isCurrent ? 'var(--gold-300)' : isCompleted ? 'var(--warm-white)' : 'var(--text-muted)',
                              marginBottom: '2px'
                            }}
                          >
                            {stage.label}
                          </div>

                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3, maxWidth: '120px' }}>
                            {stage.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time synchronization note and interactive simulator */}
                <div
                  style={{
                    background: 'rgba(6, 11, 20, 0.75)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--cream-200)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-emerald)', flexShrink: 0 }} />
                    <span>
                      Connected to <strong>Operations Dashboard</strong>. Status changes made by floor managers update this view in real time.
                    </span>
                  </div>

                  {/* Simulator Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Simulate Status:</span>
                    {ORDER_STATUS_STAGES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onUpdateOrderStatus(currentOrder.id, s.id)}
                        style={{
                          fontSize: '0.72rem',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          background: currentStatusId === s.id ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                          color: currentStatusId === s.id ? '#0A1121' : 'var(--text-secondary)',
                          fontWeight: 700,
                          border: currentStatusId === s.id ? '1px solid var(--gold-400)' : '1px solid var(--surface-border)'
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                    {onNavigateToAdmin && (
                      <button
                        onClick={onNavigateToAdmin}
                        style={{
                          fontSize: '0.72rem',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(212, 175, 55, 0.15)',
                          color: 'var(--gold-300)',
                          border: '1px solid var(--gold-border)',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>Admin Ops ↗</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items & Breakdown Card */}
              <div
                style={{
                  background: 'var(--navy-850)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--warm-white)', marginBottom: '1.25rem' }}>
                  Dishes & Beverages in Order
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
                  {currentOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: 'rgba(6, 11, 20, 0.45)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'rgba(212, 175, 55, 0.15)',
                            color: 'var(--gold-300)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                          }}
                        >
                          {item.qty || item.quantity}x
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--warm-white)' }}>
                            {item.name}
                          </div>
                          {(item.note || item.selectedOption) && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--gold-400)' }}>
                              Option: {item.note || item.selectedOption}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--gold-300)', fontWeight: 600 }}>
                        ${((item.price) * (item.qty || item.quantity)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Instructions Note */}
                {currentOrder.specialNote && (
                  <div
                    style={{
                      background: 'rgba(212, 175, 55, 0.06)',
                      borderLeft: '3px solid var(--gold-400)',
                      padding: '10px 14px',
                      borderRadius: '0 6px 6px 0',
                      marginBottom: '1.5rem',
                      fontSize: '0.84rem'
                    }}
                  >
                    <strong style={{ color: 'var(--gold-300)' }}>Customer Note: </strong>
                    <span style={{ color: 'var(--cream-200)' }}>{currentOrder.specialNote}</span>
                  </div>
                )}

                {/* Bill Breakdown */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>${(currentOrder.subtotal || currentOrder.total * 0.85).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    <span>Service & Tax</span>
                    <span>${(currentOrder.taxAndService || currentOrder.total * 0.15).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, color: 'var(--warm-white)', marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '8px' }}>
                    <span>Total Paid / Room Charge</span>
                    <span className="text-gold-gradient">${currentOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={onNavigateToMenu}>
                    <Icon name="plus" size={15} />
                    <span>Order Additional Items</span>
                  </button>
                  {onReorderItems && (
                    <button
                      className="btn-luxury-outline"
                      style={{ flex: 1 }}
                      onClick={() => onReorderItems(currentOrder.items)}
                    >
                      <Icon name="refresh" size={15} />
                      <span>Order Again</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW 2: ORDER HISTORY */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--navy-850)', borderRadius: 'var(--radius-lg)' }}>
              <Icon name="bag" size={44} color="var(--navy-600)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm-white)', marginBottom: '8px' }}>
                No Past Orders on Record
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Your completed dining orders and receipts will appear here automatically.
              </p>
            </div>
          ) : (
            orders.map((ord) => {
              return (
                <div
                  key={ord.id}
                  style={{
                    background: 'var(--navy-850)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-300)' }}>
                          #{ord.id}
                        </span>
                        <span className={getStatusBadgeClass(ord.status)}>
                          {getStatusLabel(ord.status)}
                        </span>
                        <span className="badge-navy">{ord.type}</span>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--cream-200)' }}>
                        Destination: <strong style={{ color: 'var(--warm-white)' }}>{ord.location}</strong> • Placed: {ord.time}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--warm-white)' }}>
                        ${ord.total ? ord.total.toFixed(2) : '0.00'}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </div>

                  {/* Items List Preview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
                    {ord.items.map((it, iIdx) => (
                      <div key={iIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--cream-200)' }}>
                        <div>
                          <strong style={{ color: 'var(--gold-400)', marginRight: '6px' }}>{it.qty || it.quantity}x</strong>
                          <span>{it.name}</span>
                          {(it.note || it.selectedOption) && (
                            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                              ({it.note || it.selectedOption})
                            </span>
                          )}
                        </div>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          ${((it.price) * (it.qty || it.quantity)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '12px' }}>
                    <button
                      className="btn-gold-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                      onClick={() => {
                        onSelectOrderToTrack(ord.id);
                        setActiveTab('tracking');
                      }}
                    >
                      <Icon name="clock" size={14} />
                      <span>Track This Order</span>
                    </button>

                    {onReorderItems && (
                      <button
                        className="btn-secondary"
                        style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                        onClick={() => onReorderItems(ord.items)}
                      >
                        <Icon name="refresh" size={13} />
                        <span>Order Again</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
