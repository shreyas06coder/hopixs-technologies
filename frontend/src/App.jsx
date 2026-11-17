import React, { useState, useEffect } from 'react';
import {
  INITIAL_ORDERS,
  INITIAL_GUEST_REQUESTS,
  INVENTORY_ITEMS
} from './data/sampleData';

import { GlobalNav } from './components/common/GlobalNav';
import { ToastNotification } from './components/common/ToastNotification';
import { BriefingModal } from './components/common/BriefingModal';
import { Modal } from './components/common/Modal';
import { Icon } from './components/common/Icons';

import { LandingPage } from './components/landing/LandingPage';
import { DemoHub } from './components/demos/DemoHub';
import { RestaurantDemo } from './components/restaurant/RestaurantDemo';
import { CartDrawer } from './components/restaurant/CartDrawer';
import { OrderTrackingPage } from './components/restaurant/OrderTrackingPage';
import { HotelPortal } from './components/hotel/HotelPortal';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

import './App.css';

export function App() {
  // Navigation & View Routing State: 'landing' | 'demos' | 'restaurant' | 'tracking' | 'hotel' | 'admin'
  const [currentView, setCurrentView] = useState('landing');
  const [restaurantInitialVenue, setRestaurantInitialVenue] = useState('restaurant');

  // 1. Orders State with localStorage persistence
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('hospics_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('hospics_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // 2. Cart State with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('hospics_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [
      {
        id: 'fd-1',
        name: 'A5 Miyazaki Wagyu Tenderloin',
        price: 115,
        quantity: 1,
        selectedOption: 'Medium-Rare (Recommended)',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'fd-5',
        name: 'The Hospics Signature Old Fashioned',
        price: 28,
        quantity: 2,
        selectedOption: null,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('hospics_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // 3. Active Order ID tracked by customer
  const [activeOrderId, setActiveOrderId] = useState(() => {
    try {
      return localStorage.getItem('hospics_active_order_id') || 'ORD-9081';
    } catch {
      return 'ORD-9081';
    }
  });

  useEffect(() => {
    if (activeOrderId) {
      try {
        localStorage.setItem('hospics_active_order_id', activeOrderId);
      } catch (e) {
        console.error('Failed to save activeOrderId to localStorage', e);
      }
    }
  }, [activeOrderId]);

  // Listen for storage events (allows multi-tab synchronization between Customer and Admin!)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'hospics_orders' && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'hospics_cart' && e.newValue) {
        try {
          setCart(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'hospics_active_order_id' && e.newValue) {
        setActiveOrderId(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Other reactive operational states
  const [guestRequests, setGuestRequests] = useState(INITIAL_GUEST_REQUESTS);
  const [inventory, setInventory] = useState(INVENTORY_ITEMS);

  // Cart Drawer open/close state (accessible from any page via top-right bag icon!)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Order Confirmation Dialog State
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  // Briefing Modal State
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);

  // Helper to trigger toast with auto-dismiss
  const showToast = (title, message, icon = 'check-circle') => {
    setToast({ title, message, icon });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Cart operations
  const handleAddToCart = (item, selectedOption) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (i) => i.id === item.id && i.selectedOption === selectedOption
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            selectedOption: selectedOption || null,
            image: item.image
          }
        ];
      }
    });

    showToast(
      'Added to Order',
      `${item.name} ${selectedOption ? `(${selectedOption})` : ''} added to your selection.`,
      'bag'
    );
  };

  const handleUpdateCartQty = (itemId, selectedOption, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId, selectedOption);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.id === itemId && i.selectedOption === selectedOption
          ? { ...i, quantity: newQty }
          : i
      )
    );
  };

  const handleRemoveCartItem = (itemId, selectedOption) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.id === itemId && i.selectedOption === selectedOption)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart Cleared', 'All items have been removed from your selection.', 'trash');
  };

  // Place order from cart: generates unique order ID and initiates Stage 1: 'placed'
  const handlePlaceOrder = (orderData) => {
    const generatedId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: generatedId,
      type: orderData.tableNumber.includes('Suite')
        ? 'In-Room Dining'
        : orderData.tableNumber.includes('Courtyard')
        ? 'Artisan Café'
        : 'Dine-In Restaurant',
      location: orderData.tableNumber,
      guest: orderData.tableNumber.includes('Suite 704')
        ? 'Lord & Lady Sterling'
        : 'VIP Table Guest',
      time: 'Just now',
      items: orderData.items.map((i) => ({
        id: i.id,
        name: i.name,
        qty: i.quantity,
        price: i.price,
        image: i.image,
        note: i.selectedOption || null
      })),
      subtotal: orderData.subtotal,
      taxAndService: orderData.serviceCharge + orderData.tax,
      total: orderData.total,
      status: 'placed', // Stage 1 of 5
      server: 'QR Order System',
      specialNote: orderData.specialNote || null
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(generatedId);
    setCart([]); // Clear cart
    setIsCartOpen(false); // Close drawer

    // Show Confirmation Modal
    setPlacedOrderInfo({
      orderId: generatedId,
      total: orderData.total,
      table: orderData.tableNumber,
      itemCount: orderData.items.reduce((acc, i) => acc + i.quantity, 0)
    });

    showToast(
      'Order Placed Successfully',
      `Ticket #${generatedId} dispatched to brigade for ${orderData.tableNumber}.`,
      'utensils'
    );
    return generatedId;
  };

  // Reorder items from past order
  const handleReorderItems = (items) => {
    setCart((prev) => {
      const newCart = [...prev];
      items.forEach((it) => {
        const existing = newCart.find(
          (c) => c.name === it.name && (c.selectedOption === it.selectedOption || c.selectedOption === it.note)
        );
        if (existing) {
          existing.quantity += (it.qty || it.quantity || 1);
        } else {
          newCart.push({
            id: it.id || `reorder-${Date.now()}-${Math.random()}`,
            name: it.name,
            price: it.price,
            quantity: it.qty || it.quantity || 1,
            selectedOption: it.selectedOption || it.note || null,
            image: it.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80'
          });
        }
      });
      return newCart;
    });
    setIsCartOpen(true);
    showToast('Items Added to Cart', 'Past order items have been loaded into your cart.', 'bag');
  };

  // Guest request actions
  const handleCreateGuestRequest = (newRequest) => {
    setGuestRequests((prev) => [newRequest, ...prev]);
    showToast(
      'Butler Request Dispatched',
      `${newRequest.title} logged for Suite 704. SLA response underway.`,
      'hotel'
    );
  };

  // Status updates in Admin Dashboard (directly synchronizes with Customer Order Tracking!)
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(
      'Order Status Updated',
      `Order ${orderId} is now marked as ${newStatus.toUpperCase()}.`,
      'check-circle'
    );
  };

  const handleUpdateRequestStatus = (requestId, newStatus) => {
    setGuestRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
    );
    showToast(
      'Service Ticket Updated',
      `Ticket ${requestId} moved to ${newStatus.replace('_', ' ').toUpperCase()}.`,
      'check-circle'
    );
  };

  // Inventory Restock Action
  const handleReorderInventory = (item) => {
    setInventory((prev) =>
      prev.map((inv) =>
        inv.id === item.id
          ? {
              ...inv,
              inStock: Math.round(inv.minThreshold * 2.4),
              status: 'optimal'
            }
          : inv
      )
    );
    showToast(
      'Expedited Purchase Order Issued',
      `Restock order transmitted to ${item.supplier} for ${item.name}.`,
      'box'
    );
  };

  // Reset sample data & clear localStorage
  const handleResetSampleData = () => {
    try {
      localStorage.removeItem('hospics_orders');
      localStorage.removeItem('hospics_cart');
      localStorage.removeItem('hospics_active_order_id');
    } catch {}

    setOrders(INITIAL_ORDERS);
    setGuestRequests(INITIAL_GUEST_REQUESTS);
    setInventory(INVENTORY_ITEMS);
    setActiveOrderId('ORD-9081');
    showToast(
      'Demo Data Reset',
      'Initial orders, guest tickets, and inventory levels restored.',
      'refresh'
    );
  };

  // Submit Briefing
  const handleSubmitBriefing = (formData) => {
    showToast(
      'Executive Briefing Requested',
      `Thank you, ${formData.name}. Our hospitality advisory desk will contact you at ${formData.email}.`,
      'shield'
    );
  };

  // Count active badges
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'served' && o.status !== 'delivered').length;
  const activeTicketsCount = guestRequests.filter((r) => r.status !== 'completed').length;

  return (
    <div className="app-container">
      {/* Global Luxury Sticky Navigation */}
      <GlobalNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeOrdersCount={activeOrdersCount}
        activeTicketsCount={activeTicketsCount}
        onOpenTourModal={() => setIsBriefingModalOpen(true)}
        onNavigateToTracking={() => {
          setCurrentView('tracking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        ordersCount={orders.length}
      />

      {/* Main View Router */}
      <main className="main-content">
        {currentView === 'landing' && (
          <LandingPage
            onNavigateToDemos={() => {
              setCurrentView('demos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTourModal={() => setIsBriefingModalOpen(true)}
          />
        )}

        {currentView === 'demos' && (
          <DemoHub
            onSelectHotel={() => {
              setCurrentView('hotel');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectRestaurant={() => {
              setRestaurantInitialVenue('restaurant');
              setCurrentView('restaurant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCafe={() => {
              setRestaurantInitialVenue('cafe');
              setCurrentView('restaurant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectAdmin={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'restaurant' && (
          <RestaurantDemo
            cart={cart}
            onAddToCart={handleAddToCart}
            setIsCartOpen={setIsCartOpen}
            onNavigateToTracking={() => {
              setCurrentView('tracking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            ordersCount={orders.length}
            initialVenue={restaurantInitialVenue}
          />
        )}

        {currentView === 'tracking' && (
          <OrderTrackingPage
            orders={orders}
            activeOrderId={activeOrderId}
            onSelectOrderToTrack={setActiveOrderId}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onNavigateToMenu={() => {
              setCurrentView('restaurant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReorderItems={handleReorderItems}
            onNavigateToAdmin={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'hotel' && (
          <HotelPortal
            guestRequests={guestRequests}
            onCreateRequest={handleCreateGuestRequest}
            onNavigateToAdmin={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToDining={() => {
              setRestaurantInitialVenue('restaurant');
              setCurrentView('restaurant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            guestRequests={guestRequests}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            inventory={inventory}
            onReorderItem={handleReorderInventory}
            onResetSampleData={handleResetSampleData}
            onNavigateToDining={() => {
              setCurrentView('restaurant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToHotel={() => {
              setCurrentView('hotel');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Demo Quick Navigator Pill */}
      <div className="quick-switcher-pill" role="navigation" aria-label="Demo switcher">
        <button
          className={`quick-switch-item ${currentView === 'landing' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Icon name="shield" size={14} />
          <span className="lbl">Corporate</span>
        </button>

        <button
          className={`quick-switch-item ${currentView === 'demos' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('demos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Icon name="grid" size={14} />
          <span className="lbl">Demo Hub</span>
        </button>

        <button
          className={`quick-switch-item ${currentView === 'restaurant' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('restaurant');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Icon name="utensils" size={14} />
          <span className="lbl">QR Dining</span>
          {totalCartCount > 0 && (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#0A1121', color: 'var(--gold-400)', borderRadius: '9px', padding: '1px 5px' }}>
              {totalCartCount}
            </span>
          )}
        </button>

        <button
          className={`quick-switch-item ${currentView === 'tracking' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('tracking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Icon name="clock" size={14} />
          <span className="lbl">Tracking</span>
          {activeOrdersCount > 0 && (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, background: 'var(--gold-gradient)', color: '#0A1121', borderRadius: '9px', padding: '1px 5px' }}>
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          className={`quick-switch-item ${currentView === 'hotel' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('hotel');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Icon name="hotel" size={14} />
          <span className="lbl">Hotel Services</span>
        </button>

        <button
          className={`quick-switch-item ${currentView === 'admin' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Icon name="sliders" size={14} />
          <span className="lbl">Operations</span>
          {activeOrdersCount > 0 && (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#0A1121', color: 'var(--gold-400)', borderRadius: '9px', padding: '1px 5px' }}>
              {activeOrdersCount}
            </span>
          )}
        </button>
      </div>

      {/* Globally Accessible Cart Drawer (opens anywhere from top-right shopping bag icon!) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        tableNumber="Table 14 (Terrace Vista)"
        onNavigateToTracking={() => {
          setCurrentView('tracking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToMenu={() => {
          setCurrentView('restaurant');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        ordersCount={orders.length}
      />

      {/* Global Order Confirmation Modal */}
      <Modal
        isOpen={!!placedOrderInfo}
        onClose={() => setPlacedOrderInfo(null)}
        title="Order Dispatched to Kitchen Brigade"
        subtitle="Real-Time Kitchen Order Transmission"
      >
        {placedOrderInfo && (
          <div className="order-success-box">
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '2px solid var(--gold-400)',
                color: 'var(--gold-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <Icon name="check" size={32} />
            </div>

            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--gold-300)', fontWeight: 700 }}>
              #{placedOrderInfo.orderId}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Transmitted to Executive Chef & Kitchen Brigade
            </div>

            <div
              style={{
                background: 'rgba(14, 26, 46, 0.65)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                margin: '1.5rem 0',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>Delivery Point:</span>
                <span style={{ color: 'var(--warm-white)', fontWeight: 600 }}>{placedOrderInfo.table}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>Item Count:</span>
                <span style={{ color: 'var(--warm-white)', fontWeight: 600 }}>{placedOrderInfo.itemCount} items</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--gold-300)', fontWeight: 700 }}>${placedOrderInfo.total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn-gold-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.92rem' }}
                onClick={() => {
                  setPlacedOrderInfo(null);
                  setCurrentView('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Icon name="clock" size={16} />
                <span>Track Live Order Status (5 Stages)</span>
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn-luxury-outline"
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => setPlacedOrderInfo(null)}
                >
                  Order More Items
                </button>
                <button
                  className="btn-secondary"
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => {
                    setPlacedOrderInfo(null);
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Operations Dashboard ↗</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Global Toast Notification */}
      <ToastNotification notification={toast} onClose={() => setToast(null)} />

      {/* Executive Briefing Modal */}
      <BriefingModal
        isOpen={isBriefingModalOpen}
        onClose={() => setIsBriefingModalOpen(false)}
        onSubmitBriefing={handleSubmitBriefing}
      />
    </div>
  );
}

export default App;
