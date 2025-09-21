"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';

export default function PartnerSelectionPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  const handleChoice = (optIn: boolean) => {
    try {
      localStorage.setItem('partnerOptIn', optIn ? 'true' : 'false');
    } catch (e) {
      // ignore storage errors
    }
    // finalise: clear cart and redirect home (or to a thank-you page)
    clearCart();
    router.push('/');
  };

  return (
    <main className="min-h-screen main-gradient">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="group bg-gradient-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/20 rounded-3xl p-1 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-[var(--card-bg)] rounded-3xl p-8 border border-[var(--border)] hover:-translate-y-1 transform transition-transform duration-300">
            <h1 className="text-3xl font-bold mb-4 font-space-grotesk">Confirm: Customer or Partner?</h1>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              We detected an eligible package in your order. Would you like to continue as a customer, or join Mentify as a partner to earn commissions?
            </p>

            <div className="mb-6">
              <div className="text-sm text-[var(--text-muted)]">Order total</div>
              <div className="text-2xl font-semibold text-[var(--text)]">${total.toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Button onClick={() => handleChoice(false)} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f3f4f6] to-[#e6edf2] text-[var(--text)] shadow hover:shadow-xl border border-[var(--border)] transition-all duration-200">
                Continue as Customer
              </Button>
              <Button onClick={() => handleChoice(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] text-white shadow hover:shadow-xl transition-all duration-200">
                Join as Partner
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
