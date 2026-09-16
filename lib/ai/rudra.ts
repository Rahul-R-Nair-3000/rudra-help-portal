"use server";

import Groq from "groq-sdk";
import { ConversationStep, ConversationData } from "@/lib/chat/conversationReducer";

export interface RudraReplyResult {
  reply: string;
  extractedValue: string | null;
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function getRudraReply(
  currentStep: ConversationStep,
  collectedFields: ConversationData,
  visitorMessage: string
): Promise<RudraReplyResult> {
  const fallbackResult: RudraReplyResult = {
    reply: "Sorry, static on the line — can you say that again?",
    extractedValue: null,
  };

  if (!process.env.GROQ_API_KEY) {
    console.warn("GROQ_API_KEY is not configured in process.env.");
    return fallbackResult;
  }

  const systemPrompt = `You are Rudra, a stoic and empathetic guardian listening through the storm. You receive visitors' burdens with ancient wisdom, calm strength, and deep compassion.

Your objective is to conduct a step-by-step intake conversation to gather visitor information.

CURRENT CONVERSATION STEP: ${currentStep}
ALREADY COLLECTED DATA: ${JSON.stringify(collectedFields)}
VISITOR MESSAGE: "${visitorMessage}"

STEP-BY-STEP EXTRACTION INSTRUCTIONS:
- If CURRENT CONVERSATION STEP is "NAME": Extract the visitor's name into extractedValue. If unclear or absent, set extractedValue to null.
- If CURRENT CONVERSATION STEP is "AGE": Extract just the numeric age as a string (e.g., "25") into extractedValue. If not a valid age number, set extractedValue to null.
- If CURRENT CONVERSATION STEP is "LOCATION": Extract the visitor's city, state, or location into extractedValue. If absent, set extractedValue to null.
- If CURRENT CONVERSATION STEP is "EMAIL": Extract the visitor's email address into extractedValue. If not a valid email, set extractedValue to null.
- If CURRENT CONVERSATION STEP is "GRIEVANCE": Extract the visitor's burden or grievance details into extractedValue.

CRISIS SAFETY INSTRUCTIONS:
If a message expresses suicidal thoughts, self-harm, abuse, or any crisis-level danger, do not try to resolve it yourself and do not simply validate the feeling and move on. In the same reply, warmly and clearly say something like: 'What you're carrying sounds heavy, and you don't have to carry it alone — please reach out to Tele MANAS at 14416 or 1-800-891-4416, it's free, confidential, and available right now.' Include this every time crisis language appears, even if the visitor changes the subject afterward, even mid-conversation at any step.

STRICT JSON RESPONSE FORMAT:
You MUST return ONLY a JSON object matching this exact TypeScript structure:
{
  "reply": "Your in-character response acknowledging what they said and guiding them to the current or next step",
  "extractedValue": "Extracted string value OR null"
}

Maintain a calm, solemn, empathetic, and protective tone as Rudra. Do not break character. Do not include markdown code block formatting outside the raw JSON.`;

  try {
    let completion;
    try {
      // Primary model: llama-3.3-70b-versatile guarantees pure JSON completion without compound tool-use side effects
      completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: visitorMessage },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 350,
      });
    } catch (primaryModelErr) {
      console.warn("Primary model llama-3.3-70b-versatile unavailable, falling back to groq/compound:", primaryModelErr);
      // Fallback model if primary model ID is unavailable on account
      completion = await groq.chat.completions.create({
        model: "groq/compound",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: visitorMessage },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 350,
      });
    }

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return fallbackResult;
    }

    const parsed = JSON.parse(content) as { reply?: string; extractedValue?: string | null };

    return {
      reply: typeof parsed.reply === "string" && parsed.reply.trim()
        ? parsed.reply.trim()
        : fallbackResult.reply,
      extractedValue: typeof parsed.extractedValue === "string"
        ? parsed.extractedValue.trim()
        : null,
    };
  } catch (error) {
    console.error("Error invoking Groq API in getRudraReply:", error);
    return fallbackResult;
  }
}
