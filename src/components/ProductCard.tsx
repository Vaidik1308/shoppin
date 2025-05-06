import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../data/products';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
// import { FaRegHeart } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  // isActive: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSwipe }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showFullName, setShowFullName] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const getSwipeIndicator = () => {
    const threshold = 30;
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
    lastPosition.current = { x: 0, y: 0 };
    lastTime.current = Date.now();
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - startPos.x;
    const newY = clientY - startPos.y;
    
    const currentTime = Date.now(); //get current time
    const deltaTime = currentTime - lastTime.current; //calculate deltaTime
    
    if (deltaTime > 0) {
      const deltaX = newX - lastPosition.current.x; //calculate deltaX
      const deltaY = newY - lastPosition.current.y; //calculate deltaY
      
      setVelocity({
        x: deltaX / deltaTime, //calculate velocity in x direction
        y: deltaY / deltaTime //calculate velocity in y direction
      });
    }
    
    lastPosition.current = { x: newX, y: newY }; //update last position
    lastTime.current = currentTime; //update last time
    
    setPosition({
      x: newX, //update position
      y: newY //update position
    });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50; //threshold for swipe
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y); //calculate speed     
    const animationDuration = Math.max(0.2, Math.min(0.5, 1 / (speed * 10))); // Clamp between 0.2s and 0.5s
    // console.log(animationDuration);

    if (Math.abs(position.x) > threshold) {
      const direction = position.x > 0 ? 'right' : 'left'; //calculate direction
      setPosition({ x: position.x > 0 ? 800 : -800, y: 0 }); //set position
      setTimeout(() => onSwipe(direction), animationDuration * 1000); //set timeout
    } else if (position.y < -threshold) {
      setPosition({ x: 0, y: -800 }); //set position  
      setTimeout(() => onSwipe('up'), animationDuration * 1000); //set timeout
    } else {
      setPosition({ x: 0, y: 0 }); //set position
    }
  };

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullName(!showFullName);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove); //add event listeners for mouse events
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: true }); //add event listeners for touch events
      //passive: true - indicates that the event listener will not prevent the default action
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      //remove event listeners when component unmounts
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, position, startPos]);

  const rotate = position.x * 0.1;
  const transform = `translate(${position.x}px, ${position.y}px) rotateX(${rotate}deg)`;
  const swipeIndicator = getSwipeIndicator();

  return (
    <>
      {swipeIndicator && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{  scale: 0.8 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 10,
            duration: 0.8
          }}
          className={`fixed  ${swipeIndicator === 'Like' ? "top-[2%] left-2" : swipeIndicator === 'Dislike' ? " top-[2%] right-0" : swipeIndicator === 'Save' ? "bottom-0 right-0 left-0" : "right-0"} transform z-[99]`}
        >
          <div className="flex justify-center items-center gap-2">
            {swipeIndicator === 'Like' && (
              <>
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -550, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.3
                  }}
                  className="flex flex-col items-center justify-center font-sans font-bold bg-green-500 text-white text-lg rounded-full p-3 shadow-lg size-20"
                >
                <ThumbsUpIcon className='size-10'/>
                </motion.div>
              </>
            )}
            {swipeIndicator === 'Dislike' && (
              <>
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -50, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.3
                  }}
                  className="flex flex-col items-center justify-center font-sans font-bold bg-red-500 text-white text-lg rounded-full p-3 shadow-lg size-20"
                >
                  <ThumbsDownIcon className='size-10'/>
                </motion.div>
              </>
            )}
            {swipeIndicator === 'Save' && (
              <>
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -50, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.3
                  }}
                  className="flex flex-col items-center justify-center font-sans font-bold bg-blue-500 text-white text-lg rounded-full p-3 shadow-lg size-20"
                >
                  <ShoppingCartIcon className='size-10'/>
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
          transition: isDragging ? 'none' : `transform ${Math.max(0.2, Math.min(0.5, 1 / (Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y) * 10)))}s ease-out`
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