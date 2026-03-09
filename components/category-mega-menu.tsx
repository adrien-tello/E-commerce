'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { categories } from '@/lib/products-data';

export function CategoryMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-700 rounded transition"
      >
        <span>Categories</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 w-96 bg-white text-gray-900 rounded-b shadow-lg z-50"
        >
          <div className="grid grid-cols-2 gap-8 p-6">
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="font-bold text-gray-900 hover:text-orange-500 transition block mb-3"
                >
                  {category.name}
                </Link>
                <div className="space-y-2">
                  {category.subcategories?.map((sub) => (
                    <Link
                      key={sub}
                      href={`/category/${category.slug}?subcategory=${sub.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-gray-600 hover:text-orange-500 transition block"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
