"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePreferencesStore } from "@/store/use-preferences-store"
import { Button } from "@/components/ui/button"
import { Selector } from "@/components/selector"
import { Coins, Zap, Coffee, Heart, ArrowRight } from "lucide-react"

const steps = [
  {
    title: "What's your budget?",
    description: "Help us find the best value for your trip",
    key: "budget",
    multi: false,
    options: [
      { value: "budget", label: "Budget", description: "Frugal and smart", icon: <Coins className="h-5 w-5" /> },
      { value: "moderate", label: "Moderate", description: "Balanced comfort", icon: <Zap className="h-5 w-5" /> },
      { value: "luxury", label: "Luxury", description: "High-end experience", icon: <Heart className="h-5 w-5" /> },
    ],
  },
  {
    title: "What's your pace?",
    description: "How much do you want to see each day?",
    key: "pace",
    multi: false,
    options: [
      { value: "relaxed", label: "Relaxed", description: "Slow and steady", icon: <Coffee className="h-5 w-5" /> },
      { value: "moderate", label: "Moderate", description: "Regular pace", icon: <Zap className="h-5 w-5" /> },
      { value: "fast", label: "Fast", description: "See everything", icon: <Zap className="h-5 w-5" /> },
    ],
  },
  {
    title: "Your interests?",
    description: "Select all that apply",
    key: "interests",
    multi: true,
    options: [
      { value: "culture", label: "Culture", description: "Museums & History" },
      { value: "nature", label: "Nature", description: "Outdoors & Parks" },
      { value: "food", label: "Foodie", description: "Local Gastronomy" },
      { value: "shopping", label: "Shopping", description: "Fashion & Souvenirs" },
    ],
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { preferences, setPreferences } = usePreferencesStore()
  const router = useRouter()

  const step = steps[currentStep]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/home")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background p-6 max-w-2xl mx-auto justify-center">
      <div className="mb-8 space-y-2">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${i <= currentStep ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{step.title}</h1>
          <p className="text-lg text-muted-foreground">{step.description}</p>
        </div>

        <Selector
          options={step.options}
          value={(preferences as any)[step.key]}
          onChange={(val) => setPreferences({ [step.key]: val })}
          multi={step.multi}
        />

        <Button
          onClick={handleNext}
          size="lg"
          className="w-full h-14 rounded-2xl text-lg font-semibold shadow-lg shadow-primary/20 mt-4 group"
        >
          {currentStep === steps.length - 1 ? "Start Exploring" : "Continue"}
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
