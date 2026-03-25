'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import FilterPanel from '@/components/FilterPanel';
import type { Product } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProducts } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    conditions: [] as string[],
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    search: '',
    sort: 'newest',
  });

  // Load filters from URL
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    setFilters((prev) => ({
      ...prev,
      categories: category ? [category] : [],
      search: search || '',
    }));
    setCurrentPage(1);
  }, [searchParams]);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { products, count } = await getProducts({
          category: filters.categories[0],
          condition: filters.conditions[0],
          min_price: filters.min_price,
          max_price: filters.max_price,
          search: filters.search || undefined,
          sort: filters.sort as any,
          page: currentPage,
          limit: 12,
        });

        setProducts(products);
        setTotalCount(count || 0);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / 12);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Shop All Products</h1>
          <p className="text-gray-600">
            {totalCount} products found
            {filters.categories[0] && ` in ${filters.categories[0]}`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <FilterPanel
                onFilterChange={handleFilterChange}
                activeFilters={filters}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {loading && (
              <div className="flex justify-center items-center h-96">
                <div className="spinner w-12 h-12"></div>
              </div>
            )}

            {!loading && error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <>
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      className="btn btn-secondary disabled:opacity-50 flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = currentPage - 2 + i;
                        }
                        if (pageNum > totalPages) return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded font-semibold ${
                              currentPage === pageNum
                                ? 'bg-accent text-white'
                                : 'bg-white border border-gray-300 hover:border-accent'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="btn btn-secondary disabled:opacity-50 flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => handleFilterChange({
                    categories: [],
                    conditions: [],
                    min_price: undefined,
                    max_price: undefined,
                    search: '',
                  })}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
