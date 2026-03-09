# Amazon-Inspired E-Commerce Platform

A fully functional e-commerce web application built with Next.js, React, and Tailwind CSS. This platform features a modern shopping experience with product browsing, filtering, cart management, and a multi-step checkout flow.

## Features

### Core Shopping Experience
- **Product Catalog**: Browse thousands of products across multiple categories
- **Advanced Filtering**: Sort by price, rating, and search by keywords
- **Product Details**: Comprehensive product pages with images, specs, and reviews
- **Shopping Cart**: Add/remove items, adjust quantities, see real-time totals
- **Wishlist**: Save favorite products for later purchase

### User Experience
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Navigation**: Intuitive navbar with search, category menu, and account access
- **Search Functionality**: Full-text search across product names and descriptions
- **Product Carousels**: Horizontal scrollable sections for best sellers, deals, and recommendations

### Checkout & Payments
- **Multi-Step Checkout**: Organized flow with shipping, payment, and review steps
- **Shipping Options**: Standard (5-7 days) and Express (2-3 days) delivery
- **Order Summary**: Real-time calculation of subtotal, tax, and shipping
- **Free Shipping**: Automatic free shipping on orders over $35

### User Accounts
- **Profile Management**: View and edit account information
- **Address Book**: Save multiple shipping addresses
- **Payment Methods**: Store and manage payment cards
- **Order History**: Track past purchases (scaffolded for future orders)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui components with Radix UI
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with navbar/footer
│   ├── page.tsx                 # Home page with hero and carousels
│   ├── product/[id]/page.tsx    # Product detail page
│   ├── category/[slug]/page.tsx # Category listing with filters
│   ├── cart/page.tsx            # Shopping cart
│   ├── checkout/page.tsx        # Multi-step checkout
│   ├── wishlist/page.tsx        # Wishlist page
│   ├── account/page.tsx         # User account dashboard
│   ├── search/page.tsx          # Search results page
│   └── globals.css              # Global styles and design tokens
├── components/                   # React components
│   ├── navbar.tsx               # Navigation header with search
│   ├── footer.tsx               # Footer with links
│   ├── product-card.tsx         # Product card component
│   └── product-carousel.tsx     # Horizontal product carousel
├── lib/                          # Utilities and data
│   ├── types.ts                 # TypeScript interfaces
│   ├── products-data.ts         # Sample product and category data
│   ├── utils.ts                 # Utility functions
│   └── store/                   # Zustand stores
│       ├── cart-store.ts        # Shopping cart state
│       ├── wishlist-store.ts    # Wishlist state
│       └── user-store.ts        # User profile state
├── public/                       # Static assets
└── package.json                 # Dependencies
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Data Structure

### Products
Each product includes:
- Basic info (ID, name, category, price)
- Images and descriptions
- Specifications and ratings
- Reviews from customers
- Stock availability and badges (best-seller, new, deal)

### Categories
- Electronics, Fashion, Home & Garden, Sports & Outdoors, Books
- Each with subcategories and category images

### Shopping Cart
- Product ID and quantity
- Real-time price tracking
- Automatic total calculation

## State Management (Zustand)

### Cart Store (`useCartStore`)
- `addToCart(productId, quantity)`: Add items to cart
- `removeFromCart(productId)`: Remove specific item
- `updateQuantity(productId, quantity)`: Change item quantity
- `getCartTotal()`: Calculate total price
- `getItemCount()`: Count total items

### Wishlist Store (`useWishlistStore`)
- `addToWishlist(productId)`: Save item
- `removeFromWishlist(productId)`: Remove saved item
- `toggleWishlist(productId)`: Toggle wish status
- `isInWishlist(productId)`: Check if item is saved

### User Store (`useUserStore`)
- User profile information
- Addresses and payment methods
- User preferences (currency, language, theme)

## Key Features Implementation

### Product Carousel
Auto-scrolling carousel with left/right navigation buttons, responsive to content width.

### Multi-Step Checkout
1. **Shipping Step**: Address form with shipping method selection
2. **Payment Step**: Credit card information entry
3. **Review Step**: Final order confirmation before placement

### Advanced Filtering
- Price range slider
- Star rating filter
- Sort options (relevance, price, rating)

### Search Functionality
- Full-text search across product names and descriptions
- Real-time result filtering
- Direct integration with navbar

## Responsive Design

- **Mobile**: Single column layouts, hamburger menu, touch-optimized buttons
- **Tablet**: Two column grids, optimized spacing
- **Desktop**: Three to four column grids, full navigation menu

## Color Scheme

- **Primary**: Orange (#FF9900) - Action buttons and highlights
- **Secondary**: Dark Blue (#131921) - Header and footers
- **Accent**: White and Grays - Content areas and text

## Future Enhancements

- User authentication and login
- Backend API integration
- Real payment processing (Stripe/PayPal)
- Order confirmation emails
- Product reviews submission
- Save user preferences
- Inventory management
- Admin dashboard
- Analytics and reporting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For questions or issues, please open a GitHub issue or contact support.
