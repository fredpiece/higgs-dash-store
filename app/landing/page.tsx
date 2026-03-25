'use client';

import Link from 'next/link';
import { ArrowRight, Star, Shield, Zap, Users, Award, TrendingUp } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#CE1141] via-[#1D428A] to-black text-white py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block text-6xl mb-4">🏴‍☠️ 🟥 💎</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              HIGGS DASH STORE
            </h1>
            <p className="text-2xl text-gray-200 mb-4 font-semibold">
              Philly's Premier Collectibles Destination
            </p>
            <p className="text-lg text-gray-300 mb-12">
              Authentic sneakers, rare trading cards, vintage technology, and quality apparel.
              Every item verified. Every collection trusted.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/shop" className="btn btn-lg bg-yellow-400 text-[#1D428A] hover:bg-yellow-300 font-bold">
                Start Shopping <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn btn-lg btn-outline text-white border-yellow-400 hover:bg-yellow-400 hover:text-[#1D428A] font-bold">
                Learn Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Higgs Dash Store was born from a simple mission: bring authentic, verified collectibles
                to Philly's passionate community. We started as collectors ourselves, frustrated with
                overpriced middlemen and unreliable authenticity guarantees.
              </p>
              <p>
                Today, we're the trusted source for:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏀</span>
                  <span><strong>Authentic Air Jordans & Sneakers</strong> - Direct sourcing, certified authentic</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎴</span>
                  <span><strong>Premium Trading Cards</strong> - Pokémon, MTG, Sports graded and authenticated</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💾</span>
                  <span><strong>Vintage Technology</strong> - Classic consoles, computers, electronics in pristine condition</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👕</span>
                  <span><strong>Apparel & Hats</strong> - Rare vintage pieces and contemporary drops</span>
                </li>
              </ul>
              <p>
                We're more than just a store—we're a community of collectors who understand the value
                of what you're looking for. Quality, authenticity, and fair pricing aren't negotiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">
            Why Choose Higgs Dash?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Authentic',
                description: 'Every item is authenticated and graded. No fakes, no compromises.',
              },
              {
                icon: TrendingUp,
                title: 'Competitive Pricing',
                description: 'We track market rates on StockX, GOAT, TCGPlayer & eBay. Best prices guaranteed.',
              },
              {
                icon: Zap,
                title: 'Fast Shipping',
                description: 'Orders ship within 24 hours with insurance and tracking included.',
              },
              {
                icon: Users,
                title: 'Community First',
                description: 'Built by collectors for collectors. We get what you care about.',
              },
              {
                icon: Award,
                title: 'Expert Grading',
                description: 'Professional grading services for trading cards and rare collectibles.',
              },
              {
                icon: Star,
                title: '30-Day Guarantee',
                description: 'Not satisfied? Full refund within 30 days. No questions asked.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card p-8 hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">
            What Collectors Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Marcus J.',
                location: 'Philadelphia, PA',
                quote: 'Found the exact Jordan 1 Retro I was looking for. Authentic, fast shipping, and better price than anywhere else.',
                rating: 5,
              },
              {
                name: 'Sarah P.',
                location: 'King of Prussia, PA',
                quote: 'Their grading service is legit. Every card in my collection is certified and protected.',
                rating: 5,
              },
              {
                name: 'James T.',
                location: 'Center City, Philadelphia',
                quote: 'No longer dealing with StockX reseller fees. Higgs Dash is the move for Philly collectors.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="card p-8 border-2 border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-bold text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { emoji: '🏀', name: 'Sneakers', count: '250+' },
              { emoji: '🎴', name: 'Cards', count: '500+' },
              { emoji: '💾', name: 'Tech', count: '180+' },
              { emoji: '👕', name: 'Apparel', count: '320+' },
              { emoji: '🧢', name: 'Hats', count: '150+' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={`/shop?category=${cat.name.toLowerCase()}`}
                className="card card-hover p-6 text-center hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <p className="font-bold text-primary mb-1">{cat.name}</p>
                <p className="text-sm text-gray-500">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Next Gem?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Browse our curated collection of premium sneakers, trading cards, vintage tech,
            and apparel. Every item is verified for authenticity and quality.
          </p>
          <Link href="/shop" className="btn btn-lg bg-yellow-400 text-[#1D428A] hover:bg-yellow-300 font-bold">
            Start Shopping Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
