'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { FiShoppingBag, FiStar, FiZap, FiArrowRight, FiTruck } from 'react-icons/fi';

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

const slides = [
  {
    badge: 'New Season Collection',
    title: 'Elevate Your',
    highlight: 'Lifestyle',
    sub: 'with Premium Products',
    desc: 'Discover curated collections from top brands. Free shipping on orders over $50.',
    cta: 'Shop Now',
    ctaHref: '/products',
    bg: 'from-slate-900 via-blue-950 to-indigo-900',
    accent: 'from-blue-400 to-cyan-400',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
  },
  {
    badge: 'Flash Sale — Up to 50% Off',
    title: 'Tech That',
    highlight: 'Inspires',
    sub: 'You Every Day',
    desc: 'Premium electronics, smart gadgets, and accessories at unbeatable prices.',
    cta: 'View Deals',
    ctaHref: '/products',
    bg: 'from-gray-900 via-purple-950 to-violet-900',
    accent: 'from-purple-400 to-pink-400',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
  },
  {
    badge: 'Trending Now',
    title: 'Fashion That',
    highlight: 'Defines',
    sub: 'Your Identity',
    desc: 'Explore the latest trends in fashion, accessories, and lifestyle products.',
    cta: 'Explore',
    ctaHref: '/products',
    bg: 'from-gray-900 via-rose-950 to-pink-900',
    accent: 'from-rose-400 to-orange-400',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
  },
];

const stats = [
  { value: 50000, suffix: '+', label: 'Happy Customers' },
  { value: 10000, suffix: '+', label: 'Products' },
  { value: 99, suffix: '%', label: 'Satisfaction' },
  { value: 4.9, suffix: '★', label: 'Avg Rating' },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <motion.div
        key={current}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
      />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Floating orbs */}
      <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div key={`text-${current}`} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FiZap className="w-4 h-4 text-yellow-400" />
                {slide.badge}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                {slide.title}{' '}
                <span className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}>{slide.highlight}</span>
                <br />{slide.sub}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed">
                {slide.desc}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4">
                <Link href={slide.ctaHref}>
                  <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.accent} text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl cursor-pointer`}>
                    <FiShoppingBag className="w-5 h-5" />
                    {slide.cta}
                    <FiArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
                <Link href="/products">
                  <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors cursor-pointer">
                    Browse All
                  </motion.span>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
                {[{ icon: FiTruck, text: 'Free Shipping $50+' }, { icon: FiStar, text: '4.9★ Rated' }, { icon: FiZap, text: '2-Day Delivery' }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                    <Icon className="w-4 h-4 text-white/40" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — image */}
            <motion.div key={`img-${current}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] aspect-[4/3]">
                <img src={slide.img} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating card — rating */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-8 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <FiStar className="w-5 h-5 text-white fill-current" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">4.9 / 5.0</div>
                  <div className="text-xs text-gray-500">50K+ Reviews</div>
                </div>
              </motion.div>

              {/* Floating card — shipping */}
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-8 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <FiTruck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-500">Orders over $50</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}>
                <div className="text-2xl font-black text-white">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
          <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
