"use client";

import React, { useState, useRef, useEffect, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Shield,
  Sparkles,
  RefreshCw,
  User,
  Bot,
  AlertCircle,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  conversationReducer,
  initialConversationState,
  ConversationStep,
} from "@/lib/chat/conversationReducer";
import { getRudraReply } from "@/lib/ai/rudra";
import { sendGrievanceEmail } from "@/lib/email/sendGrievanceEmail";
import { VisitorRequest } from "@/types/visitor-request";

export function ChatWindow() {
  const [state, dispatch] = useReducer(conversationReducer, initialConversationState);
  const [inputText, setInputText] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const clientTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    dispatch({ type: "INIT_TIMESTAMP", payload: clientTimestamp });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, state.step, state.validationError]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = inputText.trim();
    if (!textToSend || state.step === "CONFIRM" || state.step === "SUCCESS" || isLoadingAi) return;

    setInputText("");
    setIsLoadingAi(true);

    try {
      const result = await getRudraReply(state.step, state.data, textToSend);
      dispatch({
        type: "SUBMIT_INPUT",
        payload: {
          visitorText: textToSend,
          valueToValidate: result.extractedValue ?? textToSend,
          rudraReply: result.reply,
        },
      });
    } catch (err) {
      console.error("Failed to fetch Rudra AI reply:", err);
      dispatch({
        type: "SUBMIT_INPUT",
        payload: {
          visitorText: textToSend,
          valueToValidate: textToSend,
          rudraReply: "Sorry, static on the line — can you say that again?",
        },
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleConfirmSubmit = async () => {
    if (state.step === "SUBMITTING" || state.isSubmitting) return;

    dispatch({ type: "CONFIRM_SUBMIT" });

    const submissionTime = new Date().toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const visitorPayload: VisitorRequest = {
      name: state.data.name,
      age: state.data.age ?? 0,
      location: state.data.location,
      email: state.data.email,
      grievance: state.data.grievance,
      submittedAt: submissionTime,
    };

    try {
      const result = await sendGrievanceEmail(visitorPayload);
      if (result.success) {
        dispatch({ type: "SUBMIT_SUCCESS" });
      } else {
        dispatch({
          type: "SUBMIT_ERROR",
          payload: result.error || "Failed to deliver grievance transmission email.",
        });
      }
    } catch (err: any) {
      console.error("Unexpected submission error:", err);
      dispatch({
        type: "SUBMIT_ERROR",
        payload: err?.message || "An unexpected error occurred during transmission.",
      });
    }
  };

  const handleResetChat = () => {
    dispatch({ type: "RESET" });
    setInputText("");
  };

  // Helper for step-specific input placeholders
  const getPlaceholder = (step: ConversationStep): string => {
    switch (step) {
      case "WELCOME":
      case "NAME":
        return "Enter your full name...";
      case "AGE":
        return "Enter your age (1-120)...";
      case "LOCATION":
        return "Enter your city or region...";
      case "EMAIL":
        return "Enter your email (name@domain.com)...";
      case "GRIEVANCE":
        return "Describe your burden (up to 2000 chars)...";
      case "CONFIRM":
      case "SUBMITTING":
        return "Review transmission details above...";
      case "SUCCESS":
        return "Transmission recorded. Sanctuary listening complete.";
      case "ERROR":
        return "Submission failed. Review error above...";
      default:
        return "Type your response...";
    }
  };

  // Helper for step-specific prompt chips
  const getPromptChips = (step: ConversationStep): string[] => {
    switch (step) {
      case "NAME":
        return ["Alex Mercer", "Jordan Reed", "Sam Taylor"];
      case "AGE":
        return ["24", "32", "45"];
      case "LOCATION":
        return ["Metropolis", "New York", "London"];
      case "EMAIL":
        return ["visitor@example.com", "alex@domain.org"];
      case "GRIEVANCE":
        return ["The overwhelming noise of daily turmoil is heavy.", "Seeking calm in the storm."];
      default:
        return [];
    }
  };

  return (
    <div id="chatbot" className="relative max-w-5xl mx-auto w-full px-2 sm:px-4 py-8 sm:py-12 md:py-16 [overflow-x:clip]">
      {/* Two Big Heavenly Celestial Storms in Background */}
      <HeavenlyCelestialStorms />

      {/* Outer Card Container with Glow Border */}
      <div className="rudra-card glow-border-amber rounded-xl sm:rounded-2xl border border-[#3A4054] shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-[520px] xs:h-[580px] sm:h-[650px] md:h-[700px] max-h-[85vh] relative z-10 w-full">
        
        {/* Header Bar - Responsive for 375px Mobile */}
        <div className="bg-[#141722] border-b border-[#232838] px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Rudra Core Avatar */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F5B942] text-[#0C0E14] font-extrabold font-heading flex items-center justify-center text-sm sm:text-base shadow-[0_0_15px_rgba(245,185,66,0.4)]">
                R
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#22C55E] rounded-full border-2 border-[#141722]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-heading font-bold text-white text-xs sm:text-base tracking-wide flex items-center gap-1.5 truncate">
                  RUDRA SENTINEL
                </h3>
                <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-semibold uppercase bg-[#F5B942]/15 text-[#F5B942] border border-[#F5B942]/30 shrink-0">
                  {state.step}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#94A3B8] font-sans flex items-center gap-1 mt-0.5 truncate">
                <Shield className="w-3 h-3 text-[#F5B942] shrink-0" /> Validation Pipeline Active
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="p-1.5 sm:p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#232733] transition-colors border border-transparent hover:border-[#3A4054] flex items-center gap-1 text-[11px] sm:text-xs font-mono shrink-0"
            title="Reset Session"
          >
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Reset</span>
          </button>
        </div>

        {/* Always-visible Crisis Support Banner */}
        <div className="bg-[#181C28] border-b border-[#232838] px-3 sm:px-4 py-1.5 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-[#94A3B8] font-sans text-center shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shrink-0" />
          <span>If you&apos;re in crisis, Tele MANAS is available 24/7: <strong className="text-white font-mono font-semibold">14416 / 1-800-891-4416</strong></span>
        </div>

        {/* Messages Container Area - Responsive for 375px Mobile */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-[#0C0E14]/75 backdrop-blur-md relative">
          {/* VUI Soundwave Voice Aura Background */}
          <VUIVoiceAuraBackground isProcessing={isLoadingAi} />
          {/* Session Start Divider */}
          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-mono text-[#64748B] bg-[#141722] border border-[#232838] text-center leading-tight">
              SANCTUARY PROTOCOL • STATE: {state.step}
            </span>
          </div>

          {/* Animated Message List */}
          <AnimatePresence initial={false}>
            {state.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex gap-2 sm:gap-3 ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`}
              >
                {/* Rudra Avatar */}
                {msg.sender === "rudra" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141722] border border-[#F5B942]/40 text-[#F5B942] font-bold font-heading flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(245,185,66,0.2)]">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5B942]" />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div className={`max-w-[88%] sm:max-w-[75%] space-y-1 ${msg.sender === "visitor" ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#94A3B8]">
                      {msg.sender === "rudra" ? "Rudra" : "Visitor"}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#64748B]">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={
                      (msg.sender === "rudra"
                        ? "chat-bubble-rudra"
                        : "chat-bubble-visitor") +
                      " text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere]"
                    }
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Visitor Avatar */}
                {msg.sender === "visitor" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C2130] border border-[#2D3448] text-[#E2E8F0] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#94A3B8]" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* CONFIRM / SUBMITTING SCREEN SUMMARY CARD - Responsive for 375px */}
          {(state.step === "CONFIRM" || state.step === "SUBMITTING") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rudra-card p-4 sm:p-6 border border-[#F5B942]/50 glow-border-amber space-y-3 sm:space-y-4 max-w-xl mx-auto my-3"
            >
              <div className="flex items-center justify-between border-b border-[#232838] pb-2.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5B942]" />
                  <h4 className="font-heading font-bold text-white text-sm sm:text-lg">
                    Transmission Summary
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-semibold uppercase bg-[#F5B942]/20 text-[#F5B942]">
                  {state.step === "SUBMITTING" ? "Transmitting..." : "Ready to Submit"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs font-sans">
                <div className="p-2 sm:p-2.5 rounded-lg bg-[#141722] border border-[#232838] flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#F5B942] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[9px] uppercase font-mono">Name</span>
                    <strong className="text-white text-xs sm:text-sm truncate block">{state.data.name}</strong>
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-[#141722] border border-[#232838] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#F5B942] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[9px] uppercase font-mono">Age</span>
                    <strong className="text-white text-xs sm:text-sm block">{state.data.age}</strong>
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-[#141722] border border-[#232838] flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B942] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[9px] uppercase font-mono">Location</span>
                    <strong className="text-white text-xs sm:text-sm truncate block">{state.data.location}</strong>
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-[#141722] border border-[#232838] flex items-center gap-2 sm:col-span-2">
                  <Mail className="w-3.5 h-3.5 text-[#F5B942] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[#64748B] block text-[9px] uppercase font-mono">Email</span>
                    <strong className="text-white text-xs sm:text-sm truncate block">{state.data.email}</strong>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-[#141722] border border-[#232838] sm:col-span-2 space-y-1">
                  <span className="text-[#64748B] block text-[9px] uppercase font-mono">Grievance / Burden</span>
                  <p className="text-white text-xs leading-relaxed italic break-words">
                    &ldquo;{state.data.grievance}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleResetChat}
                  disabled={state.step === "SUBMITTING" || state.isSubmitting}
                  className="btn-secondary text-xs px-3.5 py-2 w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Edit / Restart
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  disabled={state.step === "SUBMITTING" || state.isSubmitting}
                  className="btn-primary text-xs px-4 py-2 font-bold shadow-[0_0_15px_rgba(245,185,66,0.4)] w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.step === "SUBMITTING" || state.isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#0C0E14]" />
                      <span>Submitting Transmission...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ERROR SCREEN CARD WITH RETRY OPTION */}
          {state.step === "ERROR" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rudra-card p-4 sm:p-6 border border-[#EF4444]/60 bg-[#1A1418]/90 space-y-3 sm:space-y-4 max-w-xl mx-auto my-3"
            >
              <div className="flex items-center justify-between border-b border-[#EF4444]/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                  <h4 className="font-heading font-bold text-white text-sm sm:text-base">
                    Transmission Error
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-semibold uppercase bg-[#EF4444]/20 text-[#EF4444]">
                  Delivery Failed
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#28181C] border border-[#EF4444]/30 text-xs text-[#FCA5A5] leading-relaxed">
                {state.validationError || "An error occurred while attempting to send your transmission."}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="btn-secondary text-xs px-3.5 py-2 w-full sm:w-auto"
                >
                  Edit Details / Reset
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="btn-primary text-xs px-4 py-2 font-bold shadow-[0_0_15px_rgba(245,185,66,0.4)] w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Transmission</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS SCREEN CARD WITH FRAMER MOTION GLOWING CORE PULSE */}
          {state.step === "SUCCESS" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative my-4 max-w-xl mx-auto"
            >
              {/* Soft Brightening Pulse Ambient Glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(245, 185, 66, 0.2), inset 0 0 10px rgba(245, 185, 66, 0.1)",
                    "0 0 45px rgba(245, 185, 66, 0.5), inset 0 0 25px rgba(245, 185, 66, 0.2)",
                    "0 0 15px rgba(245, 185, 66, 0.2), inset 0 0 10px rgba(245, 185, 66, 0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="rudra-card p-5 sm:p-6 border border-[#F5B942]/70 rounded-2xl bg-[#141722] space-y-4 shadow-2xl"
              >
                {/* Header with Glowing Core Emblem */}
                <div className="flex items-center justify-between border-b border-[#232838] pb-3">
                  <div className="flex items-center gap-2.5">
                    {/* Animated Hero Core Orb */}
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-[#F5B942] blur-md"
                      />
                      <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#141722] border border-[#F5B942] flex items-center justify-center text-[#F5B942] shadow-[0_0_15px_rgba(245,185,66,0.4)]">
                        <CheckCircle2 className="w-5 h-5 text-[#F5B942]" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-white text-base sm:text-lg">
                        Sanctuary Archive Confirmed
                      </h4>
                      <p className="text-[10px] sm:text-xs text-[#94A3B8] font-sans">
                        Transmission Acknowledged & Sent
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold uppercase bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/40 shrink-0">
                    Archived & Delivered
                  </span>
                </div>

                {/* In-character Closing Message from Rudra */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#1C2130] border border-[#F5B942]/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#F5B942]">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>RUDRA SENTINEL BROADCAST</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F0F4F8] leading-relaxed italic font-sans">
                    &ldquo;Your transmission has passed through the storm and been recorded into the Rudra Sentinel archive. The candidate guardian has been notified via secure transmission. Stand firm—your burden is acknowledged, and peace be with you through the tempest.&rdquo;
                  </p>
                </div>

                {/* Archived Transmission Summary */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans pt-1">
                  <div className="p-2.5 rounded-lg bg-[#141722] border border-[#232838]">
                    <span className="text-[#64748B] block text-[9px] uppercase font-mono">Visitor</span>
                    <strong className="text-white truncate block">{state.data.name} ({state.data.age})</strong>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#141722] border border-[#232838]">
                    <span className="text-[#64748B] block text-[9px] uppercase font-mono">Location</span>
                    <strong className="text-white truncate block">{state.data.location}</strong>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-2 border-t border-[#232838] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    <span>Protocol Finalized • Locked</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="btn-secondary text-xs px-4 py-2 w-full sm:w-auto font-medium"
                  >
                    Start New Transmission
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Typing Indicator: "Rudra is listening..." */}
          {state.step !== "CONFIRM" && state.step !== "SUBMITTING" && state.step !== "SUCCESS" && state.step !== "ERROR" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 sm:gap-3 text-xs text-[#F5B942] pt-1"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141722] border border-[#F5B942]/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5B942] animate-pulse" />
              </div>
              <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#141722] border border-[#F5B942]/30 flex items-center gap-2 shadow-[0_2px_10px_rgba(245,185,66,0.1)]">
                <span className="font-mono text-[11px] sm:text-xs text-[#F0F4F8]">
                  {isLoadingAi ? "Rudra is reflecting..." : "Rudra is listening"}
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#F5B942] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#F5B942] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#F5B942] rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Validation Error Banner */}
        {state.validationError && state.step !== "ERROR" && state.step !== "CONFIRM" && state.step !== "SUBMITTING" && state.step !== "SUCCESS" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#EF4444]/15 border-t border-b border-[#EF4444]/40 px-4 sm:px-6 py-2 flex items-center gap-2 text-xs text-[#FCA5A5] font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EF4444] shrink-0" />
            <span className="text-[11px] sm:text-xs">{state.validationError}</span>
          </motion.div>
        )}

        {/* Input Bar - Responsive for 375px Mobile */}
        <div className="bg-[#141722] border-t border-[#232838] p-2.5 sm:p-4 shrink-0 sticky bottom-0 z-20 w-full">
          {/* Quick Prompt Chips */}
          {getPromptChips(state.step).length > 0 && (
            <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 overflow-x-auto pb-1 scrollbar-none">
              {getPromptChips(state.step).map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputText(chip)}
                  disabled={state.step === "CONFIRM" || state.step === "SUBMITTING" || state.step === "SUCCESS" || state.step === "ERROR" || isLoadingAi}
                  className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-sans text-[#94A3B8] bg-[#1C2130] border border-[#2D3448] hover:border-[#F5B942]/40 hover:text-white transition-colors shrink-0 disabled:opacity-50 min-h-[36px] flex items-center"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={getPlaceholder(state.step)}
              disabled={state.step === "CONFIRM" || state.step === "SUBMITTING" || state.step === "SUCCESS" || state.step === "ERROR" || isLoadingAi}
              className="flex-1 bg-[#1E2332] text-[#F0F4F8] placeholder-[#64748B] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-[#3A4054] focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-colors text-xs sm:text-sm disabled:opacity-50 font-sans min-w-0 min-h-[44px]"
            />

            <Button
              type="submit"
              disabled={!inputText.trim() || state.step === "CONFIRM" || state.step === "SUBMITTING" || state.step === "SUCCESS" || state.step === "ERROR" || isLoadingAi}
              className="btn-primary h-11 sm:h-12 px-3.5 sm:px-5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shrink-0 min-h-[44px] min-w-[44px]"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function VUIVoiceAuraBackground({ isProcessing }: { isProcessing: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center select-none">
      {/* Central VUI Voice Aura Orb */}
      <div className={`relative w-72 h-72 sm:w-96 sm:h-96 transition-all duration-700 ${isProcessing ? 'scale-110 opacity-70' : 'opacity-40'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5B942]/20 via-[#38BDF8]/20 to-[#A855F7]/20 rounded-full blur-[70px] animate-pulse" style={{ animationDuration: isProcessing ? '2s' : '5s' }} />
        
        {/* Pulsing Concentric Soundwave Rings */}
        <div className={`absolute inset-4 rounded-full border border-[#F5B942]/30 ${isProcessing ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDuration: isProcessing ? '1.5s' : '4s' }} />
        <div className="absolute inset-12 rounded-full border border-[#38BDF8]/30 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-20 rounded-full border border-[#A855F7]/25 animate-pulse" style={{ animationDuration: '4.5s' }} />
      </div>

      {/* Dynamic VUI Soundwave Frequency Bar Visualizer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-50">
        {[40, 70, 30, 85, 50, 95, 60, 40, 80, 55, 90, 45, 65, 35, 75, 50].map((height, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-[#F5B942] to-[#38BDF8] transition-all duration-300"
            style={{
              height: isProcessing ? `${Math.max(14, (height * 0.4))}px` : `${Math.max(6, (height * 0.2))}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function HeavenlyCelestialStorms() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Heavenly Celestial Storm 1 (Top-Left Vortex) */}
      <div className="absolute -top-24 -left-20 sm:-top-36 sm:-left-36 w-[480px] h-[480px] sm:w-[680px] sm:h-[680px] opacity-85 select-none pointer-events-none">
        {/* Deep Ambient Heavenly Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5B942]/25 via-[#38BDF8]/20 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s' }} />

        {/* Swirling Heavenly Celestial SVG Storm Arms */}
        <svg viewBox="0 0 500 500" className="w-full h-full animate-[spin_40s_linear_infinite]">
          <defs>
            <linearGradient id="celestialStorm1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5B942" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#C084FC" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0C0E14" stopOpacity="0" />
            </linearGradient>
            <filter id="celestialGlow1">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Celestial Orbital Tempest Arms */}
          <ellipse cx="250" cy="250" rx="220" ry="90" fill="none" stroke="url(#celestialStorm1)" strokeWidth="3" strokeDasharray="160 90 210 50" transform="rotate(-35 250 250)" filter="url(#celestialGlow1)" />
          <ellipse cx="250" cy="250" rx="180" ry="70" fill="none" stroke="#F8CB68" strokeWidth="2.2" strokeDasharray="90 130" transform="rotate(40 250 250)" opacity="0.8" />
          <ellipse cx="250" cy="250" rx="140" ry="50" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="120 60" transform="rotate(-70 250 250)" opacity="0.85" />
          <ellipse cx="250" cy="250" rx="95" ry="32" fill="none" stroke="#E9D5FF" strokeWidth="1.5" strokeDasharray="70 40" transform="rotate(15 250 250)" opacity="0.9" />

          {/* Heavenly Celestial Eye Core */}
          <circle cx="250" cy="250" r="36" fill="#F5B942" fillOpacity="0.3" filter="url(#celestialGlow1)" />
          <circle cx="250" cy="250" r="14" fill="#FFFFFF" fillOpacity="0.95" filter="url(#celestialGlow1)" />
        </svg>
      </div>

      {/* Heavenly Celestial Storm 2 (Bottom-Right Vortex) */}
      <div className="absolute -bottom-24 -right-20 sm:-bottom-36 sm:-right-36 w-[480px] h-[480px] sm:w-[680px] sm:h-[680px] opacity-85 select-none pointer-events-none">
        {/* Deep Ambient Heavenly Glow */}
        <div className="absolute inset-0 bg-gradient-to-tl from-[#38BDF8]/25 via-[#C084FC]/20 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '9s' }} />

        {/* Reverse Swirling Heavenly Celestial SVG Storm Arms */}
        <svg viewBox="0 0 500 500" className="w-full h-full animate-[spin_50s_linear_infinite_reverse]">
          <defs>
            <linearGradient id="celestialStorm2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#F5B942" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#F472B6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0C0E14" stopOpacity="0" />
            </linearGradient>
            <filter id="celestialGlow2">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Celestial Orbital Tempest Arms */}
          <ellipse cx="250" cy="250" rx="230" ry="95" fill="none" stroke="url(#celestialStorm2)" strokeWidth="3" strokeDasharray="170 80 190 60" transform="rotate(30 250 250)" filter="url(#celestialGlow2)" />
          <ellipse cx="250" cy="250" rx="185" ry="75" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeDasharray="110 110" transform="rotate(-55 250 250)" opacity="0.8" />
          <ellipse cx="250" cy="250" rx="135" ry="45" fill="none" stroke="#F5B942" strokeWidth="2" strokeDasharray="100 70" transform="rotate(75 250 250)" opacity="0.85" />
          <ellipse cx="250" cy="250" rx="90" ry="30" fill="none" stroke="#E9D5FF" strokeWidth="1.5" strokeDasharray="60 50" transform="rotate(-20 250 250)" opacity="0.9" />

          {/* Heavenly Celestial Eye Core */}
          <circle cx="250" cy="250" r="38" fill="#38BDF8" fillOpacity="0.3" filter="url(#celestialGlow2)" />
          <circle cx="250" cy="250" r="15" fill="#FFFFFF" fillOpacity="0.95" filter="url(#celestialGlow2)" />
        </svg>
      </div>
    </div>
  );
}
