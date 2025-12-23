import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('earlyBirdCart') || '[]');
    setCart(savedCart);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    localStorage.setItem('earlyBirdCart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    localStorage.setItem('earlyBirdCart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('EarlyBirdCoffee')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-white">
            Your <span className="text-[#FDD202]">Cart</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-[#969696] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-4">Your cart is empty</h2>
            <Link
              to={createPageUrl('EarlyBirdCoffee')}
              className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-[#DBDBDB]">
                  <div className="flex gap-6">
                    {item.image && (
                      <div className="w-24 h-24 bg-[#F5F5F5] rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.product_name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-black text-lg mb-1">{item.product_name}</h3>
                      <p className="text-sm text-[#969696] mb-4">{item.size}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-[#DBDBDB] rounded-lg hover:border-[#FDD202] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-black w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-[#DBDBDB] rounded-lg hover:border-[#FDD202] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB] sticky top-6">
                <h3 className="text-xl font-bold text-black mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#333333]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#333333]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 100 && (
                    <p className="text-xs text-[#969696]">
                      Spend ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <div className="pt-6 border-t border-[#DBDBDB] mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-3xl font-bold text-[#FDD202]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to={createPageUrl('Checkout')}
                  className="block w-full text-center bg-[#FDD202] text-black py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}