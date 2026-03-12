'use client';

import { ModernNavbar } from '@/components/modern-navbar';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCategories } from '@/components/featured-categories';
import { BestSellingProducts } from '@/components/best-selling-products';
import { PromotionalBanner } from '@/components/promotional-banner';
import { WhyShopWithUs } from '@/components/why-shop-with-us';
import { Testimonials } from '@/components/testimonials';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { ModernFooter } from '@/components/modern-footer';

export default function ModernLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <ModernNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Best Selling Products */}
      <BestSellingProducts />

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Why Shop With Us */}
      <WhyShopWithUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter Subscription */}
      <NewsletterSubscription />

      {/* Footer */}
      <ModernFooter />
    </div>
  );
}