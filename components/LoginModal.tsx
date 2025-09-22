'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card-bg)] rounded-3xl shadow-2xl border border-[var(--border)] w-full max-w-md relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#02a2bd]/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#02a2bd] via-purple-500 to-pink-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-[#02a2bd]/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-purple-500/20 rounded-full animate-bounce"></div>
        
        <div className="relative p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--body-bg)] rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#02a2bd] to-[#06b6d4] rounded-2xl mb-4 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-2 font-space-grotesk">
              {isLogin ? 'Welcome Back!' : 'Join Mentify AI'}
            </h2>
            <p className="text-[var(--text-muted)]">
              {isLogin ? 'Sign in to access your My buddies' : 'Create your account to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[var(--text)] font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-10 bg-[var(--body-bg)] border-[var(--border)] focus:border-[#02a2bd] focus:ring-[#02a2bd]/20 rounded-xl"
                      placeholder="John"
                      required={!isLogin}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[var(--text)] font-medium">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-10 bg-[var(--body-bg)] border-[var(--border)] focus:border-[#02a2bd] focus:ring-[#02a2bd]/20 rounded-xl"
                      placeholder="Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--text)] font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 bg-[var(--body-bg)] border-[var(--border)] focus:border-[#02a2bd] focus:ring-[#02a2bd]/20 rounded-xl"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[var(--text)] font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 bg-[var(--body-bg)] border-[var(--border)] focus:border-[#02a2bd] focus:ring-[#02a2bd]/20 rounded-xl"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[var(--text)] font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 bg-[var(--body-bg)] border-[var(--border)] focus:border-[#02a2bd] focus:ring-[#02a2bd]/20 rounded-xl"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[var(--border)] text-[#02a2bd] focus:ring-[#02a2bd]/20" />
                  <span className="text-sm text-[var(--text-muted)]">Remember me</span>
                </label>
                <button type="button" className="text-sm text-[#02a2bd] hover:text-[#028a9d] font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] hover:from-[#028a9d] hover:to-[#059bb0] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--card-bg)] text-[var(--text-muted)]">or</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-[var(--border)] hover:bg-[var(--body-bg)] rounded-xl py-3"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Toggle */}
          <div className="text-center mt-6">
            <p className="text-[var(--text-muted)]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[#02a2bd] hover:text-[#028a9d] font-semibold transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}