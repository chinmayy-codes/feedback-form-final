"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FeedbackData } from "@/components/feedback-form"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
  onNext?: () => void
}

const ratingOptions = ["Excellent", "Very Good", "Good", "Needs improvement"]

const matrixOptions = [
  { value: "VS", label: "VS" },
  { value: "S", label: "S" },
  { value: "N", label: "N" },
  { value: "D", label: "D" },
  { value: "VD", label: "VD" },
]

const matrixQuestions = [
  { key: "videoPacing", label: "Video pacing and flow" },
  { key: "transitions", label: "Transitions and continuity" },
  { key: "captionQuality", label: "Caption quality and placement" },
  { key: "textAnimations", label: "Text animations" },
  { key: "soundEffects", label: "Sound effects integration" },
  { key: "backgroundMusic", label: "Background music selection" },
]

const alignmentOptions = ["Fully aligned", "Mostly aligned", "Partially aligned", "Not aligned"]

export function TechnicalQualityStep({ data, updateData, onNext }: Props) {
  // The Next Section button in feedback-form.tsx handles navigation

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">Technical & Creative Quality</h2>

      <div className="space-y-10">
        {/* Question 5: Overall editing quality */}
        <div className="space-y-4 animate-slide-up">
          <Label className="text-base font-normal text-gray-900">5. Please rate the overall editing quality</Label>
          <RadioGroup
            value={data.editingQuality}
            onValueChange={(value) => updateData({ editingQuality: value })}
            className="space-y-3"
          >
            {ratingOptions.map((option, index) => (
              <div key={option} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.editingQuality === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`editingQuality-${index}`}
                    className={`h-5 w-5 ${data.editingQuality === option ? "border-white text-white" : ""}`}
                  />
                  <span className="text-base">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Question 6: Matrix evaluation */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <Label className="text-base font-normal text-gray-900">6. Please evaluate the following aspects</Label>
          <p className="text-sm text-gray-500">Rate each aspect from Very Satisfied to Very Dissatisfied</p>

          <div className="space-y-4 mt-6">
            {matrixQuestions.map((question, qIndex) => (
              <div
                key={question.key}
                className="animate-fade-in border-b border-gray-100 pb-4 last:border-0"
                style={{ animationDelay: `${150 + qIndex * 40}ms` }}
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-sm text-gray-700 min-w-[200px]">{question.label}</span>
                  <RadioGroup
                    value={data[question.key as keyof FeedbackData] as string}
                    onValueChange={(value) => updateData({ [question.key]: value })}
                    className="flex gap-2"
                  >
                    {matrixOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-center w-12 h-10 rounded border cursor-pointer transition-all duration-200 hover:scale-105 ${
                          data[question.key as keyof FeedbackData] === option.value
                            ? "bg-black border-black text-white"
                            : "bg-white border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`${question.key}-${option.value}`}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question 7: Style alignment */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Label className="text-base font-normal text-gray-900">
            7. Did the editing style align with your content guidelines and brand tone?
          </Label>
          <RadioGroup
            value={data.styleAlignment}
            onValueChange={(value) => updateData({ styleAlignment: value })}
            className="space-y-3"
          >
            {alignmentOptions.map((option, index) => (
              <div key={option} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.styleAlignment === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`styleAlignment-${index}`}
                    className={`h-5 w-5 ${data.styleAlignment === option ? "border-white text-white" : ""}`}
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
