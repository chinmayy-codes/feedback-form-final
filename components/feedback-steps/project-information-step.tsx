"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FeedbackData } from "@/components/feedback-form"
import { useEffect } from "react"

type Props = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
  onNext?: () => void
}

export function ProjectInformationStep({ data, updateData, onNext }: Props) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && onNext) {
        const contentTypeValid =
          data.contentType && (data.contentType !== "Other (please specify)" || data.contentTypeOther)
        const editsValid =
          data.numberOfEdits && (data.numberOfEdits !== "Other (please specify)" || data.numberOfEditsOther)
        if (contentTypeValid && editsValid) {
          onNext()
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [data, onNext])

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">Project Information</h2>

      <div className="space-y-10">
        <div className="space-y-4">
          <Label className="text-base font-normal text-gray-900">1. Type of content delivered</Label>
          <Input
            placeholder="e.g., YouTube Shorts, Long-form videos, Reels..."
            value={data.contentType}
            onChange={(e) => updateData({ contentType: e.target.value })}
            className="h-12 border-gray-200 rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-normal text-gray-900">2. Number of edits delivered</Label>
          <Input
            placeholder="e.g., 30, 50, 100..."
            value={data.numberOfEdits}
            onChange={(e) => updateData({ numberOfEdits: e.target.value })}
            className="h-12 border-gray-200 rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
