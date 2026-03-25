'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { useCart } from '@/lib/store';
import { formatPrice, calculateShipping, calculateTax } from '@/lib/stripe';
import type { Address } from '@/lib/types';

export default function CheckoutPage() {
  const cart = useCart((state) => state.getCart());
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [shippingAddress, setShippingAddress] = useState<Address>({
    first_name: '',
    last_name: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'United States',
    phone: '',
  });
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-primary mb-4">Checkout</h1>
            <p className="text-gray-600 mb-8">Your cart is empty</p>
            <Link href="/shop" className="btn btn-lg btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shipping = calculateShipping(cart.subtotal);
  const tax = calculateTax(cart.subtotal, shippingAddress.state || 'NY');
  const total = cart.subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingAddress.first_name && shippingAddress.street_address) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // In production, integrate with Stripe API
      const newOrderNumber = `ORD-${Date.now()}`;
      setOrderNumber(newOrderNumber);
      setLoading(false);
      setStep('confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-primary mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 'shipping' && (
              <div className="card p-8 bg-white">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  1. Shipping Address
                </h2>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input"
                      required
                      value={shippingAddress.first_name}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          first_name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input"
                      required
                      value={shippingAddress.last_name}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Street Address"
                    className="input"
                    required
                    value={shippingAddress.street_address}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        street_address: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc. (Optional)"
                    className="input"
                    value={shippingAddress.apartment || ''}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        apartment: e.target.value,
                      })
                    }
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="input"
                      required
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="input"
                      required
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          state: e.target.value.toUpperCase(),
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="input"
                      required
                      value={shippingAddress.postal_code}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          postal_code: e.target.value,
                        })
                      }
                    />
                  </div>

                  <select
                    className="input"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>

                  <label className="flex items-center gap-2 mt-6">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={(e) => setSameAsBilling(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span>Billing address same as shipping</span>
                  </label>

                  <div className="flex gap-4 mt-8">
                    <Link href="/cart" className="btn btn-secondary">
                      Back to Cart
                    </Link>
                    <button type="submit" className="btn btn-lg btn-primary flex-1">
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <div className="card p-8 bg-white">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  2. Payment Method
                </h2>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-blue-900">Secure Payment</p>
                      <p className="text-sm text-blue-700">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="input"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input"
                      required
                    />
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="btn btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-lg btn-primary flex-1 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>

                <div className="mt-8 p-4 bg-gray-50 rounded text-sm text-gray-600">
                  <p className="font-semibold mb-2">💡 Test Card Numbers:</p>
                  <p>Visa: 4242 4242 4242 4242</p>
                  <p>Mastercard: 5555 5555 5555 4444</p>
                  <p>Use any future expiration date & any CVV</p>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 'confirmation' && (
              <div className="card p-8 bg-white text-center">
                <div className="text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-primary mb-2">Order Placed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been confirmed.
                </p>

                <div className="bg-gray-50 rounded p-6 mb-8 text-left">
                  <p className="text-gray-600 mb-2">Order Number</p>
                  <p className="text-2xl font-bold text-primary mb-4 font-mono">
                    {orderNumber}
                  </p>
                  <p className="text-gray-600 mb-2">Order Total</p>
                  <p className="text-2xl font-bold text-accent mb-4">
                    {formatPrice(total)}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    A confirmation email has been sent to{' '}
                    <span className="font-semibold">{shippingAddress}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Your order will ship within 24 hours. You'll receive a tracking
                    number via email.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link href="/" className="btn btn-secondary flex-1">
                    Back to Home
                  </Link>
                  <Link href="/shop" className="btn btn-primary flex-1">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 bg-white sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name}
                      <br />
                      <span className="text-xs text-gray-500">× {item.quantity}</span>
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-accent">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                <p className="font-semibold mb-1">✓ Secure Checkout</p>
                <p>Your data is encrypted and protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
