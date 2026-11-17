import React, { useState, useMemo } from 'react';
import { VENUE_PROFILES, MENU_ITEMS } from '../../data/sampleData';
import { MenuCard } from './MenuCard';
import { Modal } from '../common/Modal';
import { Icon } from '../common/Icons';
import '../../styles/restaurant.css';

export const RestaurantDemo = ({
  cart,
  onAddToCart,
  setIsCartOpen,
  onNavigateToTracking,
  ordersCount = 0,
  initialVenue = 'restaurant'
}) => {
  const [currentVenueId, setCurrentVenueId] = useState(initialVenue);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('Table 14 (Terrace Vista)');

  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const venue = VENUE_PROFILES[currentVenueId];

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Must match venue
      if (item.venue !== currentVenueId) return false;
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      // Dietary filter
      if (selectedDietary !== 'All' && !item.tags.includes(selectedDietary)) return false;
      // Search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchFrench = item.frenchName ? item.frenchName.toLowerCase().includes(query) : false;
        if (!matchName && !matchDesc && !matchFrench) return false;
      }
      return true;
    });
  }, [currentVenueId, selectedCategory, selectedDietary, searchQuery]);

  // Handle open customization
  const handleOpenCustomize = (item) => {
    setCustomizingItem(item);
    if (item.options && item.options.choices.length > 0) {
      setSelectedOption(item.options.choices[0]);
    }
  };

  const handleConfirmCustomize = () => {
    if (customizingItem) {
      onAddToCart(customizingItem, selectedOption);
      setCustomizingItem(null);
    }
  };

  // Quick add without customization
  const handleQuickAdd = (item) => {
    onAddToCart(item, null);
  };

  return (
    <div className="restaurant-demo-page animate-fade-in">
      {/* Venue Hero Banner */}
      <div className="venue-hero">
        <div
          className="venue-hero-bg"
          style={{ backgroundImage: `url(${venue.heroImage})` }}
        />
        <div className="venue-hero-gradient" />

        <div className="venue-hero-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              {venue.michelinStars ? (
                <span className="badge-gold">
                  <Icon name="star" size={12} color="#D4AF37" />
                  MICHELIN GUIDE • {venue.michelinStars} STARS
                </span>
              ) : (
                <span className="badge-gold">
                  <Icon name="coffee" size={12} color="#D4AF37" />
                  ARTISAN MICRO-ROASTERY
                </span>
              )}
              <span className="badge-navy">
                <Icon name="star" size={12} color="#D4AF37" />
                {venue.rating} ({venue.reviewsCount} reviews)
              </span>
            </div>

            <h1 className="venue-title">{venue.name}</h1>
            <div className="venue-tagline">{venue.tagline}</div>

            <div className="venue-meta-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="compass" size={14} color="var(--gold-400)" />
                {venue.location}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="clock" size={14} color="var(--gold-400)" />
                {venue.hours}
              </span>
            </div>
          </div>

          {/* Switch Venue Toggle */}
          <div className="venue-switch-controls">
            <button
              className={`venue-toggle-btn ${currentVenueId === 'restaurant' ? 'active' : ''}`}
              onClick={() => {
                setCurrentVenueId('restaurant');
                setSelectedCategory('All');
              }}
            >
              <Icon name="utensils" size={15} />
              <span>L'Ambroisie Dining</span>
            </button>
            <button
              className={`venue-toggle-btn ${currentVenueId === 'cafe' ? 'active' : ''}`}
              onClick={() => {
                setCurrentVenueId('cafe');
                setSelectedCategory('All');
              }}
            >
              <Icon name="coffee" size={15} />
              <span>Café Valois Roastery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Location Bar */}
      <div className="dining-filter-bar">
        <div className="search-and-location-row">
          <div className="search-input-box">
            <Icon name="search" size={18} className="search-input-icon" />
            <input
              type="text"
              placeholder={`Search dishes, ingredients, pairings in ${venue.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table Selector */}
          <div className="table-selector-pill">
            <Icon name="compass" size={16} />
            <span>Seating / Destination:</span>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
            >
              <option value="Table 14 (Terrace Vista)">Table 14 (Terrace Vista)</option>
              <option value="Table 04 (Chef's Intimate Salon)">Table 04 (Chef's Salon)</option>
              <option value="Suite 704 (Presidential Suite)">Suite 704 (In-Room Delivery)</option>
              <option value="Courtyard Garden Bar #2">Courtyard Garden Bar #2</option>
              <option value="Private Cabana East #8">Private Cabana East #8</option>
            </select>
          </div>

          {/* Action Buttons: Open Cart & Track Orders */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-gold-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              onClick={() => setIsCartOpen(true)}
            >
              <Icon name="bag" size={15} />
              <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </button>

            {ordersCount > 0 && onNavigateToTracking && (
              <button
                className="btn-luxury-outline"
                style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                onClick={onNavigateToTracking}
              >
                <Icon name="clock" size={14} color="var(--gold-400)" />
                <span>Track Orders ({ordersCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Scroll Bar */}
        <div className="category-tabs-scroll">
          {venue.curatedCategories.map((cat) => (
            <button
              key={cat}
              className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Sub-tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Dietary Filter:
          </span>
          {['All', "Chef's Pick", 'Vegetarian', 'Gluten-Free', 'Pescatarian'].map((diet) => (
            <button
              key={diet}
              onClick={() => setSelectedDietary(diet)}
              style={{
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: selectedDietary === diet ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedDietary === diet ? '1px solid var(--gold-400)' : '1px solid var(--surface-border)',
                color: selectedDietary === diet ? 'var(--gold-200)' : 'var(--text-secondary)'
              }}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--navy-850)', borderRadius: 'var(--radius-lg)' }}>
          <Icon name="search" size={40} color="var(--gold-500)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm-white)', marginBottom: '8px' }}>
            No Culinary Selections Found
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Try adjusting your search terms or dietary filters.
          </p>
        </div>
      ) : (
        <div className="menu-items-grid">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onSelectForCustomize={handleOpenCustomize}
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>
      )}

      {/* Customization Modal */}
      <Modal
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
        title={customizingItem?.name || 'Customization'}
        subtitle="Artisan Preparation Options"
      >
        {customizingItem && (
          <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '1.5rem' }}>
              <img
                src={customizingItem.image}
                alt={customizingItem.name}
                style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {customizingItem.description}
                </p>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--gold-300)', fontWeight: 700 }}>
                  ${customizingItem.price}
                </div>
              </div>
            </div>

            {customizingItem.options && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--gold-400)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '10px'
                  }}
                >
                  Select {customizingItem.options.type.toUpperCase()}:
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {customizingItem.options.choices.map((choice) => (
                    <label
                      key={choice}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: selectedOption === choice ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: selectedOption === choice ? '1px solid var(--gold-400)' : '1px solid var(--surface-border)',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', color: selectedOption === choice ? 'var(--warm-white)' : 'var(--cream-200)', fontWeight: selectedOption === choice ? 600 : 400 }}>
                        {choice}
                      </span>
                      <input
                        type="radio"
                        name="customOption"
                        checked={selectedOption === choice}
                        onChange={() => setSelectedOption(choice)}
                        style={{ accentColor: 'var(--gold-400)' }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              className="btn-gold-primary"
              style={{ width: '100%', padding: '13px' }}
              onClick={handleConfirmCustomize}
            >
              <span>Add to Tasting Order (${customizingItem.price})</span>
              <Icon name="check" size={16} />
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
