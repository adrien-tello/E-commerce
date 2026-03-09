'use client';

import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to top button */}
      <div className="bg-[#232f3e] text-white py-4 text-center">
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center gap-2 mx-auto hover:text-orange-400 transition"
        >
          <ChevronUp size={20} />
          Back to top
        </button>
      </div>

      {/* Main footer */}
      <footer className="bg-[#131921] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition">About Us</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Careers</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Press Releases</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Blog</Link></li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition">Sell on Amazon</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Advertise Your Products</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Become an Affiliate</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Fulfillment by Amazon</Link></li>
              </ul>
            </div>

            {/* Help & Settings */}
            <div>
              <h3 className="font-bold mb-4">Help & Settings</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition">Your Account</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Returns Centre</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Shipping Rates & Policies</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Help</Link></li>
              </ul>
            </div>

            {/* Connect with Us */}
            <div>
              <h3 className="font-bold mb-4">Connect with Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition">Facebook</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Twitter</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Instagram</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">LinkedIn</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="text-center text-sm text-gray-400 mb-4">
              <p>&copy; 2024 Amazon Clone. All rights reserved.</p>
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <Link href="#" className="hover:text-orange-400 transition">Privacy Notice</Link>
              <Link href="#" className="hover:text-orange-400 transition">Conditions of Use</Link>
              <Link href="#" className="hover:text-orange-400 transition">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
