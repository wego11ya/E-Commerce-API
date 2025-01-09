"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product, Variant } from "@/types";

interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  amount: number;
  size: string;
  color: string;
  colorCode: string;
  gender: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    selectedVariant: Variant,
    selectedSize: string
  ) => void;
  removeFromCart: (productId: string, variantId: string, size: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    size: string,
    amount: number
  ) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Calculate subtotal
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const addToCart = (
    product: Product,
    selectedVariant: Variant,
    selectedSize: string
  ) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === product._id &&
          item.variantId === selectedVariant._id &&
          item.size === selectedSize
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const newItems = [...prevItems];
        newItems[existingItemIndex].amount += 1;
        return newItems;
      }

      // Add new item if it doesn't exist
      return [
        ...prevItems,
        {
          productId: product._id,
          variantId: selectedVariant._id,
          name: product.name,
          image: product.image,
          price: product.price,
          amount: 1,
          size: selectedSize,
          color: selectedVariant.color,
          colorCode: selectedVariant.colorCode,
          gender: product.gender,
        },
      ];
    });

    // Open cart when item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (
    productId: string,
    variantId: string,
    size: string
  ) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variantId === variantId &&
            item.size === size
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    variantId: string,
    size: string,
    amount: number
  ) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size === size
            ? { ...item, amount: Math.max(0, amount) }
            : item
        )
        .filter((item) => item.amount > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
