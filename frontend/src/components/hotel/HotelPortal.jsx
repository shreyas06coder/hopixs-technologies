import React, { useState } from 'react';
import {
  HOTEL_GUEST_PROFILE,
  HOTEL_SERVICE_CATEGORIES
} from '../../data/sampleData';
import { Modal } from '../common/Modal';
import { Icon } from '../common/Icons';
import '../../styles/hotel.css';

export const HotelPortal = ({
  guestRequests,
  onCreateRequest,
  onNavigateToAdmin,
  onNavigateToDining
}) => {
  // Climate & Room Ambiance States
  const [temperature, setTemperature] = useState(HOTEL_GUEST_PROFILE.roomTemperature);
  const [lightingPreset, setLightingPreset] = useState(HOTEL_GUEST_PROFILE.lightingPreset);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  // New Request Modal State
  const [activeModalCategory, setActiveModalCategory] = useState(null);
  const [selectedQuickItem, setSelectedQuickItem] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('High Priority');

  // Open modal for a category
  const handleOpenRequestModal = (category, prefilledItem = null) => {
    setActiveModalCategory(category);
    setSelectedQuickItem(prefilledItem ? prefilledItem.name : (category.popularItems[0]?.name || ''));
    setCustomNotes('');
    setUrgencyLevel('High Priority');
  };

  // Submit request
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!activeModalCategory) return;

    const newRequest = {
      id: `REQ-704-0${Date.now().toString().slice(-2)}`,
      room: '704 (Presidential Suite)',
      guest: HOTEL_GUEST_PROFILE.guestName,
      type: activeModalCategory.name,
      title: selectedQuickItem || 'Bespoke In-Suite Service Request',
      time: 'Just now',
      urgency: urgencyLevel,
      assignedStaff: 'Marco Valerius (Butler on Duty)',
      status: 'open',
      notes: customNotes || 'Guest dispatched request via in-suite touch terminal.'
    };

    onCreateRequest(newRequest);
    setActiveModalCategory(null);
  };

  const lightingPresets = [
    'Sunset Glow',
    'Midnight Velvet',
    'Crisp Dawn',
    'Candlelight',
    'Reading Sanctuary'
  ];

  return (
    <div className="hotel-portal-page animate-fade-in">
      {/* Suite Welcome Header */}
      <div className="suite-header-card">
        <div>
          <div className="suite-room-badge">
            <Icon name="hotel" size={14} color="#D4AF37" />
            <span>ROOM 704 • PRESIDENTIAL OCEAN VISTA SUITE</span>
          </div>
          <h1 className="suite-guest-name">
            Welcome, <span className="text-gold-gradient">{HOTEL_GUEST_PROFILE.guestName}</span>
          </h1>
          <p style={{ color: 'var(--cream-200)', fontSize: '0.96rem', marginBottom: '1.25rem' }}>
            Your personal digital concierge is linked directly to Head Butler Marco Valerius and the resort brigade.
          </p>

          <div className="suite-meta-grid">
            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>
                VIP Status
              </span>
              <span style={{ color: 'var(--gold-300)', fontWeight: 700 }}>
                {HOTEL_GUEST_PROFILE.vipTier}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>
                Dedicated Butler
              </span>
              <span style={{ color: 'var(--warm-white)', fontWeight: 600 }}>
                {HOTEL_GUEST_PROFILE.assignedButler}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>
                Stay Itinerary
              </span>
              <span style={{ color: 'var(--warm-white)' }}>
                {HOTEL_GUEST_PROFILE.checkIn} – {HOTEL_GUEST_PROFILE.checkOut}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn-gold-primary" onClick={onNavigateToDining}>
            <Icon name="utensils" size={16} />
            <span>Order In-Suite Fine Dining</span>
          </button>
          <button className="btn-secondary" onClick={onNavigateToAdmin}>
            <Icon name="sliders" size={16} />
            <span>Switch to Front Desk View</span>
          </button>
        </div>
      </div>

      {/* Climate & Room Ambiance Controls */}
      <div className="ambiance-controls-strip">
        {/* Thermostat */}
        <div className="climate-box">
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid var(--gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-400)',
              flexShrink: 0
            }}
          >
            <Icon name="thermometer" size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              Suite Temperature
            </div>
            <div className="temp-dial">
              <button
                className="cart-qty-btn"
                onClick={() => setTemperature((t) => Math.max(64, t - 1))}
                aria-label="Decrease temperature"
              >
                <Icon name="minus" size={14} />
              </button>
              <span className="temp-value">{temperature}°F</span>
              <button
                className="cart-qty-btn"
                onClick={() => setTemperature((t) => Math.min(78, t + 1))}
                aria-label="Increase temperature"
              >
                <Icon name="plus" size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Lighting presets */}
        <div className="lighting-presets-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="sun" size={14} color="var(--gold-400)" />
            <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              Lighting Scene
            </span>
          </div>
          <div className="lighting-btn-grid">
            {lightingPresets.map((preset) => (
              <button
                key={preset}
                className={`lighting-pill-btn ${lightingPreset === preset ? 'active' : ''}`}
                onClick={() => setLightingPreset(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* DND Toggle */}
        <div className="privacy-toggle-box">
          <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            Privacy Mode
          </div>
          <button
            className={`privacy-btn ${doNotDisturb ? 'active-dnd' : ''}`}
            onClick={() => setDoNotDisturb(!doNotDisturb)}
          >
            <span>{doNotDisturb ? 'Do Not Disturb (ACTIVE)' : 'Standard Service'}</span>
            <Icon name={doNotDisturb ? 'moon' : 'bell'} size={15} />
          </button>
        </div>
      </div>

      {/* Service Request Categories Grid */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--warm-white)', marginBottom: '6px' }}>
          In-Suite Guest Services & Amenities
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
          Tap any pre-curated selection below or request custom butler assistance à la carte.
        </p>
      </div>

      <div className="service-categories-grid">
        {HOTEL_SERVICE_CATEGORIES.map((cat) => (
          <div key={cat.id} className="service-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="service-card-icon-wrap">
                <Icon name={cat.icon} size={22} color="var(--gold-400)" />
              </div>
              <span className="badge-navy">{cat.tag}</span>
            </div>

            <h3 className="service-card-title">{cat.name}</h3>
            <p className="service-card-subtitle">{cat.subtitle}</p>

            <div className="quick-items-list">
              {cat.popularItems.map((item) => (
                <button
                  key={item.id}
                  className="quick-item-btn"
                  onClick={() => handleOpenRequestModal(cat, item)}
                >
                  <span>{item.name}</span>
                  <Icon name="arrow-right" size={13} color="var(--gold-400)" />
                </button>
              ))}
            </div>

            <button
              className="btn-luxury-outline"
              style={{ width: '100%', padding: '10px', fontSize: '0.84rem' }}
              onClick={() => handleOpenRequestModal(cat, null)}
            >
              <span>Custom {cat.name} Request</span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Service Tracker */}
      <div className="active-tracker-section">
        <div className="tracker-header">
          <div>
            <span className="badge-gold" style={{ marginBottom: '8px' }}>
              <Icon name="clock" size={13} color="#D4AF37" />
              LIVE SUITE SERVICE MONITOR
            </span>
            <h3 className="tracker-title">Active Requests for Suite 704</h3>
          </div>
          <button className="btn-secondary" onClick={onNavigateToAdmin}>
            <span>View All Front Desk Tickets</span>
            <Icon name="chevron-right" size={14} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="requests-table">
            <thead>
              <tr>
                <th>Service Item / Request</th>
                <th>Category</th>
                <th>Time Placed</th>
                <th>Assigned Staff</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {guestRequests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--warm-white)', marginBottom: '2px' }}>
                      {req.title}
                    </div>
                    {req.notes && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {req.notes}
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: 'var(--cream-200)' }}>
                      {req.type}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {req.time}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
                      <Icon name="users" size={14} color="var(--gold-400)" />
                      <span>{req.assignedStaff}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge-pill ${req.status}`}>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor:
                            req.status === 'completed'
                              ? 'var(--status-emerald)'
                              : req.status === 'in_progress'
                              ? 'var(--status-blue)'
                              : 'var(--status-amber)'
                        }}
                      />
                      {req.status === 'in_progress' ? 'Staff En Route' : req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Request Modal */}
      <Modal
        isOpen={!!activeModalCategory}
        onClose={() => setActiveModalCategory(null)}
        title={activeModalCategory?.name || 'Request Service'}
        subtitle="Hotel Guest Services Desk"
      >
        {activeModalCategory && (
          <form onSubmit={handleSubmitRequest}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                Select Amenity or Item:
              </label>
              <select
                value={selectedQuickItem}
                onChange={(e) => setSelectedQuickItem(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--navy-850)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '11px 14px',
                  color: 'var(--warm-white)',
                  fontSize: '0.88rem'
                }}
              >
                {activeModalCategory.popularItems.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
                <option value="Other Bespoke Service">Other Custom Request</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                Urgency / Timing:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Standard', 'High Priority', 'Immediate VIP'].map((urg) => (
                  <button
                    type="button"
                    key={urg}
                    onClick={() => setUrgencyLevel(urg)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: urgencyLevel === urg ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: urgencyLevel === urg ? '1px solid var(--gold-400)' : '1px solid var(--surface-border)',
                      color: urgencyLevel === urg ? 'var(--gold-200)' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}
                  >
                    {urg}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                Specific Instructions or Delivery Notes:
              </label>
              <textarea
                rows={3}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="E.g., Please knock softly, arrange extra hangers in the master closet, bring fresh mint with ice..."
                style={{
                  width: '100%',
                  background: 'var(--navy-850)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  color: 'var(--warm-white)',
                  fontSize: '0.85rem',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setActiveModalCategory(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-gold-primary"
                style={{ flex: 1.5 }}
              >
                <span>Dispatch to Head Butler</span>
                <Icon name="check" size={16} />
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
