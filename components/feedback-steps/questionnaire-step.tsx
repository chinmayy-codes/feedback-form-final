"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { FeedbackData } from "@/components/feedback-form"

type QuestionnaireStepProps = {
  data: FeedbackData
  updateData: (updates: Partial<FeedbackData>) => void
}

export function QuestionnaireStep({ data, updateData }: QuestionnaireStepProps) {
  return (
    <div className="space-y-10">
      {/* SECTION 1: Project Information */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 1: Project Information</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">Type of content delivered</Label>
            <RadioGroup value={data.contentType} onValueChange={(value) => updateData({ contentType: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="youtube-shorts" id="youtube-shorts" />
                <Label htmlFor="youtube-shorts" className="font-normal cursor-pointer">
                  YouTube Shorts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="content-other" />
                <Label htmlFor="content-other" className="font-normal cursor-pointer">
                  Other (please specify)
                </Label>
              </div>
            </RadioGroup>
            {data.contentType === "other" && (
              <Input
                placeholder="Please specify"
                value={data.contentTypeOther}
                onChange={(e) => updateData({ contentTypeOther: e.target.value })}
                className="mt-2 border-slate-300"
              />
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">Number of edits delivered</Label>
            <RadioGroup value={data.numberOfEdits} onValueChange={(value) => updateData({ numberOfEdits: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30" id="edits-30" />
                <Label htmlFor="edits-30" className="font-normal cursor-pointer">
                  30
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="edits-other" />
                <Label htmlFor="edits-other" className="font-normal cursor-pointer">
                  Other (please specify)
                </Label>
              </div>
            </RadioGroup>
            {data.numberOfEdits === "other" && (
              <Input
                placeholder="Please specify"
                value={data.numberOfEditsOther}
                onChange={(e) => updateData({ numberOfEditsOther: e.target.value })}
                className="mt-2 border-slate-300"
              />
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: Overall Service Evaluation */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 2: Overall Service Evaluation</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              How would you rate the overall quality of service provided?
            </Label>
            <RadioGroup value={data.overallQuality} onValueChange={(value) => updateData({ overallQuality: value })}>
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`overall-${option}`} />
                  <Label htmlFor={`overall-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              To what extent did the delivered work meet the agreed requirements and expectations?
            </Label>
            <RadioGroup value={data.metExpectations} onValueChange={(value) => updateData({ metExpectations: value })}>
              {[
                "Exceeded expectations",
                "Met expectations",
                "Partially met expectations",
                "Did not meet expectations",
              ].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`expectations-${option}`} />
                  <Label htmlFor={`expectations-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* SECTION 3: Technical & Creative Quality */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 3: Technical & Creative Quality</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">Please rate the overall editing quality</Label>
            <RadioGroup value={data.editingQuality} onValueChange={(value) => updateData({ editingQuality: value })}>
              {["Excellent", "Very Good", "Good", "Needs improvement"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`editing-${option}`} />
                  <Label htmlFor={`editing-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-slate-900 font-medium">Please evaluate the following aspects:</p>

            {[
              { key: "videoPacing", label: "Video pacing and flow" },
              { key: "transitions", label: "Transitions and continuity" },
              { key: "captionQuality", label: "Caption quality and placement" },
              { key: "textAnimations", label: "Text animations" },
              { key: "soundEffects", label: "Sound effects integration" },
              { key: "backgroundMusic", label: "Background music selection" },
              { key: "visualConsistency", label: "Visual consistency across edits" },
              { key: "shortsCompliance", label: "Compliance with YouTube Shorts format and standards" },
            ].map((aspect) => (
              <div key={aspect.key} className="space-y-2">
                <Label className="text-slate-700">{aspect.label}</Label>
                <Select
                  value={data[aspect.key as keyof FeedbackData] as string}
                  onValueChange={(value) => updateData({ [aspect.key]: value })}
                >
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Very Satisfied">Very Satisfied</SelectItem>
                    <SelectItem value="Satisfied">Satisfied</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                    <SelectItem value="Dissatisfied">Dissatisfied</SelectItem>
                    <SelectItem value="Very Dissatisfied">Very Dissatisfied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <Label className="text-slate-900 font-medium">
              Did the editing style align with your content guidelines and brand tone?
            </Label>
            <RadioGroup value={data.styleAlignment} onValueChange={(value) => updateData({ styleAlignment: value })}>
              {["Fully aligned", "Mostly aligned", "Partially aligned", "Not aligned"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`style-${option}`} />
                  <Label htmlFor={`style-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* SECTION 4: Communication & Responsiveness */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 4: Communication & Responsiveness</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              How would you rate the clarity of communication throughout the project?
            </Label>
            <RadioGroup
              value={data.communicationClarity}
              onValueChange={(value) => updateData({ communicationClarity: value })}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`comm-${option}`} />
                  <Label htmlFor={`comm-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">Were replies and updates provided in a timely manner?</Label>
            <RadioGroup value={data.timelyReplies} onValueChange={(value) => updateData({ timelyReplies: value })}>
              {["Always", "Most of the time", "Occasionally", "Rarely"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`timely-${option}`} />
                  <Label htmlFor={`timely-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              Were instructions, clarifications, and updates handled clearly and professionally?
            </Label>
            <RadioGroup
              value={data.instructionsHandled}
              onValueChange={(value) => updateData({ instructionsHandled: value })}
            >
              {["Yes, consistently", "Yes, but with minor gaps", "No"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`instructions-${option}`} />
                  <Label htmlFor={`instructions-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* SECTION 5: Professional Conduct & Behaviour */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 5: Professional Conduct & Behaviour</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              How would you rate the overall professional behaviour during the engagement?
            </Label>
            <RadioGroup
              value={data.professionalBehaviour}
              onValueChange={(value) => updateData({ professionalBehaviour: value })}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`prof-${option}`} />
                  <Label htmlFor={`prof-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              Was the editor cooperative, respectful, and receptive to feedback?
            </Label>
            <RadioGroup
              value={data.cooperativeAndRespectful}
              onValueChange={(value) => updateData({ cooperativeAndRespectful: value })}
            >
              {["Yes, at all times", "Yes, most of the time", "Occasionally", "No"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`coop-${option}`} />
                  <Label htmlFor={`coop-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">How well were revision requests handled?</Label>
            <RadioGroup
              value={data.revisionHandling}
              onValueChange={(value) => updateData({ revisionHandling: value })}
            >
              {["Very professionally", "Professionally", "Acceptably", "Unprofessionally"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`revision-${option}`} />
                  <Label htmlFor={`revision-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              Did the editor maintain professionalism during feedback discussions or revision rounds?
            </Label>
            <RadioGroup
              value={data.professionDuringFeedback}
              onValueChange={(value) => updateData({ professionDuringFeedback: value })}
            >
              {["Yes", "Partially", "No", "Not applicable"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`feedback-prof-${option}`} />
                  <Label htmlFor={`feedback-prof-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* SECTION 6: Timelines & Delivery */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 6: Timelines & Delivery</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">Were the edits delivered within the agreed timelines?</Label>
            <RadioGroup
              value={data.deliveryTimeliness}
              onValueChange={(value) => updateData({ deliveryTimeliness: value })}
            >
              {["Always on time", "Minor delays", "Frequent delays"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`delivery-${option}`} />
                  <Label htmlFor={`delivery-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              How satisfied are you with the turnaround time for revisions?
            </Label>
            <RadioGroup
              value={data.revisionTurnaround}
              onValueChange={(value) => updateData({ revisionTurnaround: value })}
            >
              {["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`turnaround-${option}`} />
                  <Label htmlFor={`turnaround-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* SECTION 7: Value & Output Assessment */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 7: Value & Output Assessment</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              How would you rate the overall value of the services delivered?
            </Label>
            <RadioGroup value={data.overallValue} onValueChange={(value) => updateData({ overallValue: value })}>
              {["Excellent value", "Good value", "Fair value", "Poor value"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`value-${option}`} />
                  <Label htmlFor={`value-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              Have the edits met the intended content performance or engagement objectives?
            </Label>
            <RadioGroup
              value={data.performanceObjectives}
              onValueChange={(value) => updateData({ performanceObjectives: value })}
            >
              {["Yes", "Partially", "No", "Not evaluated yet"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`performance-${option}`} />
                  <Label htmlFor={`performance-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* SECTION 8: Feedback & Observations */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 8: Feedback & Observations</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aspectsWellHandled" className="text-slate-900 font-medium">
              What aspects of the service were handled particularly well?
            </Label>
            <Textarea
              id="aspectsWellHandled"
              value={data.aspectsWellHandled}
              onChange={(e) => updateData({ aspectsWellHandled: e.target.value })}
              placeholder="Please share your thoughts..."
              className="min-h-[100px] border-slate-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="areasForImprovement" className="text-slate-900 font-medium">
              What areas require improvement?
            </Label>
            <Textarea
              id="areasForImprovement"
              value={data.areasForImprovement}
              onChange={(e) => updateData({ areasForImprovement: e.target.value })}
              placeholder="Please share your thoughts..."
              className="min-h-[100px] border-slate-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalComments" className="text-slate-700">
              Additional comments or observations (if any)
            </Label>
            <Textarea
              id="additionalComments"
              value={data.additionalComments}
              onChange={(e) => updateData({ additionalComments: e.target.value })}
              placeholder="Optional..."
              className="min-h-[100px] border-slate-300"
            />
          </div>
        </div>
      </section>

      {/* SECTION 9: Testimonial Consent */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SECTION 9: Testimonial Consent</h3>
          <div className="h-0.5 bg-slate-200 w-20" />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-slate-900 font-medium">
              Do you permit the use of this feedback for internal records or portfolio reference?
            </Label>
            <RadioGroup
              value={data.testimonialConsent}
              onValueChange={(value) => updateData({ testimonialConsent: value })}
            >
              {["Yes (with attribution)", "Yes (anonymous)", "No"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`consent-${option}`} />
                  <Label htmlFor={`consent-${option}`} className="font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {data.testimonialConsent?.startsWith("Yes") && (
            <div className="space-y-2">
              <Label htmlFor="testimonialText" className="text-slate-700">
                If permitted, please share a brief testimonial
              </Label>
              <Textarea
                id="testimonialText"
                value={data.testimonialText}
                onChange={(e) => updateData({ testimonialText: e.target.value })}
                placeholder="Optional..."
                className="min-h-[100px] border-slate-300"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
