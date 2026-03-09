"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { usePreferencesStore } from "@/store/use-preferences-store"
import { useItineraryStore } from "@/store/use-itinerary-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiService } from "@/components/api-service"
import { MapPin, Calendar, Sparkles, ArrowLeft, Loader2 } from "lucide-react"

function GenerateContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [destination, setDestination] = useState(searchParams.get("dest") || "")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { preferences } = usePreferencesStore()
  const { setItinerary } = useItineraryStore()

  const handleGenerate = async () => {
    if (!destination || !startDate || !endDate) return

    setIsGenerating(true)
    try {
      const result = await apiService.generateItinerary({
        destination,
        startDate,
        endDate,
        preferences,
      })
      setItinerary(result)
      router.push(`/itinerary/${result.id}`)
    } catch (error) {
      console.error("Failed to generate itinerary:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">New Adventure</h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-semibold ml-1">Where to?</Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="e.g. Paris, Tokyo, Bali"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-14 pl-12 rounded-2xl bg-muted/50 border-none text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-lg font-semibold ml-1">Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-14 pl-12 rounded-2xl bg-muted/50 border-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-semibold ml-1">End Date</Label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-14 pl-12 rounded-2xl bg-muted/50 border-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !destination || !startDate || !endDate}
            className="w-full h-16 rounded-[2rem] text-lg font-bold shadow-2xl shadow-primary/40 flex items-center gap-3 transition-all active:scale-95"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                AI is Crafting Your Trip...
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6" />
                Generate AI Itinerary
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={null}>
      <GenerateContent />
    </Suspense>
  )
}
