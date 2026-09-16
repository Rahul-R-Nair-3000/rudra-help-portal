"use server";

import { Resend } from "resend";
import { VisitorRequest } from "@/types/visitor-request";
import { GrievanceEmail } from "@/emails/GrievanceEmail";
import { render } from "@react-email/render";
import { z } from "zod";

const VisitorRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be between 2 and 50 characters.")
    .max(50, "Name must be between 2 and 50 characters.")
    .refine((val) => !/[.!?]/.test(val), "Name cannot contain full sentences or ending punctuation.")
    .refine((val) => val.split(/\s+/).filter(Boolean).length <= 4, "Name cannot exceed 4 words."),
  age: z
    .number()
    .int("Age must be a whole number.")
    .min(1, "Age must be between 1 and 120.")
    .max(120, "Age must be between 1 and 120."),
  location: z
    .string()
    .trim()
    .min(2, "Location must be between 2 and 50 characters.")
    .max(50, "Location must be between 2 and 50 characters.")
    .refine((val) => !/[.!?]/.test(val), "Location cannot contain full sentences or ending punctuation.")
    .refine((val) => val.split(/\s+/).filter(Boolean).length <= 4, "Location cannot exceed 4 words."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address."),
  grievance: z
    .string()
    .trim()
    .min(1, "Grievance details cannot be empty.")
    .max(2000, "Grievance cannot exceed 2000 characters."),
  submittedAt: z
    .string()
    .min(1, "Submission timestamp is required."),
});

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

export async function sendGrievanceEmail(request: VisitorRequest): Promise<SendEmailResult> {
  // Server-side re-validation (never trust client state alone)
  const validationResult = VisitorRequestSchema.safeParse(request);

  if (!validationResult.success) {
    const firstIssue = validationResult.error.issues[0]?.message || "Invalid request payload.";
    return {
      success: false,
      error: `Server validation failed: ${firstIssue}`,
    };
  }

  const validatedData = validationResult.data;

  // Retrieve environment variables securely on the server
  const apiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CANDIDATE_EMAIL;

  if (!apiKey || apiKey.includes("your_resend_api_key")) {
    return {
      success: false,
      error: "Resend API key (RESEND_API_KEY) is missing or not configured in .env.local.",
    };
  }

  if (!targetEmail || targetEmail.includes("your_candidate_email")) {
    return {
      success: false,
      error: "Recipient candidate email (CANDIDATE_EMAIL) is missing or not configured in .env.local.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const emailHtml = await render(GrievanceEmail(validatedData));

    const { error } = await resend.emails.send({
      from: "Rudra Sentinel <onboarding@resend.dev>",
      to: [targetEmail],
      subject: "🦸 Someone Needs Your Help!",
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API error response:", error);
      return {
        success: false,
        error: error.message || "Failed to dispatch email transmission via Resend.",
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error in sendGrievanceEmail server action:", err);
    return {
      success: false,
      error: err?.message || "An unexpected server error occurred during transmission.",
    };
  }
}
