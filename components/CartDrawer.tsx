"use client";

import { useCart } from "@/lib/CartContext";
import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, addToCart } = useCart();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Smart suggestions: products not already in the cart
  const cartSlugs = cart.map((item) => item.slug);
  const suggestedProducts = products.filter((p) => !cartSlugs.includes(p.slug)).slice(0, 3);

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold tracking-widest uppercase flex items-center gap-2">
            YOUR CART
            <span className="bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </h2>
          <button onClick={closeCart} className="p-2 text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-8">

          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm tracking-widest uppercase">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-4 relative">
                  <div className="relative w-20 h-24 bg-gray-50 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-xs font-bold tracking-widest uppercase">{item.name} - {item.size}</h3>
                      <p className="text-xs font-semibold mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border border-gray-300 bg-white w-fit">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-2 py-0.5 text-gray-500 hover:text-black transition-colors"
                        >
                          -
                        </button>
                        <span className="text-[10px] font-medium px-2 w-6 text-center border-x border-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-2 py-0.5 text-gray-500 hover:text-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.size)} className="absolute top-1 right-0 text-gray-400 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Suggested Products (Cross-sell) */}
          {suggestedProducts.length > 0 && (
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-black bg-gray-100 py-1.5 px-3 w-fit">COMPLETE YOUR COLLECTION</h3>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                {suggestedProducts.map((suggestion) => {
                  const variant = suggestion.variants[0];
                  const discount = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
                  return (
                    <div key={suggestion.id} className="min-w-[140px] flex flex-col gap-2 snap-start">
                      <div className="relative w-full aspect-[4/5] bg-gray-50">
                        <Image src={variant.image} alt={suggestion.name} fill sizes="80px" className="object-cover" />
                        <span className="absolute top-0 left-0 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 uppercase">{discount}% OFF</span>
                      </div>
                      <h4 className="text-[10px] font-bold tracking-widest uppercase truncate">{suggestion.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[10px] font-bold">₹{variant.price}</p>
                        <p className="text-[9px] text-gray-400 line-through">₹{variant.originalPrice}</p>
                      </div>
                      <button
                        onClick={() => addToCart(suggestion, variant)}
                        className="w-full bg-black text-white py-1.5 text-[9px] tracking-widest uppercase hover:bg-gray-800 transition-colors"
                      >
                        ADD
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Total Price</span>
            <span className="text-xl font-bold">₹{subtotal}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            className="block w-full bg-red-600 text-white text-center py-4 text-xs font-bold tracking-[0.15em] uppercase hover:bg-red-700 transition-colors"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>

      </div>
    </>
  );
}