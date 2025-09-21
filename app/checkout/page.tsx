'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';

type CheckoutStep = 'email' | 'otp' | 'password' | 'details' | 'complete';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // New user details state
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const { setUser } = useUser();
  const [detailsErrors, setDetailsErrors] = useState<{ userId?: string; firstName?: string; lastName?: string }>({});
  const [showPartnerPopup, setShowPartnerPopup] = useState(false);
  const [partnerOptIn, setPartnerOptIn] = useState<boolean | null>(null);

  const finalTotal = total;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setStep('password');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      // proceed to user details step before completing
      setStep('details');
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // basic required validation: userId, firstName, lastName
    const errs: any = {};
    if (!userId) errs.userId = 'User ID is required';
    if (!firstName) errs.firstName = 'First name is required';
    if (!lastName) errs.lastName = 'Last name is required';
    setDetailsErrors(errs);
    if (Object.keys(errs).length === 0) {
      setUser({ userId, firstName, lastName, dob: dob || undefined, tob: tob || undefined, placeOfBirth: placeOfBirth || undefined });
      setStep('complete');
    }
  };

  // Partner eligibility: only show popup for these main package prices
  const partnerEligiblePrices = [300, 600, 900, 1200, 1500, 1800, 3800];

  const hasEligiblePurchase = () => {
    if (!items || items.length === 0) return false;
    // Check item price, item total (price * quantity) and overall cart total
    const totalNum = Number(total || 0);
    const found = items.some((it) => {
      const priceNum = Number((it as any).price || 0);
      const qty = Number((it as any).quantity || 1);
      const itemTotal = priceNum * qty;
      if (partnerEligiblePrices.includes(priceNum)) return true;
      if (partnerEligiblePrices.includes(itemTotal)) return true;
      return false;
    });
    if (found) return true;
    return partnerEligiblePrices.includes(Math.round(totalNum));
  };

  const proceedToPaymentFinal = (optIn: boolean) => {
    // record opt-in locally (could be sent to server)
    setPartnerOptIn(optIn);
    // Clear cart and navigate to a simple confirmation (placeholder)
    clearCart();
    // For now, navigate back to home or show a success state — keep simple
    router.push('/');
  };

  const handleProceedToPayment = () => {
    if (hasEligiblePurchase()) {
      // navigate to partner selection page for a clearer flow
      router.push('/partner-selection');
    } else {
      proceedToPaymentFinal(false);
    }
  };

  return (
    <main className="min-h-screen main-gradient">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--card-bg)] rounded-xl p-8 border border-[var(--border)]">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--text)] mb-2">
                  Payment for Mentify AI Premium
                </h1>
                <p className="text-[var(--text-muted)]">Complete your account setup to get started</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[
                  { id: 'email', label: 'Email', completed: ['otp', 'password', 'details', 'complete'].includes(step) },
                  { id: 'otp', label: 'Verify OTP', completed: ['password', 'details', 'complete'].includes(step) },
                  { id: 'password', label: 'Set Password', completed: ['details', 'complete'].includes(step) },
                  { id: 'details', label: 'User Details', completed: step === 'complete' },
                ].map((stepItem, index) => (
                  <div key={stepItem.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === stepItem.id ? 'bg-[#02a2bd] text-white' :
                      stepItem.completed ? 'bg-green-500 text-white' : 
                      'bg-[var(--border)] text-[var(--text-muted)]'
                    }`}>
                      {stepItem.completed ? <Check className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className={`ml-3 font-medium ${
                      step === stepItem.id ? 'text-[#02a2bd]' : 'text-[var(--text-muted)]'
                    }`}>
                      {stepItem.label}
                    </span>
                    {index < 3 && <div className="w-16 h-px bg-[var(--border)] mx-4" />}
                  </div>
                ))}
              </div>

              {/* Email Step */}
              {step === 'email' && (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-[var(--text)]">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#02a2bd] hover:bg-[#028a9d] text-white"
                  >
                    Send Verification Code
                  </Button>
                </form>
              )}

              {/* OTP Step */}
              {step === 'otp' && (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div>
                    <Label className="text-[var(--text)]">Verification Code</Label>
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                      We've sent a 6-digit code to {email}
                    </p>
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit code"
                      className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)] text-center text-2xl tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#02a2bd] hover:bg-[#028a9d] text-white"
                    disabled={otp.length !== 6}
                  >
                    Verify Code
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full text-[var(--text-muted)]"
                    onClick={() => setStep('email')}
                  >
                    Resend code
                  </Button>
                </form>
              )}

              {/* Password Step */}
              {step === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="password" className="text-[var(--text)]">Create Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a secure password"
                        className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)] pr-10"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-[var(--text)]">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#02a2bd] hover:bg-[#028a9d] text-white"
                    disabled={!password || password !== confirmPassword}
                  >
                    Create Account & Continue
                  </Button>
                </form>
              )}

              {/* User Details Step */}
              {step === 'details' && (
                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="userId" className="text-[var(--text)]">User ID</Label>
                    <Input
                      id="userId"
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Choose a user ID or username"
                      className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                      required
                    />
                    {detailsErrors.userId && <p className="text-xs text-red-500 mt-1">{detailsErrors.userId}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-[var(--text)]">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                        required
                      />
                      {detailsErrors.firstName && <p className="text-xs text-red-500 mt-1">{detailsErrors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[var(--text)]">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                          required
                      />
                        {detailsErrors.lastName && <p className="text-xs text-red-500 mt-1">{detailsErrors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="dob" className="text-[var(--text)]">Date of Birth (Optional)</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tob" className="text-[var(--text)]">Time of Birth (Optional)</Label>
                      <Input
                        id="tob"
                        type="time"
                        value={tob}
                        onChange={(e) => setTob(e.target.value)}
                        className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="placeOfBirth" className="text-[var(--text)]">Place of Birth (Optional)</Label>
                      <Input
                        id="placeOfBirth"
                        type="text"
                        value={placeOfBirth}
                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                        placeholder="City, Country"
                        className="mt-2 bg-[var(--card-bg)] border-[var(--border)] text-[var(--text)]"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#02a2bd] hover:bg-[#028a9d] text-white"
                    disabled={!userId || !firstName || !lastName}
                  >
                    Complete Account Setup
                  </Button>
                </form>
              )}

              {/* Complete Step */}
              {step === 'complete' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-2">Account Created Successfully!</h3>
                  <p className="text-[var(--text-muted)] mb-6">
                    Your Mentify AI Premium account is ready. Complete payment to activate your buddies.
                  </p>
                  <Button onClick={handleProceedToPayment} className="bg-[#02a2bd] hover:bg-[#028a9d] text-white px-8">
                    Proceed to Payment
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--card-bg)]/80 backdrop-blur-sm rounded-xl p-6 border border-[var(--border)] sticky top-24">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-[var(--text)]">{item.title}</span>
                      {item.quantity > 1 && (
                        <span className="text-sm text-[var(--text-muted)]"> x{item.quantity}</span>
                      )}
                    </div>
                    <span className="font-medium text-[var(--text)]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Billing cycle</span>
                  <span className="font-medium text-[var(--text)]">Yearly</span>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-[var(--text)]">Grand Total</span>
                  <span className="text-[var(--text)]">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--body-bg)] rounded-lg">
                <p className="text-sm text-[var(--text-muted)]">
                  By completing the purchase, I agree with Mentify AI's terms of service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    
    </main>
  );
}

// Add partner popup modal component inside the same file for simplicity
function PartnerPopup({ isOpen, onClose, onChoose }: { isOpen: boolean; onClose: () => void; onChoose: (optIn: boolean) => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card-bg)] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[var(--border)]">
        <h3 className="text-xl font-semibold mb-2">Become a Partner?</h3>
        <p className="text-[var(--text-muted)] mb-4">It looks like you purchased one of our main packages — would you like to join as a partner to earn commissions for referrals?</p>
        <div className="flex space-x-3 justify-end">
          <Button variant="ghost" onClick={() => { onClose(); onChoose(false); }}>
            Continue as Customer
          </Button>
          <Button onClick={() => { onClose(); onChoose(true); }} className="bg-[#02a2bd] text-white">
            Join as Partner
          </Button>
        </div>
      </div>
    </div>
  );
}

