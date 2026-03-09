'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useCartStore } from '@/lib/store/cart-store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const addToCart = useCartStore((state) => state.addToCart);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 flex gap-4">
        {/* Image container */}
        <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-100 rounded flex-shrink-0">
          <div className="relative w-32 h-32">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Title */}
          <Link href={`/product/${product.id}`} className="hover:text-orange-500 transition">
            <h3 className="font-semibold text-lg line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.round(product.rating) ? 'text-orange-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviewCount})</span>
          </div>

          {/* Description snippet */}
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => addToCart(product.id, 1)}
              disabled={!product.inStock}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white text-sm font-semibold py-2 rounded flex items-center justify-center gap-2 transition"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`px-4 py-2 rounded border transition ${
                isInWishlist
                  ? 'bg-red-50 border-red-500 text-red-500'
                  : 'border-gray-300 text-gray-400 hover:border-red-500'
              }`}
            >
              <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image container */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-100">
        <div className="relative w-full aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge === 'best-seller' && 'Best Seller'}
            {product.badge === 'new' && 'New'}
            {product.badge === 'deal' && 'Limited Deal'}
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        {/* Title */}
        <Link href={`/product/${product.id}`} className="hover:text-orange-500 transition">
          <h3 className="font-semibold text-sm line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.round(product.rating) ? 'text-orange-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock info */}
        {!product.inStock && (
          <p className="text-red-600 text-xs font-semibold">Out of Stock</p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => addToCart(product.id, 1)}
            disabled={!product.inStock}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white text-sm font-semibold py-2 rounded flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded border transition ${
              isInWishlist
                ? 'bg-red-50 border-red-500 text-red-500'
                : 'border-gray-300 text-gray-400 hover:border-red-500'
            }`}
          >
            <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}
