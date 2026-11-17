import React from 'react';
import { Icon } from '../common/Icons';

export const MenuCard = ({ item, onSelectForCustomize, onQuickAdd }) => {
  return (
    <div className="menu-card">
      <div className="menu-card-img-wrap">
        <img src={item.image} alt={item.name} className="menu-card-img" />
        <div className="menu-card-tags">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="menu-card-badge">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="menu-card-body">
        {item.frenchName && (
          <div className="menu-card-french">{item.frenchName}</div>
        )}
        <h4 className="menu-card-name">{item.name}</h4>
        <p className="menu-card-desc">{item.description}</p>

        {item.pairing && (
          <div className="menu-card-pairing">
            <span style={{ color: 'var(--gold-400)', fontWeight: 600 }}>Pairing: </span>
            {item.pairing}
          </div>
        )}

        <div className="menu-card-footer">
          <div>
            <div className="menu-card-price">${item.price}</div>
            <div className="menu-card-meta">
              {item.prepTime} • {item.calories}
            </div>
          </div>

          {item.options ? (
            <button
              className="btn-luxury-outline"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              onClick={() => onSelectForCustomize(item)}
            >
              <span>Customize</span>
              <Icon name="sliders" size={14} />
            </button>
          ) : (
            <button
              className="btn-gold-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              onClick={() => onQuickAdd(item)}
            >
              <Icon name="plus" size={15} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
