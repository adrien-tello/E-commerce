'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiSmartphone, 
  FiUser, 
  FiHome, 
  FiHeart, 
  FiActivity, 
  FiWatch 
} from 'react-icons/fi';

const categories = [
  {
    id: 1,
    title: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    icon: FiSmartphone,
    href: '/category/electronics',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    icon: FiUser,
    href: '/category/fashion',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 3,
    title: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    icon: FiHome,
    href: '/category/home-kitchen',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    title: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    icon: FiHeart,
    href: '/category/beauty',
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 5,
    title: 'Sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    icon: FiActivity,
    href: '/category/sports',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 6,
    title: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523170335258-f5c6c6bd6eaf?w=400&h=300&fit=crop',
    icon: FiWatch,
    href: '/category/accessories',
    color: 'from-indigo-500 to-blue-500'
  }
];

export function FeaturedCategories() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-500">Explore collection</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}