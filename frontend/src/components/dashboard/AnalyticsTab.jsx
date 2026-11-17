import React, { useState } from 'react';
import { ANALYTICS_DATA, GUEST_REVIEWS } from '../../data/sampleData';
import { Icon } from '../common/Icons';

export const AnalyticsTab = () => {
  const [reviewsList] = useState(GUEST_REVIEWS);
  const [selectedReviewFilter, setSelectedReviewFilter] = useState('All');

  const maxRevenue = Math.max(...ANALYTICS_DATA.hourlyTraffic.map((d) => d.revenue));

  const filteredReviews = reviewsList.filter((r) => {
    if (selectedReviewFilter === 'All') return true;
    return r.venue.includes(selectedReviewFilter);
  });

  return (
    <div className="animate-fade-in">
      <div className="analytics-layout">
        {/* Left Column: Revenue Trend Graph & Department Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Hourly Revenue Graph */}
          <div className="chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge-navy" style={{ marginBottom: '6px' }}>
                  TODAY'S INTRA-DAY VELOCITY
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--warm-white)', margin: 0 }}>
                  Hourly Revenue & Order Pacing
                </h3>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold-300)', fontWeight: 700 }}>
                Peak: $12,400 / hr
              </div>
            </div>

            {/* Custom SVG/Bar Chart */}
            <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '14px', paddingTop: '20px', borderBottom: '1px solid var(--surface-border)' }}>
              {ANALYTICS_DATA.hourlyTraffic.map((hourData, idx) => {
                const heightPercent = Math.max(12, Math.round((hourData.revenue / maxRevenue) * 100));
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end',
                      position: 'relative'
                    }}
                    title={`${hourData.hour} - $${hourData.revenue} (${hourData.orders} orders)`}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: `${heightPercent}%`,
                        background: idx === 6 ? 'var(--gold-gradient)' : 'rgba(212, 175, 55, 0.35)',
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.4s ease',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                      {hourData.hour}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              <span>Breakfast & Morning Pour</span>
              <span>Lunch Rush</span>
              <span>Grand Gala Dinner Service</span>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="chart-card">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--warm-white)', marginBottom: '1.25rem' }}>
              Revenue Contribution by Hospitality Sector
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {ANALYTICS_DATA.revenueByDepartment.map((dept, dIdx) => (
                <div key={dIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--cream-100)', fontWeight: 600 }}>{dept.name}</span>
                    <span style={{ color: 'var(--gold-300)', fontWeight: 700 }}>
                      {dept.amount} ({dept.percentage}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--navy-700)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${dept.percentage}%`,
                        height: '100%',
                        background: dept.color,
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Guest Sentiment & Reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--warm-white)', margin: 0 }}>
                Guest Sentiment & NPS
              </h3>
              <span className="badge-gold">
                <Icon name="star" size={13} color="#D4AF37" />
                {ANALYTICS_DATA.guestSatisfactionScore}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {['All', 'Suite', 'Dining', 'Café'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedReviewFilter(tag)}
                  style={{
                    fontSize: '0.74rem',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: selectedReviewFilter === tag ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedReviewFilter === tag ? '#0A1121' : 'var(--text-secondary)',
                    fontWeight: 700
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Reviews List */}
            <div className="reviews-list-container">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="review-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.guest}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-border)' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--warm-white)' }}>
                        {rev.guest}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--gold-400)' }}>
                        {rev.venue} • {rev.date}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
                    {[...Array(rev.rating)].map((_, s) => (
                      <Icon key={s} name="star" size={13} color="var(--gold-400)" />
                    ))}
                  </div>

                  <h5 style={{ fontSize: '0.92rem', color: 'var(--warm-white)', marginBottom: '4px' }}>
                    "{rev.title}"
                  </h5>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
                    {rev.comment}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {rev.tags.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--cream-200)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
