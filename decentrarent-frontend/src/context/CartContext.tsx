// src/context/CartContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type of a property that can be added to the cart
export type Property = {
  title: string;
  priceETH: any;
  priceUSD: any;
  description: string;
  id: number;
  name: string;
  type: string;
  address: string;
  rentUSD: number;
  rentETH: number;
  status: string;
};

type CartContextType = {
  cart: Property[];
  addToCart: (property: Property) => void;
  removeFromCart: (propertyId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Property[]>([]);

  const addToCart = (property: Property) => {
    if (!cart.find((item) => item.id === property.id)) {
      setCart([...cart, property]);
    }
  };

  const removeFromCart = (propertyId: number) => {
    setCart(cart.filter((item) => item.id !== propertyId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
