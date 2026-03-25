// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'sneakers' | 'cards' | 'tech' | 'apparel' | 'hats';
  price: number;
  original_price?: number;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  stock: number;
  rating: number;
  reviews_count: number;
  images: string[];
  sku: string;
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

// Cart Types
export interface CartItem {
  product_id: string;
  product: Product;
  quantity: number;
  selected_variant?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Customer Types
export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

// Order Types
export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: Address;
  billing_address?: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping_cost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed';
  tracking_number?: string;
  notes?: string;
  created_at: string;
  shipped_at?: string;
  delivered_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

// Address Type
export interface Address {
  first_name: string;
  last_name: string;
  street_address: string;
  apartment?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
}

// Payment Types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'requires_capture' | 'canceled';
  client_secret: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  condition?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort?: 'newest' | 'price_low' | 'price_high' | 'rating';
  page?: number;
  limit?: number;
}

// Review Types
export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  customer_name: string;
  rating: number;
  title: string;
  content: string;
  verified_purchase: boolean;
  created_at: string;
}
