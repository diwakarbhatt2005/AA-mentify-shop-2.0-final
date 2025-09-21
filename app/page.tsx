'use client';

import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import LoginModal from '@/components/LoginModal';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, TrendingUp, Heart, DollarSign, MessageSquare, Check, Star, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

const buddyPackages = [
  {
    id: '1-buddy',
    title: '1 AI Buddy',
    price: 300,
    description: 'Start your AI journey with one specialized buddy to help you excel in your chosen focus area.',
    image: '',
    rating: 5,
    focusArea: 'Problem Solver',
    type: 'buddy' as const
  },
  {
    id: '2-buddies',
    title: '2 AI Buddies',
    price: 600,
    description: 'Enhance your capabilities with two AI buddies covering different aspects of your life and work.',
    image: '',
    rating: 5,
    focusArea: 'Education',
    type: 'buddy' as const
  },
  {
    id: '3-buddies',
    title: '3 AI Buddies',
    price: 900,
    description: 'Expand your AI support network with three specialized buddies for comprehensive assistance.',
    image: '',
    rating: 5,
    focusArea: 'Health & Wellness',
    type: 'buddy' as const
  },
  {
    id: '4-buddies',
    title: '4 AI Buddies',
    price: 1200,
    description: 'Get advanced support across multiple domains with four expert AI companions.',
    image: '',
    rating: 5,
    focusArea: 'Love & Dating',
    type: 'buddy' as const
  },
  {
    id: '5-buddies',
    title: '5 AI Buddies',
    price: 1500,
    description: 'Nearly complete coverage of all life areas with five dedicated AI specialists.',
    image: '',
    rating: 5,
    focusArea: 'Finance',
    type: 'buddy' as const
  },
  {
    id: '6-buddies',
    title: '6 AI Buddies',
    price: 1800,
    description: 'Complete AI ecosystem with six specialized buddies covering all major life and work areas.',
    image: '',
    rating: 5,
    focusArea: 'Social Media',
    type: 'buddy' as const
  }
];

const productSuggestions = [
  {
    title: 'Career Coach AI',
    category: 'Job Training',
    icon: TrendingUp
  },
  {
    title: 'Fitness Mentor',
    category: 'Health & Wellness',
    icon: Heart
  },
  {
    title: 'Dating Assistant',
    category: 'Love & Relationships',
    icon: Heart
  },
  {
    title: 'Investment Guide',
    category: 'Finance',
    icon: DollarSign
  },
  {
    title: 'Social Media Expert',
    category: 'Content Creation',
    icon: MessageSquare
  },
  {
    title: 'Learning Companion',
    category: 'Education',
    icon: Bot
  }
];

const personalBots = [
  {
    id: 'personal-1',
    title: 'Custom Career Bot',
    price: 100,
    description: 'Personalized career guidance bot created by our community. Annual subscription with commission structure.',
    image: '',
    rating: 4,
    focusArea: 'Career Development',
    type: 'personal' as const,
    creator: 'Sarah Johnson'
  },
  {
    id: 'personal-2',
    title: 'Wellness Tracker Bot',
    price: 100,
    description: 'Custom health and wellness tracking bot with personalized recommendations and daily check-ins.',
    image: '',
    rating: 5,
    focusArea: 'Health & Wellness',
    type: 'personal' as const,
    creator: 'Dr. Mike Chen'
  },
  {
    id: 'personal-3',
    title: 'Investment Advisor Bot',
    price: 100,
    description: 'Specialized investment advice bot with market analysis and portfolio recommendations.',
    image: '',
    rating: 4,
    focusArea: 'Finance',
    type: 'personal' as const,
    creator: 'Alex Rodriguez'
  },
  {
    id: 'personal-4',
    title: 'Language Learning Bot',
    price: 100,
    description: 'Interactive language learning companion with personalized lessons and conversation practice.',
    image: '',
    rating: 5,
    focusArea: 'Education',
    type: 'personal' as const,
    creator: 'Maria Garcia'
  },
  {
    id: 'personal-5',
    title: 'Mindfulness Coach Bot',
    price: 100,
    description: 'Daily mindfulness and meditation guide with personalized wellness tracking and insights.',
    image: '',
    rating: 4,
    focusArea: 'Mental Health',
    type: 'personal' as const,
    creator: 'Dr. James Wilson'
  }
];

