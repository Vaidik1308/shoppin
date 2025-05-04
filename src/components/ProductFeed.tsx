import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product, products } from '../data/products';

const ProductFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [passedProducts, setPassedProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    const currentProduct = products[currentIndex];
    
    if (direction === 'right') {
      setLikedProducts([...likedProducts, currentProduct]);
    } else if (direction === 'left') {
      setPassedProducts([...passedProducts, currentProduct]);
    } else if (direction === 'up') {
      setCartProducts([...cartProducts, currentProduct]);
    }
    
    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= products.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No more products!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Liked Products</h3>
            <p className="text-gray-600">{likedProducts.length} items</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Passed Products</h3>
            <p className="text-gray-600">{passedProducts.length} items</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Cart Items</h3>
            <p className="text-gray-600">{cartProducts.length} items</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <ProductCard
          product={products[currentIndex]}
          onSwipe={handleSwipe}
          isActive={true}
        />
      </div>
    </div>
  );
};

export default ProductFeed; 