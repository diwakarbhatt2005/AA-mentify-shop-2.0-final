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
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)] font-space-grotesk">AI Buddies Marketplace</h1>
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
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4 font-space-grotesk">Choose Your AI Buddies</h2>
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
        <footer className="bg-[var(--header-bg)] border-t border-[var(--border)] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="font-bold text-2xl text-[var(--text)] font-space-grotesk">AI Flix</span>
                </div>
                <p className="text-[var(--text-muted)] mb-4 max-w-md">
                  Transforming how people interact with AI, empowering careers through revolutionary AI Buddies' aligned with your unique identity.
                </p>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                    <div key={social} className="w-10 h-10 bg-[var(--card-bg)] rounded-full flex items-center justify-center hover:bg-[#02a2bd] hover:text-white transition-colors cursor-pointer">
                      <span className="text-sm font-semibold">{social[0].toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--text)] mb-4 font-space-grotesk">Quick Links</h3>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">About AI Flix</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Business Opportunities</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">AI Buddies</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Success Stories</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Help Center</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--text)] mb-4 font-space-grotesk">Products</h3>
                <ul className="space-y-2 text-[var(--text-muted)]">
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Main AI Flix Bot</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Business Mentor</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Health & Wellness</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Finance Buddy</a></li>
                  <li><a href="#" className="hover:text-[#02a2bd] transition-colors">Social Media Buddy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-[var(--text-muted)] mb-4 md:mb-0">
                © 2024 AI Flix. All rights reserved.
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-[var(--text-muted)]">
                <div>
                  <div className="font-semibold text-[var(--text)]">Contact Us</div>
                  <div className="text-[var(--text-muted)]">support@mentify-ai.com</div>
                  <div className="text-[var(--text-muted)]">+1 (555) 123-4567</div>
                  <div className="text-[var(--text-muted)]">Global Operations</div>
                </div>

                <div className="flex items-center space-x-6">
                  <a href="#" className="hover:text-[#02a2bd] transition-colors">Terms & Conditions</a>
                  <a href="#" className="hover:text-[#02a2bd] transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-[#02a2bd] transition-colors">Cookie Policy</a>
                </div>
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