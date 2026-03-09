"use client"

import { Home, Map, Bell, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", icon: <Home className="h-6 w-6" />, href: "/home" },
    { label: "Explore", icon: <Map className="h-6 w-6" />, href: "/generate" },
    { label: "Alerts", icon: <Bell className="h-6 w-6" />, href: "/notifications" },
    { label: "Profile", icon: <User className="h-6 w-6" />, href: "/profile" },
  ]

  // Hide nav on auth and onboarding
  if (["/login", "/signup", "/onboarding", "/"].includes(pathname)) return null

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 pb-6 pointer-events-none z-50">
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl p-2 flex items-center justify-around pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-[2rem] transition-all relative group",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary",
              )}
            >
              {item.icon}
              {isActive && (
                <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary animate-in fade-in zoom-in duration-300" />
              )}
              <span className="sr-only">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
