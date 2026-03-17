'use client';

import { ModernNavbar } from '@/components/modern-navbar';
import { HeroSection } from '@/components/hero-section-enhanced';
import { FeaturedCategories } from '@/components/featured-categories';
import { BestSellingProducts } from '@/components/best-selling-products';
import { PromotionalBanner } from '@/components/promotional-banner';
import { WhyShopWithUs } from '@/components/why-shop-with-us';
import { Testimonials } from '@/components/testimonials';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { ModernFooter } from '@/components/modern-footer';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-screen bg-white overflow-x-hidden">
      <ModernNavbar />
      <HeroSection />
      <FeaturedCategories />
      <BestSellingProducts />
      <PromotionalBanner />
      <WhyShopWithUs />
      <Testimonials />
      <NewsletterSubscription />
      <ModernFooter />
    </motion.div>
  );
}
