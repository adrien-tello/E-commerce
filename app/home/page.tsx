"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/use-user-store"
import { useItineraryStore } from "@/store/use-itinerary-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Calendar, Compass, Clock, Plus } from "lucide-react"
import Image from "next/image"

const featuredDestinations = [
  { id: "1", name: "Paris, France", image: "/paris-cityscape.png", color: "bg-blue-500" },
  { id: "2", name: "Tokyo, Japan", image: "/vibrant-tokyo-street.png", color: "bg-red-500" },
  { id: "3", name: "Bali, Indonesia", image: "/bali-beach-sunset.png", color: "bg-teal-500" },
  { id: "4", name: "Rome, Italy", image: "/rome-cityscape.png", color: "bg-orange-500" },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useUserStore()
  const { savedItineraries } = useItineraryStore()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary/5 pt-12 pb-24 px-6 rounded-b-[3rem]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Hi, {user?.name || "Traveler"}!</h1>
              <p className="text-muted-foreground">Where should we go next?</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/20 border-2 border-primary/20 overflow-hidden">
              <Image src="/diverse-user-avatars.png" alt="Profile" width={48} height={48} />
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 pr-4 rounded-2xl border-none shadow-xl shadow-primary/5 focus-visible:ring-primary/20 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto -mt-12 px-6 space-y-10">
        {/* Recent Trips */}
        {savedItineraries.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Your Trips</h2>
              <Button variant="ghost" className="text-primary font-semibold">
                See All
              </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {savedItineraries.map((trip) => (
                <Card key={trip.id} className="min-w-[280px] shrink-0 rounded-3xl border-none shadow-lg">
                  <CardContent className="p-0">
                    <div className="aspect-[16/9] relative rounded-t-3xl overflow-hidden bg-muted">
                      <Image
                        src={`/.jpg?height=180&width=280&query=${trip.destination}`}
                        alt={trip.destination}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-lg">{trip.destination}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{trip.days.length} Days</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Popular Experiences</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Beach", icon: <Compass className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
              { label: "Mountain", icon: <Compass className="h-6 w-6" />, color: "bg-green-100 text-green-600" },
              { label: "Culture", icon: <Compass className="h-6 w-6" />, color: "bg-orange-100 text-orange-600" },
              { label: "Urban", icon: <Compass className="h-6 w-6" />, color: "bg-purple-100 text-purple-600" },
            ].map((cat) => (
              <div
                key={cat.label}
                className="flex items-center gap-3 p-4 rounded-3xl bg-card border-2 border-muted transition-all hover:border-primary/50 cursor-pointer"
              >
                <div className={`p-3 rounded-2xl ${cat.color}`}>{cat.icon}</div>
                <span className="font-semibold">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="space-y-4 pb-12">
          <h2 className="text-xl font-bold tracking-tight">Featured Destinations</h2>
          <div className="space-y-4">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => router.push(`/generate?dest=${dest.name}`)}
                className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl"
              >
                <Image
                  src={dest.image || "/placeholder.svg"}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-white/80 text-xs font-medium uppercase tracking-widest">
                      <MapPin className="h-3 w-3" />
                      Explore
                    </div>
                    <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                  </div>
                  <Button
                    size="icon"
                    className="rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border-none text-white"
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 pointer-events-none">
        <Button
          onClick={() => router.push("/generate")}
          size="lg"
          className="w-full h-16 rounded-[2rem] text-lg font-bold shadow-2xl shadow-primary/40 pointer-events-auto bg-primary hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-3"
        >
          <Compass className="h-6 w-6" />
          Plan New Itinerary
        </Button>
      </div>
    </div>
  )
}
