// Mock API Service for AI Travel Planner
import type { Itinerary } from "@/store/use-itinerary-store"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const apiService = {
  async generateItinerary(params: {
    destination: string
    startDate: string
    endDate: string
    preferences: any
  }): Promise<Itinerary> {
    await sleep(2000) // Mock AI thinking time

    const days = []
    const start = new Date(params.startDate)
    const end = new Date(params.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    for (let i = 0; i < diffDays; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)

      days.push({
        date: date.toISOString().split("T")[0],
        events: [
          {
            id: Math.random().toString(36).substr(2, 9),
            title: `Morning Exploration in ${params.destination}`,
            description: "Visit the most iconic landmarks and soak in the local atmosphere.",
            time: "09:00 AM",
            duration: "3h",
            location: { lat: 48.8566, lng: 2.3522, address: "Main Square, City Center" },
            type: "activity" as const,
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            title: "Local Culinary Experience",
            description: "Enjoy a traditional meal at a highly-rated local bistro.",
            time: "12:30 PM",
            duration: "1.5h",
            location: { lat: 48.8584, lng: 2.2945, address: "Gourmet Street" },
            type: "food" as const,
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            title: "Afternoon Adventure",
            description: "A hidden gem recommended by our AI based on your interests.",
            time: "02:30 PM",
            duration: "4h",
            location: { lat: 48.8606, lng: 2.3376, address: "Art District" },
            type: "activity" as const,
          },
        ],
      })
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      destination: params.destination,
      startDate: params.startDate,
      endDate: params.endDate,
      days,
    }
  },

  async searchDestinations(query: string) {
    await sleep(500)
    const mockDestinations = [
      { id: "1", name: "Paris, France", image: "/paris-cityscape.png" },
      { id: "2", name: "Tokyo, Japan", image: "/vibrant-tokyo-street.png" },
      { id: "3", name: "Bali, Indonesia", image: "/bali-beach-sunset.png" },
      { id: "4", name: "Rome, Italy", image: "/rome-cityscape.png" },
    ]
    return mockDestinations.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
  },
}
