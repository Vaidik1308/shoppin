import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../data/products';
import { motion } from 'framer-motion';
// import { FaRegHeart } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isActive: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSwipe, isActive }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showFullName, setShowFullName] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const getSwipeIndicator = () => {
    const threshold = 80;
    if (Math.abs(position.x) > threshold) {
      return position.x > 0 ? 'Like' : 'Dislike';
    } else if (position.y < -threshold) {
      return 'Save';
    }
    return null;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      const touch = e.touches[0];
      setStartPos({ x: touch.clientX, y: touch.clientY });
    } else {
      e.preventDefault();
      setStartPos({ x: e.clientX, y: e.clientY });
    }
    setIsDragging(true);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - startPos.x;
    const newY = clientY - startPos.y;
    
    setPosition({
      x: newX,
      y: newY
    });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 80;
    if (Math.abs(position.x) > threshold) {
      const direction = position.x > 0 ? 'right' : 'left';
      setPosition({ x: position.x > 0 ? 800 : -800, y: 0 });
      setTimeout(() => onSwipe(direction), 500);
    } else if (position.y < -threshold) {
      setPosition({ x: 0, y: -800 });
      setTimeout(() => onSwipe('up'), 500);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullName(!showFullName);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: true });
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, position, startPos]);

  const rotate = position.x * 0.08;
  const transform = `translate(${position.x}px, ${position.y}px) rotate(${rotate}deg)`;
  const swipeIndicator = getSwipeIndicator();

  return (
    <>
      {swipeIndicator && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-[-0%] left-0 right-0 transform z-50"
        >
          <div className="flex justify-center items-center gap-2">
            {swipeIndicator === 'Like' && (
              <>
                <motion.div
                  initial={{ y: 80, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -80, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-green-500 text-white rounded-full p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ y: 120, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -120, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-green-500 text-white rounded-full p-3 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ y: 80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -400, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-green-500 text-white rounded-full p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </>
            )}
            {swipeIndicator === 'Dislike' && (
              <>
                <motion.div
                  initial={{ y: 80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -80, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-red-500 text-white rounded-full p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ y: 120, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -120, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-red-500 text-white rounded-full p-3 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ y: 80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -80, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-red-500 text-white rounded-full p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </>
            )}
            {swipeIndicator === 'Save' && (
              <>
                <motion.div
                  initial={{ y: 80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -80, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-blue-500 text-white rounded-full p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ y: 120, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -120, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-blue-500 text-white rounded-full p-3 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ y: 80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -80, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 16,
                    duration: 0.8
                  }}
                  className="bg-blue-500 text-white rounded-full p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                  </svg>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
      <div
        ref={cardRef}
        className=" relative w-full h-full border-1 border-gray-200 rounded-xl shadow-lg overflow-hidden"
        style={{
          transform,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
          transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="relative h-full flex flex-col">
          <div className="relative flex-grow h-[90%]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {(product.discountPercentage && product.discountPercentage > 0) && <div className="text-sm font-medium bg-green-500 text-white shadow-lg size-10 rounded-full flex items-center justify-center absolute top-4 left-4">
              {product.discountPercentage}% 
            </div>}
          </div>
          <div className="p-2.5 bg-white h-[12%]">
            <div className="flex justify-between items-start w-full">
              <div className="relative">
                <h3 
                  ref={nameRef}
                  className="text-lg font-semibold text-gray-900 truncate max-w-[200px] cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleNameClick}
                  title={product.name}
                >
                  {product.name}
                </h3>
                {showFullName && (
                  <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-normal max-w-[250px] z-10">
                    {product.name}
                    <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                  </div>
                )}
                <p className="text-sm text-gray-600">{product.brand}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                {(product.price === product.originalPrice) ? (
                  <></>
                ) : (
                  <div className="flex items-end gap-0.5 flex-col">
                    <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard; 