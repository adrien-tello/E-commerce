'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';

const bestSellingProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 2543,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 1821,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    badge: 'New'
  },
  {
    id: '3',
    name: 'Ultra-Slim Laptop 14"',
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    badge: 'Deal'
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    badge: 'Trending'
  }
];

export function BestSellingProducts() {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const ProductCard = ({ product }: { product: typeof bestSellingProducts[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
      <motion.div
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        <div className="relative overflow-hidden">
          <div className="relative h-64 bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </div>
            <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.badge}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product.id, 1)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Selling Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular products loved by thousands of customers worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}