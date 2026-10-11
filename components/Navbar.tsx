"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  // Added 'openCart' here to trigger the drawer
  const { cartCount, openCart } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`sticky top-0 w-full z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* ================================== */}
            {/* LEFT SECTION                       */}
            {/* ================================== */}
            <div className="flex-1 flex items-center justify-start">
              
              {/* MOBILE: Hamburger Menu */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-black hover:opacity-70 transition-opacity"
                aria-label="Open Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* DESKTOP: Logo */}
              <Link href="/" className="hidden md:block">
                <Image 
                  src="/logo.png" 
                  alt="Olfacto Logo" 
                  width={120} 
                  height={45} 
                  className="object-contain"
                />
              </Link>
            </div>

            {/* ================================== */}
            {/* CENTER SECTION                     */}
            {/* ================================== */}
            <div className="flex-1 flex items-center justify-center">
              
              {/* MOBILE: Centered Logo */}
              <Link href="/" className="md:hidden">
                <Image 
                  src="/logo.png" 
                  alt="Olfacto Logo" 
                  width={100} 
                  height={38} 
                  className="object-contain"
                />
              </Link>

              {/* DESKTOP: Navigation Links */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-xs font-semibold tracking-widest uppercase hover:text-gray-500 transition-colors">
                  Home
                </Link>
                <Link href="/shop" className="text-xs font-semibold tracking-widest uppercase hover:text-gray-500 transition-colors">
                  Shop
                </Link>
                <Link href="/about" className="text-xs font-semibold tracking-widest uppercase hover:text-gray-500 transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="text-xs font-semibold tracking-widest uppercase hover:text-gray-500 transition-colors">
                  Contact Us
                </Link>
              </nav>
            </div>

            {/* ================================== */}
            {/* RIGHT SECTION                      */}
            {/* ================================== */}
            <div className="flex-1 flex items-center justify-end">
              
              {/* MOBILE & DESKTOP: Cart Icon (Now a button that opens the drawer) */}
              <button 
                onClick={openCart}
                className="text-black p-2 -mr-2 sm:mr-0 hover:opacity-70 transition-opacity relative group cursor-pointer"
                aria-label="Open Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-black rounded-full transition-transform group-hover:scale-110">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* ================================== */}
        {/* SEAMLESS RUNNING MARQUEE           */}
        {/* ================================== */}
        <div className="w-full bg-black text-white text-[10px] tracking-widest uppercase py-2 flex overflow-hidden">
          <style>{`
            @keyframes infiniteScroll {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .marquee-track {
              display: flex;
              animation: infiniteScroll 15s linear infinite;
              min-width: 100%;
              flex-shrink: 0;
              justify-content: space-around;
            }
          `}</style>
          
          <div className="marquee-track">
            <span className="px-4 md:px-8 whitespace-nowrap">5% OFF ON ALL PREPAID ORDERS</span>
            <span className="px-4 md:px-8 whitespace-nowrap">THE UNSEEN ACCESSORY</span>
            <span className="px-4 md:px-8 whitespace-nowrap">5% OFF ON ALL PREPAID ORDERS</span>
            <span className="px-4 md:px-8 whitespace-nowrap">THE UNSEEN ACCESSORY</span>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <span className="px-4 md:px-8 whitespace-nowrap">5% OFF ON ALL PREPAID ORDERS</span>
            <span className="px-4 md:px-8 whitespace-nowrap">THE UNSEEN ACCESSORY</span>
            <span className="px-4 md:px-8 whitespace-nowrap">5% OFF ON ALL PREPAID ORDERS</span>
            <span className="px-4 md:px-8 whitespace-nowrap">THE UNSEEN ACCESSORY</span>
          </div>
        </div>
      </header>

      {/* ================================== */}
      {/* FULL SCREEN MOBILE MENU OVERLAY    */}
      {/* ================================== */}
      <div 
        className={`fixed inset-0 bg-white z-[100] transition-transform duration-500 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <span className="text-lg font-bold tracking-widest uppercase">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-black hover:opacity-70 transition-opacity"
            aria-label="Close Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 py-10 space-y-8">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-l font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">Home</Link>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-l font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">Shop Collection</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-l font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-l font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">Contact Us</Link>
        </nav>

        <div className="mt-auto px-6 py-10 border-t border-gray-100">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Support</p>
          <div className="flex flex-col space-y-4 text-sm tracking-widest uppercase">
            <Link href="/shipping-policy" onClick={() => setIsMobileMenuOpen(false)}>Shipping</Link>
            <Link href="/refund-policy" onClick={() => setIsMobileMenuOpen(false)}>Refunds</Link>
            <Link href="/terms-of-service" onClick={() => setIsMobileMenuOpen(false)}>Terms</Link>
          </div>
        </div>
      </div>
    </>
  );
}