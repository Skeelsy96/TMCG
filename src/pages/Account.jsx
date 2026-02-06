import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, LogOut, BarChart3, ListChecks, Bookmark, PlusCircle, Calendar, User, ShoppingBag, Truck } from 'lucide-react';

export default function Account() {
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

  const { data: myListings = [] } = useQuery({
    queryKey: ['my-listings', authUser?.email],
    queryFn: () => base44.entities.CoffeeVan.filter({ created_by: authUser.email }),
    enabled: !!authUser?.email,
    initialData: [],
  });

  const { data: myEvents = [] } = useQuery({
    queryKey: ['my-events', authUser?.email],
    queryFn: () => base44.entities.EventPosting.filter({ created_by: authUser.email }),
    enabled: !!authUser?.email,
    initialData: [],
  });

  const { data: myOperatorProfiles = [] } = useQuery({
    queryKey: ['my-operator-profile', authUser?.email],
    queryFn: () => base44.entities.OperatorProfile.filter({ created_by: authUser.email }),
    enabled: !!authUser?.email,
    initialData: [],
  });

  const stats = useMemo(() => {
    const active = myListings.filter(l => l.status === 'active').length;
    const sold = myListings.filter(l => l.status === 'sold').length;
    const views = myListings.reduce((acc, l) => acc + (Number(l.views) || 0), 0);
    return { total: myListings.length, active, sold, views };
  }, [myListings]);

  if (!checkedAuth) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-[#333333]">Loading...</div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <section className="bg-black py-20 border-b border-[#969696]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Create Your Account</h1>
            <p className="text-gray-400 text-lg mb-8">Use your email and set a password on the next screen. You'll be able to manage listings, view analytics, and access saved vans.</p>
            <button
              onClick={() => base44.auth.redirectToLogin(createPageUrl('Account'))}
              className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f5c400] transition-all"
            >
              Create Account / Log in
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#DBDBDB] p-6">
              <ListChecks className="w-6 h-6 text-[#FDD202] mb-3" />
              <h3 className="font-bold text-black mb-2">Manage Your Listings</h3>
              <p className="text-sm text-[#333333]">Create, edit, and track your Pre‑Loved van listings.</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#DBDBDB] p-6">
              <BarChart3 className="w-6 h-6 text-[#FDD202] mb-3" />
              <h3 className="font-bold text-black mb-2">Listing Analytics</h3>
              <p className="text-sm text-[#333333]">See views and performance over time.</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#DBDBDB] p-6">
              <Bookmark className="w-6 h-6 text-[#FDD202] mb-3" />
              <h3 className="font-bold text-black mb-2">Saved Vans</h3>
              <p className="text-sm text-[#333333]">Access builds saved in the Van Configurator.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <section className="bg-black py-16 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome, <span className="text-[#FDD202]">{authUser.full_name || authUser.email}</span></h1>
              <p className="text-gray-400 mt-2">Manage your listings, view analytics, and access saved vans.</p>
            </div>
            <button
              onClick={() => base44.auth.logout(createPageUrl('Account'))}
              className="text-white/80 hover:text-white underline"
            >
              <span className="inline-flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
            <div className="text-[#969696] text-sm">Total Listings</div>
            <div className="text-3xl font-bold text-black">{stats.total}</div>
          </div>
          <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
            <div className="text-[#969696] text-sm">Active</div>
            <div className="text-3xl font-bold text-black">{stats.active}</div>
          </div>
          <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
            <div className="text-[#969696] text-sm">Sold</div>
            <div className="text-3xl font-bold text-black">{stats.sold}</div>
          </div>
          <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
            <div className="text-[#969696] text-sm">Total Views</div>
            <div className="text-3xl font-bold text-black">{stats.views}</div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3">
          <Link to={createPageUrl('MyListings')} className="inline-flex items-center gap-2 bg-white border border-[#DBDBDB] px-5 py-3 rounded-full font-semibold hover:bg-gray-50">Manage Listings</Link>
          <Link to={createPageUrl('ChooseListingPackage')} className="inline-flex items-center gap-2 bg-[#FDD202] text-black px-5 py-3 rounded-full font-semibold hover:bg-[#f5c400]"><PlusCircle className="w-4 h-4"/> List a Van</Link>
        </div>
      </section>

      {/* Account Shortcuts */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Events Listed */}
          <div className="bg-white rounded-2xl border border-[#DBDBDB] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2"><Calendar className="w-5 h-5 text-[#FDD202]" /><h3 className="font-bold text-black">Events Listed</h3></div>
            <p className="text-sm text-[#333333] mb-4">Manage events you posted.</p>
            {myEvents.length > 0 ? (
              <Link to={createPageUrl('BrowseEvents')} className="mt-auto inline-flex items-center gap-2 text-black font-semibold hover:underline">View My Events <ArrowRight className="w-4 h-4" /></Link>
            ) : (
              <Link to={createPageUrl('PostEvent')} className="mt-auto inline-flex items-center gap-2 text-black font-semibold hover:underline">Create an Event Listing <ArrowRight className="w-4 h-4" /></Link>
            )}
          </div>

          {/* Operator Profile */}
          <div className="bg-white rounded-2xl border border-[#DBDBDB] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2"><User className="w-5 h-5 text-[#FDD202]" /><h3 className="font-bold text-black">Operator Profile</h3></div>
            <p className="text-sm text-[#333333] mb-4">Your operator presence in the network.</p>
            {myOperatorProfiles.length > 0 ? (
              <Link to={`${createPageUrl('OperatorProfile')}?operatorId=${myOperatorProfiles[0].id}`} className="mt-auto inline-flex items-center gap-2 text-black font-semibold hover:underline">View Profile <ArrowRight className="w-4 h-4" /></Link>
            ) : (
              <Link to={createPageUrl('OperatorApplication')} className="mt-auto inline-flex items-center gap-2 text-black font-semibold hover:underline">Create an Operator Profile <ArrowRight className="w-4 h-4" /></Link>
            )}
          </div>

          {/* My Orders */}
          <div className="bg-white rounded-2xl border border-[#DBDBDB] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2"><ShoppingBag className="w-5 h-5 text-[#FDD202]" /><h3 className="font-bold text-black">My Orders</h3></div>
            <p className="text-sm text-[#333333] mb-4">View orders from Early Bird Coffee.</p>
            <Link to={createPageUrl('MyOrders')} className="mt-auto inline-flex items-center gap-2 text-black font-semibold hover:underline">View My Orders <ArrowRight className="w-4 h-4" /></Link>
          </div>

          {/* Van Listing */}
          <div className="bg-white rounded-2xl border border-[#DBDBDB] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2"><Truck className="w-5 h-5 text-[#FDD202]" /><h3 className="font-bold text-black">Van Listing</h3></div>
            <p className="text-sm text-[#333333] mb-4">Your Pre‑Loved van listings.</p>
            {myListings.length > 0 ? (
              <Link to={createPageUrl('MyListings')} className="mt-auto inline-flex items-center gap-2 text-black font-semibold hover:underline">View My Listings <ArrowRight className="w-4 h-4" /></Link>
            ) : (
              <Link to={createPageUrl('ChooseListingPackage')} className="mt-auto inline-flex items-center gap-2 text-black font-semibold hover:underline">Create a List My Van <ArrowRight className="w-4 h-4" /></Link>
            )}
          </div>
        </div>
      </section>

      {/* Saved Vans (placeholder) */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-4">Saved Vans</h2>
          <div className="bg-white border border-[#DBDBDB] rounded-2xl p-6">
            <p className="text-[#333333]">Your saved van builds from the Configurator will appear here.</p>
            <div className="mt-4">
              <Link to={createPageUrl('VanConfigurator')} className="inline-flex items-center gap-2 text-black font-semibold hover:underline">
                Open Van Configurator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}