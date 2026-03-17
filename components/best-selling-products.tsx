'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiStar, FiShoppingCart, FiHeart, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';

const products = [
  { id: '1', name: 'Premium Wireless Headphones', price: 129.99, originalPrice: 199.99, rating: 4.8, reviews: 2543, badge: 'Best Seller', category: 'electronics', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop' },
  { id: '2', name: 'Smart Watch Pro Series 5', price: 299.99, originalPrice: 399.99, rating: 4.6, reviews: 1821, badge: 'New', category: 'electronics', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop' },
  { id: '3', name: 'Ultra-Slim Laptop 14"', price: 899.99, originalPrice: 1199.99, rating: 4.7, reviews: 892, badge: 'Deal', category: 'electronics', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop' },
  { id: '4', name: 'Designer Sunglasses', price: 89.99, originalPrice: 149.99, rating: 4.5, reviews: 1234, badge: 'Trending', category: 'fashion', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop' },
  { id: '5', name: 'Leather Crossbody Bag', price: 119.99, originalPrice: 179.99, rating: 4.7, reviews: 987, badge: 'Popular', category: 'fashion', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop' },
  { id: '6', name: 'Minimalist Desk Lamp', price: 59.99, originalPrice: 89.99, rating: 4.4, reviews: 654, badge: 'New', category: 'home', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop' },
  { id: '7', name: 'Yoga Mat Premium', price: 49.99, originalPrice: 79.99, rating: 4.8, reviews: 2100, badge: 'Best Seller', category: 'sports', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop' },
  { id: '8', name: 'Ceramic Coffee Set', price: 79.99, originalPrice: 119.99, rating: 4.6, reviews: 445, badge: 'Trending', category: 'home', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop' },
];

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'electronics', label: 'Electronics' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'home', label: 'Home' },
  { key: 'sports', label: 'Sports' },
];

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-amber-500',
  'New': 'bg-emerald-500',
  'Deal': 'bg-red-500',
  'Trending': 'bg-purple-500',
  'Popular': 'bg-blue-500',
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cardAnim = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } };

function ProductCard({ product }: { product: typeof products[0] }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div variants={cardAnim} layout>
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-400 border border-gray-100">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img src={product.img} alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`${badgeColors[product.badge] ?? 'bg-gray-500'} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
              {product.badge}
            </span>
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">-{discount}%</span>
          </div>

          {/* Wishlist */}
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </motion.button>

          {/* Quick add */}
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => addToCart(product.id, 1)}
            className="absolute bottom-3 left-3 right-3 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <FiShoppingCart className="w-4 h-4" />
            Quick Add
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current'}`} />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews.toLocaleString()})</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-gray-900">${product.price}</span>
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => addToCart(product.id, 1)}
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm">
              <FiShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BestSellingProducts() {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? products : products.filter(p => p.category === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Top Picks</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Best Sellers</h2>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-200 group">
            View all products <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 flex-wrap mb-10">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab.key ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={container} initial="hidden" animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
