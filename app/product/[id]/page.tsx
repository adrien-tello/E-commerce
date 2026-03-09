'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Heart, Share2, Shield, Truck, RefreshCw } from 'lucide-react';
import { products } from '@/lib/products-data';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { ProductCarousel } from '@/components/product-carousel';
import { ImageGallery } from '@/components/image-gallery';
import { RatingStars } from '@/components/rating-stars';
import { ReviewsSection } from '@/components/reviews-section';
import { FrequentlyBoughtTogether } from '@/components/frequently-bought-together';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId) as Product | undefined;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(productId));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const sampleReviews = [
    {
      id: '1',
      author: 'John Doe',
      rating: 5,
      title: 'Excellent product!',
      content: 'Great quality and fast delivery. Highly recommend!',
      date: '2 months ago',
      helpful: 128,
      unhelpful: 5,
      verified: true
    },
    {
      id: '2',
      author: 'Jane Smith',
      rating: 4,
      title: 'Good value for money',
      content: 'Works as expected. Very satisfied with my purchase.',
      date: '1 month ago',
      helpful: 87,
      unhelpful: 2,
      verified: true
    }
  ];

  const ratingBreakdown = {
    5: Math.round(product.reviewCount * 0.65),
    4: Math.round(product.reviewCount * 0.20),
    3: Math.round(product.reviewCount * 0.10),
    2: Math.round(product.reviewCount * 0.03),
    1: Math.round(product.reviewCount * 0.02)
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="md:col-span-1">
            <ImageGallery images={product.images} title={product.name} />
          </div>

          {/* Details */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Title and rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.inStock ? (
                <p className="text-green-600 font-semibold">In Stock ({product.stockCount} available)</p>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-lg mb-2">About this product</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="font-bold text-lg mb-3">Specifications</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-2 font-semibold text-gray-700 w-1/3">{key}</td>
                      <td className="py-2 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Purchase section */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center py-2 border-x"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => toggleWishlist(productId)}
                  className={`p-3 rounded-lg border transition ${
                    isInWishlist
                      ? 'bg-red-50 border-red-500 text-red-500'
                      : 'border-gray-300 text-gray-400 hover:border-red-500'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button
                onClick={() => addToCart(productId, quantity)}
                disabled={!product.inStock}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 rounded text-lg transition"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 rounded transition">
                Buy Now
              </button>
            </div>

            {/* Trust signals */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex gap-3 items-center">
                <Truck className="text-orange-500" size={20} />
                <div className="text-sm">
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-gray-600">On orders over $35</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <RefreshCw className="text-orange-500" size={20} />
                <div className="text-sm">
                  <p className="font-semibold">Free Returns</p>
                  <p className="text-gray-600">30-day return window</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Shield className="text-orange-500" size={20} />
                <div className="text-sm">
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-gray-600">Encrypted transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="border-t pt-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{review.title}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < review.rating ? 'text-orange-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{review.content}</p>
                  <p className="text-xs text-gray-500">
                    By {review.author} on {new Date(review.date).toLocaleDateString()} • {review.helpful} people found this helpful
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <ProductCarousel title="Related Products" products={relatedProducts} />
          </div>
        </div>
      )}
    </div>
  );
}
