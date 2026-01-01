"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FeedbackData } from "@/components/feedback-form"

type EmailStepProps = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
}

export function EmailStep({ data, updateData }: EmailStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="clientEmail" className="text-slate-900 font-medium">
          Client Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="clientEmail"
          type="email"
          placeholder="your@email.com"
          value={data.clientEmail}
          onChange={(e) => updateData({ clientEmail: e.target.value })}
          required
          className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
        />
        <p className="text-sm text-slate-500">
          Your email will be used for submission records and to send you a copy of your feedback.
        </p>
      </div>
    </div>
  )
}
