import React, { useState } from 'react';
import { Icon } from '../common/Icons';

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  tableNumber = 'Table 14 (Terrace Vista)',
  onNavigateToTracking,
  onNavigateToMenu,
  ordersCount = 0
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [checkoutTable, setCheckoutTable] = useState(tableNumber);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const serviceCharge = taxableAmount * 0.10;
  const tax = taxableAmount * 0.05;
  const grandTotal = taxableAmount + serviceCharge + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'VIPLUXURY' || cleanCode === 'WELCOME10') {
      setAppliedDiscount(15);
      setPromoMessage('VIP 15% Courtesy Applied');
    } else if (cleanCode === 'MICHELIN') {
      setAppliedDiscount(20);
      setPromoMessage("Chef's Table 20% Courtesy Applied");
    } else {
      setPromoMessage('Invalid voucher or invitation code');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    onPlaceOrder({
      items: cart,
      subtotal,
      discountAmount,
      serviceCharge,
      tax,
      total: grandTotal,
      tableNumber: checkoutTable.trim() || 'Table 14 (Terrace Vista)',
      specialNote: specialNote.trim()
    });
  };

  const quickTablePresets = [
    'Table 14 (Terrace Vista)',
    'Table 04 (Chef Salon)',
    'Suite 704 (In-Room)',
    'Courtyard Bar #2'
  ];

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid var(--gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon name="bag" size={18} color="var(--gold-400)" />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--warm-white)', margin: 0 }}>
                Your Dining Order
              </h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--gold-400)' }}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in selection
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {cart.length > 0 && onClearCart && (
              <button
                onClick={onClearCart}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: 'var(--status-rose)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: 600
                }}
                title="Clear all items from cart"
              >
                <Icon name="trash" size={13} />
                <span>Clear Cart</span>
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-secondary)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close cart drawer"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>

        {/* Item List */}
        <div className="cart-drawer-items-list">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
              <Icon name="bag" size={48} color="var(--navy-600)" style={{ margin: '0 auto 1.25rem' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm-white)', marginBottom: '8px', fontSize: '1.25rem' }}>
                Your Cart is Empty
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '280px', margin: '0 auto 1.5rem' }}>
                Select items from our QR menu to place your contactless dining order.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '260px', margin: '0 auto' }}>
                {onNavigateToMenu && (
                  <button
                    className="btn-gold-primary"
                    style={{ padding: '10px 16px', fontSize: '0.84rem' }}
                    onClick={() => {
                      onClose();
                      onNavigateToMenu();
                    }}
                  >
                    <Icon name="utensils" size={15} />
                    <span>Browse QR Menu</span>
                  </button>
                )}

                {ordersCount > 0 && onNavigateToTracking && (
                  <button
                    className="btn-luxury-outline"
                    style={{ padding: '10px 16px', fontSize: '0.84rem' }}
                    onClick={() => {
                      onClose();
                      onNavigateToTracking();
                    }}
                  >
                    <Icon name="clock" size={15} color="var(--gold-400)" />
                    <span>View Orders & Tracking</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    {item.selectedOption && (
                      <div className="cart-item-customization">
                        Option: {item.selectedOption}
                      </div>
                    )}
                    <div className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '6px' }}>
                        (${item.price} each)
                      </span>
                    </div>

                    <div className="cart-qty-counter">
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQty(item.id, item.selectedOption, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Icon name="minus" size={12} />
                      </button>
                      <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--warm-white)', minWidth: '22px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQty(item.id, item.selectedOption, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Icon name="plus" size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id, item.selectedOption)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      color: 'var(--text-muted)',
                      alignSelf: 'flex-start',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Remove item"
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              ))}

              {/* Table Number & Special Instructions Checkout Inputs */}
              <div
                style={{
                  background: 'rgba(14, 26, 46, 0.65)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label
                      style={{
                        fontSize: '0.76rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--gold-400)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Icon name="compass" size={13} />
                      <span>Table / Seating Location:</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={checkoutTable}
                    onChange={(e) => setCheckoutTable(e.target.value)}
                    placeholder="E.g., Table 14 (Terrace Vista)"
                    style={{
                      width: '100%',
                      background: 'var(--navy-900)',
                      border: '1px solid var(--gold-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      color: 'var(--warm-white)',
                      fontSize: '0.86rem',
                      fontWeight: 600
                    }}
                  />

                  {/* Quick preset chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '6px' }}>
                    {quickTablePresets.map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        onClick={() => setCheckoutTable(preset)}
                        style={{
                          fontSize: '0.7rem',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)',
                          background: checkoutTable === preset ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          border: checkoutTable === preset ? '1px solid var(--gold-400)' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: checkoutTable === preset ? 'var(--gold-200)' : 'var(--text-secondary)'
                        }}
                      >
                        {preset.split(' ')[0]} {preset.split(' ')[1] || ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: '0.76rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--gold-400)',
                      fontWeight: 600,
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    Special Instructions (Optional):
                  </label>
                  <textarea
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="E.g., Dressing on the side, extra ice, gluten sensitivity..."
                    rows={2}
                    style={{
                      width: '100%',
                      background: 'var(--navy-900)',
                      border: '1px solid var(--surface-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      color: 'var(--warm-white)',
                      fontSize: '0.82rem',
                      resize: 'none'
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer & Bill Breakdown */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Voucher code (try VIPLUXURY)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--navy-850)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  color: 'var(--warm-white)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase'
                }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.78rem' }}>
                Apply
              </button>
            </form>

            {promoMessage && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: appliedDiscount > 0 ? 'var(--status-emerald)' : 'var(--status-rose)',
                  marginBottom: '0.75rem',
                  textAlign: 'right'
                }}
              >
                {promoMessage}
              </div>
            )}

            {/* Calculations */}
            <div className="cart-breakdown-row">
              <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {appliedDiscount > 0 && (
              <div className="cart-breakdown-row" style={{ color: 'var(--status-emerald)' }}>
                <span>VIP Courtesy ({appliedDiscount}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="cart-breakdown-row">
              <span>Service Charge (10%)</span>
              <span>${serviceCharge.toFixed(2)}</span>
            </div>

            <div className="cart-breakdown-row">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="cart-total-row">
              <span>Total Amount</span>
              <span className="text-gold-gradient">${grandTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn-gold-primary"
              style={{ width: '100%', padding: '13px', fontSize: '0.95rem' }}
              onClick={handleCheckout}
            >
              <span>Place Order (${grandTotal.toFixed(2)})</span>
              <Icon name="arrow-right" size={16} />
            </button>

            {ordersCount > 0 && onNavigateToTracking && (
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToTracking();
                  }}
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--gold-300)',
                    background: 'transparent',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Track Existing Order Status & View History →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
