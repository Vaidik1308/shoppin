import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

interface AppContextType {
  currentIndex: number;
  likedProducts: Product[];
  passedProducts: Product[];
  cartProducts: Product[];
  setCurrentIndex: (index: number) => void;
  addLikedProduct: (product: Product) => void;
  addPassedProduct: (product: Product) => void;
  addCartProduct: (product: Product) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [passedProducts, setPassedProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const addLikedProduct = (product: Product) => {
    setLikedProducts(prev => [...prev, product]);
  };

  const addPassedProduct = (product: Product) => {
    setPassedProducts(prev => [...prev, product]);
  };

  const addCartProduct = (product: Product) => {
    setCartProducts(prev => [...prev, product]);
  };

  const resetApp = () => {
    setCurrentIndex(0);
    setLikedProducts([]);
    setPassedProducts([]);
    setCartProducts([]);
  };

  const value = {
    currentIndex,
    likedProducts,
    passedProducts,
    cartProducts,
    setCurrentIndex,
    addLikedProduct,
    addPassedProduct,
    addCartProduct,
    resetApp
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 