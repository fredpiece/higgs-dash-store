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
  new: 'bg-green-100 text-green-800',
  like_new: 'bg-blue-100 text-blue-800',
  good: 'bg-yellow-100 text-yellow-800',
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
      <div className="card card-hover h-full flex flex-col cursor-pointer">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* Condition Badge */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${conditionColor[product.condition]}`}>
            {product.condition.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Category */}
          <span className="text-xs text-gray-500 font-semibold uppercase mb-1">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 hover:text-accent">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews_count})
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">
                ${product.price.toFixed(2)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.original_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 font-semibold">
                ✓ In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-sm text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAddingToCart}
            className="btn btn-primary w-full mt-auto flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAddingToCart ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
