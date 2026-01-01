"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Mail } from "lucide-react"
import type { FeedbackData } from "@/components/feedback-form"

interface Props {
  data: FeedbackData
  updateData: (update: Partial<FeedbackData>) => void
}

const AUTHORIZED_EMAILS = [
  "chinmaypatil4u@gmail.com",
  "stevejobsforreal69@gmail.com",
  "contact.rehanfx@gmail.com",
  "client4@example.com",
  "client5@example.com",
]

export function EmailVerificationStep({ data, updateData }: Props) {
  const [attemptedVerification, setAttemptedVerification] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleVerify = () => {
    setAttemptedVerification(true)
    const isValid = AUTHORIZED_EMAILS.some((email) => email === data.verificationEmail.toLowerCase().trim())

    if (isValid) {
      updateData({ isEmailVerified: true })
      setShowError(false)
    } else {
      updateData({ isEmailVerified: false })
      setShowError(true)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && data.verificationEmail) {
        handleVerify()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [data.verificationEmail])

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-lg space-y-5">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
              <Mail className="h-8 w-8 text-slate-700" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1.5">Verify Your Access</h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              This feedback portal is private. Please enter your authorized email address to continue.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-900">Email Address</label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={data.verificationEmail}
              onChange={(e) => {
                updateData({ verificationEmail: e.target.value })
                setShowError(false)
                setAttemptedVerification(false)
              }}
              className="h-11 text-sm px-3 rounded-lg border-gray-300 bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 transition-all cursor-text"
            />
          </div>

          <Button
            onClick={handleVerify}
            className="w-full h-11 text-sm font-semibold bg-black hover:bg-gray-800 rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            disabled={!data.verificationEmail}
          >
            Verify Email
          </Button>

          {attemptedVerification && data.isEmailVerified && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-800 font-medium">Email verified! You can proceed to the next step.</p>
            </div>
          )}

          {showError && !data.isEmailVerified && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <p className="text-xs text-red-800 font-medium">
                Access denied. This email is not authorized to submit feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
