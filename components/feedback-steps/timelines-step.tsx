"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FeedbackData } from "@/components/feedback-form"
import { useEffect } from "react"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
  onNext?: () => void
}

const deliveryOptions = ["On Time", "Slightly Delayed", "Significantly Delayed"]
const revisionOptions = ["Very Fast", "Reasonable", "Slow", "Too Slow"]

export function TimelinesStep({ data, updateData, onNext }: Props) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && onNext) {
        if (data.deliveryTimeliness && data.revisionTurnaround) {
          onNext()
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [data, onNext])

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">Timelines & Delivery</h2>

      <div className="space-y-10">
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0ms" }}>
          <Label className="text-base font-normal text-gray-900">15. Was the final video delivered on time?</Label>
          <RadioGroup
            value={data.deliveryTimeliness}
            onValueChange={(value) => updateData({ deliveryTimeliness: value })}
            className="space-y-3"
          >
            {deliveryOptions.map((option, index) => (
              <div key={option} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.deliveryTimeliness === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`delivery-${index}`}
                    className={`h-5 w-5 ${data.deliveryTimeliness === option ? "border-white text-white" : ""}`}
                  />
                  <span className="text-base">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "50ms" }}>
          <Label className="text-base font-normal text-gray-900">16. How fast were revisions delivered?</Label>
          <RadioGroup
            value={data.revisionTurnaround}
            onValueChange={(value) => updateData({ revisionTurnaround: value })}
            className="space-y-3"
          >
            {revisionOptions.map((option, index) => (
              <div key={option} className="animate-fade-in" style={{ animationDelay: `${50 + index * 30}ms` }}>
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.revisionTurnaround === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`revision-${index}`}
                    className={`h-5 w-5 ${data.revisionTurnaround === option ? "border-white text-white" : ""}`}
                  />
                  <span className="text-base">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
