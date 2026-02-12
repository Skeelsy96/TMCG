import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const products = await base44.entities.EarlyBirdProducts.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId
  });

  const addToCart = () => {
    if (!selectedSize && product.size_options?.length > 0) {
      toast.error('Please select a size');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('earlyBirdCart') || '[]');
    const sizeOption = product.size_options?.find(s => s.size === selectedSize);
    
    const cartItem = {
      product_id: product.id,
      product_name: product.name,
      size: selectedSize || 'Standard',
      quantity: quantity,
      price: sizeOption?.price || 0,
      image: product.image
    };

    cart.push(cartItem);
    localStorage.setItem('earlyBirdCart', JSON.stringify(cart));
    toast.success('Added to cart!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-[#969696]">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Product not found</h2>
          <Link to={createPageUrl('EarlyBirdCoffee')} className="text-[#FDD202] hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Set default size
  if (!selectedSize && product.size_options?.length > 0) {
    setSelectedSize(product.size_options[0].size);
  }

  const selectedPrice = product.size_options?.find(s => s.size === selectedSize)?.price || 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-black py-12 border-b border-[#969696]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl('EarlyBirdCoffee')}
            className="inline-flex items-center gap-2 text-white hover:text-[#FDD202] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden border border-[#DBDBDB] mb-4">
              <img
                src={product.image || 'https://via.placeholder.com/600'}
                alt={product.name}
                className={`w-full aspect-square ${product.name === 'Early Bird Barista Kit' ? 'object-contain' : 'object-cover'}`}
              />
            </div>
            {product.gallery_images?.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.gallery_images.map((img, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden border border-[#DBDBDB]">
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full aspect-square object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <Badge className="mb-4">{product.category}</Badge>
            <h1 className="text-4xl font-bold text-black mb-4">{product.name}</h1>
            <p className="text-xl text-[#333333] mb-8">{product.description}</p>

            {product.tasting_notes?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-black mb-3">Tasting Notes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tasting_notes.map((note, idx) => (
                    <span key={idx} className="px-4 py-2 bg-[#FDD202]/10 rounded-full text-sm text-black">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.full_description && (
              <div className="mb-8 p-6 bg-white rounded-2xl border border-[#DBDBDB]">
                <h3 className="font-bold text-black mb-3">About This Product</h3>
                <p className="text-[#333333] leading-relaxed whitespace-pre-line">{product.full_description}</p>
              </div>
            )}

            {product.ingredients && (
              <div className="mb-8">
                <h3 className="font-bold text-black mb-3">Ingredients</h3>
                <p className="text-[#333333]">{product.ingredients}</p>
              </div>
            )}

            {/* Size Selection */}
            {product.size_options?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-black mb-3">Select Size</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.size_options.map(option => (
                    <button
                      key={option.size}
                      onClick={() => setSelectedSize(option.size)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSize === option.size
                          ? 'border-[#FDD202] bg-[#FDD202]/5'
                          : 'border-[#DBDBDB] hover:border-[#FDD202]/50'
                      }`}
                    >
                      <div className="font-semibold text-black">{option.size}</div>
                      <div className="text-lg font-bold text-[#FDD202]">${option.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-bold text-black mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12"
                >
                  -
                </Button>
                <span className="text-2xl font-bold text-black w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#FDD202] mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#969696]">Total Price</span>
                <span className="text-3xl font-bold text-black">
                  ${(selectedPrice * quantity).toFixed(2)}
                </span>
              </div>
              <Button
                onClick={addToCart}
                disabled={!product.in_stock}
                className="w-full bg-[#FDD202] text-black hover:bg-[#f5c400] h-14 text-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>

            <Link
              to={createPageUrl('Cart')}
              className="block text-center text-[#FDD202] hover:underline"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}