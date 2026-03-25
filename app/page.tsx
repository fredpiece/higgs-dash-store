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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Premium Sneakers, Cards & Collectibles
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover authentic Air Jordans, Pokémon cards, vintage technology, and
                quality apparel. Fast shipping, expert grading, and 30-day returns.
              </p>
              <div className="flex gap-4">
                <Link href="/shop" className="btn btn-lg bg-accent text-white hover:bg-red-600">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative h-96 bg-accent bg-opacity-20 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">⚛️</div>
                  <p className="text-white font-bold text-2xl">ClawBuddy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">
              Check out our most popular items from verified sellers
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
            <Link href="/shop" className="btn btn-lg btn-primary">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
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
                className="card card-hover p-8 text-center hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{cat.name.split(' ')[0]}</div>
                <p className="font-semibold text-primary">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
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
                <div key={idx} className="card p-8 text-center">
                  <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="bg-gradient-to-r from-primary to-secondary text-white py-20"
      >
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Next Gem?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Browse our curated collection of premium sneakers, trading cards, vintage tech,
            and apparel. Every item is verified for authenticity and quality.
          </p>
          <Link href="/shop" className="btn btn-lg bg-accent text-white hover:bg-red-600">
            Start Shopping Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-primary mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for new arrivals, special offers, and exclusive deals.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
