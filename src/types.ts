export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
  colors: Color[];
  featured?: boolean;
  isNew?: boolean;
  inStock: boolean;
  materials?: string;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: Color;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}
