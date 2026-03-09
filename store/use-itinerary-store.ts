import { create } from "zustand"

export interface ItineraryEvent {
  id: string
  title: string
  description: string
  time: string
  duration: string
  location: { lat: number; lng: number; address: string }
  type: "activity" | "food" | "transport" | "hotel"
}

export interface DayPlan {
  date: string
  events: ItineraryEvent[]
}

export interface Itinerary {
  id: string
  destination: string
  startDate: string
  endDate: string
  days: DayPlan[]
}

interface ItineraryState {
  currentItinerary: Itinerary | null
  savedItineraries: Itinerary[]
  setItinerary: (itinerary: Itinerary) => void
  saveItinerary: (itinerary: Itinerary) => void
  deleteItinerary: (id: string) => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  currentItinerary: null,
  savedItineraries: [],
  setItinerary: (itinerary) => set({ currentItinerary: itinerary }),
  saveItinerary: (itinerary) =>
    set((state) => ({
      savedItineraries: [...state.savedItineraries, itinerary],
    })),
  deleteItinerary: (id) =>
    set((state) => ({
      savedItineraries: state.savedItineraries.filter((i) => i.id !== id),
    })),
}))
