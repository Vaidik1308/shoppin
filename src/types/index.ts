export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
}

export interface SwipeDirection {
  x: number;
  y: number;
}

export interface CardProps {
  product: Product;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
} 