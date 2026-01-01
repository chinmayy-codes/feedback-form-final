"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Check } from "lucide-react"
import { EmailVerificationStep } from "@/components/feedback-steps/email-verification-step"
import { PersonalDetailsStep } from "@/components/feedback-steps/personal-details-step"
import { ProjectInformationStep } from "@/components/feedback-steps/project-information-step"
import { OverallServiceStep } from "@/components/feedback-steps/overall-service-step"
import { TechnicalQualityStep } from "@/components/feedback-steps/technical-quality-step"
import { CommunicationStep } from "@/components/feedback-steps/communication-step"
import { ProfessionalConductStep } from "@/components/feedback-steps/professional-conduct-step"
import { TimelinesStep } from "@/components/feedback-steps/timelines-step"
import { ValueAssessmentStep } from "@/components/feedback-steps/value-assessment-step"
import { FeedbackObservationsStep } from "@/components/feedback-steps/feedback-observations-step"
import { TestimonialStep } from "@/components/feedback-steps/testimonial-step"
import { generateFeedbackPDF } from "@/lib/generate-pdf"

export type FeedbackData = {
  verificationEmail: string
  isEmailVerified: boolean
  clientName: string
  companyName: string
  responseEmail: string
  contentType: string
  contentTypeOther: string
  numberOfEdits: string
  numberOfEditsOther: string
  overallQuality: string
  metExpectations: string
  editingQuality: string
  videoPacing: string
  transitions: string
  captionQuality: string
  textAnimations: string
  soundEffects: string
  backgroundMusic: string
  visualConsistency: string
  shortsCompliance: string
  styleAlignment: string
  communicationClarity: string
  timelyReplies: string
  instructionsHandled: string
  professionalBehaviour: string
  cooperativeAndRespectful: string
  revisionHandling: string
  professionDuringFeedback: string
  deliveryTimeliness: string
  revisionTurnaround: string
  overallValue: string
  performanceObjectives: string
  aspectsWellHandled: string
  areasForImprovement: string
  additionalComments: string
  testimonialConsent: string
  testimonialText: string
}

const sections = [
  { id: 0, name: "Email Verification", sectionNumber: 0, totalSteps: 11 },
  { id: 1, name: "Personal Details", sectionNumber: 1, totalSteps: 10 },
  { id: 2, name: "Project Information", sectionNumber: 2, totalSteps: 10 },
  { id: 3, name: "Overall Service Evaluation", sectionNumber: 3, totalSteps: 10 },
  { id: 4, name: "Technical & Creative Quality", sectionNumber: 4, totalSteps: 10 },
  { id: 5, name: "Communication & Responsiveness", sectionNumber: 5, totalSteps: 10 },
  { id: 6, name: "Professional Conduct & Behaviour", sectionNumber: 6, totalSteps: 10 },
  { id: 7, name: "Timelines & Delivery", sectionNumber: 7, totalSteps: 10 },
  { id: 8, name: "Value & Output Assessment", sectionNumber: 8, totalSteps: 10 },
  { id: 9, name: "Feedback & Observations", sectionNumber: 9, totalSteps: 10 },
  { id: 10, name: "Testimonial Consent", sectionNumber: 10, totalSteps: 10 },
]