export default function Home() {
  const { addItem } = useCart();
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAffiliateMessage, setShowAffiliateMessage] = useState(false);

  useEffect(() => {
    // Check if user came from affiliate link
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateId = urlParams.get('ref') || urlParams.get('affiliate');
    if (affiliateId) {
      setIsAffiliate(true);
      localStorage.setItem('affiliateId', affiliateId);
    } else {
      // Check if affiliate ID exists in localStorage
      const storedAffiliateId = localStorage.getItem('affiliateId');
      if (storedAffiliateId) {
        setIsAffiliate(true);
      }
    }
  }, []);

  const handleNonAffiliateClick = () => {
    setShowAffiliateMessage(true);
    setTimeout(() => setShowAffiliateMessage(false), 3000);
  };

  const handleAffiliateClick = () => {
    setShowLoginModal(true);
  };

  return (
    <main className="min-h-screen main-gradient relative overflow-hidden">
      {/* Floating Background Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#02a2bd]/20 rounded-full animate-bounce shadow-lg"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#06b6d4]/20 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full animate-bounce delay-1000 shadow-lg"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-pink-400/20 rounded-full animate-pulse delay-500 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-yellow-400/20 rounded-full animate-float shadow-lg"></div>
        <div className="absolute top-32 left-1/3 w-6 h-6 bg-green-400/20 rounded-full animate-bounce delay-700 shadow-lg"></div>
        <div className="absolute top-60 right-1/4 w-10 h-10 bg-blue-400/20 rounded-full animate-pulse delay-300 shadow-lg"></div>
        <div className="absolute bottom-60 left-1/5 w-18 h-18 bg-indigo-400/20 rounded-full animate-float delay-1500 shadow-lg"></div>
        <div className="absolute top-80 right-1/5 w-7 h-7 bg-red-400/20 rounded-full animate-bounce delay-800 shadow-lg"></div>
        <div className="absolute bottom-32 right-1/2 w-9 h-9 bg-teal-400/20 rounded-full animate-pulse delay-1200 shadow-lg"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="hero-gradient py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#02a2bd]/10 text-[#02a2bd] text-sm font-semibold mb-6 animate-pulse">
                🤖 Mentify AI Shop
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] bg-clip-text text-transparent font-space-grotesk">
              Discover and access AI buddies In MentifyAI Shop<br />
              <span className="text-[#02a2bd] animate-pulse">for every aspect of life</span>
            </h1>
            
            <p className="text-xl text-[var(--text-muted)] mb-8 max-w-3xl mx-auto">
              Get personalized AI assistance for problem-solving, education, health, relationships, finance, and social media success.
            </p>
          </div>
        </section>

        {/* Product Suggestions */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--text)] font-space-grotesk">Product suggestions</h2>
            <Button variant="ghost" className="text-[var(--text-muted)]">
              View more
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {productSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-[var(--card-bg)]/90 backdrop-blur-sm p-4 rounded-xl border border-[var(--border)] hover:shadow-2xl hover:shadow-[#02a2bd]/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group shadow-lg">
                <div className="text-[#02a2bd] mb-2 group-hover:scale-110 transition-transform duration-300">
                  <suggestion.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-[var(--text)] text-sm font-space-grotesk">{suggestion.title}</h3>
                <p className="text-xs text-[var(--text-muted)]">{suggestion.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Buddy Packages */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 font-space-grotesk">
              Choose Your AI Buddy Package
            </h2>
            <p className="text-lg text-[var(--text-muted)]">
              Select the perfect package based on your needs and goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buddyPackages.map((buddy) => (
              <ProductCard 
                key={buddy.id} 
                {...buddy} 
              />
            ))}
          </div>
        </section>

        {/* Premium Entry Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold mb-4 animate-pulse">
                <Crown className="h-4 w-4 mr-2" />
                PREMIUM PACKAGE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4 font-space-grotesk">
                Premium Entry
              </h2>
              <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
                Get everything you need with our most comprehensive AI buddy package
              </p>
            </div>

            <div className="bg-[var(--card-bg)]/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-[var(--border)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column - Features */}
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[var(--text)] mb-2 font-space-grotesk">Premium Entry</h3>
                    <p className="text-lg text-[var(--text-muted)]">Complete AI Ecosystem</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      'Access to all 6 AI Buddies for 1 year',
                      '1 Personal Buddy (Lifetime access)',
                      'Priority support & updates',
                      'Advanced AI capabilities'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-[var(--text)]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Note:</strong> After 3rd month, requires $100 bot purchase to remain active
                    </p>
                  </div>
                </div>

                {/* Right Column - Pricing & Visual */}
                <div className="p-8 lg:p-12 bg-gradient-to-br from-[#02a2bd]/5 to-[#06b6d4]/5 relative">
                  <div className="text-center mb-8">
                    <div className="relative inline-block mb-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#02a2bd] to-[#06b6d4] rounded-full flex items-center justify-center shadow-2xl">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                          <Crown className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-5xl font-bold text-[var(--text)] mb-2 font-space-grotesk">$3,800</div>
                      <p className="text-sm text-[var(--text-muted)]">One-time payment</p>
                      <p className="text-sm text-green-600 font-semibold">Save $4,200 compared to individual purchases</p>
                    </div>

                    {isAffiliate ? (
                      <Button 
                        onClick={handleAffiliateClick}
                        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Get Premium Access
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          addItem({
                            id: 'premium-entry',
                            title: 'Premium Entry',
                            price: 3800,
                            type: 'premium',
                            focusArea: 'Complete AI Ecosystem'
                          });
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Get Premium Access
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="py-16 hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-4 font-space-grotesk">
              AI Buddies Focus Areas
            </h2>
            <p className="text-lg text-[var(--text-muted)] mb-12">
              Each buddy specializes in one of these key life areas
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { name: 'Problem Solver', icon: Bot, color: '#2563EB' },
                { name: 'Education', icon: Bot, color: '#06B6D4' },
                { name: 'Health & Fitness', icon: Heart, color: '#10B981' },
                { name: 'Love & Dating', icon: Heart, color: '#7C3AED' },
                { name: 'Finance', icon: DollarSign, color: '#F59E0B' },
                { name: 'Social Media', icon: MessageSquare, color: '#EF4444' }
              ].map((area, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl"
                    style={{ backgroundColor: `${area.color}20` }}
                  >
                    <area.icon className="h-8 w-8" style={{ color: area.color }} />
                  </div>
                  <h3 className="font-semibold text-[var(--text)] text-sm font-space-grotesk">{area.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Bots Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 font-space-grotesk">
              Personal Bots by Community
            </h2>
            <p className="text-lg text-[var(--text-muted)]">
              Custom AI bots created by our community members
            </p>
            <div className="mt-4 p-4 bg-[var(--card-bg)]/50 rounded-lg border border-[var(--border)] max-w-2xl mx-auto">
              <p className="text-sm text-[var(--text-muted)]">
                <strong>Commission Structure:</strong> 40% Direct • 10% L1 • 5% L2 • 5% L3 • 40% Company
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalBots.map((bot) => (
              <div key={bot.id} className="relative">
                <ProductCard 
                  {...bot} 
                />
                <div className="mt-2 text-center">
                  <p className="text-sm text-[var(--text-muted)]">
                    Created by <span className="font-medium text-[#02a2bd]">{bot.creator}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[var(--header-bg)] border-t border-[var(--border)] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="font-bold text-2xl text-[var(--text)] font-space-grotesk">Mentify AI</span>
                </div>
                <p className="text-[var(--text-muted)] mb-4 max-w-md">
                  Empowering individuals with personalized AI assistance across all aspects of life and work.
                </p>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <div key={social} className="w-10 h-10 bg-[var(--card-bg)] rounded-full flex items-center justify-center hover:bg-[#02a2bd] hover:text-white transition-colors cursor-pointer">
                      <span className="text-sm font-semibold">{social[0].toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-[var(--text)] mb-4 font-space-grotesk">Products</h3>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">AI Buddies</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Premium Entry</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Personal Bots</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Enterprise</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-[var(--text)] mb-4 font-space-grotesk">Support</h3>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-[var(--text-muted)] mb-4 md:mb-0">
                © 2024 Mentify AI. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-[var(--text-muted)]">
                <a href="#" className="hover:text-[#02a2bd] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#02a2bd] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#02a2bd] transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Affiliate Message Popup */}
      {showAffiliateMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--card-bg)] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-2 font-space-grotesk">Access Restricted</h3>
              <p className="text-[var(--text-muted)] mb-6">
                You can only purchase through an affiliated link. Please contact your referrer for access.
              </p>
              <Button 
                onClick={() => setShowAffiliateMessage(false)}
                className="bg-[#02a2bd] hover:bg-[#028a9d] text-white"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </main>
  );
}