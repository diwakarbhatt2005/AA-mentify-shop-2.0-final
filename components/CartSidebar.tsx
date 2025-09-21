'use client';

import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, total, itemCount, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-[var(--card-bg)] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-[var(--text)]" />
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Cart ({itemCount})
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-[var(--text-muted)]">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-[var(--body-bg)] rounded-lg p-4 border border-[var(--border)]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-[var(--text)]">{item.title}</h3>
                        {item.focusArea && (
                          <p className="text-sm text-[var(--text-muted)]">{item.focusArea}</p>
                        )}
                        <p className="text-sm font-semibold text-[#02a2bd]">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-[var(--text-muted)] hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-[var(--text)] font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-semibold text-[var(--text)]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[var(--border)] p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-[var(--text)]">Total:</span>
                <span className="text-xl font-bold text-[#02a2bd]">
                  ${total.toLocaleString()}
                </span>
              </div>
              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full bg-[#02a2bd] hover:bg-[#028a9d] text-white">
                  Proceed to Pay
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}