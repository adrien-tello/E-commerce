import { create } from 'zustand';

interface WishlistState {
  items: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  
  addToWishlist: (productId: string) => {
    set((state) => ({
      items: state.items.includes(productId) ? state.items : [...state.items, productId]
    }));
  },
  
  removeFromWishlist: (productId: string) => {
    set((state) => ({
      items: state.items.filter(id => id !== productId)
    }));
  },
  
  toggleWishlist: (productId: string) => {
    if (get().isInWishlist(productId)) {
      get().removeFromWishlist(productId);
    } else {
      get().addToWishlist(productId);
    }
  },
  
  isInWishlist: (productId: string) => {
    return get().items.includes(productId);
  }
}));
