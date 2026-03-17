'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiCheck, FiGift, FiZap, FiTag } from 'react-icons/fi';

const perks = [
  { icon: FiGift, text: 'Exclusive member-only deals' },
  { icon: FiZap, text: 'Early access to flash sales' },
  { icon: FiTag, text: '10% off your first order' },
];

export function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 lg:py-28 bg-gray-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
              <FiMail className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Get Exclusive<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Deals & Offers</span>
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Join 50,000+ subscribers and be the first to know about special offers, new arrivals, and insider tips.
            </p>
            <div className="space-y-4">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white/70 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10">
              {!subscribed ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Subscribe Now</h3>
                  <p className="text-white/50 text-sm mb-6">No spam, unsubscribe anytime.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    </div>
                    <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-60">
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                          Subscribing...
                        </span>
                      ) : 'Get My 10% Off'}
                    </motion.button>
                  </form>
                  <p className="text-white/30 text-xs mt-4 text-center">By subscribing you agree to our Privacy Policy.</p>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                  className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheck className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">You're in!</h3>
                  <p className="text-white/60">Check your inbox for your 10% discount code.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
