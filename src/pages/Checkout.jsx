import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    business_name: '',
    street: '',
    city: '',
    state: '',
    postcode: '',
    payment_method: 'credit_card',
    notes: ''
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('earlyBirdCart') || '[]');
    setCart(savedCart);
  }, []);

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      return await base44.entities.EarlyBirdOrders.create(orderData);
    },
    onSuccess: (order) => {
      localStorage.removeItem('earlyBirdCart');
      setOrderNumber(order.order_number);
      setOrderPlaced(true);
      toast.success('Order placed successfully!');
    },
    onError: () => {
      toast.error('Failed to place order. Please try again.');
    }
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
      order_number: `EB-${Date.now()}`,
      items: cart,
      subtotal,
      shipping_cost: shipping,
      total,
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      business_name: formData.business_name,
      shipping_address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode
      },
      payment_method: formData.payment_method,
      notes: formData.notes
    };

    placeOrderMutation.mutate(orderData);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 text-center border border-[#DBDBDB]">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-4">Order Confirmed!</h2>
            <p className="text-[#333333] mb-2">
              Thank you for your order. Your order number is:
            </p>
            <p className="text-2xl font-bold text-[#FDD202] mb-8">{orderNumber}</p>
            <p className="text-[#333333] mb-8">
              We've sent a confirmation email to {formData.customer_email} with your order details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('EarlyBirdCoffee')}
                className="inline-flex items-center justify-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
              >
                Continue Shopping
              </Link>
              <Link
                to={createPageUrl('TMCGHome')}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold border border-[#DBDBDB] hover:bg-[#F5F5F5] transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Your cart is empty</h2>
          <Link
            to={createPageUrl('EarlyBirdCoffee')}
            className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('Cart')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold text-white">
            <span className="text-[#FDD202]">Checkout</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
                <h2 className="text-2xl font-bold text-black mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.customer_name}
                      onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                      placeholder="John Smith"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={formData.customer_email}
                        onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                        placeholder="john@example.com"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Phone *</Label>
                      <Input
                        type="tel"
                        value={formData.customer_phone}
                        onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                        placeholder="0412 345 678"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Business/Brand Name</Label>
                    <Input
                      value={formData.business_name}
                      onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                      placeholder="Your Coffee Co."
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
                <h2 className="text-2xl font-bold text-black mb-6">Shipping Address</h2>
                <div className="space-y-6">
                  <div>
                    <Label>Street Address *</Label>
                    <Input
                      value={formData.street}
                      onChange={(e) => setFormData({...formData, street: e.target.value})}
                      placeholder="123 Main Street"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label>City *</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Sydney"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>State *</Label>
                      <Select 
                        value={formData.state} 
                        onValueChange={(value) => setFormData({...formData, state: value})}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Postcode *</Label>
                      <Input
                        value={formData.postcode}
                        onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                        placeholder="2000"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
                <h2 className="text-2xl font-bold text-black mb-6">Payment Method</h2>
                <Select 
                  value={formData.payment_method} 
                  onValueChange={(value) => setFormData({...formData, payment_method: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="invoice">Invoice (30 Days)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-[#969696] mt-4">
                  You will receive payment instructions via email after placing your order.
                </p>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB]">
                <h2 className="text-2xl font-bold text-black mb-6">Order Notes</h2>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any special instructions or requirements..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl p-8 border border-[#DBDBDB] sticky top-6">
                <h3 className="text-xl font-bold text-black mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <div className="font-semibold text-black">{item.product_name}</div>
                        <div className="text-[#969696]">{item.size} × {item.quantity}</div>
                      </div>
                      <div className="font-semibold text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pt-6 border-t border-[#DBDBDB]">
                  <div className="flex justify-between text-[#333333]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#333333]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#DBDBDB] mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-3xl font-bold text-[#FDD202]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={placeOrderMutation.isPending}
                  className="w-full bg-[#FDD202] text-black hover:bg-[#f5c400] h-14 text-lg"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {placeOrderMutation.isPending ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}