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

const ratingOptions = ["Excellent", "Very Good", "Good", "Fair", "Poor"]

const questions = [
  { key: "communicationClarity", label: "8. How would you rate the clarity of communication throughout the project?" },
  { key: "timelyReplies", label: "9. Were replies provided in a timely manner?" },
  { key: "instructionsHandled", label: "10. Were your instructions and feedback handled professionally?" },
]

export function CommunicationStep({ data, updateData, onNext }: Props) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && onNext) {
        const allAnswered = questions.every((q) => data[q.key as keyof FeedbackData])
        if (allAnswered) {
          onNext()
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [data, onNext])

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">Communication & Responsiveness</h2>

      <div className="space-y-10">
        {questions.map((question, qIndex) => (
          <div key={question.key} className="space-y-4 animate-slide-up" style={{ animationDelay: `${qIndex * 50}ms` }}>
            <Label className="text-base font-normal text-gray-900">{question.label}</Label>
            <RadioGroup
              value={data[question.key as keyof FeedbackData] as string}
              onValueChange={(value) => updateData({ [question.key]: value })}
              className="space-y-3"
            >
              {ratingOptions.map((option, index) => (
                <div
                  key={option}
                  className="animate-fade-in"
                  style={{ animationDelay: `${qIndex * 50 + index * 30}ms` }}
                >
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                      data[question.key as keyof FeedbackData] === option
                        ? "bg-black border-black text-white"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`${question.key}-${index}`}
                      className={`h-5 w-5 ${data[question.key as keyof FeedbackData] === option ? "border-white text-white" : ""}`}
                    />
                    <span className="text-base">{option}</span>
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  )
}
