"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { ProductVariant } from '@/lib/data';

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, variant: ProductVariant) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, newQuantity: number) => void;
  cartCount: number;
  
  // NEW: Drawer Controls
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: any, variant: ProductVariant) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product.id && item.size === variant.size);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id && item.size === variant.size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      return [...prev, {
        id: product.id,
        name: product.name,
        slug: product.slug,
        size: variant.size,
        price: variant.price,
        image: variant.image,
        quantity: 1
      }];
    });
    
    // Automatically open the drawer when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) => prev.map(item => 
      item.id === id && item.size === size 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, cartCount, 
      isCartOpen, openCart, closeCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};