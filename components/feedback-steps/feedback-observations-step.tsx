"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { FeedbackData } from "@/components/feedback-form"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
}

export function FeedbackObservationsStep({ data, updateData }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">Feedback & Observations</h2>

      <div className="space-y-6 animate-slide-up">
        <Label htmlFor="aspectsWellHandled" className="text-base font-normal text-black block">
          20. What aspects of the project do you feel were handled particularly well?
        </Label>
        <Textarea
          id="aspectsWellHandled"
          placeholder="Share what impressed you most about the work..."
          value={data.aspectsWellHandled}
          onChange={(e) => updateData({ aspectsWellHandled: e.target.value })}
          rows={4}
          className="text-base p-4 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div className="space-y-6 animate-slide-up" style={{ animationDelay: "50ms" }}>
        <Label htmlFor="areasForImprovement" className="text-base font-normal text-black block">
          21. Are there any areas where you feel improvement is needed?
        </Label>
        <Textarea
          id="areasForImprovement"
          placeholder="Constructive feedback helps us grow..."
          value={data.areasForImprovement}
          onChange={(e) => updateData({ areasForImprovement: e.target.value })}
          rows={4}
          className="text-base p-4 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <Label htmlFor="additionalComments" className="text-base font-normal text-black block">
          22. Any additional comments or suggestions?
        </Label>
        <Textarea
          id="additionalComments"
          placeholder="Any other thoughts you'd like to share..."
          value={data.additionalComments}
          onChange={(e) => updateData({ additionalComments: e.target.value })}
          rows={4}
          className="text-base p-4 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>
    </div>
  )
}
