import React, { useState } from 'react';
import { HospicsLogo, Icon } from './Icons';
import '../../styles/navbar.css';

export const GlobalNav = ({
  currentView,
  setCurrentView,
  cartCount = 0,
  onOpenCart,
  activeOrdersCount = 0,
  activeTicketsCount = 0,
  onOpenTourModal,
  onNavigateToTracking,
  ordersCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', icon: 'shield' },
    { id: 'demos', label: 'Interactive Demos', icon: 'grid', highlight: true },
    { id: 'restaurant', label: 'QR Dining & Café', icon: 'utensils', badge: cartCount > 0 ? cartCount : null },
    { id: 'tracking', label: 'Track Order', icon: 'clock', badge: ordersCount > 0 ? ordersCount : null },
    { id: 'hotel', label: 'Hotel Guest Services', icon: 'hotel', badge: activeTicketsCount > 0 ? activeTicketsCount : null },
    { id: 'admin', label: 'Operations Dashboard', icon: 'sliders', badge: activeOrdersCount > 0 ? activeOrdersCount : null }
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="global-header">
      <div className="nav-container">
        {/* Brand Monogram */}
        <div className="brand-section" onClick={() => handleNavClick('landing')}>
          <HospicsLogo size={42} />
          <div className="brand-info">
            <span className="brand-name">
              Hospics <span className="brand-gold">Technologies</span>
            </span>
            <span className="brand-tagline">All-in-One Hospitality Management Platform</span>
          </div>
        </div>

        {/* Desktop Navigation Switcher */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  color={isActive ? '#0A1121' : 'currentColor'}
                />
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="nav-badge-pill">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {ordersCount > 0 && onNavigateToTracking && (
            <button
              className="nav-cta-btn"
              onClick={onNavigateToTracking}
              style={{
                background: currentView === 'tracking' ? 'var(--gold-gradient)' : 'rgba(212, 175, 55, 0.12)',
                color: currentView === 'tracking' ? '#0A1121' : 'var(--gold-300)',
                border: currentView === 'tracking' ? '1px solid var(--gold-400)' : '1px solid var(--gold-border)'
              }}
              title="Track live order status and view history"
            >
              <Icon name="clock" size={14} color={currentView === 'tracking' ? '#0A1121' : 'var(--gold-400)'} />
              <span>Track Orders ({ordersCount})</span>
            </button>
          )}

          {/* Cart Icon if in restaurant mode or has items */}
          <button
            className="cart-indicator-btn"
            onClick={onOpenCart}
            title="Open Dining Cart"
          >
            <Icon name="bag" size={19} color="#DFBE5E" />
            {cartCount > 0 && (
              <span className="cart-count-bubble">{cartCount}</span>
            )}
          </button>

          {/* Book Tour CTA */}
          <button className="nav-cta-btn" onClick={onOpenTourModal}>
            <span>Request Briefing</span>
            <Icon name="arrow-right" size={14} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <Icon name={mobileMenuOpen ? 'x' : 'filter'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon
                    name={item.icon}
                    size={18}
                    color={isActive ? '#0A1121' : 'var(--gold-400)'}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className="nav-badge-pill">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
