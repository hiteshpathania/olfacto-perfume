"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Removed useRouter import
import { Product } from '@/lib/data';
import { useCart } from '@/lib/CartContext';

export default function ProductCard({ perfume }: { perfume: Product }) {
  const { addToCart } = useCart();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const currentVariant = perfume.variants[selectedVariantIdx];

  const [isAdded, setIsAdded] = useState(false);

  // Calculate percentage automatically
  const discountPercentage = Math.round(
    ((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(perfume, currentVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(perfume, currentVariant);
    // Removed the redirect so it only opens the drawer!
  };

  return (
    <div className="group flex flex-col h-full">
      
      <Link href={`/shop/${perfume.slug}`} className="block relative w-full aspect-[4/5] bg-gray-100 mb-3 sm:mb-6 overflow-hidden">
        <Image
          src={currentVariant.image}
          alt={`${perfume.name} - ${currentVariant.size}`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </Link>

      <div className="text-center flex-grow flex flex-col">
        <Link href={`/shop/${perfume.slug}`}>
          <h3 className="text-sm sm:text-lg font-semibold tracking-wide mb-1 sm:mb-2 hover:text-gray-600 transition-colors">
            {perfume.name}
          </h3>
        </Link>
        
        <p className="hidden sm:block text-gray-500 text-xs mb-4 px-2 line-clamp-2">{perfume.headline}</p>
        
        <div className="flex justify-center space-x-1.5 sm:space-x-3 mb-3 sm:mb-4 mt-auto">
          {perfume.variants.map((variant, idx) => (
            <button
              key={variant.size}
              onClick={() => setSelectedVariantIdx(idx)}
              className={`px-2 py-1 sm:px-4 sm:py-1.5 text-[9px] sm:text-xs tracking-wider uppercase transition-colors border ${
                selectedVariantIdx === idx 
                  ? 'border-black bg-black text-white' 
                  : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-5">
          <p className="text-black font-medium text-sm sm:text-lg">₹{currentVariant.price}</p>
          <p className="text-gray-400 text-xs sm:text-sm line-through">₹{currentVariant.originalPrice}</p>
          <p className="text-red-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">({discountPercentage}% OFF)</p>
        </div>

        <div className="flex gap-1.5 sm:gap-3 w-full mt-auto">
          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-1/2 py-2 sm:py-3 text-[9px] sm:text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
              isAdded 
                ? 'bg-green-700 border-green-700 text-white scale-[0.98]' 
                : 'border border-black bg-white text-black hover:bg-gray-50'
            }`}
          >
            {isAdded ? 'ADDED ! ITEM' : 'CART'}
          </button>
          <button 
            onClick={handleBuyNow}
            className="w-1/2 bg-black text-white py-2 sm:py-3 text-[9px] sm:text-xs tracking-wider uppercase hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}