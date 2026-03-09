import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  user: { id: string; email: string; name: string } | null
  isAuthenticated: boolean
  login: (userData: { id: string; email: string; name: string }) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "user-storage" },
  ),
)
