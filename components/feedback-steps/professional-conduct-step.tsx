"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FeedbackData } from "@/components/feedback-form"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
  onNext?: () => void
}

const ratingOptions = ["Excellent", "Good", "Average", "Below Average", "Poor"]

const questions = [
  { key: "professionalBehaviour", label: "11. Overall professional behaviour" },
  { key: "cooperativeAndRespectful", label: "12. Cooperative and respectful attitude" },
  { key: "revisionHandling", label: "13. Willingness to accommodate feedback and revisions" },
  { key: "professionDuringFeedback", label: "14. Professionalism during feedback discussions" },
]

export function ProfessionalConductStep({ data, updateData, onNext }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">
        Professional Conduct & Behaviour
      </h2>

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
