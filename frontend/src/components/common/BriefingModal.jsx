import React, { useState } from 'react';
import { Modal } from './Modal';
import { Icon } from './Icons';

export const BriefingModal = ({ isOpen, onClose, onSubmitBriefing }) => {
  const [formData, setFormData] = useState({
    name: 'Alexandra Vance',
    title: 'Vice President of Guest Experience',
    property: 'The Peninsula Palace & Spa',
    location: 'Geneva / St. Moritz',
    email: 'a.vance@peninsulagroup.ch',
    scale: '150-300 Keys (Luxury)',
    notes: 'Interested in all-in-one QR ordering, hotel guest services, and inventory management.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitBriefing(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Private Executive Briefing"
      subtitle="Institutional Hospitality Onboarding"
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Connect with Hospics hospitality engineers and system architects for an in-depth walkthrough 
          of custom integrations, hardware compatibility, and multi-venue deployment.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--gold-400)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Executive Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                background: 'var(--navy-850)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '9px 12px',
                color: 'var(--warm-white)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--gold-400)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Corporate Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                width: '100%',
                background: 'var(--navy-850)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '9px 12px',
                color: 'var(--warm-white)',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--gold-400)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Property or Group
            </label>
            <input
              type="text"
              value={formData.property}
              onChange={(e) => setFormData({ ...formData, property: e.target.value })}
              required
              style={{
                width: '100%',
                background: 'var(--navy-850)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '9px 12px',
                color: 'var(--warm-white)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--gold-400)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Official Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: '100%',
                background: 'var(--navy-850)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '9px 12px',
                color: 'var(--warm-white)',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--gold-400)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            Portfolio Scope
          </label>
          <select
            value={formData.scale}
            onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
            style={{
              width: '100%',
              background: 'var(--navy-850)',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '9px 12px',
              color: 'var(--warm-white)',
              fontSize: '0.85rem'
            }}
          >
            <option>1-50 Keys (Boutique Villa / Private Club)</option>
            <option>50-150 Keys (Luxury Resort & Spa)</option>
            <option>150-300 Keys (Luxury Flagship Hotel)</option>
            <option>Multi-Property International Portfolio</option>
            <option>High-Volume Michelin Dining Group</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--gold-400)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            Strategic Objectives
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            style={{
              width: '100%',
              background: 'var(--navy-850)',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              color: 'var(--warm-white)',
              fontSize: '0.82rem',
              resize: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-gold-primary" style={{ flex: 1.5 }}>
            <span>Submit Executive Request</span>
            <Icon name="arrow-right" size={15} />
          </button>
        </div>
      </form>
    </Modal>
  );
};
