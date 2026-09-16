"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroSequence() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dismissOverlay = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem("rudra_intro_seen", "true");
    } catch {
      // Ignore storage restrictions if any
    }
  }, []);

  useEffect(() => {
    // Check sessionStorage only on client-side mount
    try {
      const hasSeen = sessionStorage.getItem("rudra_intro_seen");
      if (!hasSeen) {
        setIsVisible(true);
        sessionStorage.setItem("rudra_intro_seen", "true");
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Automatic sequence timer (~2.2s total)
    const autoDismissTimer = setTimeout(() => {
      dismissOverlay();
    }, 2200);

    // Global keydown skip listener
    const handleKeyDown = () => {
      dismissOverlay();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(autoDismissTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, dismissOverlay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={dismissOverlay}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080A0F] text-[#F0F4F8] select-none cursor-pointer overflow-hidden px-4"
          aria-label="Rudra Intro Sequence (Click or press any key to skip)"
          role="button"
          tabIndex={0}
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#F5B942]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Intro Emblem & Text Sequence */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            
            {/* Rudra Compact Logomark Emblem */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
              
              {/* Parting Storm Lines (Expand outward & dissolve at 1.2s - 1.8s) */}
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: [1, 1, 1.45], opacity: [0.8, 0.85, 0] }}
                transition={{ duration: 2.0, times: [0, 0.6, 1], ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <ellipse cx="100" cy="100" rx="82" ry="32" fill="none" stroke="#3A4054" strokeWidth="2.5" strokeDasharray="50 30 70 20" transform="rotate(-25 100 100)" />
                  <ellipse cx="100" cy="100" rx="72" ry="26" fill="none" stroke="#F5B942" strokeWidth="2" strokeDasharray="30 80" transform="rotate(35 100 100)" opacity="0.7" />
                  <ellipse cx="100" cy="100" rx="90" ry="38" fill="none" stroke="#282E40" strokeWidth="1.8" strokeDasharray="60 40" transform="rotate(-60 100 100)" opacity="0.6" />
                </svg>
              </motion.div>

              {/* Core Emblem SVG (Stroke Draw & Fade In) */}
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(245,185,66,0.5)]">
                <defs>
                  <radialGradient id="introAmberCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF7D6" stopOpacity="1" />
                    <stop offset="35%" stopColor="#F8CB68" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#F5B942" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#E5A320" stopOpacity="0.3" />
                  </radialGradient>
                </defs>

                {/* Outer Steady Amber Ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="45"
                  fill="none"
                  stroke="#F5B942"
                  strokeWidth="2.5"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />

                {/* Inner Steady Amber Glow Ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="34"
                  fill="url(#introAmberCore)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Core Center Diamond */}
                <motion.polygon
                  points="100,82 115,100 100,118 85,100"
                  fill="none"
                  stroke="#0C0E14"
                  strokeWidth="2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
                <circle cx="100" cy="100" r="5" fill="#FFF" />
              </svg>
            </div>

            {/* "RUDRA" Branding Text Fade In */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-widest">
                RUDRA
              </h2>
              <p className="text-[10px] sm:text-xs font-semibold text-[#F5B942] uppercase tracking-[0.25em]">
                Sovereign Sentinel
              </p>
            </motion.div>
          </div>

          {/* Subtle Skip Hint at Bottom */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="absolute bottom-6 text-[11px] text-[#94A3B8] font-sans tracking-wide"
          >
            Click or press any key to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
