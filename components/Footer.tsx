'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold">⚛️</span>
              </div>
              <span className="text-xl font-bold">ClawBuddy</span>
            </div>
            <p className="text-gray-300 text-sm">
              Premium sneakers, trading cards, vintage tech, and authentic apparel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-accent transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-accent transition">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-accent transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@clawbuddy.com" className="hover:text-accent transition">
                  info@clawbuddy.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-accent transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  123 Main St
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} ClawBuddy. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex gap-2">
            <div className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-bold">
              Visa
            </div>
            <div className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-bold">
              MC
            </div>
            <div className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-bold">
              Stripe
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
