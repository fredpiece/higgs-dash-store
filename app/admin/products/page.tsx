'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { getProducts } from '@/lib/supabase';
import type { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { products } = await getProducts({ limit: 100 });
      setProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Link href="/admin/products/new" className="btn btn-lg btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>

        {/* Search Bar */}
        <div className="card p-6 bg-white mb-6">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              className="bg-transparent outline-none flex-1"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="card bg-white overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="spinner w-8 h-8 inline-block"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-primary">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            {product.condition}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${
                            product.stock > 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">
                            {product.rating.toFixed(1)}
                          </span>
                          <span className="text-yellow-400">★</span>
                          <span className="text-xs text-gray-500">
                            ({product.reviews_count})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                            onClick={() => {
                              if (
                                confirm(
                                  `Delete ${product.name}?`
                                )
                              ) {
                                // Handle delete
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600">
                {searchQuery ? 'No products found' : 'No products yet'}
              </p>
              <Link
                href="/admin/products/new"
                className="btn btn-primary mt-4 inline-block"
              >
                Create First Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
