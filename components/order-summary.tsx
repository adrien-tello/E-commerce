'use client';

import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  onCheckout?: () => void;
  checkoutLabel?: string;
  isLoading?: boolean;
}

export function OrderSummary({
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  onCheckout,
  checkoutLabel = 'Proceed to Checkout',
  isLoading = false
}: OrderSummaryProps) {
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="bg-white rounded-lg border p-6 sticky top-24 h-fit">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      {/* Items preview */}
      <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0">
            <div className="relative w-12 h-12 rounded bg-gray-100 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</p>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900 flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="space-y-2 pb-4 border-b">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">{formatPrice(shipping)}</span>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated Tax</span>
            <span className="font-semibold">{formatPrice(tax)}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-semibold">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-4 mb-6">
        <span className="text-lg font-bold">Total</span>
        <span className="text-2xl font-bold text-orange-600">{formatPrice(total)}</span>
      </div>

      {/* Checkout button */}
      <Button
        onClick={onCheckout}
        disabled={isLoading || items.length === 0}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition disabled:bg-gray-400"
      >
        {isLoading ? 'Processing...' : checkoutLabel}
      </Button>

      {/* Trust badges */}
      <div className="mt-6 space-y-2 text-xs text-gray-600">
        <p className="flex items-center gap-2">
          <span className="text-green-600">✓</span> Secure checkout
        </p>
        <p className="flex items-center gap-2">
          <span className="text-green-600">✓</span> Free returns within 30 days
        </p>
        <p className="flex items-center gap-2">
          <span className="text-green-600">✓</span> Encrypted & secure payment
        </p>
      </div>
    </div>
  );
}
