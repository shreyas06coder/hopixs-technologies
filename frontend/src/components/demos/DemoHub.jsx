import React from 'react';
import { Icon } from '../common/Icons';
import '../../styles/demos.css';

export const DemoHub = ({
  onSelectHotel,
  onSelectRestaurant,
  onSelectCafe,
  onSelectAdmin
}) => {
  const demos = [
    {
      id: 'hotel',
      category: 'Hospitality & Luxury Suites',
      title: 'Grand Azure Resort & Spa',
      subtitle: 'Hotel Guest Services & Concierge',
      description:
        'Experience the in-room touch interface for Suite 704. Place requests for Egyptian cotton linens, room service dining, private spa massages, and valet car retrieval.',
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      badge: 'Guest Touchpoint',
      icon: 'hotel',
      tags: ['In-Suite Tablet', 'Butler Dispatch', 'Valet Retrieval', 'Spa Booking', 'Room Climate'],
      action: onSelectHotel,
      btnLabel: 'Launch Hotel Guest Portal'
    },
    {
      id: 'restaurant',
      category: 'Haute Cuisine & Cellar',
      title: "L'Ambroisie Fine Dining",
      subtitle: 'Michelin 2-Star Gastronomic Dining',
      description:
        'Interactive tableside ordering with dish photography, beverage pairings, customized options, allergy filters, and instant kitchen ticket sync.',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      badge: 'Fine Dining POS',
      icon: 'utensils',
      tags: ['A5 Wagyu', 'Beverage Pairing', 'Course Pacing', 'Custom Doneness', 'Split Check'],
      action: onSelectRestaurant,
      btnLabel: 'Launch Restaurant Demo'
    },
    {
      id: 'cafe',
      category: 'Artisan Roastery & Bakery',
      title: 'Café Valois Coffee & Roastery',
      subtitle: 'Single-Origin Brews & Viennoiserie',
      description:
        'High-speed mobile ordering for premium cafés. Customize single-origin pour-overs, nitro cold brew floats, flaky croissants, and pick up without queue delays.',
      image:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
      badge: 'Quick Casual & Bar',
      icon: 'coffee',
      tags: ['V60 Pour-Over', 'Nitro Cold Brew', 'Artisan Viennoiserie', 'Milk Customizer', 'Express Counter'],
      action: onSelectCafe,
      btnLabel: 'Launch Café Demo'
    }
  ];

  return (
    <div className="demos-hub-page animate-fade-in">
      <div className="demos-header">
        <div style={{ marginBottom: '1rem' }}>
          <span className="badge-gold">
            <Icon name="grid" size={14} color="#D4AF37" />
            LIVE INTERACTIVE ENVIRONMENTS
          </span>
        </div>
        <h1 className="demos-title">
          Select an Experience to Test <span className="text-gold-gradient">Hospics Technologies</span>
        </h1>
        <p className="demos-subtitle">
          Test the tailored guest and staff interfaces engineered for each hospitality vertical.
          All actions update live states across the platform.
        </p>
      </div>

      {/* 3 Main Experience Cards */}
      <div className="demos-cards-grid">
        {demos.map((d) => (
          <div key={d.id} className="demo-card">
            <div className="demo-card-image-wrap">
              <img src={d.image} alt={d.title} className="demo-card-image" />
              <div className="demo-card-badge">
                <span className="badge-gold">
                  <Icon name={d.icon} size={13} color="#D4AF37" />
                  {d.badge}
                </span>
              </div>
              <div className="demo-card-category">{d.category}</div>
            </div>

            <div className="demo-card-body">
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-400)', fontWeight: 600, marginBottom: '4px' }}>
                {d.subtitle}
              </div>
              <h3 className="demo-card-title">{d.title}</h3>
              <p className="demo-card-desc">{d.description}</p>

              <div className="demo-tags-wrap">
                {d.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="demo-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="btn-gold-primary" onClick={d.action} style={{ marginTop: 'auto' }}>
                <span>{d.btnLabel}</span>
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Dashboard Launch Banner */}
      <div className="admin-preview-banner">
        <div>
          <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
            <span className="badge-navy">
              <Icon name="sliders" size={14} color="var(--gold-400)" />
              GENERAL MANAGER & BACK-OF-HOUSE INTELLIGENCE
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--warm-white)', marginBottom: '8px' }}>
            Executive Operations & Command Center
          </h2>
          <p style={{ color: 'var(--cream-200)', fontSize: '0.96rem', maxWidth: '640px' }}>
            Manage the synchronized pulse of your property. View live dining tickets, dispatch butler 
            and valet requests, track cellar inventory, and monitor real-time revenue analytics.
          </p>
        </div>

        <button className="btn-luxury-outline" onClick={onSelectAdmin} style={{ flexShrink: 0, padding: '14px 28px' }}>
          <Icon name="sliders" size={18} color="var(--gold-300)" />
          <span>Launch Operations Dashboard</span>
        </button>
      </div>
    </div>
  );
};
