'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { products } from '@/lib/products-data';
import { OrderSummary } from '@/components/order-summary';
import { useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartItems = items.map((item) => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartTotal;
  const shipping = subtotal > 35 ? 0 : 9.99;
  const tax = subtotal * 0.08;

  const orderSummaryItems = cartItems.map(item => ({
    id: item.productId,
    name: item.product!.name,
    price: item.price,
    quantity: item.quantity,
    image: item.product!.image
  }));

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <Link
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg p-4 flex gap-4">
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded bg-gray-100">
                  <Image
                    src={item.product!.image}
                    alt={item.product!.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <Link href={`/product/${item.productId}`} className="font-semibold hover:text-orange-500 transition">
                    {item.product!.name}
                  </Link>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                  {item.product!.inStock ? (
                    <p className="text-sm text-green-600 font-semibold">In Stock</p>
                  ) : (
                    <p className="text-sm text-red-600 font-semibold">Out of Stock</p>
                  )}
                </div>

                {/* Quantity and Remove */}
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1 border-x">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm transition"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                  <p className="font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <OrderSummary
              items={orderSummaryItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              onCheckout={() => {
                setIsCheckingOut(true);
                router.push('/checkout');
              }}
              isLoading={isCheckingOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
