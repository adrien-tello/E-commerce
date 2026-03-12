'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useUserStore } from '@/lib/store/user-store';
import { products } from '@/lib/products-data';
import { CheckoutStepper } from '@/components/checkout-stepper';
import { OrderSummary } from '@/components/order-summary';

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const user = useUserStore((state) => state.user);
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingForm, setShippingForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [shippingMethod, setShippingMethod] = useState('standard');

  const subtotal = cartTotal;
  const shipping = shippingMethod === 'express' ? 14.99 : (subtotal > 35 ? 0 : 9.99);
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const cartItemsWithProducts = cartItems.map((item) => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  if (cartItemsWithProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Shipping Address', description: 'Where to deliver' },
    { id: 2, title: 'Delivery Method', description: 'Choose shipping speed' },
    { id: 3, title: 'Payment', description: 'Secure payment' },
    { id: 4, title: 'Review Order', description: 'Confirm and place order' }
  ];

  const stepMap = { shipping: 1, delivery: 2, payment: 3, review: 4 };
  const currentStepNum = stepMap[step as keyof typeof stepMap] || 1;

  const orderSummaryItems = cartItemsWithProducts.map(item => ({
    id: item.productId,
    name: item.product!.name,
    price: item.price,
    quantity: item.quantity,
    image: item.product!.image
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Checkout Stepper */}
        <CheckoutStepper steps={steps} currentStep={currentStepNum} />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            {/* Shipping Step */}
            {step === 'shipping' && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={shippingForm.fullName}
                      onChange={(e) => setShippingForm({...shippingForm, fullName: e.target.value})}
                      className="border rounded px-4 py-2 md:col-span-2"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                    className="w-full border rounded px-4 py-2"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingForm.street}
                    onChange={(e) => setShippingForm({...shippingForm, street: e.target.value})}
                    className="w-full border rounded px-4 py-2"
                    required
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                      className="border rounded px-4 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({...shippingForm, state: e.target.value})}
                      className="border rounded px-4 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={shippingForm.zipCode}
                      onChange={(e) => setShippingForm({...shippingForm, zipCode: e.target.value})}
                      className="border rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-semibold">Standard Shipping (5-7 days)</p>
                          <p className="text-sm text-gray-600">
                            {subtotal > 35 ? 'FREE' : '$9.99'}
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 border rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-semibold">Express Shipping (2-3 days)</p>
                          <p className="text-sm text-gray-600">$14.99</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded mt-6"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={paymentForm.cardName}
                    onChange={(e) => setPaymentForm({...paymentForm, cardName: e.target.value})}
                    className="w-full border rounded px-4 py-2"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
                    className="w-full border rounded px-4 py-2"
                    maxLength={19}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentForm.expiry}
                      onChange={(e) => setPaymentForm({...paymentForm, expiry: e.target.value})}
                      className="border rounded px-4 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                      className="border rounded px-4 py-2"
                      maxLength={4}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="flex-1 border border-gray-300 text-gray-900 font-bold py-3 rounded hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Review Step */}
            {step === 'review' && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                
                <div className="space-y-6">
                  {/* Shipping Address */}
                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">Shipping Address</h3>
                    <p>{shippingForm.fullName}</p>
                    <p>{shippingForm.street}</p>
                    <p>{shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}</p>
                  </div>

                  {/* Shipping Method */}
                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">Shipping Method</h3>
                    <p>
                      {shippingMethod === 'express' ? 'Express Shipping (2-3 days)' : 'Standard Shipping (5-7 days)'}
                    </p>
                  </div>

                  {/* Payment */}
                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">Payment Method</h3>
                    <p>Card ending in {paymentForm.cardNumber.slice(-4)}</p>
                  </div>

                  {/* Items Summary */}
                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-4">Items</h3>
                    <div className="space-y-3">
                      {cartItemsWithProducts.map((item) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span>{item.product!.name} x {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="flex-1 border border-gray-300 text-gray-900 font-bold py-3 rounded hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <OrderSummary
              items={orderSummaryItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              checkoutLabel={step === 'review' ? 'Place Order' : 'Continue to Next Step'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
