'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cart = useCart((state) => state.getCart());
  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { name: 'Sneakers', href: '/shop?category=sneakers' },
    { name: 'Trading Cards', href: '/shop?category=cards' },
    { name: 'Vintage Tech', href: '/shop?category=tech' },
    { name: 'Apparel', href: '/shop?category=apparel' },
    { name: 'Hats', href: '/shop?category=hats' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b-4 border-76ers-red" 
            style={{background: 'linear-gradient(135deg, #1D428A 0%, #CE1141 100%)'}}>
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo - Pirate Ship & 76ers */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 bg-76ers-gold rounded-lg flex items-center justify-center border-2 border-76ers-red pirate-ship">
              <span className="text-2xl">🏴‍☠️</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-2xl font-black text-76ers-gold leading-none" style={{textShadow: '2px 2px 0 #000'}}>
                HIGGS
              </span>
              <span className="text-xs text-76ers-gold font-bold tracking-wider">76ers CREW</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search for treasure..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input rounded-r-none bg-white text-76ers-blue font-bold border-2 border-76ers-gold"
              />
              <button
                type="submit"
                className="bg-76ers-gold text-76ers-blue px-4 py-2 rounded-r-lg hover:bg-white font-black border-2 border-76ers-gold"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            {/* Cart Button - Treasure */}
            <Link
              href="/cart"
              className="relative text-76ers-gold hover:text-white transition-colors font-black treasure-glow"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-76ers-gold text-76ers-blue text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-76ers-red">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-76ers-gold font-black text-xl"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-76ers-gold hover:text-white font-black tracking-wide">
            ⛵ Home
          </Link>
          <div className="group relative">
            <button className="text-76ers-gold hover:text-white font-black tracking-wide">
              🏴‍☠️ CREW
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-76ers-blue rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-2 border-76ers-gold">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="block px-4 py-2 text-76ers-gold hover:bg-76ers-red hover:text-white font-bold first:rounded-t-lg last:rounded-b-lg"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/#about" className="text-76ers-gold hover:text-white font-black tracking-wide">
            📖 Story
          </Link>
          <Link href="/#contact" className="text-76ers-gold hover:text-white font-black tracking-wide">
            ⚓ Contact
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t-4 border-76ers-gold space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                placeholder="Search treasure..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input rounded-r-none text-sm bg-white text-76ers-blue font-bold border-76ers-gold"
              />
              <button
                type="submit"
                className="bg-76ers-gold text-76ers-blue px-3 py-2 rounded-r-lg font-black"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <Link href="/" className="block text-76ers-gold hover:text-white font-black">
              ⛵ Home
            </Link>
            <Link href="/shop" className="block text-76ers-gold hover:text-white font-black">
              🏴‍☠️ All Items
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block text-76ers-gold hover:text-white text-sm pl-4 font-bold"
              >
                ⚓ {cat.name}
              </Link>
            ))}
            <Link href="/#about" className="block text-76ers-gold hover:text-white font-black">
              📖 Story
            </Link>
            <Link href="/#contact" className="block text-76ers-gold hover:text-white font-black">
              ⚓ Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
