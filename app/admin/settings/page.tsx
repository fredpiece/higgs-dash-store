'use client';

import { useState } from 'react';
import { Save, Copy, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [copied, setCopied] = useState<string | null>(null);
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ClawBuddy',
    storeEmail: 'info@clawbuddy.com',
    storePhone: '+1 (234) 567-890',
    taxRate: '0.07',
    shippingCost: '10.00',
    freeShippingThreshold: '50.00',
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Store Settings */}
          <div className="card p-8 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-6">Store Information</h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Store Name</label>
                <input
                  type="text"
                  className="input"
                  value={storeSettings.storeName}
                  onChange={(e) =>
                    setStoreSettings({ ...storeSettings, storeName: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="input"
                    value={storeSettings.storeEmail}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        storeEmail: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    className="input"
                    value={storeSettings.storePhone}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        storePhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </form>
          </div>

          {/* Shipping Settings */}
          <div className="card p-8 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-6">Shipping & Tax</h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Shipping Cost
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">$</span>
                    <input
                      type="number"
                      step="0.01"
                      className="input"
                      value={storeSettings.shippingCost}
                      onChange={(e) =>
                        setStoreSettings({
                          ...storeSettings,
                          shippingCost: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Free Shipping Threshold
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">$</span>
                    <input
                      type="number"
                      step="0.01"
                      className="input"
                      value={storeSettings.freeShippingThreshold}
                      onChange={(e) =>
                        setStoreSettings({
                          ...storeSettings,
                          freeShippingThreshold: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tax Rate</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.001"
                      min="0"
                      max="1"
                      className="input"
                      value={storeSettings.taxRate}
                      onChange={(e) =>
                        setStoreSettings({
                          ...storeSettings,
                          taxRate: e.target.value,
                        })
                      }
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </form>
          </div>

          {/* API Keys */}
          <div className="card p-8 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-6">API Configuration</h2>

            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Important:</strong> Keep your API keys secret. Never share them
                  publicly or commit them to version control.
                </p>
              </div>

              {/* Stripe */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">Stripe Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Publishable Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input"
                        value="pk_live_xxxxxxxxxxxxx"
                        disabled
                      />
                      <button
                        onClick={() =>
                          handleCopy('pk_live_xxxxxxxxxxxxx', 'stripe_pub')
                        }
                        className="btn btn-secondary"
                      >
                        {copied === 'stripe_pub' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Secret Key (hidden)
                    </label>
                    <div className="text-gray-500 text-sm p-2 bg-gray-50 rounded">
                      Stored securely on server (not displayed)
                    </div>
                  </div>

                  <a
                    href="https://dashboard.stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Manage Stripe Keys →
                  </a>
                </div>
              </div>

              {/* Supabase */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">Supabase Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Project URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input"
                        value="https://xxxxx.supabase.co"
                        disabled
                      />
                      <button
                        onClick={() =>
                          handleCopy('https://xxxxx.supabase.co', 'supabase_url')
                        }
                        className="btn btn-secondary"
                      >
                        {copied === 'supabase_url' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Manage Supabase Database →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Webhook Status */}
          <div className="card p-8 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-6">Webhooks & Integrations</h2>

            <div className="space-y-4">
              <div className="border rounded p-4 bg-green-50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold">Stripe Webhooks</p>
                    <p className="text-sm text-green-700">
                      Configured & active (last event: 2 hours ago)
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded p-4 bg-blue-50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">Supabase Real-time</p>
                    <p className="text-sm text-blue-700">
                      Connected & syncing live data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card p-8 bg-red-50 border border-red-200">
            <h2 className="text-2xl font-bold text-red-800 mb-6">Danger Zone</h2>
            <p className="text-red-700 mb-6">
              These actions cannot be undone. Proceed with caution.
            </p>

            <button className="btn bg-red-600 text-white hover:bg-red-700">
              Clear All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
