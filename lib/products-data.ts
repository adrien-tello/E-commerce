import { Product, Category } from './types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    subcategories: ['Phones', 'Laptops', 'Tablets', 'Accessories']
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop',
    subcategories: ['Men', 'Women', 'Kids', 'Shoes']
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding']
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop',
    subcategories: ['Fitness', 'Outdoor Gear', 'Sports Equipment']
  },
  {
    id: '5',
    name: 'Books',
    slug: 'books',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=300&fit=crop',
    subcategories: ['Fiction', 'Non-Fiction', 'Educational']
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    category: 'electronics',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 2543,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
    specifications: {
      'Battery Life': '30 hours',
      'Noise Cancellation': 'Active ANC',
      'Connectivity': 'Bluetooth 5.0',
      'Driver Size': '40mm'
    },
    inStock: true,
    stockCount: 45,
    badge: 'best-seller',
    reviews: [
      {
        id: '1',
        author: 'John D.',
        rating: 5,
        title: 'Excellent sound quality',
        content: 'These headphones are amazing! The noise cancellation is top-notch.',
        date: '2024-01-15',
        verified: true,
        helpful: 234
      }
    ]
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    category: 'electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviewCount: 1821,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
    ],
    description: 'Advanced smartwatch with health tracking, fitness modes, and 7-day battery life.',
    specifications: {
      'Display': 'AMOLED 1.4"',
      'Battery': '7 days',
      'Water Resistance': '5ATM',
      'Compatibility': 'iOS & Android'
    },
    inStock: true,
    stockCount: 32,
    badge: 'new',
    reviews: []
  },
  {
    id: '3',
    name: 'Ultra-Slim Laptop 14"',
    category: 'electronics',
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop'
    ],
    description: 'Lightweight laptop with Intel i7, 16GB RAM, 512GB SSD, and stunning display.',
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB DDR4',
      'Storage': '512GB SSD',
      'Weight': '1.2kg'
    },
    inStock: true,
    stockCount: 18,
    badge: 'deal',
    reviews: []
  },
  {
    id: '4',
    name: 'Classic Cotton T-Shirt',
    category: 'fashion',
    price: 24.99,
    rating: 4.4,
    reviewCount: 5234,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
    ],
    description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
    specifications: {
      'Material': '100% Cotton',
      'Sizes': 'XS - XXL',
      'Care': 'Machine wash'
    },
    inStock: true,
    stockCount: 120,
    badge: 'best-seller',
    reviews: []
  },
  {
    id: '5',
    name: 'Premium Denim Jeans',
    category: 'fashion',
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviewCount: 2156,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'
    ],
    description: 'Stylish premium denim jeans with perfect fit and durability.',
    specifications: {
      'Material': '98% Cotton, 2% Elastane',
      'Fit': 'Slim Fit',
      'Sizes': '28 - 42'
    },
    inStock: true,
    stockCount: 87,
    reviews: []
  },
  {
    id: '6',
    name: 'Modern Desk Lamp',
    category: 'home-garden',
    price: 49.99,
    rating: 4.5,
    reviewCount: 1243,
    image: 'https://images.unsplash.com/photo-1565636192335-14462d25d4d0?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565636192335-14462d25d4d0?w=500&h=500&fit=crop'
    ],
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    specifications: {
      'Power': '12W LED',
      'Features': 'USB charging, Touch control',
      'Material': 'Metal and Plastic'
    },
    inStock: true,
    stockCount: 54,
    reviews: []
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    category: 'sports-outdoors',
    price: 34.99,
    rating: 4.7,
    reviewCount: 3421,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop'
    ],
    description: 'Non-slip yoga mat with carrying strap, perfect for all yoga styles.',
    specifications: {
      'Material': 'TPE',
      'Thickness': '6mm',
      'Length': '183cm',
      'Color Options': '5'
    },
    inStock: true,
    stockCount: 76,
    badge: 'best-seller',
    reviews: []
  },
  {
    id: '8',
    name: 'The Midnight Library',
    category: 'books',
    price: 16.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviewCount: 8934,
    image: 'https://images.unsplash.com/photo-1507842217343-583f7270f69d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507842217343-583f7270f69d?w=500&h=500&fit=crop'
    ],
    description: 'Bestselling novel exploring life choices and possibilities.',
    specifications: {
      'Author': 'Matt Haig',
      'Pages': '304',
      'Format': 'Hardcover',
      'Language': 'English'
    },
    inStock: true,
    stockCount: 156,
    badge: 'best-seller',
    reviews: []
  }
];
