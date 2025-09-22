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
    title: 'My Buddy',
    price: 300,
    description: 'Get one intelligent AI companion that specializes in problem-solving, providing personalized solutions and guidance for your daily challenges and decision-making needs.',
    image: '',
    rating: 5,
    focusArea: 'Problem Solver',
    type: 'buddy' as const
  },
  {
    id: '2-buddies',
    title: 'My Buddies',
    price: 600,
    description: 'Unlock two specialized AI assistants: one for problem-solving and another for educational support, helping you learn new skills and master complex topics efficiently.',
    image: '',
    rating: 5,
    focusArea: 'Education',
    type: 'buddy' as const
  },
  {
    id: '3-buddies',
    title: 'My Buddies',
    price: 900,
    description: 'Access three AI experts covering problem-solving, education, and health & wellness. Get personalized fitness plans, mental health support, and lifestyle optimization tips.',
    image: '',
    rating: 5,
    focusArea: 'Health & Wellness',
    type: 'buddy' as const
  },
  {
    id: '4-buddies',
    title: 'My Buddies',
    price: 1200,
    description: 'Four AI specialists including a love & dating coach that provides relationship advice, dating tips, communication strategies, and helps build meaningful connections.',
    image: '',
    rating: 5,
    focusArea: 'Love & Dating',
    type: 'buddy' as const
  },
  {
    id: '5-buddies',
    title: 'My Buddies',
    price: 1500,
    description: 'Five AI experts including a finance buddy that offers investment advice, budgeting strategies, financial planning, and helps you build wealth and achieve financial freedom.',
    image: '',
    rating: 5,
    focusArea: 'Finance',
    type: 'buddy' as const
  },
  {
    id: '6-buddies',
    title: 'My Buddies',
    price: 1800,
    description: 'Complete AI ecosystem with six specialists including a social media expert that creates engaging content, grows your following, and maximizes your online presence and influence.',
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
    description: 'AI-powered career coach that analyzes your skills, provides job search strategies, interview preparation, resume optimization, and personalized career advancement roadmaps.',
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
    description: 'Comprehensive health companion that tracks your wellness metrics, provides personalized nutrition advice, workout plans, and daily health insights for optimal living.',
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
    description: 'Smart investment assistant that analyzes market trends, provides portfolio recommendations, risk assessment, and helps you make informed financial decisions for wealth building.',
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
    description: 'Interactive language tutor that creates personalized learning paths, provides conversation practice, grammar correction, and cultural insights for fluent language mastery.',
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
    description: 'Personal mindfulness mentor that guides daily meditation sessions, stress management techniques, emotional wellness tracking, and helps achieve mental clarity and peace.',
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
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryMap: Record<string, string[]> = {
    All: [],
    'Problem-solving': ['problem', 'solver', 'problem solver'],
    Education: ['education', 'learning', 'learn'],
    Finance: ['finance', 'investment', 'money'],
    'Social Media': ['social', 'social media'],
    Relationships: ['love', 'dating', 'relationship']
  };

  const filteredBuddies = buddyPackages.filter((b) => {
    const q = searchQuery.trim().toLowerCase();
    // search match
    if (q) {
      const hay = `${b.title} ${b.description} ${b.focusArea}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    if (activeCategory === 'All') return true;
    const keywords = categoryMap[activeCategory] || [];
    const focus = (b.focusArea || '').toLowerCase();
    return keywords.some((k) => focus.includes(k) || (b.title || '').toLowerCase().includes(k));
  });

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
        
        {/* Ecommerce-style Hero (search + categories + products) */}
        <section className="py-8 bg-[var(--body-bg)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)] font-space-grotesk">My Buddies Marketplace</h1>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {['All', 'Problem-solving', 'Education', 'Finance', 'Social Media', 'Relationships'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 border ${activeCategory === cat ? 'bg-[#02a2bd] text-white border-transparent' : 'bg-[var(--card-bg)] text-[var(--text)] border-[var(--border)] hover:shadow-md'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBuddies.slice(0, 4).map((buddy) => (
                <ProductCard key={buddy.id} {...buddy} />
              ))}
            </div>
          </div>
        </section>

        {/* Product Suggestions removed per design requirements */}

        {/* AI Buddy Packages */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4 font-space-grotesk">Choose Your My Buddies</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {buddyPackages.map((buddy) => (
              <ProductCard 
                key={buddy.id} 
                {...buddy} 
              />
            ))}
          </div>
        </section>

        {/* Premium Entry removed per design requirements */}

        {/* Focus Areas removed per design requirements; only the three main sections remain */}

        {/* Personal Bots Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4 font-space-grotesk">Personal Bots by Community</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalBots.map((bot) => (
              <ProductCard 
                key={bot.id}
                {...bot}
                creator={bot.creator}
              />
            ))}
          </div>
        </section>

        {/* Footer updated to match provided Image 2 */}
        <footer className="bg-[#1a2332] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="font-bold text-xl text-white font-space-grotesk">Mentify AI</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-sm text-sm leading-relaxed">
                  Transforming how people interact with AI, empowering careers through revolutionary AI Buddies' aligned with your unique identity.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#02a2bd] transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#02a2bd] transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#02a2bd] transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#02a2bd] transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-6 font-space-grotesk">Quick Links</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">About AI Flix</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Business Opportunities</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">AI Buddies</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Success Stories</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Help Center</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-6 font-space-grotesk">Products</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Main AI Flix Bot</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Business Mentor</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Health & Wellness</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Finance Buddy</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Social Media Buddy</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-6 font-space-grotesk">Contact Us</h3>
                <div className="space-y-3 text-gray-400 text-sm">
                  <div className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-[#02a2bd]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>support@mentify-ai.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-[#02a2bd]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-[#02a2bd]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span>Global Operations</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400 mb-4 md:mb-0">
                <a href="#" className="hover:text-[#02a2bd] transition-colors">Terms & Conditions</a>
                <a href="#" className="hover:text-[#02a2bd] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#02a2bd] transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-[#02a2bd] transition-colors">Legal Notice</a>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 Mentify AI. All rights reserved. Powered by AI Flix.
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