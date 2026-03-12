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

      {/* Main header */}
      <div className="bg-[#131921] text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-white hover:text-orange-400 transition">
              Amazon
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* User account */}
            <Link href="/account" className="flex flex-col items-center hover:text-orange-400 transition">
              <User size={24} />
              <span className="text-xs">{user ? user.name.split(' ')[0] : 'Account'}</span>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex flex-col items-center hover:text-orange-400 transition">
              <Heart size={24} />
              <span className="text-xs">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative flex flex-col items-center hover:text-orange-400 transition">
              <ShoppingCart size={24} />
              <span className="text-xs">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#232F3E] text-white px-4 py-4">
          <div className="space-y-4">
            <Link href="/products" className="block hover:text-orange-400 transition">
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="block hover:text-orange-400 transition"
              >
                {category.name}
              </Link>
            ))}
            <div className="border-t border-gray-600 pt-4 space-y-2">
              <button className="block hover:text-orange-400 transition">Today's Deals</button>
              <button className="block hover:text-orange-400 transition">Best Sellers</button>
              <button className="block hover:text-orange-400 transition">New Releases</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
