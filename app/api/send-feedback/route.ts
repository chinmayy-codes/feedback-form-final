import { type NextRequest, NextResponse } from "next/server"

type FeedbackData = {
  // Step 1: Email
  clientEmail: string

  // Section 1: Project Information
  contentType: string
  contentTypeOther: string
  numberOfEdits: string
  numberOfEditsOther: string

  // Section 2: Overall Service Evaluation
  overallQuality: string
  metExpectations: string

  // Section 3: Technical & Creative Quality
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

  // Section 4: Communication & Responsiveness
  communicationClarity: string
  timelyReplies: string
  instructionsHandled: string

  // Section 5: Professional Conduct & Behaviour
  professionalBehaviour: string
  cooperativeAndRespectful: string
  revisionHandling: string
  professionDuringFeedback: string

  // Section 6: Timelines & Delivery
  deliveryTimeliness: string
  revisionTurnaround: string

  // Section 7: Value & Output Assessment
  overallValue: string
  performanceObjectives: string

  // Section 8: Feedback & Observations
  aspectsWellHandled: string
  areasForImprovement: string
  additionalComments: string

  // Section 9: Testimonial Consent
  testimonialConsent: string
  testimonialText: string
}

function generateEmailHTML(data: FeedbackData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #334155; max-width: 800px; margin: 0 auto; padding: 20px; background: #f8fafc; }
          .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          h1 { color: #0f172a; border-bottom: 3px solid #0f172a; padding-bottom: 10px; margin-bottom: 20px; }
          h2 { color: #1e293b; margin-top: 30px; margin-bottom: 15px; font-size: 18px; }
          .header-info { background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #0f172a; }
          .section { margin-bottom: 25px; }
          .question { margin-bottom: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
          .label { font-weight: 600; color: #475569; display: block; margin-bottom: 5px; font-size: 14px; }
          .answer { color: #0f172a; padding-left: 15px; }
          .answer-text { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 5px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
          .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 3px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Client Feedback Received</h1>
          
          <div class="header-info">
            <p><strong>Client Email:</strong> ${data.clientEmail}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
          </div>

          <h2>SECTION 1: Project Information</h2>
          <div class="section">
            <div class="question">
              <span class="label">Type of content delivered:</span>
              <div class="answer">${data.contentType === "other" ? data.contentTypeOther : data.contentType}</div>
            </div>
            <div class="question">
              <span class="label">Number of edits delivered:</span>
              <div class="answer">${data.numberOfEdits === "other" ? data.numberOfEditsOther : data.numberOfEdits}</div>
            </div>
          </div>

          <h2>SECTION 2: Overall Service Evaluation</h2>
          <div class="section">
            <div class="question">
              <span class="label">Overall quality of service:</span>
              <div class="answer"><span class="highlight">${data.overallQuality}</span></div>
            </div>
            <div class="question">
              <span class="label">Met expectations:</span>
              <div class="answer"><span class="highlight">${data.metExpectations}</span></div>
            </div>
          </div>

          <h2>SECTION 3: Technical & Creative Quality</h2>
          <div class="section">
            <div class="question">
              <span class="label">Overall editing quality:</span>
              <div class="answer">${data.editingQuality}</div>
            </div>
            <div class="question">
              <span class="label">Video pacing and flow:</span>
              <div class="answer">${data.videoPacing}</div>
            </div>
            <div class="question">
              <span class="label">Transitions and continuity:</span>
              <div class="answer">${data.transitions}</div>
            </div>
            <div class="question">
              <span class="label">Caption quality and placement:</span>
              <div class="answer">${data.captionQuality}</div>
            </div>
            <div class="question">
              <span class="label">Text animations:</span>
              <div class="answer">${data.textAnimations}</div>
            </div>
            <div class="question">
              <span class="label">Sound effects integration:</span>
              <div class="answer">${data.soundEffects}</div>
            </div>
            <div class="question">
              <span class="label">Background music selection:</span>
              <div class="answer">${data.backgroundMusic}</div>
            </div>
            <div class="question">
              <span class="label">Visual consistency across edits:</span>
              <div class="answer">${data.visualConsistency}</div>
            </div>
            <div class="question">
              <span class="label">Compliance with YouTube Shorts format:</span>
              <div class="answer">${data.shortsCompliance}</div>
            </div>
            <div class="question">
              <span class="label">Style alignment with brand:</span>
              <div class="answer">${data.styleAlignment}</div>
            </div>
          </div>

          <h2>SECTION 4: Communication & Responsiveness</h2>
          <div class="section">
            <div class="question">
              <span class="label">Communication clarity:</span>
              <div class="answer">${data.communicationClarity}</div>
            </div>
            <div class="question">
              <span class="label">Timely replies:</span>
              <div class="answer">${data.timelyReplies}</div>
            </div>
            <div class="question">
              <span class="label">Instructions handled professionally:</span>
              <div class="answer">${data.instructionsHandled}</div>
            </div>
          </div>

          <h2>SECTION 5: Professional Conduct & Behaviour</h2>
          <div class="section">
            <div class="question">
              <span class="label">Professional behaviour:</span>
              <div class="answer">${data.professionalBehaviour}</div>
            </div>
            <div class="question">
              <span class="label">Cooperative and respectful:</span>
              <div class="answer">${data.cooperativeAndRespectful}</div>
            </div>
            <div class="question">
              <span class="label">Revision handling:</span>
              <div class="answer">${data.revisionHandling}</div>
            </div>
            <div class="question">
              <span class="label">Professionalism during feedback:</span>
              <div class="answer">${data.professionDuringFeedback}</div>
            </div>
          </div>

          <h2>SECTION 6: Timelines & Delivery</h2>
          <div class="section">
            <div class="question">
              <span class="label">Delivery timeliness:</span>
              <div class="answer">${data.deliveryTimeliness}</div>
            </div>
            <div class="question">
              <span class="label">Revision turnaround satisfaction:</span>
              <div class="answer">${data.revisionTurnaround}</div>
            </div>
          </div>

          <h2>SECTION 7: Value & Output Assessment</h2>
          <div class="section">
            <div class="question">
              <span class="label">Overall value:</span>
              <div class="answer"><span class="highlight">${data.overallValue}</span></div>
            </div>
            <div class="question">
              <span class="label">Performance objectives met:</span>
              <div class="answer">${data.performanceObjectives}</div>
            </div>
          </div>

          <h2>SECTION 8: Feedback & Observations</h2>
          <div class="section">
            <div class="question">
              <span class="label">Aspects handled particularly well:</span>
              <div class="answer-text">${data.aspectsWellHandled || "No response provided"}</div>
            </div>
            <div class="question">
              <span class="label">Areas requiring improvement:</span>
              <div class="answer-text">${data.areasForImprovement || "No response provided"}</div>
            </div>
            ${
              data.additionalComments
                ? `
            <div class="question">
              <span class="label">Additional comments:</span>
              <div class="answer-text">${data.additionalComments}</div>
            </div>
            `
                : ""
            }
          </div>

          <h2>SECTION 9: Testimonial Consent</h2>
          <div class="section">
            <div class="question">
              <span class="label">Testimonial consent:</span>
              <div class="answer">${data.testimonialConsent}</div>
            </div>
            ${
              data.testimonialText
                ? `
            <div class="question">
              <span class="label">Testimonial:</span>
              <div class="answer-text">${data.testimonialText}</div>
            </div>
            `
                : ""
            }
          </div>

          <div class="footer">
            <p>This feedback was submitted through the Client Feedback Portal</p>
            <p style="margin-top: 10px;">Please review and take appropriate action based on the feedback provided.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const data: FeedbackData = await request.json()

    // Generate email HTML
    const emailHTML = generateEmailHTML(data)

    // In a real application, send email via service like Resend, SendGrid, AWS SES, etc.
    //
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'feedback@chinmay.tech',
    //   to: ['team@yourcompany.com', data.clientEmail],
    //   subject: 'Client Feedback Form Submission - Thank You',
    //   html: emailHTML,
    // })

    console.log("Feedback received from:", data.clientEmail)

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully. Email sent to client and team.",
    })
  } catch (error) {
    console.error("Error processing feedback:", error)
    return NextResponse.json({ success: false, message: "Failed to process feedback" }, { status: 500 })
  }
}
