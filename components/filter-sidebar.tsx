'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  ratings: string[];
  availability: string[];
  discounts: string[];
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  defaultFilters?: FilterOptions;
}

const BRANDS = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Canon'];
const RATINGS = ['4★ & up', '3★ & up', '2★ & up', '1★ & up'];
const DISCOUNTS = ['20% off or more', '30% off or more', '40% off or more', '50% off or more'];

export function FilterSidebar({ onFilterChange, defaultFilters }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>(
    defaultFilters || {
      priceRange: [0, 1000],
      categories: [],
      brands: [],
      ratings: [],
      availability: [],
      discounts: []
    }
  );

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    ratings: true,
    discounts: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updatePriceRange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleFilter = (filterType: keyof FilterOptions, value: string) => {
    if (filterType === 'priceRange') return;
    const arr = filters[filterType] as string[];
    const newArr = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    const newFilters = { ...filters, [filterType]: newArr };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg border p-4 space-y-6">
      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold text-lg hover:text-orange-500 transition"
        >
          Price
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="mt-4 space-y-4">
            <Slider
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={updatePriceRange}
              min={0}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex gap-2 text-sm">
              <span>${filters.priceRange[0]}</span>
              <span>-</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div>
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between font-bold text-lg hover:text-orange-500 transition"
        >
          Brands
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.brands && (
          <div className="mt-4 space-y-3">
            {BRANDS.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition">
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => toggleFilter('brands', brand)}
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div>
        <button
          onClick={() => toggleSection('ratings')}
          className="w-full flex items-center justify-between font-bold text-lg hover:text-orange-500 transition"
        >
          Customer Ratings
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.ratings ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.ratings && (
          <div className="mt-4 space-y-3">
            {RATINGS.map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition">
                <Checkbox
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={() => toggleFilter('ratings', rating)}
                />
                <span className="text-sm">{rating}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discounts */}
      <div>
        <button
          onClick={() => toggleSection('discounts')}
          className="w-full flex items-center justify-between font-bold text-lg hover:text-orange-500 transition"
        >
          Discounts
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.discounts ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.discounts && (
          <div className="mt-4 space-y-3">
            {DISCOUNTS.map((discount) => (
              <label key={discount} className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition">
                <Checkbox
                  checked={filters.discounts.includes(discount)}
                  onCheckedChange={() => toggleFilter('discounts', discount)}
                />
                <span className="text-sm">{discount}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          const cleared: FilterOptions = {
            priceRange: [0, 1000],
            categories: [],
            brands: [],
            ratings: [],
            availability: [],
            discounts: []
          };
          setFilters(cleared);
          onFilterChange(cleared);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}
