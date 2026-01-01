"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FeedbackForm } from "@/components/feedback-form"
import { MobileBlockScreen } from "@/components/mobile-block-screen"
import { ArrowRight } from "lucide-react"

export default function FeedbackPage() {
  const [started, setStarted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (isMobile) {
    return <MobileBlockScreen />
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Client Feedback Form</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            This form is intended to assess service quality, communication standards, professional conduct, and overall
            delivery of video editing services. The feedback will be used for quality assurance and internal evaluation
            purposes.
          </p>
          <Button
            onClick={() => setStarted(true)}
            size="lg"
            className="bg-black text-white hover:bg-slate-800 mt-8 transition-all duration-300 hover:scale-105 hover:tracking-wider group"
          >
            Start Feedback
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <FeedbackForm />
      </div>
    </div>
  )
}
