'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t-4 border-76ers-gold" style={{background: 'linear-gradient(135deg, #1D428A 0%, #CE1141 100%)'}}>
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand - Pirate Crew */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-76ers-gold rounded-lg flex items-center justify-center border-2 border-76ers-red">
                <span className="font-black text-lg">🏴‍☠️</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black" style={{textShadow: '1px 1px 0 #000'}}>HIGGS</span>
                <span className="text-xs font-bold text-76ers-gold">76ers Crew</span>
              </div>
            </div>
            <p className="text-gray-200 text-sm font-bold">
              Legendary treasures: Jordans, Pokemon, vintage tech & apparel. ⚓
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black mb-4 text-76ers-gold">⛵ Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-100">
              <li>
                <Link href="/" className="hover:text-76ers-gold transition font-bold">
                  ⛵ Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-76ers-gold transition font-bold">
                  🏴‍☠️ Treasure Hunt
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-76ers-gold transition font-bold">
                  ⚙️ Vault
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-76ers-gold transition font-bold">
                  ⚓ Ahoy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black mb-4 text-76ers-gold">🛡️ Crew Support</h4>
            <ul className="space-y-2 text-sm text-gray-100">
              <li>
                <Link href="#" className="hover:text-76ers-gold transition font-bold">
                  📦 Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-76ers-gold transition font-bold">
                  ↩️ Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-76ers-gold transition font-bold">
                  ❓ FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-76ers-gold transition font-bold">
                  📋 Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-4 text-76ers-gold">⚓ Ahoy!</h4>
            <ul className="space-y-3 text-sm text-gray-100">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:crew@higgs-store.com" className="hover:text-76ers-gold transition font-bold">
                  crew@higgs-store.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-76ers-gold transition font-bold">
                  +1 (215) 76-CREW
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="font-bold">
                  76ers Vault
                  <br />
                  Philadelphia, PA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-76ers-gold my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-200 text-sm font-bold">
            © {currentYear} HIGGS 76ers Crew. All treasures accounted for. ⚓
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-76ers-gold hover:text-white transition font-black"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-76ers-gold hover:text-white transition font-black"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-76ers-gold hover:text-white transition font-black"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex gap-2">
            <div className="bg-76ers-gold text-76ers-blue px-2 py-1 rounded text-xs font-black">
              Visa
            </div>
            <div className="bg-76ers-gold text-76ers-blue px-2 py-1 rounded text-xs font-black">
              MC
            </div>
            <div className="bg-76ers-gold text-76ers-blue px-2 py-1 rounded text-xs font-black">
              Stripe
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
