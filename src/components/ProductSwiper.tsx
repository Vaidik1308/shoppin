import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';

const ProductSwiper: React.FC = () => {
  const {
    currentIndex,
    likedProducts,
    passedProducts,
    cartProducts,
    setCurrentIndex,
    addLikedProduct,
    addPassedProduct,
    addCartProduct
  } = useApp();

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    const currentProduct = products[currentIndex];
    
    switch (direction) {
      case 'right':
        addLikedProduct(currentProduct);
        console.log(`Liked Product ID: ${currentProduct.id}`);
        break;
      case 'left':
        addPassedProduct(currentProduct);
        console.log(`Passed Product ID: ${currentProduct.id}`);
        break;
      case 'up':
        addCartProduct(currentProduct);
        console.log(`Added to cart Product ID: ${currentProduct.id}`);
        break;
    }
    
    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= products.length) {
    return (
      <div className="min-h-fit bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
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
      </div>
    );
  }

  // Get the next 3 products to show in the stack
  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  return (
    <div className="min-h-screen bg-gray-100 overflow-y-auto">
      {/* <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Product Discovery</h1>
        </div>
      </header> */}
      <div className="max-w-4xl mx-auto py-8 p-4">
        <div className="relative w-full max-w-sm mx-auto h-[80vh]">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className="absolute w-full h-full"
              style={{
                zIndex: 3 - index,
                transform: `scale(${1 - index * 0.05})`,
                top: `${index * 10}px`
              }}
            >
              <ProductCard
                product={product}
                onSwipe={index === 0 ? handleSwipe : () => {}}
                isActive={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSwiper; 