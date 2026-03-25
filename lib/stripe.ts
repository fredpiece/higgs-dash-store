import { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { Order } from './types';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    );
  }
  return stripePromise;
};

export const createPaymentIntent = async (amount: number, orderId: string) => {
  const response = await fetch('/api/payment/create-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100), // Convert to cents
      orderId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment intent');
  }

  return response.json();
};

export const confirmPayment = async (
  stripe: Stripe,
  elements: any,
  clientSecret: string
) => {
  return stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/confirmation`,
    },
  });
};

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateShipping = (subtotal: number): number => {
  // Free shipping on orders over $50
  if (subtotal > 50) return 0;
  // Flat rate $10 for orders under $50
  return 10;
};

export const calculateTax = (subtotal: number, state: string): number => {
  // Simplified tax calculation (replace with proper tax service in production)
  const taxRates: Record<string, number> = {
    CA: 0.0725,
    NY: 0.08,
    TX: 0.0625,
    FL: 0.06,
    // Add more states as needed
  };

  const rate = taxRates[state] || 0.07; // Default 7% tax
  return Math.round(subtotal * rate * 100) / 100;
};

export const validateCardElement = (cardElement: any) => {
  if (!cardElement) {
    return { error: 'Card element not found' };
  }
  return { valid: true };
};
