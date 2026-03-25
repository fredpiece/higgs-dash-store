'use client';

import Link from 'next/link';
import { BarChart3, Package, ShoppingCart, Settings, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  // Mock stats
  const stats = [
    {
      label: 'Total Orders',
      value: '1,234',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total Revenue',
      value: '$45,678',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Products',
      value: '892',
      icon: Package,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Avg Order Value',
      value: '$37.01',
      icon: BarChart3,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`card p-6 ${stat.bg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Products Management */}
          <Link href="/admin/products" className="card p-8 bg-white hover:shadow-lg transition">
            <Package className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Products</h2>
            <p className="text-gray-600 mb-4">
              Manage your inventory, pricing, and product listings.
            </p>
            <button className="btn btn-primary">Manage Products</button>
          </Link>

          {/* Orders Management */}
          <Link href="/admin/orders" className="card p-8 bg-white hover:shadow-lg transition">
            <ShoppingCart className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Orders</h2>
            <p className="text-gray-600 mb-4">
              View and manage customer orders, shipping, and tracking.
            </p>
            <button className="btn btn-primary">Manage Orders</button>
          </Link>

          {/* Settings */}
          <Link href="/admin/settings" className="card p-8 bg-white hover:shadow-lg transition">
            <Settings className="w-12 h-12 text-orange-600 mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Settings</h2>
            <p className="text-gray-600 mb-4">
              Configure store settings, API keys, and integrations.
            </p>
            <button className="btn btn-primary">Configure</button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="card p-8 bg-white">
          <h2 className="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/products?action=add"
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-center"
            >
              <p className="font-semibold text-primary">+ Add Product</p>
            </Link>
            <Link
              href="/admin/orders"
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition text-center"
            >
              <p className="font-semibold text-primary">View Orders</p>
            </Link>
            <Link
              href="/admin/products"
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-center"
            >
              <p className="font-semibold text-primary">Manage Inventory</p>
            </Link>
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition text-center"
            >
              <p className="font-semibold text-primary">Stripe Dashboard</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
