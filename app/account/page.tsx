'use client';

import { useState } from 'react';
import { useUserStore } from '@/lib/store/user-store';
import { LogOut, Plus } from 'lucide-react';

export default function AccountPage() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'payments'>('profile');
  const [showAddressForm, setShowAddressForm] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded transition">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Hello, {user.name.split(' ')[0]}!</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg mb-6">
          <div className="flex border-b">
            {(['profile', 'orders', 'addresses', 'payments'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 font-semibold capitalize border-b-2 transition ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'orders' ? 'Your Orders' : tab === 'addresses' ? 'Addresses' : tab === 'payments' ? 'Payment Methods' : 'Profile'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="w-full border rounded px-4 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full border rounded px-4 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                  <select className="w-full border rounded px-4 py-2">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                  <select className="w-full border rounded px-4 py-2">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition mt-4">
                  Save Changes
                </button>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Your Orders</h3>
                <div className="border rounded-lg p-6 text-center text-gray-600">
                  <p>No orders yet</p>
                  <p className="text-sm">Once you place an order, you'll see it here</p>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Your Addresses</h3>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
                  >
                    <Plus size={18} />
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="border rounded-lg p-6 mb-6 bg-gray-50">
                    <h4 className="font-bold mb-4">Add New Address</h4>
                    <div className="space-y-3">
                      <input type="text" placeholder="Full Name" className="w-full border rounded px-4 py-2" />
                      <input type="text" placeholder="Street Address" className="w-full border rounded px-4 py-2" />
                      <div className="grid md:grid-cols-3 gap-3">
                        <input type="text" placeholder="City" className="border rounded px-4 py-2" />
                        <input type="text" placeholder="State" className="border rounded px-4 py-2" />
                        <input type="text" placeholder="ZIP Code" className="border rounded px-4 py-2" />
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition">
                        Save Address
                      </button>
                    </div>
                  </div>
                )}

                {user.addresses.length > 0 ? (
                  <div className="space-y-3">
                    {user.addresses.map((addr) => (
                      <div key={addr.id} className="border rounded-lg p-4 flex justify-between items-start">
                        <div>
                          <p className="font-bold capitalize">{addr.type}</p>
                          <p className="text-gray-600">{addr.street}</p>
                          <p className="text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                        </div>
                        {addr.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-lg p-6 text-center text-gray-600">
                    <p>No addresses saved</p>
                  </div>
                )}
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Payment Methods</h3>
                  <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition">
                    <Plus size={18} />
                    Add Card
                  </button>
                </div>

                {user.paymentMethods.length > 0 ? (
                  <div className="space-y-3">
                    {user.paymentMethods.map((method) => (
                      <div key={method.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <p className="font-bold capitalize">{method.type} Card</p>
                          <p className="text-gray-600">•••• •••• •••• {method.lastFour}</p>
                          <p className="text-sm text-gray-600">{method.expiryMonth}/{method.expiryYear}</p>
                        </div>
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-lg p-6 text-center text-gray-600">
                    <p>No payment methods saved</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
