"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // Removed useRouter
import { products } from "@/lib/data";
import { useCart } from "@/lib/CartContext";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart(); 

  const perfume = products.find((p) => p.slug === slug);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  
  const [isAdded, setIsAdded] = useState(false);

  if (!perfume) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold tracking-widest uppercase mb-4">Product Not Found</h1>
        <Link href="/" className="text-gray-500 underline hover:text-black transition-colors">Return to Homepage</Link>
      </div>
    );
  }

  const currentVariant = perfume.variants[selectedVariantIdx];

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
    // Removed the router.push redirect so it only opens the drawer!
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
            <Image
              src={currentVariant.image}
              alt={`${perfume.name} - ${currentVariant.size}`}
              fill
              className="object-cover object-center"
              priority 
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
          <nav className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{perfume.name}</span>
          </nav>

          <div className="mb-3">
            <span className="inline-block bg-black text-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
              {perfume.gender}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{perfume.name}</h1>
          <p className="text-sm font-medium tracking-wide text-gray-500 mb-6 uppercase">
            Inspired By: <span className="text-black">{perfume.inspiration}</span>
          </p>
          
          <div className="flex items-center gap-3 mb-8">
            <p className="text-2xl text-black font-medium">₹{currentVariant.price}</p>
            <p className="text-lg text-gray-400 line-through">₹{currentVariant.originalPrice}</p>
            <span className="bg-red-600 text-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
              {discountPercentage}% OFF
            </span>
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-6 whitespace-pre-line">
            {perfume.description}
          </p>
          
          <p className="text-black font-semibold text-sm italic mb-10">"The unseen accessory."</p>

          <div className="mb-10">
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Select Size</h3>
            <div className="flex space-x-4">
              {perfume.variants.map((variant, idx) => (
                <button
                  key={variant.size}
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors border ${
                    selectedVariantIdx === idx 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-12 w-full">
            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-1/2 py-4 text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ${
                isAdded 
                  ? 'bg-green-700 border border-green-700 text-white scale-[0.98]' 
                  : 'border border-black bg-white text-black hover:bg-gray-50'
              }`}
            >
              {isAdded ? 'ADDED ! ITEM' : 'Add to Cart'}
            </button>
            <button 
              onClick={handleBuyNow}
              className="w-1/2 bg-black text-white py-4 text-xs sm:text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Buy Now
            </button>
          </div>

          <div className="border-t border-gray-100 pt-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-xs tracking-widest uppercase font-semibold w-32 mb-1 sm:mb-0">Character:</span>
              <span className="text-sm text-gray-600">{perfume.character}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-xs tracking-widest uppercase font-semibold w-32 mb-1 sm:mb-0">Best For:</span>
              <span className="text-sm text-gray-600">{perfume.bestFor}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-xs tracking-widest uppercase font-semibold w-32 mb-1 sm:mb-0">Longevity:</span>
              <span className="text-sm text-gray-600">{perfume.longevity}</span>
            </div>
          </div>
          
          {perfume.slug === "smoky-knight" && (
            <p className="text-[10px] text-gray-400 mt-6">*Longevity can vary depending on skin type, weather and application.</p>
          )}

        </div>
      </div>
    </div>
  );
}