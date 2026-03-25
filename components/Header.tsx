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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚛️</span>
            </div>
            <span className="text-2xl font-bold text-primary hidden sm:inline">ClawBuddy</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input rounded-r-none"
              />
              <button
                type="submit"
                className="bg-accent text-white px-4 py-2 rounded-r-lg hover:bg-red-600"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative text-primary hover:text-accent transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary"
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
          <Link href="/" className="text-primary hover:text-accent font-semibold">
            Home
          </Link>
          <div className="group relative">
            <button className="text-primary hover:text-accent font-semibold">
              Shop
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="block px-4 py-2 text-primary hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/#about" className="text-primary hover:text-accent font-semibold">
            About
          </Link>
          <Link href="/#contact" className="text-primary hover:text-accent font-semibold">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input rounded-r-none text-sm"
              />
              <button
                type="submit"
                className="bg-accent text-white px-3 py-2 rounded-r-lg"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <Link href="/" className="block text-primary hover:text-accent">
              Home
            </Link>
            <Link href="/shop" className="block text-primary hover:text-accent">
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block text-primary hover:text-accent text-sm pl-4"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/#about" className="block text-primary hover:text-accent">
              About
            </Link>
            <Link href="/#contact" className="block text-primary hover:text-accent">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
