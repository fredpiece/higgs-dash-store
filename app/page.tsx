'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Truck, Shield, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CharacterBg from '@/components/CharacterBg';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getProducts, getFeaturedProducts } from '@/lib/supabase';
import type { Product } from '@/lib/types';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Try to get featured products first
        const featured = await getFeaturedProducts(4);
        setFeaturedProducts(featured);

        // If no featured products, get top rated products
        if (featured.length === 0) {
          const { products } = await getProducts({
            limit: 4,
            sort: 'rating',
          });
          setFeaturedProducts(products);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      {/* Hero Section - 2001 76ers Black Colorway + One Piece Theme */}
      <section className="bg-gradient-to-br from-black via-[#1a1a1a] to-black text-white py-20 relative overflow-hidden border-b-4 border-[#CE1141]">
        {/* Pirate/Anime Background Elements */}
        <div className="absolute top-0 right-0 opacity-5 text-8xl">🏴‍☠️</div>
        <div className="absolute bottom-0 left-0 opacity-5 text-8xl">💍</div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🏀</span>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  TREASURE THE GAME
                </h1>
              </div>
              <p className="text-xl text-gray-100 mb-2 font-bold">
                Philly's Premier Collectibles Hub
              </p>
              <p className="text-lg text-gray-200 mb-8">
                🟥 76ers Legends • 🏴‍☠️ One Piece Collection • 💎 Authentic Treasures
              </p>
              <p className="text-base text-gray-300 mb-8">
                Authentic Air Jordans, Pokémon cards, vintage technology & quality apparel. 
                Fast shipping, expert grading, and 30-day returns guaranteed.
              </p>
              <div className="flex gap-4">
                <Link href="/shop" className="btn btn-lg bg-[#FFD700] text-black hover:bg-yellow-300 font-bold shadow-lg hover:shadow-xl transition-all">
                  BEGIN YOUR ADVENTURE <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn btn-lg btn-outline text-[#FFD700] border-[#FFD700] hover:bg-[#CE1141] hover:text-white font-bold transition-all">
                  Our Story
                </button>
              </div>
            </div>

            {/* Right Hero Image - Character Display */}
            <CharacterBg />
          </div>
        </div>
      </section>

      {/* Featured Products Section - Wanted Poster Theme */}
      <section className="py-20 bg-gradient-to-b from-black to-[#1a1a1a] border-b-4 border-[#FFD700]">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl">📜</span>
              <h2 className="text-4xl font-bold text-[#FFD700]">WANTED TREASURES</h2>
              <span className="text-3xl">💍</span>
            </div>
            <p className="text-gray-300 text-lg font-semibold">
              The rarest pieces from Philly's greatest collectors
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="spinner w-12 h-12"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border-2 border-[#FFD700]">
              <p className="text-gray-400 mb-4">
                Featured products are being loaded. Check back soon!
              </p>
              <Link href="/shop" className="btn btn-primary">
                Browse All Products
              </Link>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/shop" className="btn btn-lg btn-primary">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-black border-b-4 border-[#CE1141]">
        <div className="container">
          <h2 className="text-4xl font-bold text-[#FFD700] text-center mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: '🏀 Sneakers', href: '/shop?category=sneakers' },
              { name: '🎴 Trading Cards', href: '/shop?category=cards' },
              { name: '💾 Vintage Tech', href: '/shop?category=tech' },
              { name: '👕 Apparel', href: '/shop?category=apparel' },
              { name: '🧢 Hats', href: '/shop?category=hats' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="p-8 text-center hover:shadow-xl transition-all rounded-lg hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #CE1141 0%, #8B0000 100%)',
                  border: '3px solid #FFD700',
                  boxShadow: '0 8px 20px rgba(206, 17, 65, 0.4)'
                }}
              >
                <div className="text-5xl mb-3">{cat.name.split(' ')[0]}</div>
                <p className="font-bold text-white text-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-black border-b-4 border-[#FFD700]">
        <div className="container">
          <h2 className="text-4xl font-bold text-[#FFD700] text-center mb-12">
            Why Choose ClawBuddy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Authentic Products',
                description: 'Every item is verified and authenticated before shipping',
              },
              {
                icon: Truck,
                title: 'Fast Shipping',
                description: 'Orders ship within 24 hours with tracking included',
              },
              {
                icon: Shield,
                title: 'Secure Checkout',
                description: 'Encrypted payments and buyer protection on all orders',
              },
              {
                icon: RotateCcw,
                title: '30-Day Returns',
                description: 'Not satisfied? Return within 30 days for full refund',
              },
              {
                icon: CheckCircle,
                title: 'Expert Grading',
                description: 'Professional grading for cards and collectibles',
              },
              {
                icon: CheckCircle,
                title: 'Competitive Pricing',
                description: 'Best prices compared to other marketplaces',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="p-8 text-center rounded-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    border: '3px solid #FFD700',
                    boxShadow: '0 8px 20px rgba(255, 215, 0, 0.2)'
                  }}
                >
                  <Icon className="w-12 h-12 text-[#FFD700] mx-auto mb-4" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'}} />
                  <h3 className="font-bold text-xl text-white mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 font-medium">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="bg-gradient-to-r from-black via-[#CE1141] to-black text-white py-20 border-y-4 border-[#FFD700]"
      >
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#FFD700]">Ready to Find Your Next Gem?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Browse our curated collection of premium sneakers, trading cards, vintage tech,
            and apparel. Every item is verified for authenticity and quality.
          </p>
          <Link href="/shop" className="btn btn-lg bg-[#FFD700] text-black hover:bg-white font-bold shadow-lg">
            Start Shopping Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter Signup - Complete Component */}
      <NewsletterSignup />
    </>
  );
}
