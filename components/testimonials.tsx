'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

const testimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Fashion Designer', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', rating: 5, review: 'Absolutely love shopping here! The quality of products is outstanding and the customer service is exceptional. I\'ve been a loyal customer for 2 years now.', location: 'New York, USA', verified: true },
  { id: 2, name: 'Michael Chen', role: 'Software Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', rating: 5, review: 'The tech products here are top-notch! Great prices and authentic products. The 2-day shipping is a game changer. Highly recommended to all my colleagues!', location: 'San Francisco, USA', verified: true },
  { id: 3, name: 'Emma Rodriguez', role: 'Marketing Manager', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', rating: 5, review: 'Best online shopping experience ever! The website is user-friendly and products arrive quickly. The return process was seamless when I needed it.', location: 'Miami, USA', verified: true },
  { id: 4, name: 'James Wilson', role: 'Entrepreneur', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', rating: 5, review: 'I\'ve tried many online stores but this one stands out. The product quality matches the descriptions perfectly and the packaging is premium.', location: 'Chicago, USA', verified: true },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(p => (p + 1) % testimonials.length);

  return (
    <section className="py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">What Customers Say</h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => <FiStar key={i} className="w-5 h-5 text-amber-400 fill-current" />)}
            <span className="text-gray-600 ml-2 font-semibold">4.9 out of 5 — 50,000+ reviews</span>
          </div>
        </motion.div>

        {/* Desktop grid */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 border border-gray-100 h-full flex flex-col">
                {/* Quote */}
                <div className="text-5xl text-blue-100 font-serif leading-none mb-3">"</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">{t.review}</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <FiStar key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                      {t.verified && <FiCheck className="w-3.5 h-3.5 text-blue-500 bg-blue-100 rounded-full p-0.5" />}
                    </div>
                    <span className="text-xs text-gray-500">{t.role} · {t.location}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-5xl text-blue-100 font-serif leading-none mb-3">"</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">{testimonials[current].review}</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => <FiStar key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
              </div>
              <div className="flex items-center gap-3">
                <img src={testimonials[current].avatar} alt={testimonials[current].name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <span className="font-semibold text-gray-900 text-sm block">{testimonials[current].name}</span>
                  <span className="text-xs text-gray-500">{testimonials[current].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
