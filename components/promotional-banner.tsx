'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiZap, FiClock } from 'react-icons/fi';
import { useState, useEffect } from 'react';

function useCountdown(targetHours = 12) {
  const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });
  useEffect(() => {
    const end = Date.now() + targetHours * 3600 * 1000;
    const t = setInterval(() => {
      const diff = Math.max(0, end - Date.now());
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    }, 1000);
    return () => clearInterval(t);
  }, [targetHours]);
  return time;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div key={value} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.3 }}
        className="w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-2xl font-black text-white">
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-white/50 text-xs mt-1.5 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function PromotionalBanner() {
  const time = useCountdown(11);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-gray-900">
      {/* Animated gradient bg */}
      <motion.div
        animate={{ background: ['linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%)', 'linear-gradient(135deg,#1e3a5f 0%,#1e40af 50%,#1e3a5f 100%)', 'linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%)'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
      />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FiZap className="w-4 h-4" />
              Flash Sale — Limited Time
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
              Up to{' '}
              <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="text-yellow-400">50% Off</motion.span>
              <br />
              <span className="text-white/80">Selected Items</span>
            </h2>

            <p className="text-white/60 text-lg mb-8 max-w-md">
              Don't miss out on incredible savings across our premium collection. Deals end when the timer hits zero.
            </p>

            <Link href="/products">
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl cursor-pointer group">
                Shop Deals Now
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Right — countdown */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-end gap-8">
            <div className="text-center lg:text-right">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-4 justify-center lg:justify-end">
                <FiClock className="w-4 h-4" />
                Offer ends in
              </div>
              <div className="flex items-center gap-3">
                <TimeUnit value={time.h} label="Hours" />
                <span className="text-white/40 text-3xl font-black mb-4">:</span>
                <TimeUnit value={time.m} label="Mins" />
                <span className="text-white/40 text-3xl font-black mb-4">:</span>
                <TimeUnit value={time.s} label="Secs" />
              </div>
            </div>

            {/* Mini product previews */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', off: '35%' },
                { img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', off: '25%' },
                { img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop', off: '40%' },
              ].map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}
                  className="relative rounded-xl overflow-hidden aspect-square bg-white/10">
                  <img src={p.img} alt="Deal" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-0 right-0 text-center text-white font-black text-sm">-{p.off}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
