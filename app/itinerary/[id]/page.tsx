"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useItineraryStore } from "@/store/use-itinerary-store"
import { TimelineEvent } from "@/components/timeline-event"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapIcon, Calendar, Share2, Save, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ItineraryPage() {
  const router = useRouter()
  const { currentItinerary, saveItinerary } = useItineraryStore()
  const [activeDay, setActiveDay] = useState(0)
  const [showMap, setShowMap] = useState(false)

  if (!currentItinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold">Itinerary not found</h2>
        <Button onClick={() => router.push("/home")}>Go Home</Button>
      </div>
    )
  }

  const currentDayPlan = currentItinerary.days[activeDay]

  const handleSave = () => {
    saveItinerary(currentItinerary)
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg truncate max-w-[150px]">{currentItinerary.destination}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button onClick={handleSave} size="sm" className="rounded-xl px-4 font-semibold gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Hero / Map Toggle */}
      <div className="relative aspect-[16/10] bg-muted overflow-hidden transition-all duration-500">
        {showMap ? (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <div className="text-center space-y-2 text-muted-foreground p-6">
              <MapIcon className="h-12 w-12 mx-auto opacity-50" />
              <p className="font-medium uppercase tracking-widest text-xs">Interactive Map View</p>
              <p className="text-sm">Markers for {currentDayPlan.events.length} activities located.</p>
            </div>
            {/* Mock Map Markers */}
            <div className="absolute top-1/4 left-1/3 h-4 w-4 rounded-full bg-primary border-4 border-white shadow-lg animate-pulse" />
            <div className="absolute top-1/2 left-2/3 h-4 w-4 rounded-full bg-primary border-4 border-white shadow-lg animate-pulse delay-75" />
            <div className="absolute top-3/4 left-1/2 h-4 w-4 rounded-full bg-primary border-4 border-white shadow-lg animate-pulse delay-150" />
          </div>
        ) : (
          <div className="absolute inset-0">
            <img
              src={`/.jpg?height=400&width=600&query=${currentItinerary.destination}`}
              alt={currentItinerary.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                <Calendar className="h-4 w-4" />
                <span>{new Date(currentItinerary.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-3xl font-bold">{currentItinerary.destination}</h2>
            </div>
          </div>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowMap(!showMap)}
          className="absolute top-4 right-4 rounded-full px-4 shadow-lg backdrop-blur-md bg-white/80 border-none font-bold"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>

      {/* Day Selector */}
      <div className="px-6 py-6 overflow-x-auto flex gap-3 no-scrollbar sticky top-[73px] bg-background/80 backdrop-blur-md z-10 border-b">
        {currentItinerary.days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDay(idx)}
            className={cn(
              "flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all border-2",
              activeDay === idx
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80",
            )}
          >
            Day {idx + 1}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="p-6 space-y-8 pb-24">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">Timeline</h3>
          <Button variant="ghost" className="text-primary font-bold gap-2 rounded-xl">
            <Sparkles className="h-4 w-4" />
            AI Swap
          </Button>
        </div>

        <div className="space-y-2">
          {currentDayPlan.events.map((event, idx) => (
            <TimelineEvent
              key={event.id}
              event={event}
              isLast={idx === currentDayPlan.events.length - 1}
              onClick={() => {}}
            />
          ))}
        </div>

        {/* Alternative Suggestions */}
        <Card className="mt-12 p-6 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold">Alternative Afternoon</h4>
              <p className="text-sm text-muted-foreground">More cultural focus?</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full rounded-2xl border-primary/20 hover:bg-primary/10 font-bold bg-transparent"
          >
            Replace Event
          </Button>
        </Card>
      </div>
    </div>
  )
}
