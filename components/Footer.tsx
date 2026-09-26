import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-12 border-t border-gray-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* BRAND BIO */}
        <div>
          <h3 className="text-xl font-bold tracking-widest mb-4 uppercase">Olfacto Perfume</h3>
          <p className="text-gray-600 text-sm">
            Crafting signature scents for the modern individual. Discover your unique fragrance today.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-lg font-semibold mb-2 uppercase tracking-wide">Quick Links</h4>
          <Link href="/#collection" className="text-gray-500 hover:text-black transition-colors text-sm">Shop Collection</Link>
          <Link href="/about" className="text-gray-500 hover:text-black transition-colors text-sm">About Us</Link>
          <Link href="/contact" className="text-gray-500 hover:text-black transition-colors text-sm">Contact Us</Link>
        </div>

        {/* LEGAL & SUPPORT */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-lg font-semibold mb-2 uppercase tracking-wide">Support</h4>
          <Link href="/shipping-policy" className="text-gray-500 hover:text-black transition-colors text-sm">Shipping Policy</Link>
          <Link href="/refund-policy" className="text-gray-500 hover:text-black transition-colors text-sm">Refund Policy</Link>
          <Link href="/terms-of-service" className="text-gray-500 hover:text-black transition-colors text-sm">Terms of Service</Link>
        </div>
      </div>
      
      {/* COPYRIGHT BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Olfacto Perfume. All rights reserved.
      </div>
    </footer>
  );
}