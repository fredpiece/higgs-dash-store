import { createClient } from '@supabase/supabase-js';
import type { Product, Order, OrderItem, Review, Customer } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product Queries
export const getProducts = async (filters?: {
  category?: string;
  condition?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) => {
  let query = supabase.from('products').select('*');

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.condition) {
    query = query.eq('condition', filters.condition);
  }

  if (filters?.min_price) {
    query = query.gte('price', filters.min_price);
  }

  if (filters?.max_price) {
    query = query.lte('price', filters.max_price);
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  // Sorting
  if (filters?.sort === 'price_low') {
    query = query.order('price', { ascending: true });
  } else if (filters?.sort === 'price_high') {
    query = query.order('price', { ascending: false });
  } else if (filters?.sort === 'rating') {
    query = query.order('rating', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  // Pagination
  const limit = filters?.limit || 20;
  const page = filters?.page || 1;
  const start = (page - 1) * limit;
  query = query.range(start, start + limit - 1);

  const { data, error, count } = await query;

  if (error) throw error;

  return { products: data as Product[], count, page, limit };
};

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Product;
};

export const getFeaturedProducts = async (limit = 4) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Product[];
};

// Order Queries
export const createOrder = async (orderData: Omit<Order, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        ...orderData,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Order;
};

export const getOrder = async (orderId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data as Order;
};

export const getOrderByNumber = async (orderNumber: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber)
    .single();

  if (error) throw error;
  return data as Order;
};

export const updateOrderStatus = async (
  orderId: string,
  status: Order['status'],
  updates?: Partial<Order>
) => {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      ...updates,
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
};

// Review Queries
export const getProductReviews = async (productId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Review[];
};

export const createReview = async (review: Omit<Review, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        ...review,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Review;
};

// Customer Queries
export const createCustomer = async (
  customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>
) => {
  const { data, error } = await supabase
    .from('customers')
    .insert([
      {
        ...customer,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Customer;
};

export const getCustomerByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as Customer | null;
};
