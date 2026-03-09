import { create } from 'zustand';
import { User, UserPreferences } from '../types';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  currency: 'USD',
  language: 'en',
  notifications: true,
  darkMode: false
};

const defaultUser: User = {
  id: 'user-1',
  email: 'user@example.com',
  name: 'John Doe',
  addresses: [],
  paymentMethods: [],
  preferences: defaultPreferences
};

export const useUserStore = create<UserState>((set) => ({
  user: defaultUser,
  isLoggedIn: true,
  
  setUser: (user: User) => {
    set({ user, isLoggedIn: true });
  },
  
  logout: () => {
    set({ user: null, isLoggedIn: false });
  },
  
  updatePreferences: (preferences: Partial<UserPreferences>) => {
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...preferences }
        }
      };
    });
  }
}));
