import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ClawBuddy - Premium Sneakers, Cards & Collectibles',
  description:
    'Buy authentic Air Jordans, Pokémon cards, vintage technology, and quality apparel. Fast shipping, secure checkout, and 30-day returns.',
  keywords: [
    'sneakers',
    'Air Jordans',
    'Pokémon cards',
    'vintage tech',
    'collectibles',
    'trading cards',
  ],
  authors: [{ name: 'ClawBuddy' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'ClawBuddy - Premium Sneakers, Cards & Collectibles',
    description:
      'Buy authentic Air Jordans, Pokémon cards, vintage technology, and quality apparel.',
    siteName: 'ClawBuddy Store',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
