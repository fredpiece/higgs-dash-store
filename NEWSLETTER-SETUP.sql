-- Newsletter Subscribers Table
-- Run this in your Supabase SQL editor to set up the newsletters table

CREATE TABLE IF NOT EXISTS newsletters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  signup_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  preferences JSONB DEFAULT '{
    "discounts": false,
    "newItems": false,
    "blogUpdates": false
  }'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletters_email ON newsletters(email);

-- Create index on is_active for quick filtering
CREATE INDEX IF NOT EXISTS idx_newsletters_active ON newsletters(is_active);

-- Enable Row Level Security
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow public inserts, restrict reads/updates to service role)
CREATE POLICY "Allow public inserts" ON newsletters
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role to read" ON newsletters
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role to update" ON newsletters
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Add comment for documentation
COMMENT ON TABLE newsletters IS 'Newsletter subscriber database for HIGGS DASH STORE';
COMMENT ON COLUMN newsletters.email IS 'Subscriber email address (unique)';
COMMENT ON COLUMN newsletters.preferences IS 'JSON object with subscriber preferences: {discounts, newItems, blogUpdates}';
COMMENT ON COLUMN newsletters.is_active IS 'Whether subscriber is active (can be set to false on unsubscribe)';
