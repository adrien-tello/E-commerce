'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { products, categories } from '@/lib/products-data';
import { ProductCard } from '@/components/product-card';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.category === slug);

  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratings, setRatings] = useState(0);

  let sortedProducts = [...categoryProducts];
  switch (sortBy) {
    case 'price-low':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
  }

  const filteredProducts = sortedProducts.filter(p => {
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    const ratingMatch = p.rating >= ratings;
    return priceMatch && ratingMatch;
  });

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {categoryProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 space-y-6">
              {/* Sort */}
              <div>
                <h3 className="font-bold text-lg mb-3">Sort by</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-lg mb-3">Price</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm">Min: ${priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Max: ${priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-bold text-lg mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map((rating) => (
                    <label key={rating} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={ratings === rating}
                        onChange={(e) => setRatings(parseInt(e.target.value))}
                        className="w-4 h-4"
                      />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < rating ? 'text-orange-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      {rating > 0 && <span className="text-xs text-gray-600">& up</span>}
                      {rating === 0 && <span className="text-xs text-gray-600">Any rating</span>}
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {category.subcategories.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Categories</h3>
                  <ul className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub}>
                        <a href="#" className="text-blue-600 hover:underline text-sm">
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg">No products found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
