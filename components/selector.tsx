"use client"

import type * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectorOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface SelectorProps {
  options: SelectorOption[]
  value: string | string[]
  onChange: (value: any) => void
  multi?: boolean
  className?: string
}

export function Selector({ options, value, onChange, multi, className }: SelectorProps) {
  const isSelected = (val: string) => {
    if (multi && Array.isArray(value)) {
      return value.includes(val)
    }
    return value === val
  }

  const handleSelect = (val: string) => {
    if (multi && Array.isArray(value)) {
      if (value.includes(val)) {
        onChange(value.filter((v) => v !== val))
      } else {
        onChange([...value, val])
      }
    } else {
      onChange(val)
    }
  }

  return (
    <div className={cn("grid gap-3", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={cn(
            "flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all",
            isSelected(option.value)
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : "border-border bg-card hover:border-primary/50",
          )}
        >
          <div className="flex items-center gap-4">
            {option.icon && <div className="text-primary">{option.icon}</div>}
            <div>
              <p className="font-semibold">{option.label}</p>
              {option.description && <p className="text-sm text-muted-foreground">{option.description}</p>}
            </div>
          </div>
          {isSelected(option.value) && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3.5 w-3.5" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
