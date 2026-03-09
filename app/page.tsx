'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products, categories } from '@/lib/products-data';
import { ProductCarousel } from '@/components/product-carousel';
import { FlashSaleBanner } from '@/components/flash-sale-banner';
import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

export default function HomePage() {
  const bestSellers = products.filter(p => p.badge === 'best-seller');
  const newProducts = products.filter(p => p.badge === 'new');
  const deals = products.filter(p => p.badge === 'deal');
  const recommendations = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <section className="relative h-96 md:h-96 bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Great Selection. <span className="text-orange-500">Great Prices.</span>
              </h1>
              <p className="text-lg text-gray-700">
                Shop millions of products with FREE fast shipping and exceptional customer service.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded w-fit transition">
                Shop Now
              </button>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1488973921481-811479733550?w=500&h=400&fit=crop"
                  alt="Shopping"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex gap-4 items-start">
              <Truck className="text-orange-500 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-bold text-gray-900">Fast & Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $35</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Shield className="text-orange-500 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-bold text-gray-900">Secure Shopping</h3>
                <p className="text-sm text-gray-600">Encrypted transactions</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <RefreshCw className="text-orange-500 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-bold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Headphones className="text-orange-500 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-bold text-gray-900">Expert Support</h3>
                <p className="text-sm text-gray-600">24/7 customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <FlashSaleBanner />
      </section>

      {/* Carousels */}
      <div className="max-w-7xl mx-auto bg-gray-100">
        <ProductCarousel title="Best Sellers" products={bestSellers.length > 0 ? bestSellers : products.slice(0, 8)} />
        <ProductCarousel title="Limited Time Deals" products={deals.length > 0 ? deals : products.slice(8, 16)} />
        <ProductCarousel title="New Arrivals" products={newProducts.length > 0 ? newProducts : products.slice(16, 24)} />
        <ProductCarousel title="Just For You" products={products.slice(0, 8)} />
      </div>

      {/* Category Grid */}
      <section className="py-12 px-4 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative overflow-hidden rounded-lg cursor-pointer group"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
