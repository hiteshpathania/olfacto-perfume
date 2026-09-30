"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { products } from "@/lib/data";

// ==========================================
// RAZORPAY SCRIPT LOADER
// ==========================================
const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  // ==========================================
  // PAYMENT METHOD STATE
  // ==========================================
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // ==========================================
  // COUPON SYSTEM CONFIGURATION
  // ==========================================
  const VALID_COUPONS: Record<string, number> = {
    "WELCOME10": 10,
    "OLFACTO20": 20,
    "SQUAD50": 50,
  };

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [couponStatus, setCouponStatus] = useState<{ type: "success" | "error" | null, text: string }>({ type: null, text: "" });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (VALID_COUPONS[code]) {
      setAppliedDiscountPercent(VALID_COUPONS[code]);
      setCouponStatus({ type: "success", text: `'${code}' APPLIED (-${VALID_COUPONS[code]}%)` });
    } else {
      setAppliedDiscountPercent(0);
      setCouponStatus({ type: "error", text: "INVALID OR EXPIRED CODE" });
    }
  };

  // ==========================================
  // PRICING MATH
  // ==========================================
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const shipping = 0;
  const total = subtotal - discountAmount + shipping;

  // ==========================================
  // 🚀 LIVE ORDER TRANSMISSION
  // ==========================================
  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // 1. ADD YOUR WEB3FORMS KEY HERE
    formData.append("access_key", "1afbc8b0-4673-4df5-ab6f-641faf8d6fdc");
    formData.append("from_name", "Olfacto Checkout");

    // 2. FORMAT THE CART ITEMS FOR THE EMAIL
    const orderSummary = cart.map(item =>
      `${item.quantity}x ${item.name} (${item.size}) - ₹${item.price * item.quantity}`
    ).join('\n');

    formData.append("Order_Items", orderSummary);
    formData.append("Total_Amount", `₹${total}`);
    if (appliedDiscountPercent > 0) {
      formData.append("Discount_Applied", `${appliedDiscountPercent}% OFF`);
    }

    // ==========================================
    // PREPAID LOGIC (RAZORPAY)
    // ==========================================
    if (paymentMethod === "Prepaid") {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Payment gateway failed to load. Are you offline?");
        return;
      }

      // Fetch the Order ID from your backend
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });
      const orderData = await orderResponse.json();

      // Configure Razorpay Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_FUTURE_KEY_ID',
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Olfacto Perfume",
        description: "Signature Scent Order",
        image: "/logo.png", // Your logo in the popup
        order_id: orderData.id,
        handler: async function (response: any) {
          // THIS RUNS WHEN PAYMENT IS SUCCESSFUL
          formData.append("subject", "✅ NEW PREPAID ORDER - OLFACTO PERFUME");
          formData.append("Razorpay_Payment_ID", response.razorpay_payment_id);

          await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });

          setIsSuccess(true);
          setTimeout(() => { window.location.href = "/"; }, 4000);
        },
        prefill: {
          name: formData.get("First_Name") + " " + formData.get("Last_Name"),
          email: formData.get("Customer_Email") as string,
          contact: formData.get("Customer_Phone") as string,
        },
        theme: { color: "#000000" } // Matches your dark luxury theme
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      // ==========================================
      // CASH ON DELIVERY LOGIC
      // ==========================================
    } else {
      formData.append("subject", "🚨 NEW COD ORDER - OLFACTO PERFUME");
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
      } catch (error) {
        console.error("Order failed to send", error);
      }
      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-6 text-center">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mb-8 text-center uppercase tracking-wider text-sm">
          The unseen accessory awaits.
        </p>
        <Link
          href="/shop"
          className="bg-black text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">Checkout</h1>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24">

          {/* ========================================== */}
          {/* LEFT COLUMN: SHIPPING FORM                 */}
          {/* ========================================== */}
          <div className="w-full lg:w-3/5">
            <h2 className="text-sm font-semibold tracking-widest uppercase mb-6 border-b border-gray-200 pb-4">
              Shipping Information
            </h2>

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">First Name</label>
                  <input required name="First_Name" type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Last Name</label>
                  <input required name="Last_Name" type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Email Address</label>
                  <input required name="Customer_Email" type="email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Phone Number</label>
                  <input required name="Customer_Phone" type="tel" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Delivery Address</label>
                <input required name="Street_Address" type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none mb-4" placeholder="Street Address" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input required name="City" type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none" placeholder="City" />
                  <input required name="Postal_Code" type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none" placeholder="Postal Code" />
                </div>
              </div>

              <h2 className="text-sm font-semibold tracking-widest uppercase mb-6 border-b border-gray-200 pb-4 pt-8">
                Payment Method
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPaymentMethod("Cash on Delivery")}>
                  <input type="radio" id="cod" name="Payment_Method" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={() => setPaymentMethod("Cash on Delivery")} className="accent-black w-4 h-4 cursor-pointer" />
                  <label htmlFor="cod" className="text-sm tracking-wide uppercase cursor-pointer">Cash on Delivery</label>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPaymentMethod("Prepaid")}>
                  <input type="radio" id="prepaid" name="Payment_Method" value="Prepaid" checked={paymentMethod === "Prepaid"} onChange={() => setPaymentMethod("Prepaid")} className="accent-black w-4 h-4 cursor-pointer" />
                  <label htmlFor="prepaid" className="text-sm tracking-wide uppercase cursor-pointer">Online Payment (Razorpay)</label>
                </div>
              </div>

              {/* MOBILE ONLY: PLACE ORDER BUTTON */}
              <button
                type="submit"
                className="w-full bg-black text-white py-5 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors mt-8 lg:hidden"
              >
                Place Order — ₹{total}
              </button>
            </form>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: ORDER SUMMARY & COUPON       */}
          {/* ========================================== */}
          <div className="w-full lg:w-2/5 flex flex-col h-fit">
            <div className="bg-gray-50 p-6 sm:p-8">
              <h2 className="text-sm font-semibold tracking-widest uppercase mb-6 border-b border-gray-200 pb-4">
                Order Summary
              </h2>

              <div className="space-y-6 mb-8">
                {cart.map((item, idx) => {
                  const productData = products.find((p) => p.slug === item.slug);
                  const variantData = productData?.variants.find((v) => v.size === item.size);
                  const originalPrice = variantData?.originalPrice || item.price;

                  return (
                    <div key={idx} className="flex items-start justify-between">
                      <div className="flex items-start gap-4">

                        <div className="relative w-16 h-20 bg-gray-200 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold tracking-wide uppercase">{item.name}</p>
                          <p className="text-xs text-gray-500 tracking-wider uppercase mt-1">{item.size}</p>

                          <div className="flex items-center gap-4 mt-3">
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
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-[9px] text-red-500 tracking-widest uppercase hover:text-black transition-colors underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                        {originalPrice > item.price && (
                          <p className="text-xs text-gray-400 line-through mt-0.5">
                            ₹{originalPrice * item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* COUPON SECTION */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
                  <div className="flex w-full">
                    <input
                      type="text"
                      placeholder="ENTER COUPON CODE"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow border border-gray-300 px-4 py-3 text-xs tracking-widest uppercase focus:outline-none focus:border-black transition-colors bg-white"
                    />
                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-3 text-[10px] tracking-widest uppercase hover:bg-gray-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponStatus.type === "error" && (
                    <p className="text-[10px] text-red-600 tracking-widest uppercase font-bold mt-1">{couponStatus.text}</p>
                  )}
                  {couponStatus.type === "success" && (
                    <p className="text-[10px] text-green-700 tracking-widest uppercase font-bold mt-1">{couponStatus.text}</p>
                  )}
                </form>
              </div>

              {/* TOTALS */}
              <div className="border-t border-gray-200 pt-6 space-y-4 text-sm tracking-wide">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span className="uppercase tracking-widest">Discount ({appliedDiscountPercent}%)</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200">
                  <span className="uppercase tracking-widest">Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* DESKTOP ONLY: PLACE ORDER BUTTON */}
              <button
                form="checkout-form"
                type="submit"
                className="hidden lg:block w-full bg-black text-white py-5 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors mt-8"
              >
                Place Order — ₹{total}
              </button>
            </div>

          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md px-4 transition-all duration-500">
          <h2 className="text-white text-3xl md:text-6xl font-bold tracking-[0.1em] text-center uppercase leading-snug mb-4 animate-pulse">
            ORDER CONFIRMED.
          </h2>
          <p className="text-gray-400 text-xs md:text-sm tracking-widest uppercase text-center">
            Welcome to the club. Your signature scent is on the way.
          </p>
        </div>
      )}
    </>
  );
}