'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, MapPin, Globe } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useUserStore } from '@/lib/store/user-store';
import { categories } from '@/lib/products-data';
import { CategoryMegaMenu } from './category-mega-menu';

export function Navbar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('United States');
  const [language, setLanguage] = useState('en');
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const user = useUserStore((state) => state.user);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b">
      {/* Top utility bar */}
      <div className="bg-gray-900 text-white px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-orange-400 transition">
              <MapPin size={16} />
              <span>{location}</span>
            </button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-900 text-white hover:text-orange-400 transition cursor-pointer"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/account/orders" className="hover:text-orange-400 transition">
              Returns & Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary nav with categories */}
      <div className="bg-[#232F3E] text-white px-4 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <CategoryMegaMenu />
          <Link href="/products" className="hover:text-orange-400 transition">
            All Products
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <button className="hover:text-orange-400 transition">Today's Deals</button>
            <button className="hover:text-orange-400 transition">Best Sellers</button>
            <button className="hover:text-orange-400 transition">New Releases</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
