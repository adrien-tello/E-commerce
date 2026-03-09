"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, ArrowLeft, Sparkles, MapPin, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

const notifications = [
  {
    id: "1",
    title: "Trip Ready!",
    message: "Your AI itinerary for Paris is fully optimized based on local events.",
    time: "2h ago",
    icon: <Sparkles className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "2",
    title: "Price Drop Alert",
    message: "Flights to Tokyo have dropped by 15% for your selected dates.",
    time: "5h ago",
    icon: <MapPin className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "3",
    title: "Preference Update",
    message: "We've added 'Sustainable Travel' as a new interest option.",
    time: "1d ago",
    icon: <Calendar className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
  },
]

export default function NotificationsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background max-w-2xl mx-auto p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        </div>
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Bell className="h-5 w-5 text-primary" />
        </div>
      </header>

      <div className="space-y-4">
        {notifications.map((note) => (
          <Card
            key={note.id}
            className="rounded-[2rem] border-none shadow-lg shadow-primary/5 hover:shadow-xl transition-shadow cursor-pointer group"
          >
            <CardContent className="p-5 flex gap-4">
              <div
                className={`shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center ${note.color} transition-transform group-hover:scale-110`}
              >
                {note.icon}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{note.title}</h3>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {note.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{note.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center p-8 rounded-[2.5rem] bg-muted/50 border-2 border-dashed border-muted">
        <p className="text-muted-foreground text-sm font-medium italic">No more recent updates</p>
      </div>
    </div>
  )
}
