"use client"
import { Input } from "@/components/ui/input"
import { User, Building2, Mail } from "lucide-react"
import type { FeedbackData } from "@/components/feedback-form"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
  onNext: () => void
}

export function PersonalDetailsStep({ data, updateData, onNext }: Props) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-700" />
              <label className="text-base font-medium text-gray-900">Full Name</label>
            </div>
            <Input
              type="text"
              placeholder="John Doe"
              value={data.clientName}
              onChange={(e) => updateData({ clientName: e.target.value })}
              className="h-12 text-base px-4 rounded-lg border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-all cursor-text"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-700" />
              <label className="text-base font-medium text-gray-900">Company Name</label>
            </div>
            <Input
              type="text"
              placeholder="Your Company Inc."
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              className="h-12 text-base px-4 rounded-lg border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-all cursor-text"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-700" />
              <label className="text-base font-medium text-gray-900">Email for Response</label>
            </div>
            <Input
              type="email"
              value={data.responseEmail}
              readOnly
              className="h-12 text-base px-4 rounded-lg border-gray-300 bg-gray-50 text-gray-700 cursor-not-allowed"
            />
            <p className="text-sm text-gray-600">
              We'll send the feedback summary to this email address (same as your verified email)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
