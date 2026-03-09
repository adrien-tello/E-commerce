'use client';

import { useEffect, useState } from 'react';
import { Clock, Zap } from 'lucide-react';
import { products } from '@/lib/products-data';
import { ProductCard } from './product-card';

export function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30
  });

  const flashProducts = products.slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-red-600 text-white py-6 px-4 rounded-lg mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Zap size={32} />
          <div>
            <h2 className="text-3xl font-bold">Lightning Deals</h2>
            <p className="text-red-100">Limited time offers on selected items</p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded font-bold">
            <Clock size={20} />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Flash sale products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
