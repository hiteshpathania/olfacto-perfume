import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import CartDrawer from "@/components/CartDrawer"; // <-- NEW IMPORT
import { CartProvider } from "@/lib/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olfacto Perfume",
  description: "The unseen accessory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-black min-h-screen flex flex-col`}>
        <CartProvider>
          <Navbar />
          
          {/* GLOBALLY MOUNTED CART DRAWER */}
          <CartDrawer />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}