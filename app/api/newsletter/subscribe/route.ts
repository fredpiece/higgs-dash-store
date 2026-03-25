import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SubscribeRequest {
  email: string;
  preferences: {
    discounts: boolean;
    newItems: boolean;
    blogUpdates: boolean;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json();
    const { email, preferences } = body;

    // Validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Invalid email provided' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!preferences || Object.keys(preferences).length === 0) {
      return NextResponse.json(
        { message: 'At least one preference must be selected' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletters')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Supabase check error:', checkError);
      throw checkError;
    }

    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('newsletters')
      .insert([
        {
          email: email.toLowerCase(),
          signup_date: new Date().toISOString(),
          preferences: preferences,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter',
        data: data?.[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { message: 'An error occurred while subscribing' },
      { status: 500 }
    );
  }
}
