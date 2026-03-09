"use client"

import { useUserStore } from "@/store/use-user-store"
import { usePreferencesStore } from "@/store/use-preferences-store"
import { Button } from "@/components/ui/button"
import { User, Settings, Bell, Heart, CreditCard, LogOut, ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, logout } = useUserStore()
  const { preferences } = usePreferencesStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background pb-24 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-primary/5 pt-12 pb-20 px-6 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="h-28 w-28 rounded-[2.5rem] bg-primary/20 border-4 border-white shadow-xl overflow-hidden">
                <Image src="/diverse-user-avatars.png" alt="Profile" width={112} height={112} />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-2 rounded-2xl shadow-lg">
                <Settings className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">{user?.name || "Traveler"}</h1>
              <div className="flex items-center gap-1 text-muted-foreground justify-center">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">World Explorer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8 space-y-8 relative z-10">
        {/* Preference Summary */}
        <section className="bg-card rounded-[2rem] p-6 shadow-xl shadow-primary/5 border border-muted space-y-4">
          <h2 className="text-lg font-bold">Trip Preferences</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/50 rounded-2xl text-center">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Budget</p>
              <p className="font-bold capitalize text-primary">{preferences.budget}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-2xl text-center">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Pace</p>
              <p className="font-bold capitalize text-primary">{preferences.pace}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {preferences.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full capitalize"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-3">
          {[
            { label: "Personal Info", icon: <User className="h-5 w-5" />, color: "text-blue-500 bg-blue-50" },
            {
              label: "Notifications",
              icon: <Bell className="h-5 w-5" />,
              color: "text-orange-500 bg-orange-50",
              count: 3,
            },
            { label: "Saved Places", icon: <Heart className="h-5 w-5" />, color: "text-pink-500 bg-pink-50" },
            { label: "Payment", icon: <CreditCard className="h-5 w-5" />, color: "text-teal-500 bg-teal-50" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between p-4 bg-card rounded-[1.5rem] border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${item.color}`}>{item.icon}</div>
                <span className="font-semibold">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                )}
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </section>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full h-14 rounded-2xl text-destructive font-bold hover:bg-destructive/5 hover:text-destructive flex items-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
