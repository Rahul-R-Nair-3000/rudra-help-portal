"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Compass, HeartHandshake, MessageSquare } from "lucide-react";

// Subtle ambient storm ember/meteor particle streaks
const HERO_STREAKS = [
  // Amber-gold embers/meteors (Brand accent tokens #F5B942 / #F8CB68 / #E5A320)
  { id: 1, left: "4%", top: "-5%", height: "70px", width: "1.5px", background: "linear-gradient(180deg, rgba(248, 203, 104, 0.85) 0%, rgba(245, 185, 66, 0.3) 60%, transparent 100%)", opacity: 0.28, duration: "6.2s", delay: "-1.5s", animationClass: "animate-ember-streak" },
  { id: 2, left: "12%", top: "15%", height: "95px", width: "1.5px", background: "linear-gradient(180deg, rgba(245, 185, 66, 0.9) 0%, rgba(229, 163, 32, 0.35) 70%, transparent 100%)", opacity: 0.35, duration: "8.4s", delay: "-4.2s", animationClass: "animate-ember-streak" },
  { id: 3, left: "22%", top: "-8%", height: "55px", width: "1px", background: "linear-gradient(180deg, rgba(248, 203, 104, 0.7) 0%, transparent 100%)", opacity: 0.22, duration: "5.1s", delay: "-0.8s", animationClass: "animate-ember-curved-left" },
  { id: 4, left: "31%", top: "25%", height: "110px", width: "2px", background: "linear-gradient(180deg, rgba(245, 185, 66, 0.85) 0%, rgba(248, 203, 104, 0.25) 80%, transparent 100%)", opacity: 0.38, duration: "9.6s", delay: "-6.7s", animationClass: "animate-ember-curved-left" },
  { id: 5, left: "41%", top: "-2%", height: "65px", width: "1px", background: "linear-gradient(180deg, rgba(245, 185, 66, 0.8) 0%, transparent 100%)", opacity: 0.25, duration: "6.8s", delay: "-2.9s", animationClass: "animate-ember-curved-left" },
  { id: 6, left: "53%", top: "10%", height: "85px", width: "1.5px", background: "linear-gradient(180deg, rgba(248, 203, 104, 0.9) 0%, rgba(245, 185, 66, 0.3) 60%, transparent 100%)", opacity: 0.32, duration: "7.3s", delay: "-5.1s", animationClass: "animate-ember-curved-right" },
  { id: 7, left: "64%", top: "-10%", height: "120px", width: "2px", background: "linear-gradient(180deg, rgba(245, 185, 66, 0.95) 0%, rgba(229, 163, 32, 0.4) 75%, transparent 100%)", opacity: 0.4, duration: "10.2s", delay: "-8.4s", animationClass: "animate-ember-curved-right" },
  { id: 8, left: "73%", top: "20%", height: "60px", width: "1px", background: "linear-gradient(180deg, rgba(248, 203, 104, 0.75) 0%, transparent 100%)", opacity: 0.2, duration: "5.5s", delay: "-1.1s", animationClass: "animate-ember-curved-right" },
  { id: 9, left: "84%", top: "-4%", height: "90px", width: "1.5px", background: "linear-gradient(180deg, rgba(245, 185, 66, 0.85) 0%, rgba(248, 203, 104, 0.2) 65%, transparent 100%)", opacity: 0.3, duration: "7.9s", delay: "-3.6s", animationClass: "animate-ember-streak" },
  { id: 10, left: "93%", top: "12%", height: "75px", width: "1.5px", background: "linear-gradient(180deg, rgba(248, 203, 104, 0.8) 0%, transparent 100%)", opacity: 0.26, duration: "6.5s", delay: "-4.9s", animationClass: "animate-ember-streak" },

  // Storm blue/grey streaks mixed in for depth (Tokens #3A4054 / #2D3242 / #94A3B8)
  { id: 11, left: "8%", top: "30%", height: "80px", width: "1.5px", background: "linear-gradient(180deg, rgba(148, 163, 184, 0.7) 0%, rgba(58, 64, 84, 0.3) 60%, transparent 100%)", opacity: 0.24, duration: "8.8s", delay: "-5.8s", animationClass: "animate-ember-streak" },
  { id: 12, left: "18%", top: "-6%", height: "100px", width: "2px", background: "linear-gradient(180deg, rgba(58, 64, 84, 0.9) 0%, rgba(45, 50, 66, 0.4) 70%, transparent 100%)", opacity: 0.3, duration: "10.5s", delay: "-2.1s", animationClass: "animate-ember-curved-left" },
  { id: 13, left: "37%", top: "8%", height: "60px", width: "1px", background: "linear-gradient(180deg, rgba(148, 163, 184, 0.6) 0%, transparent 100%)", opacity: 0.18, duration: "6.0s", delay: "-3.4s", animationClass: "animate-ember-curved-left" },
  { id: 14, left: "48%", top: "32%", height: "90px", width: "1.5px", background: "linear-gradient(180deg, rgba(92, 102, 130, 0.8) 0%, rgba(35, 39, 51, 0.3) 65%, transparent 100%)", opacity: 0.25, duration: "9.1s", delay: "-7.3s", animationClass: "animate-ember-curved-right" },
  { id: 15, left: "59%", top: "-5%", height: "70px", width: "1.5px", background: "linear-gradient(180deg, rgba(148, 163, 184, 0.75) 0%, transparent 100%)", opacity: 0.22, duration: "7.1s", delay: "-1.9s", animationClass: "animate-ember-curved-right" },
  { id: 16, left: "79%", top: "5%", height: "105px", width: "2px", background: "linear-gradient(180deg, rgba(58, 64, 84, 0.85) 0%, rgba(148, 163, 184, 0.3) 75%, transparent 100%)", opacity: 0.28, duration: "11.0s", delay: "-9.2s", animationClass: "animate-ember-streak" },

  // Staggered amber-gold accents (20 streaks total)
  { id: 17, left: "15%", top: "40%", height: "50px", width: "1px", background: "linear-gradient(180deg, rgba(245, 185, 66, 0.7) 0%, transparent 100%)", opacity: 0.18, duration: "5.8s", delay: "-2.7s", animationClass: "animate-ember-streak" },
  { id: 18, left: "45%", top: "-12%", height: "115px", width: "2px", background: "linear-gradient(180deg, rgba(248, 203, 104, 0.9) 0%, rgba(245, 185, 66, 0.35) 80%, transparent 100%)", opacity: 0.36, duration: "9.8s", delay: "-0.4s", animationClass: "animate-ember-curved-left" },
  { id: 19, left: "68%", top: "35%", height: "65px", width: "1px", background: "linear-gradient(180deg, rgba(248, 203, 104, 0.75) 0%, transparent 100%)", opacity: 0.22, duration: "6.4s", delay: "-4.6s", animationClass: "animate-ember-curved-right" },
  { id: 20, left: "88%", top: "28%", height: "80px", width: "1.5px", background: "linear-gradient(180deg, rgba(245, 185, 66, 0.8) 0%, rgba(229, 163, 32, 0.25) 60%, transparent 100%)", opacity: 0.29, duration: "7.7s", delay: "-6.0s", animationClass: "animate-ember-streak" },
];

