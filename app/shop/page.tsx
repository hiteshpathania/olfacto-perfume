"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Default");

  // Helper to map your exact products to their categories 
  // (In case you didn't add a 'category' field in your data.ts)
  const getCategory = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("black knot") || lowerName.includes("smoky knight")) return "Men";
    if (lowerName.includes("first kiss") || lowerName.includes("liyara")) return "Women";
    return "Unisex"; // Neosil, Frose
  };

  // 1. Filter Logic
  let displayedProducts = products.filter((product) => {
    if (activeFilter === "All") return true;
    return getCategory(product.name) === activeFilter;
  });

  // 2. Sorting Logic (Using the 50ml price for sorting)
  if (sortOrder === "HighToLow") {
    displayedProducts.sort((a, b) => b.variants[0].price - a.variants[0].price);
  } else if (sortOrder === "LowToHigh") {
    displayedProducts.sort((a, b) => a.variants[0].price - b.variants[0].price);
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      
      {/* ========================================== */}
      {/* HEADER SECTION                             */}
      {/* ========================================== */}
      <div className="bg-gray-50 py-16 md:py-24 px-4 text-center border-b border-gray-100">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase mb-4 text-black">
          The Collection
        </h1>
        <p className="text-gray-500 text-xs md:text-sm tracking-widest uppercase max-w-xl mx-auto">
          Explore our signature scents. Filter by persona.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* ========================================== */}
        {/* FILTER & SORT BAR                          */}
        {/* ========================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-100">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {["All", "Unisex", "Men", "Women"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 text-[10px] sm:text-xs tracking-widest uppercase transition-colors border ${
                  activeFilter === category 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center">
            <span className="text-[10px] tracking-widest uppercase text-gray-400 mr-3">Sort By:</span>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border-b border-gray-300 py-1 pr-6 focus:outline-none focus:border-black transition-colors bg-transparent text-xs tracking-widest uppercase cursor-pointer"
            >
              <option value="Default">Featured</option>
              <option value="HighToLow">Price: High to Low</option>
              <option value="LowToHigh">Price: Low to High</option>
            </select>
          </div>
          
        </div>

        {/* ========================================== */}
        {/* PRODUCT GRID                               */}
        {/* ========================================== */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 sm:gap-x-8 sm:gap-y-16">
            {displayedProducts.map((perfume) => (
              <ProductCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm tracking-widest uppercase">No products found in this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}