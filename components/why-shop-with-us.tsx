'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCw, FiAward, FiGlobe } from 'react-icons/fi';

const features = [
  { icon: FiTruck, title: 'Free Fast Shipping', desc: 'Free 2-day shipping on orders over $50. Express delivery available worldwide.', color: 'from-blue-500 to-cyan-500', light: 'bg-blue-50 border-blue-100' },
  { icon: FiShield, title: 'Secure Payments', desc: '256-bit SSL encryption ensures your payment information is always protected.', color: 'from-green-500 to-emerald-500', light: 'bg-green-50 border-green-100' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'Our expert customer service team is available around the clock to help you.', color: 'from-purple-500 to-violet-500', light: 'bg-purple-50 border-purple-100' },
  { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day hassle-free returns. Not satisfied? Get your money back, no questions asked.', color: 'from-orange-500 to-red-500', light: 'bg-orange-50 border-orange-100' },
  { icon: FiAward, title: 'Quality Guarantee', desc: 'Every product is verified for authenticity and quality before it reaches you.', color: 'from-yellow-500 to-amber-500', light: 'bg-yellow-50 border-yellow-100' },
  { icon: FiGlobe, title: 'Global Delivery', desc: 'We ship to 150+ countries worldwide with real-time tracking on every order.', color: 'from-teal-500 to-cyan-500', light: 'bg-teal-50 border-teal-100' },
];

const marqueeItems = ['Free Shipping $50+', 'Secure Checkout', '30-Day Returns', '24/7 Support', 'Authentic Products', 'Global Delivery', '4.9★ Rated', '50K+ Customers'];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export function WhyShopWithUs() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      {/* Marquee trust bar */}
      <div className="bg-gray-900 py-3 mb-20 overflow-hidden">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((text, i) => (
            <span key={i} className="text-white/70 text-sm font-medium flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Our Promise</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">Why Shop With Us?</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
            We're committed to providing you with the best shopping experience possible.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} variants={item}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
                className={`group ${f.light} border rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-400`}>
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.3 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <f.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