export function Hero() {
  const scrollToChatbot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("chatbot");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToLore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("origin");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0C0E14] text-[#F0F4F8] selection:bg-[#F5B942] selection:text-[#0C0E14]">
      {/* Main Hero Viewport Section: Occupies full viewport height on load */}
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden py-6 sm:py-12 md:py-16 px-3 sm:px-6 md:px-8">
        {/* Ambient background glows using brand design tokens */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-[#F5B942]/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bg-[#232733]/60 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

        {/* Ambient background particle streaks (Meteors/Embers falling & curving toward center core) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          {HERO_STREAKS.map((streak) => (
            <span
              key={streak.id}
              className={`absolute rounded-full ${streak.animationClass}`}
              style={{
                left: streak.left,
                top: streak.top,
                width: streak.width,
                height: streak.height,
                background: streak.background,
                ["--streak-opacity" as string]: streak.opacity,
                ["--streak-duration" as string]: streak.duration,
                ["--streak-delay" as string]: streak.delay,
              }}
            />
          ))}
        </div>

        {/* Main Hero Banner Grid */}
        <div className="max-w-6xl mx-auto w-full relative z-10 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text & CTA 1.5s First Load Entrance Sequence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-2.5 sm:space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-[#F5B942]/10 text-[#F5B942] border border-[#F5B942]/30">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#F5B942]" /> Sovereign Sentinel
              </div>

              <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading text-white leading-tight">
                RUDRA
              </h1>

              <p className="text-base sm:text-2xl font-medium text-[#F5B942] font-heading tracking-wide italic">
                &ldquo;Even in the storm, someone is still listening.&rdquo;
              </p>

              <p className="text-xs sm:text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed font-sans mx-auto lg:mx-0">
                To make sure no one has to carry their storm entirely alone.
              </p>

              {/* CTA Button */}
              <div className="pt-1 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 w-full">
                <a
                  href="#chatbot"
                  onClick={scrollToChatbot}
                  className="btn-primary text-xs sm:text-base px-4 sm:px-6 py-2.5 sm:py-3.5 shadow-[0_0_25px_rgba(245,185,66,0.35)] w-full sm:w-auto min-h-[40px] sm:min-h-[44px] shrink-0"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" /> Talk to Rudra
                </a>

                <a
                  href="#origin"
                  onClick={scrollToLore}
                  className="btn-secondary text-xs sm:text-base px-4 sm:px-6 py-2.5 sm:py-3.5 w-full sm:w-auto min-h-[40px] sm:min-h-[44px] shrink-0"
                >
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8]" /> Discover Lore
                </a>
              </div>
            </motion.div>

            {/* Right Column: Hero Illustration 1.5s First Load Entrance Sequence */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-5 flex justify-center items-center w-full px-2 sm:px-0"
            >
              {/* Monumental Container with Dark Radial Vignette */}
              <div className="relative w-full max-w-[200px] xs:max-w-[280px] sm:max-w-[440px] lg:max-w-[540px] aspect-square flex items-center justify-center">
                
                {/* Soft Ambient Vignette Backdrop behind illustration */}
                <div className="absolute inset-[-15%] bg-[radial-gradient(ellipse_at_center,_rgba(4,5,8,0.96)_0%,_rgba(10,13,20,0.8)_45%,_rgba(12,14,20,0.4)_65%,_transparent_80%)] rounded-full blur-2xl pointer-events-none -z-10" />

                {/* Native SVG Animated Humanoid Silhouette */}
                <svg
                  viewBox="0 0 500 550"
                  className="w-full h-full drop-shadow-[0_15px_45px_rgba(0,0,0,0.85)] overflow-visible"
                  aria-label="Rudra Sovereign Sentinel Illustration"
                >
                  <defs>
                    {/* Dark Radial Vignette in SVG canvas */}
                    <radialGradient id="vignetteDark" cx="50%" cy="50%" r="52%">
                      <stop offset="0%" stopColor="#040508" stopOpacity="0.95" />
                      <stop offset="40%" stopColor="#0A0D14" stopOpacity="0.8" />
                      <stop offset="75%" stopColor="#0C0E14" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0C0E14" stopOpacity="0" />
                    </radialGradient>

                    {/* Intensified Glowing Core Radial Gradient (Amber Core) */}
                    <radialGradient id="amberCoreGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF7D6" stopOpacity="1" />
                      <stop offset="25%" stopColor="#F8CB68" stopOpacity="0.95" />
                      <stop offset="55%" stopColor="#F5B942" stopOpacity="0.9" />
                      <stop offset="85%" stopColor="#E5A320" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#F5B942" stopOpacity="0" />
                    </radialGradient>

                    {/* Volumetric Core Light Ray Gradient */}
                    <linearGradient id="coreRayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.75" />
                      <stop offset="35%" stopColor="#F8CB68" stopOpacity="0.45" />
                      <stop offset="75%" stopColor="#F5B942" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#F5B942" stopOpacity="0" />
                    </linearGradient>

                    {/* Storm Line Gradients */}
                    <linearGradient id="stormGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3A4054" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#161923" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#F5B942" stopOpacity="0.85" />
                    </linearGradient>

                    <linearGradient id="stormGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#282E40" stopOpacity="0.85" />
                      <stop offset="70%" stopColor="#3A4054" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#F5B942" stopOpacity="0.6" />
                    </linearGradient>

                    {/* SVG Glow Filters */}
                    <filter id="coreGlow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="amberAura" x="-70%" y="-70%" width="240%" height="240%">
                      <feGaussianBlur stdDeviation="22" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Strong Radial Dark Vignette behind figure */}
                  <circle cx="250" cy="270" r="245" fill="url(#vignetteDark)" />

                  {/* Ambient Background Aura Rings */}
                  <circle cx="250" cy="270" r="160" fill="none" stroke="#232733" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
                  <circle cx="250" cy="270" r="210" fill="none" stroke="#3A4054" strokeWidth="1" strokeDasharray="6 12" opacity="0.2" />

                  {/* Swirling Storm Orbital Rings (Animated CSS Rotations) */}
                  <g className="animate-[spin_25s_linear_infinite] origin-[250px_270px]">
                    <ellipse cx="250" cy="270" rx="190" ry="70" fill="none" stroke="url(#stormGradient1)" strokeWidth="2" strokeDasharray="120 40 80 40" transform="rotate(-25 250 270)" opacity="0.75" />
                  </g>

                  <g className="animate-[spin_18s_linear_infinite_reverse] origin-[250px_270px]">
                    <ellipse cx="250" cy="270" rx="170" ry="60" fill="none" stroke="url(#stormGradient2)" strokeWidth="2.5" strokeDasharray="90 50 110 30" transform="rotate(35 250 270)" opacity="0.85" />
                  </g>

                  <g className="animate-[spin_32s_linear_infinite] origin-[250px_270px]">
                    <ellipse cx="250" cy="270" rx="205" ry="85" fill="none" stroke="#F5B942" strokeWidth="1.5" strokeDasharray="40 180" transform="rotate(-60 250 270)" opacity="0.6" />
                  </g>

                  {/* Soft Light Rays/Beams extending outward from core */}
                  <g className="animate-pulse origin-[250px_285px]" opacity="0.75">
                    <polygon points="250,285 120,105 145,90" fill="url(#coreRayGradient)" opacity="0.35" />
                    <polygon points="250,285 380,105 355,90" fill="url(#coreRayGradient)" opacity="0.35" />
                    <polygon points="250,285 40,230 50,250" fill="url(#coreRayGradient)" opacity="0.3" />
                    <polygon points="250,285 460,230 450,250" fill="url(#coreRayGradient)" opacity="0.3" />
                    <polygon points="250,285 110,440 135,455" fill="url(#coreRayGradient)" opacity="0.25" />
                    <polygon points="250,285 390,440 365,455" fill="url(#coreRayGradient)" opacity="0.25" />
                    <polygon points="250,285 238,60 262,60" fill="url(#coreRayGradient)" opacity="0.4" />
                  </g>

                  {/* Inward Curved Storm Embers SVG Trajectories (drawn into core) */}
                  <path d="M 70 130 Q 160 200 232 275" fill="none" stroke="#F5B942" strokeWidth="1.5" strokeDasharray="8 14" opacity="0.7" />
                  <path d="M 430 130 Q 340 200 268 275" fill="none" stroke="#F5B942" strokeWidth="1.5" strokeDasharray="8 14" opacity="0.7" />
                  <path d="M 80 440 Q 160 370 232 295" fill="none" stroke="#F8CB68" strokeWidth="1.5" strokeDasharray="6 12" opacity="0.55" />
                  <path d="M 420 440 Q 340 370 268 295" fill="none" stroke="#F8CB68" strokeWidth="1.5" strokeDasharray="6 12" opacity="0.55" />

                  {/* Original Reverted Half-Body Layered Storm-Line Silhouette Contours */}
                  <g filter="url(#coreGlow)">
                    {/* Head Contour */}
                    <path
                      d="M 250 100 Q 220 100 215 135 Q 210 160 230 185 Q 250 200 270 185 Q 290 160 285 135 Q 280 100 250 100 Z"
                      fill="#161923"
                      stroke="#3A4054"
                      strokeWidth="2.5"
                    />

                    {/* Face Crest Accent */}
                    <path d="M 250 110 L 250 145" stroke="#F5B942" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                    <circle cx="250" cy="148" r="2.5" fill="#F5B942" />

                    {/* Neck & Broad Shoulders */}
                    <path
                      d="M 230 185 L 210 205 L 140 235 Q 110 250 130 280 L 170 300 L 195 275 M 270 185 L 290 205 L 360 235 Q 390 250 370 280 L 330 300 L 305 275"
                      fill="none"
                      stroke="#3A4054"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Upper Torso Armor Lines */}
                    <path
                      d="M 140 235 Q 200 220 250 240 Q 300 220 360 235"
                      fill="none"
                      stroke="url(#stormGradient1)"
                      strokeWidth="3"
                    />

                    <path
                      d="M 175 270 Q 210 250 250 255 Q 290 250 325 270"
                      fill="none"
                      stroke="#282E40"
                      strokeWidth="2.5"
                    />

                    {/* Main Chest Armor Shell */}
                    <path
                      d="M 180 275 L 250 230 L 320 275 L 295 380 L 250 420 L 205 380 Z"
                      fill="#161923"
                      stroke="#3A4054"
                      strokeWidth="2.5"
                      opacity="0.9"
                    />

                    {/* Storm energy flow lines on torso */}
                    <path d="M 210 300 Q 230 350 250 410" fill="none" stroke="#232733" strokeWidth="2" />
                    <path d="M 290 300 Q 270 350 250 410" fill="none" stroke="#232733" strokeWidth="2" />
                  </g>

                  {/* Intensified Glowing Core at Chest (Pulsing Amber) */}
                  <g filter="url(#amberAura)">
                    {/* Extra Outer Glow Radiance Ring */}
                    <circle
                      cx="250"
                      cy="285"
                      r="68"
                      fill="none"
                      stroke="#F5B942"
                      strokeWidth="1.5"
                      className="animate-pulse origin-[250px_285px]"
                      opacity="0.4"
                    />

                    {/* Outer Pulsing Core Ring */}
                    <circle
                      cx="250"
                      cy="285"
                      r="52"
                      fill="none"
                      stroke="#F8CB68"
                      strokeWidth="2.5"
                      className="animate-ping origin-[250px_285px]"
                      opacity="0.45"
                    />

                    {/* Middle Bright Amber Glow Core */}
                    <circle
                      cx="250"
                      cy="285"
                      r="40"
                      fill="url(#amberCoreGradient)"
                      className="animate-pulse origin-[250px_285px]"
                    />

                    {/* Core Ember Center */}
                    <circle cx="250" cy="285" r="20" fill="#F5B942" />
                    <circle cx="250" cy="285" r="10" fill="#FFF" />

                    {/* Core Diamond Emblem */}
                    <polygon
                      points="250,265 265,285 250,305 235,285"
                      fill="none"
                      stroke="#0C0E14"
                      strokeWidth="3"
                    />
                  </g>

                  {/* Energy Sparks / Floating Particles around core */}
                  <circle cx="200" cy="220" r="2.5" fill="#F5B942" className="animate-pulse" />
                  <circle cx="300" cy="210" r="2" fill="#F8CB68" className="animate-pulse" />
                  <circle cx="160" cy="310" r="3" fill="#F5B942" className="animate-ping" />
                  <circle cx="340" cy="320" r="2.5" fill="#F8CB68" className="animate-pulse" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Short Lore Sections: Scroll-Reveal on Origin, Powers, Mission (Positioned below the hero viewport) */}
      <section id="origin" className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 border-t border-[#232838]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Origin Section Scroll-Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.28, delay: 0, ease: "easeOut" }}
            className="rudra-card p-4 sm:p-6 space-y-2.5 sm:space-y-3 glow-border-storm hover:border-[#F5B942]/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[#232733] border border-[#3A4054] text-[#F5B942] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-heading text-white">Origin</h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Born from the convergence of atmospheric tempest and ancient cosmic balance, Rudra emerged as a living sanctuary designed to withstand chaotic forces and restore harmony.
            </p>
          </motion.div>

          {/* Powers Section Scroll-Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.28, delay: 0.08, ease: "easeOut" }}
            className="rudra-card p-4 sm:p-6 space-y-2.5 sm:space-y-3 glow-border-amber"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F5B942]/15 border border-[#F5B942]/40 text-[#F5B942] flex items-center justify-center">
              <Zap className="w-5 h-5 fill-[#F5B942]" />
            </div>
            <h2 className="text-xl font-bold font-heading text-white">Powers</h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Atmospheric Tempest Manipulation, Sub-harmonic Voice Signal Reception, Amber Energy Core Stabilization, and Quantum Shield Barrier Generation.
            </p>
          </motion.div>

          {/* Mission Section Scroll-Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.28, delay: 0.16, ease: "easeOut" }}
            className="rudra-card p-4 sm:p-6 space-y-2.5 sm:space-y-3 glow-border-storm hover:border-[#F5B942]/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[#232733] border border-[#3A4054] text-[#F5B942] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-heading text-white">Mission</h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              To serve as a calm, steadfast sentinel in times of distress — listening through the noise, absorbing turbulent energy, and delivering absolute clarity.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
