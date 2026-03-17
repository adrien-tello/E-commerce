'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiSmartphone, FiUser, FiHome, FiHeart, FiActivity, FiWatch, FiArrowRight } from 'react-icons/fi';

const categories = [
  { id: 1, title: 'Electronics', count: '2,400+ items', icon: FiSmartphone, href: '/category/electronics', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop' },
  { id: 2, title: 'Fashion', count: '5,100+ items', icon: FiUser, href: '/category/fashion', color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop' },
  { id: 3, title: 'Home & Kitchen', count: '3,200+ items', icon: FiHome, href: '/category/home-kitchen', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop' },
  { id: 4, title: 'Beauty', count: '1,800+ items', icon: FiHeart, href: '/category/beauty', color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop' },
  { id: 5, title: 'Sports', count: '2,900+ items', icon: FiActivity, href: '/category/sports', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop' },
  { id: 6, title: 'Accessories', count: '4,600+ items', icon: FiWatch, href: '/category/accessories', color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50', img: 'https://images.unsplash.com/photo-1523170335258-f5c6c6bd6eaf?w=600&h=400&fit=crop' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export function FeaturedCategories() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Collections</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 leading-tight">Shop by Category</h2>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-200 group">
            View all categories <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={item}>
              <Link href={cat.href}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={cat.img} alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{cat.title}</h3>
                        <p className="text-sm text-white/60">{cat.count}</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <cat.icon className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white/80 transition-all duration-300 text-sm font-medium">
                      <span>Explore collection</span>
                      <FiArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
