import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import ReviewSection from "@/components/ReviewSection"; // <-- Imported the new reviews component

export default function Home() {
  return (
    <div className="flex flex-col items-center">

      {/* HERO SECTION */}
      <section className="w-full relative h-[70vh] md:h-[85vh] flex items-center justify-center border-b border-gray-100 overflow-hidden">

        {/* 1. BACKGROUND IMAGE */}
        {/* Make sure your image is named 'hero.jpg' and is inside the 'public' folder */}
        <Image
          src="/hero.jpg"
          alt="Olfacto Signature Scent"
          fill
          className="object-cover md:object-contain object-center"
          priority
          unoptimized
          quality={100}
          sizes="100vw"
        />

        {/* 2. DARK DARKENING OVERLAY (Helps the white text pop) */}
        {/* <div className="absolute inset-0 bg-black/10 z-0"></div> */}

        {/* 3. HERO CONTENT */}
        <div className="absolute bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Link
            href="#collection"
            className="inline-block whitespace-nowrap bg-black text-white font-bold uppercase tracking-widest transition-all duration-300 border border-black hover:
               text-[10px] px-4 py-3    {/* Mobile sizes */}
               md:text-sm md:px-10 md:py-4  {/* Desktop sizes */}"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* PRODUCT GRID SECTION */}
      {/* Reduced mobile padding slightly (px-3) to give the images more room */}
      <section id="collection" className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase mb-4">Our Collection</h2>
          <div className="w-12 h-0.5 bg-black mx-auto"></div>
        </div>

        {/* 
          UPDATED GRID: 
          grid-cols-2 forces 2 columns on mobile.
          gap-x-3 gap-y-10 creates tighter spacing on mobile, expanding on desktop (sm:gap-x-8).
        */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 sm:gap-x-8 sm:gap-y-16">
          {products.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </section>

      {/* ================================== */}
      {/* NEW: REVIEWS SECTION                 */}
      {/* ================================== */}
      <ReviewSection />

    </div>
  );
}