'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiChevronUp, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

export function ModernFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="w-full py-4 flex items-center justify-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <FiChevronUp className="w-5 h-5" />
            <span className="font-medium">Back to top</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EliteShop
                </span>
              </Link>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your premier destination for quality products at unbeatable prices.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <FiMapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">123 Commerce Street, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FiPhone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FiMail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">support@eliteshop.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">All Products</Link></li>
              <li><Link href="/category/electronics" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Electronics</Link></li>
              <li><Link href="/category/fashion" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">FAQ</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Returns</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 EliteShop. All rights reserved.
            </div>

            <div className="flex items-center space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
              >
                <FiFacebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-gray-400 hover:text-sky-500 transition-colors duration-300"
              >
                <FiTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-gray-400 hover:text-pink-600 transition-colors duration-300"
              >
                <FiInstagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}