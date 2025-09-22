'use client';

import { createContext, useContext, useReducer, ReactNode, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  type: 'buddy' | 'premium' | 'personal';
  focusArea?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        };
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };

    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  showNotification: boolean;
  notificationItem: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationItem, setNotificationItem] = useState('');

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    
    // Show notification
    setNotificationItem(item.title);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      showNotification,
      notificationItem
    }}>
      {children}
      
      {/* Add to Cart Notification */}
      {showNotification && (
        <div
          className="fixed bottom-6 right-6"
          role="status"
          aria-live="polite"
          data-testid="cart-notification"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 99999,
            pointerEvents: 'auto',
            backgroundColor: '#02a2bd',
            color: 'white',
            padding: '14px 20px',
            borderRadius: '10px',
            boxShadow: '0 12px 30px rgba(2,162,189,0.18)',
            minWidth: '280px',
            maxWidth: '420px',
            transform: 'translateY(20px)',
            animation: 'notification-slide 360ms cubic-bezier(0.2,0.9,0.2,1) forwards'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.14)', 
              borderRadius: '50%', 
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{fontSize: '16px', lineHeight: 1}}>✓</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: '15px', margin: 0 }}>
                Added to Cart
              </p>
              <p style={{ fontSize: '13px', margin: '4px 0 0 0', opacity: 0.95 }}>
                {notificationItem}
              </p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '6px',
                fontSize: '16px'
              }}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}