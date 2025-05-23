export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  discountPercentage?: number;
  originalPrice?: number;
}

export const products: Product[] = [
  {
    "id": 1,
    "name": "floral print v-neck top",
    "brand": "shaye",
    "price": 2986,
    "originalPrice": 4977,
    "discountPercentage": 40,
    "image": "https://assets.ajio.com/medias/sys_master/root/20240209/UUe4/65c6542805ac7d77bb4c05c5/-473Wx593H-467057476-peach-MODEL.jpg",
    "description": "High-quality wireless headphones with noise cancellation",
    "category": "Electronics"
  },
  {
    "id": 2,
    "name": "morgan blouse",
    "brand": "kazo",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://cdn.shopify.com/s/files/1/0261/2386/2082/files/KZ01319YELLOWMULTI.jpg?v=1743161024",
    "description": "Track your fitness goals with this advanced smartwatch",
    "category": "Electronics"
  },
  {
    "id": 3,
    "name": "white typographic printed regular tshirt",
    "brand": "newme",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://assets.newme.asia/wp-content/uploads/2025/03/041354491383b268/NM-IN-56-TSH-25-FEB-12787-WHITE_(1).webp",
    "description": "Capture stunning photos with this professional-grade camera",
    "category": "Electronics"
  },
  {
    "id": 4,
    "name": "women's grey cotton regular fit blouse",
    "brand": "cotton world",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://cdn.shopify.com/s/files/1/0261/2386/2082/files/KZ01319YELLOWMULTI.jpg?v=1743161024",
    "description": "Stylish and durable backpack for everyday use",
    "category": "Fashion"
  },
  {
    "id": 5,
    "name": "notch neck floral top",
    "brand": "us polo",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://cdn.shopify.com/s/files/1/0617/2137/8986/files/1_3af581ca-5668-4c02-8237-7942cc9a9cd3.jpg?v=1713339496",
    "description": "True wireless earbuds with premium sound quality",
    "category": "Electronics"
  },
  {
    "id": 6,
    "name": "spread collar chambray denim shirt",
    "brand": "us polo",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://cdn.shopify.com/s/files/1/0617/2137/8986/files/1_f5b86591-68dd-4cae-b315-66d67d262c87.jpg?v=1713339497",
    "description": "Voice-controlled speaker with premium sound",
    "category": "Electronics"
  },
  {
    "id": 7,
    "name": "cloudy grey women's denim jacket",
    "brand": "freakins",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://cdn.shopify.com/s/files/1/0028/9806/7554/files/MadhuraJUry8167_03d9208c-eb7d-4952-98cf-25c972fcfe21.jpg?v=1732535428",
    "description": "High-precision gaming mouse with RGB lighting",
    "category": "Electronics"
  },
  {
    "id": 8,
    "name": "fiorella top ♡",
    "brand": "girls dont dress for boys",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://cdn.shopify.com/s/files/1/0796/2391/3771/files/A992E251-0BFC-4426-B131-FF84B9CF4BBC.jpg?v=1729621042",
    "description": "Premium mechanical keyboard with customizable keys",
    "category": "Electronics"
  },
  {
    "id": 9,
    "name": "lapel collar drop shoulder cropped denim shirt",
    "brand": "chemistry india",
    "price": 4500,
    "originalPrice": 6000,
    "discountPercentage": 25,
    "image": "https://cdn.shopify.com/s/files/1/0605/1509/0592/files/CJ24AW005_2.jpg?v=1743502223",
    "description": "Fast wireless charging pad for all devices",
    "category": "Electronics"
  },
  {
    "id": 10,
    "name": "black floral crop top",
    "brand": "Casuals Inc.",
    "price": 3200,
    "originalPrice": 3200,
    "discountPercentage": 0,
    "image": "https://cdn.shopify.com/s/files/1/0539/7633/4528/products/image_36eb65a4-83bd-4a12-8fac-7d8189f0d564.jpg?v=1621949284",
    "description": "4K Smart TV with built-in streaming apps",
    "category": "Electronics"
  }
]; 