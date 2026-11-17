import React, { useState } from 'react';
import { CORPORATE_DATA } from '../../data/sampleData';
import { Icon, HospicsLogo } from '../common/Icons';
import '../../styles/landing.css';

export const LandingPage = ({ onNavigateToDemos, onOpenTourModal }) => {
  // Interactive ROI Calculator State
  const [roomsCount, setRoomsCount] = useState(120);
  const [coversCount, setCoversCount] = useState(250);

  // Calculations
  const calculatedUplift = Math.round(roomsCount * 1450 + coversCount * 620);
  const calculatedHoursSaved = Math.round(roomsCount * 18 + coversCount * 7.5);
  const formattedUplift = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(calculatedUplift);

  return (
    <div className="landing-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-overlay" />
        <div className="hero-glow-orb" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="badge-gold">
              <Icon name="sparkle" size={14} color="#D4AF37" />
              HOSPICS TECHNOLOGIES • ENTERPRISE PLATFORM
            </span>
          </div>

          <h1 className="hero-title">
            The All-in-One Hospitality Management Platform for <span className="text-gold-gradient">Modern Venues</span>
          </h1>

          <p className="hero-subtitle">
            Harmonizing QR ordering, hotel guest services, digital reviews, 
            and real-time inventory management into one unified platform.
          </p>

          <div className="hero-actions">
            <button className="btn-gold-primary" onClick={onNavigateToDemos}>
              <span>Launch Interactive Demos</span>
              <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn-luxury-outline" onClick={onOpenTourModal}>
              <Icon name="compass" size={16} />
              <span>Schedule Private Executive Briefing</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats-strip">
            {CORPORATE_DATA.stats.map((s, idx) => (
              <div key={idx} className="stat-item">
                <span className="stat-val">{s.value}</span>
                <span className="stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Platform Solutions */}
      <section className="section-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <span className="badge-navy">CORE SOLUTIONS</span>
          </div>
          <h2 className="section-heading">
            Four Unified Modules for Complete Hospitality Control
          </h2>
          <p className="section-description">
            Replace disconnected single-purpose tools with a streamlined all-in-one platform that connects 
            your guests, service staff, kitchen brigade, and managers in real time.
          </p>
        </div>

        <div className="solutions-grid">
          {CORPORATE_DATA.solutions.map((sol) => (
            <div key={sol.id} className="solution-card">
              <div className="solution-badge-row">
                <span className="badge-gold">{sol.badge}</span>
                <Icon name="shield" size={18} color="var(--gold-400)" />
              </div>

              <h3>{sol.title}</h3>
              <div className="solution-tagline">{sol.tagline}</div>
              <p className="solution-description">{sol.description}</p>

              <ul className="solution-features-list">
                {sol.features.map((feat, fIdx) => (
                  <li key={fIdx} className="solution-feature-item">
                    <Icon name="check-circle" size={16} color="var(--gold-400)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto' }}>
                <button
                  className="btn-luxury-outline"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '10px 16px' }}
                  onClick={onNavigateToDemos}
                >
                  <span>Experience In Live Demo</span>
                  <Icon name="chevron-right" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-wrapper" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">
            <span className="badge-navy">INDUSTRIES SERVED</span>
          </div>
          <h2 className="section-heading">
            Tailored for Hotels, Restaurants & Cafés
          </h2>
          <p className="section-description">
            Engineered with dedicated workflows for hotel guest suites, dining rooms, and busy coffee counters.
          </p>
        </div>

        <div className="industries-grid">
          {CORPORATE_DATA.industries.map((ind, iIdx) => (
            <div key={iIdx} className="industry-card" onClick={onNavigateToDemos}>
              <div
                className="industry-card-bg"
                style={{ backgroundImage: `url(${ind.image})` }}
              />
              <div className="industry-card-overlay">
                <span className="industry-stats-pill">{ind.stats}</span>
                <h4>{ind.title}</h4>
                <p>{ind.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Value & ROI Calculator */}
      <section className="section-wrapper" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div className="section-tag">
            <span className="badge-gold">EXECUTIVE VALUE METRICS</span>
          </div>
          <h2 className="section-heading">
            Project Your Property's Annual Operational Uplift
          </h2>
          <p className="section-description">
            Adjust the scale of your rooms and culinary covers to preview conservative annual 
            revenue expansion and labor efficiency with Hospics.
          </p>
        </div>

        <div className="roi-card">
          <div className="roi-controls">
            <div className="roi-slider-group">
              <div className="roi-slider-header">
                <span className="roi-slider-label">Guest Suites / Keys</span>
                <span className="roi-slider-val">{roomsCount} Keys</span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={roomsCount}
                onChange={(e) => setRoomsCount(Number(e.target.value))}
                className="roi-slider-input"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <span>30 Boutique</span>
                <span>500 Grand Palace</span>
              </div>
            </div>

            <div className="roi-slider-group">
              <div className="roi-slider-header">
                <span className="roi-slider-label">Daily Dining & Café Covers</span>
                <span className="roi-slider-val">{coversCount} Covers / Day</span>
              </div>
              <input
                type="range"
                min="80"
                max="1000"
                step="20"
                value={coversCount}
                onChange={(e) => setCoversCount(Number(e.target.value))}
                className="roi-slider-input"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <span>80 Intimate</span>
                <span>1000 High-Volume</span>
              </div>
            </div>

            <button
              className="btn-gold-primary"
              style={{ marginTop: '0.5rem' }}
              onClick={onOpenTourModal}
            >
              <span>Download Detailed Institutional Assessment</span>
              <Icon name="arrow-right" size={16} />
            </button>
          </div>

          <div className="roi-display-grid">
            <div className="roi-stat-box highlight">
              <div className="roi-result-num">{formattedUplift}</div>
              <div className="roi-result-label">Est. Annual Revenue Lift</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Via visual modifiers, beverage pairings, and simplified ordering.
              </p>
            </div>

            <div className="roi-stat-box">
              <div className="roi-result-num">{calculatedHoursSaved.toLocaleString()} hrs</div>
              <div className="roi-result-label">Staff Hours Saved / Yr</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Eliminating manual phone triage and bill delivery delays.
              </p>
            </div>

            <div className="roi-stat-box">
              <div className="roi-result-num">+28%</div>
              <div className="roi-result-label">Avg. In-Room Check Size</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Driven by high-res culinary visuals and cellar suggestions.
              </p>
            </div>

            <div className="roi-stat-box">
              <div className="roi-result-num">&lt; 15m</div>
              <div className="roi-result-label">Average Fulfillment</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Direct digital ticket routing to floor staff and kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prestige Testimonial Quote Banner */}
      <section className="section-wrapper" style={{ paddingTop: 0 }}>
        <div className="testimonial-banner">
          <p className="testimonial-quote">
            “Hospics has transformed our guest interactions from transactional friction into 
            an ambient, intuitive masterpiece. Our guests love the effortless in-suite ordering, 
            and our kitchen runs with surgical synchronization.”
          </p>

          <div className="testimonial-author-row">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              alt="General Manager"
              className="testimonial-avatar"
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--warm-white)', fontWeight: 600 }}>
                Henri de Saint-Germain
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-300)' }}>
                Managing Director, The Grand Azure Hotel & Resort Monaco
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="corporate-footer">
        <div className="footer-inner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <HospicsLogo size={34} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--warm-white)', fontWeight: 700 }}>
                HOSPICS TECHNOLOGIES
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '340px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              The all-in-one hospitality management platform engineered for hotels, restaurants, 
              and cafés worldwide.
            </p>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--gold-400)' }}>
              <span className="badge-navy">Zürich</span>
              <span className="badge-navy">Singapore</span>
              <span className="badge-navy">London</span>
              <span className="badge-navy">New York</span>
            </div>
          </div>

          <div>
            <h5 className="footer-col-title">Platform</h5>
            <ul className="footer-links-list">
              <li className="footer-link-item" onClick={onNavigateToDemos}>QR Contactless Ordering</li>
              <li className="footer-link-item" onClick={onNavigateToDemos}>Hotel Guest Services</li>
              <li className="footer-link-item" onClick={onNavigateToDemos}>Digital Feedback & Reviews</li>
              <li className="footer-link-item" onClick={onNavigateToDemos}>Inventory Management</li>
              <li className="footer-link-item" onClick={onNavigateToDemos}>Operations Dashboard</li>
            </ul>
          </div>

          <div>
            <h5 className="footer-col-title">Live Demos</h5>
            <ul className="footer-links-list">
              <li className="footer-link-item" onClick={onNavigateToDemos}>Grand Azure Hotel Suite</li>
              <li className="footer-link-item" onClick={onNavigateToDemos}>L'Ambroisie Fine Dining</li>
              <li className="footer-link-item" onClick={onNavigateToDemos}>Café Valois Roastery</li>
              <li className="footer-link-item" onClick={onNavigateToDemos}>General Manager Dashboard</li>
            </ul>
          </div>

          <div>
            <h5 className="footer-col-title">Enterprise</h5>
            <ul className="footer-links-list">
              <li className="footer-link-item" onClick={onOpenTourModal}>Request Private Tour</li>
              <li className="footer-link-item" onClick={onOpenTourModal}>Security & SOC2 Type II</li>
              <li className="footer-link-item" onClick={onOpenTourModal}>Integration Partners</li>
              <li className="footer-link-item" onClick={onOpenTourModal}>Institutional Pricing</li>
              <li className="footer-link-item" onClick={onOpenTourModal}>Contact Advisory Desk</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Hospics Technologies Inc. All rights reserved. All-in-One Hospitality Management Platform.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
