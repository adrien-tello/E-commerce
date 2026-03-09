import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Budget = "budget" | "moderate" | "luxury"
export type Pace = "relaxed" | "moderate" | "fast"

interface Preferences {
  budget: Budget
  pace: Pace
  interests: string[]
  dietaryNeeds: string[]
  accessibility: string[]
}

interface PreferencesState {
  preferences: Preferences
  setPreferences: (prefs: Partial<Preferences>) => void
  resetPreferences: () => void
}

const initialPreferences: Preferences = {
  budget: "moderate",
  pace: "moderate",
  interests: [],
  dietaryNeeds: [],
  accessibility: [],
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      setPreferences: (prefs) => set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
      resetPreferences: () => set({ preferences: initialPreferences }),
    }),
    { name: "preferences-storage" },
  ),
)
