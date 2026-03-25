'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const conditionColor: Record<string, string> = {
  new: 'bg-76ers-gold text-76ers-blue font-bold',
  like_new: 'bg-76ers-red text-white font-bold',
  good: 'bg-76ers-blue text-76ers-gold font-bold',
  fair: 'bg-orange-100 text-orange-800',
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    addToCart(product, 1);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <Link href={`/shop/${product.id}`}>
      <div className="card card-hover h-full flex flex-col cursor-pointer wanted-pulse" 
           style={{
             border: '4px solid #FFD700',
             boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3), 0 0 20px rgba(206, 17, 65, 0.2)',
             background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
             position: 'relative'
           }}>
        
        {/* Wanted Poster Header */}
        <div className="text-center py-2 border-b-4 border-[#CE1141] bg-gradient-to-r from-[#FFD700] via-[#CE1141] to-black">
          <p className="text-xs font-black text-[#FFD700] tracking-widest" style={{textShadow: '2px 2px 0 #000'}}>
            ⚡ WANTED ⚡
          </p>
          <p className="text-xs text-white font-bold mt-1">RARE ITEM</p>
        </div>

        {/* Image Container */}
        <div className="relative w-full h-48 bg-gradient-to-br from-black to-[#CE1141] overflow-hidden m-2 rounded-lg border-4 border-[#FFD700]">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-black to-[#CE1141] flex items-center justify-center">
              <span className="text-[#FFD700] text-lg font-black">⚓</span>
            </div>
          )}

          {/* Condition Badge - 76ers Style */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-black ${conditionColor[product.condition]} border-2 border-black`}>
            {product.condition.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        {/* Product Info - Wanted Poster Style */}
        <div className="flex-1 p-3 flex flex-col bg-black/80">
          {/* Category - Pirate Theme */}
          <span className="text-xs text-[#FFD700] font-black uppercase mb-1 tracking-wider">
            ⚓ {product.category}
          </span>

          {/* Product Name - Bold Manga Style */}
          <h3 className="text-sm font-black text-white mb-2 line-clamp-2 leading-tight" 
              style={{textShadow: '1px 1px 0 #CE1141'}}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(product.rating)
                      ? 'fill-[#FFD700] text-[#FFD700]'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-bold">
              ({product.reviews_count})
            </span>
          </div>

          {/* Price - Treasure Style */}
          <div className="mb-3 p-2 bg-gradient-to-r from-[#FFD700] via-[#CE1141] to-black rounded-lg border-2 border-[#FFD700]">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-black">
                ${product.price.toFixed(2)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-xs text-gray-400 line-through font-bold">
                  ${product.original_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status - Pirate Bounty */}
          <div className="mb-3">
            {product.stock > 0 ? (
              <span className="text-xs text-black font-black bg-[#FFD700] px-2 py-1 rounded-lg inline-block">
                ⚓ IN STOCK ({product.stock})
              </span>
            ) : (
              <span className="text-xs text-white font-black bg-[#CE1141] px-2 py-1 rounded-lg inline-block">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Add to Cart Button - 76ers Themed */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAddingToCart}
            className="w-full mt-auto flex items-center justify-center gap-2 font-black text-black py-2 rounded-lg transition-all duration-200 border-2 border-[#CE1141] hover:border-[#FFD700]"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #CE1141 100%)',
              textShadow: '1px 1px 0 #000'
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAddingToCart ? '⚡ ADDED!' : '🏴‍☠️ CAPTURE'}
          </button>
        </div>
      </div>
    </Link>
  );
}
