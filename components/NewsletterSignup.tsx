'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface SignupState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    discounts: false,
    newItems: false,
    blogUpdates: false,
  });
  const [signupState, setSignupState] = useState<SignupState>({ status: 'idle' });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setSignupState({
        status: 'error',
        message: 'Please enter your email address',
      });
      return;
    }

    if (!validateEmail(email)) {
      setSignupState({
        status: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    if (!preferences.discounts && !preferences.newItems && !preferences.blogUpdates) {
      setSignupState({
        status: 'error',
        message: 'Please select at least one preference',
      });
      return;
    }

    setSignupState({ status: 'loading' });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          preferences: {
            discounts: preferences.discounts,
            newItems: preferences.newItems,
            blogUpdates: preferences.blogUpdates,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignupState({
          status: 'error',
          message: data.message || 'Failed to subscribe. Please try again.',
        });
        return;
      }

      setSignupState({
        status: 'success',
        message: 'Successfully subscribed! Check your email for confirmation.',
      });

      // Reset form
      setEmail('');
      setPreferences({
        discounts: false,
        newItems: false,
        blogUpdates: false,
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSignupState({ status: 'idle' });
      }, 5000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setSignupState({
        status: 'error',
        message: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold text-primary">Stay Updated</h3>
            </div>
            <p className="text-gray-600 text-lg">
              Subscribe to our newsletter for new arrivals, special offers, and exclusive deals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Preferences */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What would you like to hear about?
              </label>

              <div className="space-y-2">
                {[
                  { key: 'discounts' as const, label: '💰 Exclusive Discounts & Sales' },
                  { key: 'newItems' as const, label: '🆕 New Items & Arrivals' },
                  { key: 'blogUpdates' as const, label: '📝 Blog Updates & Tips' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={preferences[key]}
                      onChange={() => handlePreferenceChange(key)}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-primary transition-colors">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Messages */}
            {signupState.status === 'success' && (
              <div className="flex gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 font-semibold">{signupState.message}</p>
              </div>
            )}

            {signupState.status === 'error' && (
              <div className="flex gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 font-semibold">{signupState.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={signupState.status === 'loading'}
              className="w-full py-3 px-6 bg-primary text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {signupState.status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⏳</span>
                  Subscribing...
                </span>
              ) : (
                'Subscribe Now'
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
