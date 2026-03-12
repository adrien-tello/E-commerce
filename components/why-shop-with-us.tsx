'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCw } from 'react-icons/fi';

const features = [
  {
    icon: FiTruck,
    title: 'Fast Shipping',
    description: 'Free 2-day shipping on orders over $50. Express delivery available worldwide.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: FiShield,
    title: 'Secure Payments',
    description: '256-bit SSL encryption ensures your payment information is always protected.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'Our expert customer service team is available around the clock to help you.',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. Not satisfied? Get your money back, no questions asked.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50'
  }
];

export function WhyShopWithUs() {
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
            Why Shop With Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className={`${feature.bgColor} rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-2xl group-hover:scale-105`}>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}