export function FeedbackForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FeedbackData>({
    verificationEmail: "",
    isEmailVerified: false,
    clientName: "",
    companyName: "",
    responseEmail: "",
    contentType: "",
    contentTypeOther: "",
    numberOfEdits: "",
    numberOfEditsOther: "",
    overallQuality: "",
    metExpectations: "",
    editingQuality: "",
    videoPacing: "",
    transitions: "",
    captionQuality: "",
    textAnimations: "",
    soundEffects: "",
    backgroundMusic: "",
    visualConsistency: "",
    shortsCompliance: "",
    styleAlignment: "",
    communicationClarity: "",
    timelyReplies: "",
    instructionsHandled: "",
    professionalBehaviour: "",
    cooperativeAndRespectful: "",
    revisionHandling: "",
    professionDuringFeedback: "",
    deliveryTimeliness: "",
    revisionTurnaround: "",
    overallValue: "",
    performanceObjectives: "",
    aspectsWellHandled: "",
    areasForImprovement: "",
    additionalComments: "",
    testimonialConsent: "",
    testimonialText: "",
  })

  const updateFormData = (updates: Partial<FeedbackData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  useEffect(() => {
    if (formData.isEmailVerified && formData.verificationEmail) {
      updateFormData({ responseEmail: formData.verificationEmail })
    }
  }, [formData.isEmailVerified, formData.verificationEmail])

  const nextStep = () => {
    console.log("[v0] Next button clicked, currentStep:", currentStep)
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    console.log("[v0] Previous button clicked, currentStep:", currentStep)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Send email via API
      const emailResponse = await fetch("/api/send-feedback-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!emailResponse.ok) {
        throw new Error("Failed to send email")
      }

      // Generate PDF
      await generateFeedbackPDF(formData)

      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting feedback:", error)
      alert("There was an error submitting your feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-black">Thank You for Your Feedback</h2>
          <p className="text-gray-600 text-lg">
            Your feedback has been successfully submitted. A copy has been sent to your email address and downloaded to
            your device.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            If you have any questions, please contact us at{" "}
            <a href="mailto:studio.chinmayy@gmail.com" className="text-black font-semibold hover:underline">
              studio.chinmayy@gmail.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  const currentSection = sections[currentStep]
  const showProgressIndicator = currentStep > 0
  const progressPercentage = currentStep > 0 ? (currentSection.sectionNumber / currentSection.totalSteps) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {showProgressIndicator && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-semibold text-black">{currentSection.name}</h1>
              <span className="text-lg text-gray-500">
                {currentSection.sectionNumber} / {currentSection.totalSteps}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {currentStep === 0 || currentStep === 1 ? (
          <div key={currentStep} className="animate-fade-in">
            {currentStep === 0 && (
              <>
                <EmailVerificationStep data={formData} updateData={updateFormData} />
                <div className="flex items-center justify-between mt-6">
                  <div />
                  <Button
                    onClick={nextStep}
                    disabled={!formData.isEmailVerified}
                    className="group bg-black text-white hover:bg-gray-800 px-8 py-6 font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <span className="group-hover:tracking-wide transition-all duration-300">Next Section</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </>
            )}
            {currentStep === 1 && (
              <>
                <PersonalDetailsStep data={formData} updateData={updateFormData} onNext={nextStep} />
                <div className="flex items-center justify-between mt-6">
                  <Button
                    onClick={prevStep}
                    variant="ghost"
                    className="group text-black hover:bg-gray-100 font-medium transition-all duration-300 hover:scale-105"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="group-hover:tracking-wide transition-all duration-300">Back to Email</span>
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="group bg-black text-white hover:bg-gray-800 px-8 py-6 font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <span className="group-hover:tracking-wide transition-all duration-300">Next Section</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 md:p-6 mb-5">
            <div key={currentStep} className="animate-fade-in">
              {currentStep === 2 && (
                <ProjectInformationStep data={formData} updateData={updateFormData} onNext={nextStep} />
              )}
              {currentStep === 3 && (
                <OverallServiceStep data={formData} updateData={updateFormData} onNext={nextStep} />
              )}
              {currentStep === 4 && (
                <TechnicalQualityStep data={formData} updateData={updateFormData} onNext={nextStep} />
              )}
              {currentStep === 5 && <CommunicationStep data={formData} updateData={updateFormData} onNext={nextStep} />}
              {currentStep === 6 && (
                <ProfessionalConductStep data={formData} updateData={updateFormData} onNext={nextStep} />
              )}
              {currentStep === 7 && <TimelinesStep data={formData} updateData={updateFormData} onNext={nextStep} />}
              {currentStep === 8 && (
                <ValueAssessmentStep data={formData} updateData={updateFormData} onNext={nextStep} />
              )}
              {currentStep === 9 && <FeedbackObservationsStep data={formData} updateData={updateFormData} />}
              {currentStep === 10 && <TestimonialStep data={formData} updateData={updateFormData} />}
            </div>
          </div>
        )}

        {currentStep >= 2 && (
          <div className="flex items-center justify-between">
            <Button
              onClick={prevStep}
              variant="ghost"
              className="group text-black hover:bg-gray-100 font-medium transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="group-hover:tracking-wide transition-all duration-300">Previous</span>
            </Button>
            {currentStep < sections.length - 1 ? (
              <Button
                onClick={nextStep}
                className="group bg-black text-white hover:bg-gray-800 px-8 py-6 font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="group-hover:tracking-wide transition-all duration-300">Next Section</span>
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group bg-black text-white hover:bg-gray-800 px-8 py-6 font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <span className="group-hover:tracking-wide transition-all duration-300">
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
