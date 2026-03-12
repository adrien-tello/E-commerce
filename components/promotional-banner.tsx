'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';

export function PromotionalBanner() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
              'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8"
          >
            <FiZap className="w-4 h-4" />
            <span className="text-sm font-semibold">Limited Time Offer</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Up to{' '}
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-yellow-300"
              >
                50% Off
              </motion.span>
              <br />
              Selected Products
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Don't miss out on incredible savings across our premium collection.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-3"
            >
              <span>Shop Deals</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}