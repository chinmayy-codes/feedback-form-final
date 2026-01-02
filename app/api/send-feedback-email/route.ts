import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const OWNER_EMAIL = "studio.chinmayy@gmail.com"; // Updated owner email

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[v0] RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const formData = await request.json();

    if (
      !formData.responseEmail ||
      typeof formData.responseEmail !== "string" ||
      !formData.responseEmail.includes("@")
    ) {
      console.error("[v0] Invalid email address:", formData.responseEmail);
      return NextResponse.json(
        { error: "Invalid email address provided" },
        { status: 400 }
      );
    }

    const clientEmail = formData.responseEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      console.error("[v0] Email failed regex validation:", clientEmail);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log(
      "[v0] Sending emails to client:",
      clientEmail,
      "and owner:",
      OWNER_EMAIL
    );

    const clientEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #1a1a1a; 
              background-color: #f9fafb;
            }
            .email-wrapper { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #ffffff;
            }
            .header {
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: #ffffff;
              font-size: 28px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .header p {
              color: #e5e5e5;
              font-size: 16px;
            }
            .automated-notice {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 16px 24px;
              margin: 0;
            }
            .automated-notice p {
              color: #92400e;
              font-size: 14px;
              margin: 0;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 18px;
              color: #1a1a1a;
              margin-bottom: 24px;
              font-weight: 500;
            }
            .intro-text {
              font-size: 16px;
              color: #4b5563;
              margin-bottom: 32px;
              line-height: 1.7;
            }
            .section-title {
              color: #1a1a1a;
              font-size: 20px;
              font-weight: 600;
              margin: 32px 0 16px 0;
              padding-bottom: 8px;
              border-bottom: 2px solid #e5e7eb;
            }
            .info-row {
              display: flex;
              padding: 12px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .info-label {
              font-weight: 600;
              color: #1a1a1a;
              min-width: 200px;
              font-size: 14px;
            }
            .info-value {
              color: #4b5563;
              font-size: 14px;
              flex: 1;
            }
            .rating-badge {
              display: inline-block;
              background: #f3f4f6;
              padding: 4px 12px;
              border-radius: 6px;
              font-weight: 500;
              font-size: 14px;
              color: #1a1a1a;
            }
            .testimonial-box {
              background: #f9fafb;
              border-left: 4px solid #1a1a1a;
              padding: 20px;
              margin: 20px 0;
              font-style: italic;
              color: #4b5563;
            }
            .footer {
              background: #f9fafb;
              padding: 32px 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer-text {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 16px;
            }
            .contact-info {
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .contact-info p {
              color: #4b5563;
              font-size: 14px;
              margin-bottom: 12px;
            }
            .contact-email {
              color: #1a1a1a;
              font-weight: 600;
              text-decoration: none;
              font-size: 16px;
            }
            .brand-signature {
              color: #1a1a1a;
              font-weight: 600;
              font-size: 16px;
              margin-top: 20px;
            }
            @media only screen and (max-width: 600px) {
              .content { padding: 24px 20px; }
              .header { padding: 32px 20px; }
              .info-row { flex-direction: column; }
              .info-label { min-width: auto; margin-bottom: 4px; }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="header">
              <h1>Thank You for Your Feedback</h1>
              <p> Feedback Portal</p>
            </div>
            
            <div class="automated-notice">
              <p><strong>⚠️ Automated Email - Do Not Reply</strong><br>This is an automatically generated email from our feedback system. Please do not reply to this message.</p>
            </div>
            
            <div class="content">
              <p class="greeting">Hello ${formData.clientName},</p>
              
              <p class="intro-text">
                Thank you for taking the time to provide your valuable feedback. We truly appreciate your detailed input as it helps us continuously improve our services and better serve clients like you.
              </p>
              
              <p class="intro-text">
                Below is a summary of your feedback submission for your records.
              </p>

              <h2 class="section-title">📋 Personal Details</h2>
              <div class="info-row">
                <span class="info-label">Full Name</span>
                <span class="info-value">${formData.clientName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Company</span>
                <span class="info-value">${formData.companyName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email</span>
                <span class="info-value">${formData.responseEmail}</span>
              </div>

              <h2 class="section-title">🎬 Project Information</h2>
              <div class="info-row">
                <span class="info-label">Content Type</span>
                <span class="info-value">${formData.contentType}${
      formData.contentTypeOther ? ` (${formData.contentTypeOther})` : ""
    }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Number of Edits</span>
                <span class="info-value">${formData.numberOfEdits}${
      formData.numberOfEditsOther ? ` (${formData.numberOfEditsOther})` : ""
    }</span>
              </div>

              <h2 class="section-title">⭐ Overall Service Evaluation</h2>
              <div class="info-row">
                <span class="info-label">Overall Quality</span>
                <span class="info-value"><span class="rating-badge">${
                  formData.overallQuality
                }</span></span>
              </div>
              <div class="info-row">
                <span class="info-label">Met Expectations</span>
                <span class="info-value"><span class="rating-badge">${
                  formData.metExpectations
                }</span></span>
              </div>

              <h2 class="section-title">🎨 Technical & Creative Quality</h2>
              <div class="info-row">
                <span class="info-label">Overall Editing Quality</span>
                <span class="info-value">${formData.editingQuality}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Style Alignment</span>
                <span class="info-value">${formData.styleAlignment}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Video Pacing</span>
                <span class="info-value">${formData.videoPacing}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Transitions</span>
                <span class="info-value">${formData.transitions}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Caption Quality</span>
                <span class="info-value">${formData.captionQuality}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Text Animations</span>
                <span class="info-value">${formData.textAnimations}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Sound Effects</span>
                <span class="info-value">${formData.soundEffects}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Background Music</span>
                <span class="info-value">${formData.backgroundMusic}</span>
              </div>

              <h2 class="section-title">💬 Communication & Responsiveness</h2>
              <div class="info-row">
                <span class="info-label">Communication Clarity</span>
                <span class="info-value">${formData.communicationClarity}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Timely Replies</span>
                <span class="info-value">${formData.timelyReplies}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Instructions Handled</span>
                <span class="info-value">${formData.instructionsHandled}</span>
              </div>

              <h2 class="section-title">🤝 Professional Conduct & Behaviour</h2>
              <div class="info-row">
                <span class="info-label">Professional Behaviour</span>
                <span class="info-value">${
                  formData.professionalBehaviour
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Cooperative & Respectful</span>
                <span class="info-value">${
                  formData.cooperativeAndRespectful
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Revision Handling</span>
                <span class="info-value">${formData.revisionHandling}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Professional During Feedback</span>
                <span class="info-value">${
                  formData.professionDuringFeedback
                }</span>
              </div>

              <h2 class="section-title">⏰ Timelines & Delivery</h2>
              <div class="info-row">
                <span class="info-label">Delivery Timeliness</span>
                <span class="info-value">${formData.deliveryTimeliness}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Revision Turnaround</span>
                <span class="info-value">${formData.revisionTurnaround}</span>
              </div>

              <h2 class="section-title">💎 Value & Output Assessment</h2>
              <div class="info-row">
                <span class="info-label">Overall Value</span>
                <span class="info-value">${formData.overallValue}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Performance vs Objectives</span>
                <span class="info-value">${
                  formData.performanceObjectives
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Pricing Review</span>
                <span class="info-value">${
                  formData.pricingReview || "Not provided"
                }</span>
              </div>

              ${
                formData.aspectsWellHandled ||
                formData.areasForImprovement ||
                formData.additionalComments
                  ? `
                <h2 class="section-title">📝 Additional Feedback</h2>
                ${
                  formData.aspectsWellHandled
                    ? `
                  <div class="info-row">
                    <span class="info-label">Aspects Well Handled</span>
                    <span class="info-value">${formData.aspectsWellHandled}</span>
                  </div>
                `
                    : ""
                }
                ${
                  formData.areasForImprovement
                    ? `
                  <div class="info-row">
                    <span class="info-label">Areas for Improvement</span>
                    <span class="info-value">${formData.areasForImprovement}</span>
                  </div>
                `
                    : ""
                }
                ${
                  formData.additionalComments
                    ? `
                  <div class="info-row">
                    <span class="info-label">Additional Comments</span>
                    <span class="info-value">${formData.additionalComments}</span>
                  </div>
                `
                    : ""
                }
              `
                  : ""
              }

              ${
                formData.testimonialText
                  ? `
                <h2 class="section-title">✨ Testimonial</h2>
                <div class="testimonial-box">
                  "${formData.testimonialText}"
                </div>
                <p style="font-size: 14px; color: #6b7280; margin-top: 8px;">
                  Consent to use as testimonial: <strong>${formData.testimonialConsent}</strong>
                </p>
              `
                  : ""
              }

              <div class="contact-info">
                <p><strong>Have questions or need support?</strong></p>
                <p>Feel free to reach out to us at:</p>
                <a href="mailto:studio.chinmayy@gmail.com" class="contact-email">studio.chinmayy@gmail.com</a>
              </div>

              <p style="margin-top: 32px; color: #4b5563; font-size: 14px;">
                A copy of this feedback has been sent to your email for your records.
              </p>

              <p class="brand-signature">
                Best regards,<br>
                Chinmay Team
              </p>
            </div>

            <div class="footer">
              <p class="footer-text">
                © ${new Date().getFullYear()} Chinmay. All rights reserved.
              </p>
              <p class="footer-text">
                This email was sent from our automated feedback portal at<br>
                <strong>feedback.chinmaytech.in</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const ownerEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .celebration { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
            .celebration h1 { color: white; margin: 0; font-size: 32px; }
            .celebration p { color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px; }
            .client-info { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            h2 { color: #000; margin-top: 30px; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
            p { margin: 8px 0; }
            strong { color: #000; }
            .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="celebration">
            <h1>🎉 Congratulations!</h1>
            <p>You have received new feedback from ${formData.clientName}</p>
          </div>
          
          <div class="client-info">
            <h2>Client Information</h2>
            <p><strong>Name:</strong> ${formData.clientName}</p>
            <p><strong>Company:</strong> ${formData.companyName}</p>
            <p><strong>Email:</strong> ${formData.responseEmail}</p>
          </div>
          
          <h2>Project Information</h2>
          <p><strong>Content Type:</strong> ${formData.contentType}${
      formData.contentTypeOther ? ` (${formData.contentTypeOther})` : ""
    }</p>
          <p><strong>Number of Edits:</strong> ${formData.numberOfEdits}${
      formData.numberOfEditsOther ? ` (${formData.numberOfEditsOther})` : ""
    }</p>
          
          <h2>Overall Service Evaluation</h2>
          <p><strong>Overall Quality:</strong> <span class="highlight">${
            formData.overallQuality
          }</span></p>
          <p><strong>Met Expectations:</strong> <span class="highlight">${
            formData.metExpectations
          }</span></p>
          
          <h2>Technical & Creative Quality</h2>
          <p><strong>Overall Editing Quality:</strong> ${
            formData.editingQuality
          }</p>
          <p><strong>Style Alignment:</strong> ${formData.styleAlignment}</p>
          <p><strong>Video Pacing:</strong> ${formData.videoPacing}</p>
          <p><strong>Transitions:</strong> ${formData.transitions}</p>
          <p><strong>Caption Quality:</strong> ${formData.captionQuality}</p>
          <p><strong>Text Animations:</strong> ${formData.textAnimations}</p>
          <p><strong>Sound Effects:</strong> ${formData.soundEffects}</p>
          <p><strong>Background Music:</strong> ${formData.backgroundMusic}</p>
          
          <h2>Communication & Responsiveness</h2>
          <p><strong>Clarity of Communication:</strong> ${
            formData.communicationClarity
          }</p>
          <p><strong>Timely Replies:</strong> ${formData.timelyReplies}</p>
          <p><strong>Instructions Handled:</strong> ${
            formData.instructionsHandled
          }</p>
          
          <h2>Professional Conduct</h2>
          <p><strong>Professional Behaviour:</strong> ${
            formData.professionalBehaviour
          }</p>
          <p><strong>Cooperative & Respectful:</strong> ${
            formData.cooperativeAndRespectful
          }</p>
          <p><strong>Revision Handling:</strong> ${
            formData.revisionHandling
          }</p>
          <p><strong>Profession During Feedback:</strong> ${
            formData.professionDuringFeedback
          }</p>
          
          <h2>Timelines & Delivery</h2>
          <p><strong>Delivery Timeliness:</strong> ${
            formData.deliveryTimeliness
          }</p>
          <p><strong>Revision Turnaround:</strong> ${
            formData.revisionTurnaround
          }</p>
          
          <h2>Value & Output Assessment</h2>
          <p><strong>Overall Value:</strong> ${formData.overallValue}</p>
          <p><strong>Performance vs Objectives:</strong> ${
            formData.performanceObjectives
          }</p>
          <p><strong>Pricing Review:</strong> ${
            formData.pricingReview || "N/A"
          }</p>
          
          <h2>Additional Feedback</h2>
          <p><strong>Aspects Well Handled:</strong> ${
            formData.aspectsWellHandled || "N/A"
          }</p>
          <p><strong>Areas for Improvement:</strong> ${
            formData.areasForImprovement || "N/A"
          }</p>
          <p><strong>Additional Comments:</strong> ${
            formData.additionalComments || "N/A"
          }</p>
          
          <h2>Testimonial</h2>
          <p><strong>Use as Testimonial:</strong> ${
            formData.testimonialConsent
          }</p>
          ${
            formData.testimonialText
              ? `<p><strong>Testimonial:</strong> "${formData.testimonialText}"</p>`
              : ""
          }
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Sent from Chinmay Feedback Portal - feedback.chinmaytech.in
          </p>
        </body>
      </html>
    `;

    // Send client email
    const clientEmailResult = await resend.emails.send({
      from:"Feedback <no-reply@chinmaytech.in>",
      to: clientEmail,
      subject: "Thank You for Your Feedback - Chinmay",
      html: clientEmailContent,
    });

    // Check if client email failed
    if (clientEmailResult.error) {
      console.error("[v0] Client email error:", clientEmailResult.error);
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: clientEmailResult.error.message,
        },
        { status: 500 }
      );
    }

    // Send owner email
    const ownerEmailResult = await resend.emails.send({
      from: " Feedback <no-reply@chinmaytech.in>",
      to: OWNER_EMAIL,
      subject: `New Feedback Received from ${formData.clientName}`,
      html: ownerEmailContent,
    });

    // Check if owner email failed
    if (ownerEmailResult.error) {
      console.error("[v0] Owner email error:", ownerEmailResult.error);
      // Still return success if client email was sent
      return NextResponse.json({
        success: true,
        message: "Client email sent, but owner notification failed",
        warning: ownerEmailResult.error.message,
      });
    }

    console.log("[v0] Client email sent:", clientEmailResult.data?.id);
    console.log("[v0] Owner email sent:", ownerEmailResult.data?.id);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      clientEmailId: clientEmailResult.data?.id,
      ownerEmailId: ownerEmailResult.data?.id,
    });
  } catch (error: any) {
    console.error("[v0] Error sending emails:", error);
    return NextResponse.json(
      {
        error: "Failed to send emails",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
