"use client"

import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FeedbackData } from "@/components/feedback-form"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
  onNext?: () => void
}

export function OverallServiceStep({ data, updateData, onNext }: Props) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && onNext) {
        if (data.overallQuality && data.metExpectations) {
          onNext()
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [data, onNext])

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">Overall Service Evaluation</h2>

      <div className="space-y-10">
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0ms" }}>
          <Label className="text-base font-normal text-gray-900">
            3. How would you rate the overall quality of service provided?
          </Label>
          <RadioGroup
            value={data.overallQuality}
            onValueChange={(value) => updateData({ overallQuality: value })}
            className="space-y-3"
          >
            {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((option, index) => (
              <div key={option} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.overallQuality === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    className={`h-5 w-5 ${data.overallQuality === option ? "border-white text-white" : ""}`}
                  />
                  <span className="text-base">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "50ms" }}>
          <Label className="text-base font-normal text-gray-900">
            4. To what extent did the delivered work meet the agreed requirements and expectations?
          </Label>
          <RadioGroup
            value={data.metExpectations}
            onValueChange={(value) => updateData({ metExpectations: value })}
            className="space-y-3"
          >
            {[
              "Exceeded expectations",
              "Met expectations",
              "Partially met expectations",
              "Did not meet expectations",
            ].map((option, index) => (
              <div key={option} className="animate-fade-in" style={{ animationDelay: `${50 + index * 30}ms` }}>
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.metExpectations === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    className={`h-5 w-5 ${data.metExpectations === option ? "border-white text-white" : ""}`}
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
