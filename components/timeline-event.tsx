"use client"

import { Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { ItineraryEvent } from "@/store/use-itinerary-store"
import { cn } from "@/lib/utils"

interface TimelineEventProps {
  event: ItineraryEvent
  isLast?: boolean
  onClick?: () => void
}

export function TimelineEvent({ event, isLast, onClick }: TimelineEventProps) {
  const typeColors = {
    activity: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    transport: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    hotel: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  }

  return (
    <div className="group relative flex gap-4 pb-8 last:pb-0" onClick={onClick}>
      {!isLast && (
        <span
          className="absolute left-[11px] top-8 h-[calc(100%-32px)] w-0.5 bg-border group-last:hidden"
          aria-hidden="true"
        />
      )}
      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm z-10">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
      <Card className="flex-1 cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 active:scale-[0.98]">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-semibold leading-none">{event.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
            </div>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                typeColors[event.type],
              )}
            >
              {event.type}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                {event.time} ({event.duration})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{event.location.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
