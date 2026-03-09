# Complete Amazon-Inspired E-Commerce Platform

A modern, fully-featured e-commerce frontend built with Next.js 16, TypeScript, TailwindCSS, and ShadCN UI components. This platform replicates Amazon's core user experience patterns with production-ready architecture.

## Project Structure

```
/app
  ├── layout.tsx                 # Root layout with navbar and footer
  ├── page.tsx                   # Home page with hero, carousels, flash sales
  ├── cart/page.tsx              # Shopping cart with quantity controls
  ├── checkout/page.tsx          # Multi-step checkout (4 steps)
  ├── products/page.tsx          # Product listing with filters and sorting
  ├── product/[id]/page.tsx      # Product detail page
  ├── category/[slug]/page.tsx   # Category browsing page
  ├── search/page.tsx            # Search results with filters
  ├── wishlist/page.tsx          # Saved items page
  ├── account/page.tsx           # User profile dashboard
  ├── account/orders/page.tsx    # Order history
  ├── account/addresses/page.tsx # Saved addresses
  └── account/payments/page.tsx  # Payment methods

/components
  ├── navbar.tsx                 # Top navigation with search, categories
  ├── category-mega-menu.tsx     # Expandable mega menu with subcategories
  ├── footer.tsx                 # Multi-section footer
  ├── product-card.tsx           # Reusable product card (grid/list view)
  ├── product-carousel.tsx       # Horizontal scrolling product sliders
  ├── image-gallery.tsx          # Product image gallery with zoom
  ├── rating-stars.tsx           # Star rating component
  ├── filter-sidebar.tsx         # Advanced filter panel
  ├── review-card.tsx            # Individual review display
  ├── reviews-section.tsx        # Complete reviews section with ratings
  ├── frequently-bought-together.tsx  # Product bundle suggestions
  ├── flash-sale-banner.tsx      # Limited-time deals with countdown
  ├── checkout-stepper.tsx       # Multi-step checkout progress
  ├── order-summary.tsx          # Cart/order summary sidebar
  ├── cart-item.tsx              # Cart item with controls
  └── /ui                        # ShadCN UI components

/lib
  ├── types.ts                   # TypeScript interfaces
  ├── products-data.ts           # Product catalog and categories
  ├── utils.ts                   # Utility functions
  ├── constants.ts               # App constants
  └── /store
      ├── cart-store.ts          # Cart state management (Zustand)
      ├── wishlist-store.ts      # Wishlist state management
      ├── product-store.ts       # Products and filters state
      └── user-store.ts          # User profile state

/public
  └── images/                    # Product images and assets
```

## Key Features

### Navigation & Discovery
- **Top Navigation Bar**: Logo, search with autocomplete, account menu, cart counter, language/location selectors
- **Mega Menu**: Expandable category menu with subcategories (Electronics, Fashion, Home & Garden, Sports, Books)
- **Secondary Navigation**: Quick links to deals, best sellers, new releases
- **Breadcrumb Navigation**: Easy path tracking on detail pages

### Home Page
- Hero banner with promotional messaging
- Trust signals (Fast shipping, Secure shopping, Easy returns)
- Multiple product carousels:
  - Best Sellers
  - Limited-time deals
  - New arrivals
  - Personalized recommendations
- Flash sale banner with countdown timer
- Category cards with hover effects

### Product Discovery
- **Listing Page** (`/products`):
  - Advanced filtering (price range, brands, ratings, discounts)
  - Multiple sort options (popularity, price, rating, newest)
  - Grid/list view toggle
  - Pagination
  - Real-time filter updates

- **Search** (`/search?q=query`):
  - Full-text search across products
  - Relevance-based sorting
  - All listing filters apply
  - Suggested searches and trending searches

- **Category Pages** (`/category/[slug]`):
  - Filtered products by category
  - Subcategory navigation
  - Same filtering and sorting options

### Product Details Page
- **Image Gallery**: 
  - Main image with zoom functionality
  - Thumbnail carousel
  - Multiple angle views
  
- **Product Information**:
  - Title, rating, and review count
  - Price with discount percentage
  - Availability status
  - Product description and features
  - Detailed specifications table
  
- **Purchase Options**:
  - Quantity selector
  - Add to cart button
  - Buy now option
  - Add to wishlist button
  - Delivery estimate
  
- **Customer Reviews**:
  - Rating breakdown visualization
  - Sortable review list
  - Review helpfulness voting
  - Write review button
  
- **Related Products**:
  - Frequently bought together bundle
  - Related products carousel

### Shopping Cart
- Item list with product images
- Quantity adjustment controls
- Individual item removal
- Save for later option
- Real-time cart total calculation
- Subtotal, shipping, and tax breakdown
- Persistent cart state
- Continue shopping button

### Checkout Flow (4 Steps)
1. **Shipping Address**
   - Full name, email, address fields
   - Country selection
   - Multiple address save/edit

2. **Delivery Method**
   - Standard shipping (free over $35)
   - Express shipping
   - Delivery estimate display

3. **Payment Method**
   - Credit card entry
   - Saved payment methods
   - Billing address option
   - Secure payment badge

4. **Order Review**
   - Complete order summary
   - All details confirmation
   - Place order button
   - Order tracking info

Features:
- Progress stepper showing current step
- Order summary sidebar (sticky)
- Back/continue navigation
- Promo code input
- Trust signals (encrypted, 30-day returns)

### User Account Dashboard
- **Profile Information**
  - User details and preferences
  - Account settings

