'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/products-data';
import { ProductCard } from '@/components/product-card';
import { FilterSidebar } from '@/components/filter-sidebar';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  ratings: string[];
  availability: string[];
  discounts: string[];
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    brands: [],
    ratings: [],
    availability: [],
    discounts: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();
    let results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(queryLower) ||
        p.description?.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower)
    );

    // Apply filters
    results = results.filter((product) => {
      const priceMatch =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const ratingMatch =
        filters.ratings.length === 0 ||
        filters.ratings.some((r) => {
          const minRating = parseInt(r.split('★')[0]);
          return product.rating >= minRating;
        });

      return priceMatch && ratingMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'relevance':
      default:
        results.sort((a, b) => {
          const aIndex = a.name.toLowerCase().indexOf(queryLower);
          const bIndex = b.name.toLowerCase().indexOf(queryLower);
          if (aIndex === bIndex) return b.reviewCount - a.reviewCount;
          return aIndex - bIndex;
        });
    }

    return results;
  }, [query, filters, sortBy]);

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600">
            {searchResults.length} results found for "<span className="font-semibold text-gray-900">{query}</span>"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <FilterSidebar onFilterChange={setFilters} defaultFilters={filters} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Sort controls */}
            <div className="flex items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg">
              <label className="text-sm font-semibold">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Results grid */}
            {paginatedResults.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-xl text-gray-600 mb-4">No results found for "{query}"</p>
                <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  View All Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {paginatedResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                  .map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? 'bg-orange-500 hover:bg-orange-600' : ''}
                    >
                      {page}
                    </Button>
                  ))}

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
