'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { formatPrice } from '@/lib/utils';

interface BundleItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FrequentlyBoughtTogetherProps {
  items: BundleItem[];
  currentPrice: number;
}

export function FrequentlyBoughtTogether({ items, currentPrice }: FrequentlyBoughtTogetherProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([items[0]?.id || '']);

  const handleToggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalPrice = currentPrice + selectedItems.reduce((sum, id) => {
    const item = items.find((i) => i.id === id);
    return sum + (item?.price || 0);
  }, 0);

  const savings = selectedItems.length > 0 ? Math.round(totalPrice * 0.05) : 0;

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Frequently Bought Together</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-4">
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => handleToggleItem(item.id)}
            />
            <div className="relative w-16 h-16 rounded border">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</p>
              <p className="text-orange-600 font-bold">{formatPrice(item.price)}</p>
            </div>
            {idx < items.length - 1 && (
              <span className="text-gray-400">+</span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Total:</span>
          <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>You Save:</span>
            <span className="font-bold">{formatPrice(savings)}</span>
          </div>
        )}
      </div>

      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3">
        Add Selected Items to Cart
      </Button>
    </div>
  );
}