- **Order History** (`/account/orders`)
  - Past orders with status
  - Order tracking
  - Reorder functionality
  - Return/refund options

- **Wishlist** (`/account/wishlist`)
  - Saved items
  - Quick add to cart
  - Share wishlist
  - Remove items

- **Saved Addresses** (`/account/addresses`)
  - Multiple address management
  - Set default address
  - Edit/delete addresses

- **Payment Methods** (`/account/payments`)
  - Saved credit cards
  - Add new payment method
  - Set default payment
  - Remove payment method

### Reviews System
- **Rating Breakdown**:
  - Visual bar chart of distribution
  - Click to filter by rating
  - Review count per rating level

- **Review Display**:
  - Author name and date
  - Verified purchase badge
  - Helpful/unhelpful voting
  - Review images/media
  - Sort by helpful, recent, or rating

- **Write Review**:
  - Star rating selector
  - Title and text fields
  - Image upload
  - Submit and moderation

## State Management (Zustand)

### Cart Store (`/lib/store/cart-store.ts`)
```typescript
- items: CartItem[]
- addToCart(productId, quantity)
- removeFromCart(productId)
- updateQuantity(productId, quantity)
- getCartTotal()
- getItemCount()
- clearCart()
```

### Wishlist Store (`/lib/store/wishlist-store.ts`)
```typescript
- items: string[] (product IDs)
- toggleWishlist(productId)
- isInWishlist(productId)
- clearWishlist()
```

### User Store (`/lib/store/user-store.ts`)
```typescript
- user: User | null
- setUser(user)
- addAddress(address)
- addPayment(payment)
- logout()
```

### Product Store (`/lib/store/product-store.ts`)
```typescript
- products: Product[]
- filters: FilterOptions
- setFilters(filters)
- sortBy(option)
- searchProducts(query)
```

## Component Library

### Reusable Components
All components are production-ready with:
- Full TypeScript typing
- Responsive design (mobile-first)
- Accessibility features (ARIA labels, semantic HTML)
- Smooth animations and transitions
- Loading states and skeletons

### UI Components (from ShadCN)
- Button, Input, Select, Checkbox
- Dialog, Sheet, Popover, Dropdown Menu
- Tabs, Accordion, Breadcrumb
- Card, Badge, Spinner
- Slider, Pagination
- Table, Form components

## Styling & Design

### Color Palette
- **Primary Orange**: `#FF9900` (call-to-action, highlights)
- **Dark Blue**: `#131921` (navbar background)
- **Secondary Blue**: `#232F3E` (secondary nav)
- **Neutrals**: White, light gray, dark gray, black
- **Accent Green**: Success states
- **Accent Red**: Discount/urgent states

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Clean, readable sans-serif
- **Emphasis**: Orange for interactive elements

### Spacing & Layout
- Flexbox for most layouts
- CSS Grid for complex 2D layouts
- Consistent spacing scale
- Mobile-first responsive design

### Effects & Interactions
- Soft shadows on cards
- Smooth hover transitions
- Skeleton loaders for async content
- Toast notifications for actions
- Smooth scroll behavior
- Icon consistency

## Performance Optimizations

- **Next.js Image**: Optimized product images with lazy loading
- **Code Splitting**: Route-based automatic splitting
- **Skeleton Screens**: Loading placeholders during data fetch
- **Zustand**: Efficient state updates with minimal re-renders
- **Memoization**: Expensive component memoization
- **CSS Optimization**: TailwindCSS purging unused styles

## Product Data Structure

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  badge?: 'best-seller' | 'new' | 'deal';
}
```

## Search Functionality

- **Full-text Search**: Across product name, description, category
- **Autocomplete**: Real-time suggestions as you type
- **Trending Searches**: Popular search terms
- **Search Filters**: All filters apply to search results
- **Relevance Ranking**: Results sorted by relevance, then popularity

## Mobile Responsiveness

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Mobile hamburger menu with drawer
- **Grid Layout**: Responsive column counts (1 on mobile, 2 tablets, 3-4 desktop)
- **Touch Targets**: 44px minimum for buttons/interactive elements
- **Image Optimization**: Different sizes for different devices
- **Readable Text**: 16px minimum font size on mobile

## Accessibility Features

- Semantic HTML structure
- ARIA labels on icons and buttons
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader optimized
- Skip navigation links

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Install dependencies: `npm install` or `pnpm install`
2. Run development server: `npm run dev`
3. Open `http://localhost:3000` in browser
4. Explore the platform using dummy data

## Demo Data

The platform includes 50+ dummy products across 5 categories:
- Electronics (phones, laptops, tablets)
- Fashion (men, women, kids, shoes)
- Home & Garden (furniture, decor, kitchen, bedding)
- Sports & Outdoors (fitness, outdoor, equipment)
- Books (fiction, non-fiction, educational)

Each product includes:
- High-quality images from Unsplash
- Realistic pricing and discounts
- Star ratings and review counts
- Detailed specifications
- Product descriptions

## API Integration Ready

The components are structured to easily integrate with a backend API:
- Replace dummy data with API calls
- Update Zustand stores with server data
- Add authentication with NextAuth or Auth0
- Implement real payment processing
- Add email notifications
- Setup order tracking

## Future Enhancements

- User authentication & registration
- Real payment processing (Stripe)
- Order tracking with status updates
- Email notifications
- Admin dashboard for inventory
- Analytics and reporting
- Live chat support
- Product recommendations AI
- Wishlist sharing
- Gift cards
- Subscription products
- Dark mode toggle

## License

This project is open source and available for educational purposes.
