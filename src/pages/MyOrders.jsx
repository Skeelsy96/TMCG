import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { createPageUrl } from '../utils';
import { Link } from 'react-router-dom';
import { Calendar, Receipt, ArrowLeft } from 'lucide-react';

export default function MyOrders() {
  const [authUser, setAuthUser] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const ok = await base44.auth.isAuthenticated();
      if (ok) {
        const me = await base44.auth.me();
        setAuthUser(me);
      }
      setCheckedAuth(true);
    })();
  }, []);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders', authUser?.email],
    queryFn: () => base44.entities.EarlyBirdOrders.filter({ customer_email: authUser.email }, '-created_date', 50),
    enabled: !!authUser?.email,
    initialData: [],
  });

  if (!checkedAuth) {
    return <div className="min-h-screen bg-[#F5F5F5]" />;
  }

  if (!authUser) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <button
          onClick={() => base44.auth.redirectToLogin(createPageUrl('MyOrders'))}
          className="bg-[#FDD202] text-black px-6 py-3 rounded-full font-semibold"
        >
          Log in to view your orders
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
          <Link to={createPageUrl('EarlyBirdCoffee')} className="text-[#FDD202] hover:underline">Continue Shopping</Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {isLoading ? (
          <div className="text-[#333333]">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-[#DBDBDB] rounded-2xl p-8 text-center">
            <p className="text-[#333333] mb-4">You have no orders yet.</p>
            <Link to={createPageUrl('EarlyBirdCoffee')} className="inline-flex items-center gap-2 text-black font-semibold hover:underline">
              Browse Coffee Products
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-[#DBDBDB] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 px-6 py-3 text-xs uppercase tracking-wide text-[#969696] border-b">
              <div>Order #</div>
              <div className="hidden md:block">Date</div>
              <div>Status</div>
              <div className="hidden md:block">Items</div>
              <div>Total</div>
              <div>Details</div>
            </div>
            {orders.map((o) => (
              <div key={o.id} className="grid grid-cols-4 md:grid-cols-6 gap-4 px-6 py-4 border-b last:border-0 text-sm">
                <div className="font-semibold">{o.order_number || o.id.slice(-6)}</div>
                <div className="hidden md:block">{new Date(o.created_date).toLocaleDateString()}</div>
                <div className="capitalize">{o.status}</div>
                <div className="hidden md:block">{Array.isArray(o.items) ? o.items.reduce((acc, it) => acc + (it.quantity || 1), 0) : '-'}</div>
                <div>${Number(o.total || 0).toFixed(2)}</div>
                <div>
                  <details>
                    <summary className="cursor-pointer text-black">View</summary>
                    <div className="mt-2 text-[#333333]">
                      {Array.isArray(o.items) && o.items.length > 0 ? (
                        <ul className="list-disc ml-5">
                          {o.items.map((it, idx) => (
                            <li key={idx}>{it.product_name || it.product_id} × {it.quantity || 1}</li>
                          ))}
                        </ul>
                      ) : 'No items recorded.'}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}