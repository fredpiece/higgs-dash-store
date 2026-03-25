'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/stripe';

export default function CartPage() {
  const cart = useCart((state) => state.getCart());
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-primary mb-4">Shopping Cart</h1>
            <p className="text-gray-600 mb-8">Your cart is empty</p>
            <Link href="/shop" className="btn btn-lg btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-primary mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.product_id} className="card p-6 bg-white">
                <div className="grid grid-cols-4 gap-4 items-center">
                  {/* Product Image */}
                  <div className="col-span-1">
                    <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="col-span-2">
                    <Link
                      href={`/shop/${item.product_id}`}
                      className="font-bold text-primary hover:text-accent text-lg block mb-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">
                      Condition: {item.product.condition.replace('_', ' ')}
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Quantity & Total */}
                  <div className="col-span-1 text-right">
                    <div className="flex items-center justify-end gap-2 mb-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg font-bold mb-4">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-red-600 hover:text-red-700 font-semibold flex items-center justify-end gap-1 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <Link href="/shop" className="btn btn-outline">
                Continue Shopping
              </Link>
              <button onClick={clearCart} className="btn btn-secondary">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 bg-white sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {cart.shipping === 0 ? 'FREE' : formatPrice(cart.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (estimated)</span>
                  <span className="font-semibold">{formatPrice(cart.tax)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 text-xl">
                <span className="font-bold">Total</span>
                <span className="font-bold text-accent">{formatPrice(cart.total)}</span>
              </div>

              <Link
                href="/checkout"
                className="btn btn-lg btn-primary w-full flex items-center justify-center gap-2 mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-gray-600">
                <p className="font-semibold text-blue-900 mb-2">💡 Free Shipping</p>
                <p>
                  You'll get free shipping when your order total reaches{' '}
                  <span className="font-bold">$50</span>!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
