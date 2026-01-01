"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { FeedbackData } from "@/components/feedback-form"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
}

export function TestimonialStep({ data, updateData }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">Testimonial Consent</h2>

      <div className="space-y-6">
        <Label className="text-base font-normal text-black block">
          23. Would you be willing to provide a short testimonial that we can use on our website or social media?
        </Label>
        <RadioGroup
          value={data.testimonialConsent}
          onValueChange={(value) => {
            updateData({ testimonialConsent: value })
            if (value !== "Yes") {
              updateData({ testimonialText: "" })
            }
          }}
          className="space-y-3"
        >
          {["Yes", "No", "Maybe Later"].map((option, index) => (
            <div key={option} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <label
                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                  data.testimonialConsent === option
                    ? "bg-black border-black shadow-md"
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`}
              >
                <RadioGroupItem
                  value={option}
                  id={`testimonial-${index}`}
                  className={`h-5 w-5 ${data.testimonialConsent === option ? "border-white text-white" : ""}`}
                />
                <span className={`text-base ${data.testimonialConsent === option ? "text-white" : "text-black"}`}>
                  {option}
                </span>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {data.testimonialConsent === "Yes" && (
        <div className="space-y-4 animate-fade-in">
          <Label htmlFor="testimonialText" className="text-base font-normal text-black block">
            Please share your testimonial
          </Label>
          <Textarea
            id="testimonialText"
            placeholder="Your testimonial here..."
            value={data.testimonialText}
            onChange={(e) => updateData({ testimonialText: e.target.value })}
            rows={4}
            className="text-base p-4 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <p className="text-sm text-gray-600">
            Your testimonial may be used on our website, social media, or marketing materials.
          </p>
        </div>
      )}
    </div>
  )
}
