'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Truck, Shield, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
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
      {/* Hero Section - One Piece x 76ers Theme */}
      <section className="text-white py-16" 
               style={{background: 'linear-gradient(135deg, #1D428A 0%, #CE1141 100%)'}}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content - Wanted Poster */}
            <div className="manga-pop">
              <div className="mb-4 inline-block bg-76ers-gold text-76ers-blue px-4 py-2 rounded-lg font-black text-sm tracking-wider border-4 border-76ers-red">
                🏴‍☠️ GRAND COLLECTION 🏴‍☠️
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight" 
                  style={{textShadow: '3px 3px 0 #FFD700, 6px 6px 0 #000'}}>
                LEGENDARY TREASURES
              </h1>
              <p className="text-lg text-gray-100 mb-8 font-bold">
                Join the pirate crew! 🏴‍☠️ Discover authentic Air Jordans, Pokémon cards, vintage tech, and apparel from the 76ers vault. Expert authentication, fast shipping, and legendary customer service.
              </p>
              <div className="flex gap-4">
                <Link href="/shop" className="btn btn-lg font-black text-76ers-blue border-4 border-76ers-gold"
                      style={{background: '#FFD700'}}>
                  ⚓ FIND TREASURE <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn btn-lg btn-outline text-76ers-gold border-4 border-76ers-gold font-black hover:bg-76ers-gold hover:text-76ers-blue">
                  🎬 STORY
                </button>
              </div>
            </div>

            {/* Right Hero Image - Luffy in 76ers Jersey */}
            <div className="relative h-96 rounded-lg overflow-hidden pirate-ship border-4 border-76ers-gold"
                 style={{background: 'linear-gradient(135deg, #fff8f0 0%, #fffbf5 100%)'}}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-4 manga-pop">🏴‍☠️</div>
                  <p className="text-76ers-blue font-black text-3xl" style={{textShadow: '2px 2px 0 #FFD700'}}>
                    HIGGS CREW
                  </p>
                  <p className="text-76ers-red font-black text-sm tracking-widest mt-2">
                    ⚡ WANTED ⚡
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-76ers-blue mb-4" style={{textShadow: '2px 2px 0 #FFD700'}}>
              🎴 FEATURED BOUNTIES
            </h2>
            <p className="text-76ers-red text-lg font-bold">
              Most wanted treasures from the 76ers vault
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
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                Featured products are being loaded. Check back soon!
              </p>
              <Link href="/shop" className="btn btn-primary">
                Browse All Products
              </Link>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/shop" className="btn btn-lg font-black text-76ers-blue border-4 border-76ers-red"
                  style={{background: '#FFD700'}}>
              ⚓ VIEW ALL TREASURE <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section - Crew Roles */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #1D428A 0%, #CE1141 100%)'}}>
        <div className="container">
          <h2 className="text-4xl font-black text-76ers-gold text-center mb-12" style={{textShadow: '2px 2px 0 #000'}}>
            🏴‍☠️ CREW DIVISIONS 🏴‍☠️
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: '🏀 Sneakers', href: '/shop?category=sneakers', emoji: '🏀' },
              { name: '🎴 Trading Cards', href: '/shop?category=cards', emoji: '🎴' },
              { name: '💾 Vintage Tech', href: '/shop?category=tech', emoji: '💾' },
              { name: '👕 Apparel', href: '/shop?category=apparel', emoji: '👕' },
              { name: '🧢 Hats', href: '/shop?category=hats', emoji: '🧢' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="card card-hover p-6 text-center wanted-pulse border-4 border-76ers-gold"
                style={{background: 'linear-gradient(135deg, #fff8f0 0%, #fffbf5 100%)'}}
              >
                <div className="text-5xl mb-2">{cat.emoji}</div>
                <p className="font-black text-76ers-blue">{cat.name.split(' ')[0]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Why Join the Crew */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-black text-76ers-blue text-center mb-12" style={{textShadow: '2px 2px 0 #FFD700'}}>
            ⚓ WHY JOIN THE CREW? ⚓
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: '✅ Verified Treasures',
                description: 'Every item authenticated before shipping',
                emoji: '🔍'
              },
              {
                icon: Truck,
                title: '⚡ Lightning Fast',
                description: 'Ships within 24 hours with tracking',
                emoji: '📦'
              },
              {
                icon: Shield,
                title: '🛡️ Secure Voyage',
                description: 'Encrypted payments & full buyer protection',
                emoji: '🔐'
              },
              {
                icon: RotateCcw,
                title: '🔄 30-Day Returns',
                description: 'Not satisfied? Full refund guaranteed',
                emoji: '↩️'
              },
              {
                icon: CheckCircle,
                title: '🎯 Expert Grading',
                description: 'Professional evaluation for all items',
                emoji: '⭐'
              },
              {
                icon: CheckCircle,
                title: '💰 Best Prices',
                description: 'Lowest rates in the whole ocean',
                emoji: '💎'
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card p-6 text-center border-4 border-76ers-gold wanted-pulse"
                     style={{background: 'linear-gradient(135deg, #fff8f0 0%, #fffbf5 100%)'}}>
                  <div className="text-4xl mb-3">{feature.emoji}</div>
                  <h3 className="font-black text-lg text-76ers-blue mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-76ers-red font-semibold">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Set Sail */}
      <section
        id="contact"
        className="text-white py-20"
        style={{background: 'linear-gradient(135deg, #1D428A 0%, #CE1141 100%)'}}
      >
        <div className="container text-center">
          <h2 className="text-4xl font-black mb-4" style={{textShadow: '3px 3px 0 #FFD700, 6px 6px 0 #000'}}>
            🏴‍☠️ READY TO SET SAIL? 🏴‍☠️
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto font-bold">
            Join the crew! Browse our legendary collection of Jordans, Pokemon, vintage tech, and apparel. Every treasure authenticated by the 76ers vault.
          </p>
          <Link href="/shop" className="btn btn-lg font-black text-76ers-blue border-4 border-76ers-gold" style={{background: '#FFD700'}}>
            ⚓ FIND YOUR TREASURE <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section - Crew Alerts */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-black text-76ers-blue mb-4" style={{textShadow: '2px 2px 0 #FFD700'}}>
              🎴 NEW BOUNTIES INCOMING 🎴
            </h3>
            <p className="text-76ers-red mb-6 font-bold">
              Subscribe to get alerts on new treasures, exclusive drops, and 76ers crew rewards!
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email (captain)..."
                className="input flex-1 border-4 border-76ers-gold text-76ers-blue font-bold"
                required
              />
              <button type="submit" className="btn btn-lg font-black text-76ers-blue border-4 border-76ers-gold" style={{background: '#FFD700'}}>
                ⚓ JOIN
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
