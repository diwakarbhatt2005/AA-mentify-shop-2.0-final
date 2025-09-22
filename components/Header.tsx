'use client';

import { Moon, Sun, ShoppingCart, ArrowLeft, User, ChevronDown, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import CartSidebar from '@/components/CartSidebar';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [activeBus, setActiveBus] = useState<string | null>(null);
  const { items } = useCart();
  // dropdown is now hover-only; no controlled state required
  // items will represent purchased buddies; fallback placeholders if empty
  const buddies = items.length > 0 ? items : [
    { id: 'b1', title: 'Buddy 1', price: 0, type: 'buddy', quantity: 1 },
    { id: 'b2', title: 'Buddy 2', price: 0, type: 'buddy', quantity: 1 },
  ];

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      const node = dropdownRef.current;
      if (!node) return;
      if (e.target instanceof Node && !node.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--header-bg)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-xl text-[var(--text)]">Mentify AI</span>
          </Link>

          {/* placeholder center area - keep layout even when dropdown moved */}
          <div className="hidden md:flex justify-center" aria-hidden>
            <div />
          </div>
          
          {/* dropdown outside-click handling handled in useEffect */}

          <div className="hidden md:flex items-center justify-end space-x-3">
            {/* Buddies dropdown: compact trigger, opened menu styled like Login box and smaller */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-xl border border-[var(--border)] bg-gradient-to-r from-[var(--header-bg)] to-[var(--card-bg)] text-[var(--text)] hover:shadow-md transition-transform duration-150 text-sm"
                onClick={(e) => { e.stopPropagation(); setDropdownOpen((s) => !s); }}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
              >
                <span className="font-medium">Buddies</span>
                <ChevronDown className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`${dropdownOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'} origin-top-right absolute right-0 mt-2 w-48 max-h-56 overflow-auto bg-gradient-to-r from-[var(--header-bg)] to-[var(--card-bg)] border border-[var(--border)] rounded-xl p-2 transition-all shadow-lg z-50`}>
                <div className="text-sm font-semibold text-[var(--text)] mb-2 px-1">Purchased Buddies</div>
                <div className="flex flex-col gap-1">
                  {buddies.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => { setActiveBus(b.id); setDropdownOpen(false); }}
                      className={`px-2 py-1 rounded-lg text-left transition-colors duration-150 cursor-pointer flex items-center justify-between ${activeBus === b.id ? 'bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] text-white' : 'hover:bg-[rgba(2,162,189,0.06)] text-[var(--text)]'}`}
                    >
                      <Link href={`/buddy/${b.id}`} className="block text-sm">
                        <div className="font-medium">{b.title}</div>
                        <div className="text-xs text-[var(--text-muted)]">${b.price.toLocaleString()}</div>
                      </Link>
                      <div className="ml-2 text-xs text-[var(--text-muted)]">&gt;</div>
                    </div>
                  ))}
                  {buddies.length === 0 && (
                    <div className="px-2 py-2 text-sm text-[var(--text-muted)] text-center">No buddies purchased</div>
                  )}
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[var(--text)] relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#02a2bd] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-[var(--text)]"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-[var(--text)]">
              <User className="h-5 w-5" />
            </Button>
            <div className="ml-4">
              <Button className="px-4 py-2 rounded-xl border border-[var(--border)] bg-gradient-to-r from-[var(--header-bg)] to-[var(--card-bg)] text-[var(--text)] hover:shadow-lg hover:scale-105 transition-all duration-300" variant="ghost" size="sm">
                Login
              </Button>
            </div>
          </div>
          {/* Mobile controls */}
          <div className="flex items-center justify-end md:hidden">
            <button
              aria-label="Open menu"
              className="p-2 rounded-md text-[var(--text)]"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      </header>
      {/* Mobile panel: full-width, fixed under header when open */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-50 bg-[var(--header-bg)] shadow-lg p-4">
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-sm font-semibold text-[var(--text)] mb-2">Buddies</div>
              <div className="flex flex-col gap-1">
                {buddies.map((b) => (
                  <Link key={b.id} href={`/buddy/${b.id}`} onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-[var(--text)] hover:bg-[rgba(2,162,189,0.04)]">
                    <div className="font-medium">{b.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">${b.price.toLocaleString()}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-md text-[var(--text)]" onClick={() => { setIsCartOpen(true); setMobileOpen(false); }}>
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#02a2bd] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </div>
                </button>
                <button className="p-2 rounded-md" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <button className="p-2 rounded-md">
                  <User className="h-5 w-5" />
                </button>
              </div>
              <div>
                <Button className="px-4 py-2 rounded-xl border border-[var(--border)] bg-gradient-to-r from-[var(--header-bg)] to-[var(--card-bg)] text-[var(--text)]" onClick={() => setMobileOpen(false)}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

// close dropdown when clicking outside
if (typeof window !== 'undefined') {
  document.addEventListener('click', () => {
    // find header dropdown state by dispatching a custom event or leave for React to handle
    // Simpler: nothing here; React component manages its own document click via effect if needed later.
  });
}