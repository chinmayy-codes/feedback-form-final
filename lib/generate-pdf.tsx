import type { FeedbackData } from "@/components/feedback-form"

export async function generateFeedbackPDF(data: FeedbackData) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Client Feedback Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #334155; padding: 40px; max-width: 900px; margin: 0 auto; }
          h1 { color: #0f172a; font-size: 28px; margin-bottom: 10px; border-bottom: 3px solid #0f172a; padding-bottom: 10px; }
          .header-info { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .header-info p { margin: 5px 0; }
          h2 { color: #1e293b; font-size: 20px; margin-top: 30px; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid #e2e8f0; }
          .section { margin-bottom: 25px; }
          .question { margin-bottom: 15px; }
          .question-label { font-weight: 600; color: #475569; display: block; margin-bottom: 5px; }
          .answer { color: #0f172a; padding-left: 15px; }
          .answer-text { background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #cbd5e1; margin-top: 5px; }
          .meta { color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Client Feedback Report</h1>
        
        <div class="header-info">
          <p><strong>Client Email:</strong> ${data.clientEmail}</p>
          <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <h2>SECTION 1: Project Information</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Type of content delivered:</span>
            <div class="answer">${data.contentType === "other" ? data.contentTypeOther : data.contentType}</div>
          </div>
          <div class="question">
            <span class="question-label">Number of edits delivered:</span>
            <div class="answer">${data.numberOfEdits === "other" ? data.numberOfEditsOther : data.numberOfEdits}</div>
          </div>
        </div>

        <h2>SECTION 2: Overall Service Evaluation</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Overall quality of service:</span>
            <div class="answer">${data.overallQuality}</div>
          </div>
          <div class="question">
            <span class="question-label">Met expectations:</span>
            <div class="answer">${data.metExpectations}</div>
          </div>
        </div>

        <h2>SECTION 3: Technical & Creative Quality</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Overall editing quality:</span>
            <div class="answer">${data.editingQuality}</div>
          </div>
          <div class="question">
            <span class="question-label">Video pacing and flow:</span>
            <div class="answer">${data.videoPacing}</div>
          </div>
          <div class="question">
            <span class="question-label">Transitions and continuity:</span>
            <div class="answer">${data.transitions}</div>
          </div>
          <div class="question">
            <span class="question-label">Caption quality and placement:</span>
            <div class="answer">${data.captionQuality}</div>
          </div>
          <div class="question">
            <span class="question-label">Text animations:</span>
            <div class="answer">${data.textAnimations}</div>
          </div>
          <div class="question">
            <span class="question-label">Sound effects integration:</span>
            <div class="answer">${data.soundEffects}</div>
          </div>
          <div class="question">
            <span class="question-label">Background music selection:</span>
            <div class="answer">${data.backgroundMusic}</div>
          </div>
          <div class="question">
            <span class="question-label">Visual consistency across edits:</span>
            <div class="answer">${data.visualConsistency}</div>
          </div>
          <div class="question">
            <span class="question-label">Compliance with YouTube Shorts format:</span>
            <div class="answer">${data.shortsCompliance}</div>
          </div>
          <div class="question">
            <span class="question-label">Style alignment with brand:</span>
            <div class="answer">${data.styleAlignment}</div>
          </div>
        </div>

        <h2>SECTION 4: Communication & Responsiveness</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Communication clarity:</span>
            <div class="answer">${data.communicationClarity}</div>
          </div>
          <div class="question">
            <span class="question-label">Timely replies:</span>
            <div class="answer">${data.timelyReplies}</div>
          </div>
          <div class="question">
            <span class="question-label">Instructions handled professionally:</span>
            <div class="answer">${data.instructionsHandled}</div>
          </div>
        </div>

        <h2>SECTION 5: Professional Conduct & Behaviour</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Professional behaviour:</span>
            <div class="answer">${data.professionalBehaviour}</div>
          </div>
          <div class="question">
            <span class="question-label">Cooperative and respectful:</span>
            <div class="answer">${data.cooperativeAndRespectful}</div>
          </div>
          <div class="question">
            <span class="question-label">Revision handling:</span>
            <div class="answer">${data.revisionHandling}</div>
          </div>
          <div class="question">
            <span class="question-label">Professionalism during feedback:</span>
            <div class="answer">${data.professionDuringFeedback}</div>
          </div>
        </div>

        <h2>SECTION 6: Timelines & Delivery</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Delivery timeliness:</span>
            <div class="answer">${data.deliveryTimeliness}</div>
          </div>
          <div class="question">
            <span class="question-label">Revision turnaround satisfaction:</span>
            <div class="answer">${data.revisionTurnaround}</div>
          </div>
        </div>

        <h2>SECTION 7: Value & Output Assessment</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Overall value:</span>
            <div class="answer">${data.overallValue}</div>
          </div>
          <div class="question">
            <span class="question-label">Performance objectives met:</span>
            <div class="answer">${data.performanceObjectives}</div>
          </div>
        </div>

        <h2>SECTION 8: Feedback & Observations</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Aspects handled particularly well:</span>
            <div class="answer-text">${data.aspectsWellHandled || "No response provided"}</div>
          </div>
          <div class="question">
            <span class="question-label">Areas requiring improvement:</span>
            <div class="answer-text">${data.areasForImprovement || "No response provided"}</div>
          </div>
          ${
            data.additionalComments
              ? `
          <div class="question">
            <span class="question-label">Additional comments:</span>
            <div class="answer-text">${data.additionalComments}</div>
          </div>
          `
              : ""
          }
        </div>

        <h2>SECTION 9: Testimonial Consent</h2>
        <div class="section">
          <div class="question">
            <span class="question-label">Testimonial consent:</span>
            <div class="answer">${data.testimonialConsent}</div>
          </div>
          ${
            data.testimonialText
              ? `
          <div class="question">
            <span class="question-label">Testimonial:</span>
            <div class="answer-text">${data.testimonialText}</div>
          </div>
          `
              : ""
          }
        </div>

        <div class="meta">
          This feedback report was generated on ${new Date().toLocaleString("en-US")}
        </div>
      </body>
    </html>
  `

  // Create a new window with the HTML content
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()

    // Wait for content to load, then trigger print dialog
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}
