'use client';

import { Star, Heart, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  description: string | string[];
  image: string;
  rating: number;
  isPremium?: boolean;
  focusArea: string;
  type?: 'buddy' | 'premium' | 'personal';
  isAffiliate?: boolean;
  onNonAffiliateClick?: () => void;
  onAffiliateClick?: () => void;
  creator?: string;
}

export default function ProductCard({
  id,
  title,
  price,
  description,
  image,
  rating,
  isPremium = false,
  focusArea,
  type = 'buddy',
  isAffiliate = false,
  onNonAffiliateClick,
  onAffiliateClick
  , creator
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price,
      type,
      focusArea
    });
  };

  return (
    <div className={`bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 w-full h-full ${isPremium ? 'ring-2 ring-[#02a2bd] relative hover:ring-4 hover:ring-[#02a2bd]/50' : 'hover:shadow-[#02a2bd]/20'}`}>
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            PREMIUM
          </div>
        </div>
      )}
      
      <div className="relative group">
        <div className="w-full h-40 bg-gradient-to-br from-[#02a2bd]/10 to-[#06b6d4]/10 flex items-center justify-center group-hover:from-[#02a2bd]/20 group-hover:to-[#06b6d4]/20 transition-all duration-500 relative overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="AI Bot" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02a2bd]/30 to-transparent"></div>
          <Bot className="absolute bottom-3 right-3 h-6 w-6 text-white drop-shadow-lg" />
        </div>
        <button className="absolute top-3 left-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#02a2bd] bg-[#02a2bd]/10 px-2 py-1 rounded">
            {focusArea}
          </span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>

        <h3 className="font-semibold text-base text-[var(--text)] mb-2 font-space-grotesk">{title}</h3>
        {/* Render description as bullet points for clarity */}
        {Array.isArray(description) ? (
          <ul className="text-xs text-[var(--text-muted)] mb-3 list-disc list-inside space-y-1">
            {description.map((d, i) => (
              <li key={i} className="line-clamp-3">{d}</li>
            ))}
          </ul>
        ) : (
          <ul className="text-xs text-[var(--text-muted)] mb-3 list-disc list-inside">
            {description.split(/\.|\n/).map((part, i) => part.trim()).filter(Boolean).map((part, i) => (
              <li key={i} className="line-clamp-3">{part}</li>
            ))}
          </ul>
        )}
        {creator && (
          <div className="text-xs text-[var(--text-muted)] mb-3">
            Created by <span className="font-medium text-[#02a2bd]">{creator}</span>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between">
          <div className="text-xl font-bold text-[var(--text)] font-space-grotesk">
            ${price.toLocaleString()}
          </div>
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className={`${isPremium ? 'bg-gradient-to-r from-[#02a2bd] to-[#06b6d4] hover:from-[#028a9d] hover:to-[#059bb0] hover:shadow-lg' : 'bg-[#02a2bd] hover:bg-[#028a9d] hover:shadow-lg'} text-white border-0 transition-all duration-300 hover:scale-105`}
          >
            {isPremium ? 'Add Premium' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}