'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProduct, getProducts, getProductReviews } from '@/lib/supabase';
import { useCart } from '@/lib/store';
import type { Product, Review } from '@/lib/types';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        // Load main product
        const productData = await getProduct(params.id);
        setProduct(productData);
        setSelectedImage(0);

        // Load related products
        const { products: related } = await getProducts({
          category: productData.category,
          limit: 4,
        });
        setRelatedProducts(related.filter((p) => p.id !== params.id));

        // Load reviews
        const productReviews = await getProductReviews(params.id);
        setReviews(productReviews);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <p className="text-gray-600 mb-4">Product not found</p>
        <a href="/shop" className="btn btn-primary">
          Back to Shop
        </a>
      </div>
    );
  }

  const conditionColor: Record<string, string> = {
    new: 'bg-green-100 text-green-800',
    like_new: 'bg-blue-100 text-blue-800',
    good: 'bg-yellow-100 text-yellow-800',
    fair: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-accent">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-accent">Shop</a>
          <span>/</span>
          <span>{product.category}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="card bg-white mb-4 overflow-hidden">
              <div className="relative w-full aspect-square bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 ${
                      selectedImage === idx
                        ? 'border-accent'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category & Condition */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase">
                {product.category}
              </span>
              <span className={`px-3 py-1 rounded text-xs font-semibold ${conditionColor[product.condition]}`}>
                {product.condition.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">
                {product.rating.toFixed(1)}/5
              </span>
              <span className="text-gray-500">
                ({product.reviews_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-accent">
                  ${product.price.toFixed(2)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.original_price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.original_price && product.original_price > product.price && (
                <p className="text-green-600 font-semibold mt-2">
                  Save ${(product.original_price - product.price).toFixed(2)}!
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  In Stock ({product.stock} available)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  Out of Stock
                </div>
              )}
            </div>

            {/* Quantity & CTA */}
            <div className="mb-6 flex gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-lg btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button className="btn btn-lg border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
              <div className="flex gap-3">
                <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Free Shipping on Orders Over $50</p>
                  <p className="text-sm text-gray-600">Ships within 24 hours</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">30-Day Money-Back Guarantee</p>
                  <p className="text-sm text-gray-600">Not satisfied? Full refund, no questions</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-accent hover:text-red-600 mt-4 font-semibold">
              <Share2 className="w-4 h-4" />
              Share Product
            </button>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 card p-8 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-primary mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm font-semibold text-gray-500">{key}</p>
                      <p className="text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="card p-8 bg-white h-fit">
            <h3 className="text-lg font-bold text-primary mb-4">Product Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">SKU</p>
                <p className="text-gray-800 font-mono">{product.sku}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Condition</p>
                <p className="text-gray-800 capitalize">{product.condition.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Category</p>
                <p className="text-gray-800 capitalize">{product.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="card p-8 bg-white mb-16">
            <h2 className="text-2xl font-bold text-primary mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.customer_name}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.verified_purchase && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-primary mb-2">{review.title}</p>
                  <p className="text-gray-600">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">Related Products</h2>
            <div className="product-grid">
              {relatedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
