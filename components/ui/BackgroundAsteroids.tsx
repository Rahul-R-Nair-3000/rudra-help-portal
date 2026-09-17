"use client";

import React, { useEffect, useState } from "react";

// Array of 20 distinct asteroids distributed across the entire website viewport height and width
const ASTEROIDS_DATA = [
  // Top Header / Upper Hero Zone (0% - 25% height)
  {
    id: 1,
    top: "3%",
    left: "5%",
    size: 72,
    type: 1,
    opacity: 0.65,
    blur: 0,
    duration: "24s",
    delay: "0s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(245, 185, 66, 0.4)",
  },
  {
    id: 2,
    top: "10%",
    left: "88%",
    size: 96,
    type: 2,
    opacity: 0.75,
    blur: 0,
    duration: "28s",
    delay: "-5s",
    floatClass: "animate-float-reverse",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(248, 203, 104, 0.45)",
  },
  {
    id: 3,
    top: "18%",
    left: "15%",
    size: 38,
    type: 3,
    opacity: 0.45,
    blur: 0.5,
    duration: "19s",
    delay: "-2s",
    floatClass: "animate-float-diagonal",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(58, 64, 84, 0.5)",
  },
  {
    id: 4,
    top: "24%",
    left: "76%",
    size: 48,
    type: 4,
    opacity: 0.5,
    blur: 0,
    duration: "22s",
    delay: "-8s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(245, 185, 66, 0.35)",
  },

  // Middle Hero & Transition Zone (25% - 50% height)
  {
    id: 5,
    top: "32%",
    left: "3%",
    size: 110,
    type: 1,
    opacity: 0.8,
    blur: 0,
    duration: "32s",
    delay: "-12s",
    floatClass: "animate-float-reverse",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(245, 185, 66, 0.5)",
  },
  {
    id: 6,
    top: "38%",
    left: "92%",
    size: 64,
    type: 2,
    opacity: 0.55,
    blur: 0,
    duration: "21s",
    delay: "-4s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(148, 163, 184, 0.4)",
  },
  {
    id: 7,
    top: "42%",
    left: "22%",
    size: 42,
    type: 3,
    opacity: 0.4,
    blur: 1,
    duration: "17s",
    delay: "-9s",
    floatClass: "animate-float-diagonal",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(248, 203, 104, 0.3)",
  },
  {
    id: 8,
    top: "48%",
    left: "82%",
    size: 85,
    type: 4,
    opacity: 0.7,
    blur: 0,
    duration: "26s",
    delay: "-15s",
    floatClass: "animate-float-reverse",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(245, 185, 66, 0.45)",
  },

  // Lore / Middle Page Zone (50% - 75% height)
  {
    id: 9,
    top: "54%",
    left: "8%",
    size: 58,
    type: 2,
    opacity: 0.6,
    blur: 0,
    duration: "23s",
    delay: "-7s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(245, 185, 66, 0.4)",
  },
  {
    id: 10,
    top: "60%",
    left: "94%",
    size: 105,
    type: 1,
    opacity: 0.75,
    blur: 0,
    duration: "30s",
    delay: "-3s",
    floatClass: "animate-float-diagonal",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(248, 203, 104, 0.5)",
  },
  {
    id: 11,
    top: "66%",
    left: "18%",
    size: 36,
    type: 3,
    opacity: 0.45,
    blur: 0.5,
    duration: "18s",
    delay: "-11s",
    floatClass: "animate-float-reverse",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(58, 64, 84, 0.35)",
  },
  {
    id: 12,
    top: "72%",
    left: "84%",
    size: 68,
    type: 4,
    opacity: 0.6,
    blur: 0,
    duration: "25s",
    delay: "-16s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(245, 185, 66, 0.4)",
  },

  // Lower Chatbot & Footer Zone (75% - 100% height)
  {
    id: 13,
    top: "78%",
    left: "4%",
    size: 88,
    type: 1,
    opacity: 0.7,
    blur: 0,
    duration: "27s",
    delay: "-1s",
    floatClass: "animate-float-reverse",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(248, 203, 104, 0.45)",
  },
  {
    id: 14,
    top: "84%",
    left: "90%",
    size: 52,
    type: 2,
    opacity: 0.5,
    blur: 0,
    duration: "20s",
    delay: "-14s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(148, 163, 184, 0.35)",
  },
  {
    id: 15,
    top: "90%",
    left: "12%",
    size: 76,
    type: 3,
    opacity: 0.65,
    blur: 0,
    duration: "26s",
    delay: "-6s",
    floatClass: "animate-float-diagonal",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(245, 185, 66, 0.4)",
  },
  {
    id: 16,
    top: "95%",
    left: "80%",
    size: 92,
    type: 4,
    opacity: 0.7,
    blur: 0,
    duration: "29s",
    delay: "-10s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(248, 203, 104, 0.45)",
  },

  // Central Accent Floating Asteroids
  {
    id: 17,
    top: "15%",
    left: "48%",
    size: 32,
    type: 2,
    opacity: 0.35,
    blur: 1,
    duration: "16s",
    delay: "-8s",
    floatClass: "animate-float-slow",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(245, 185, 66, 0.25)",
  },
  {
    id: 18,
    top: "45%",
    left: "52%",
    size: 40,
    type: 1,
    opacity: 0.4,
    blur: 0.5,
    duration: "22s",
    delay: "-3s",
    floatClass: "animate-float-reverse",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(248, 203, 104, 0.3)",
  },
  {
    id: 19,
    top: "70%",
    left: "46%",
    size: 34,
    type: 3,
    opacity: 0.38,
    blur: 0.8,
    duration: "19s",
    delay: "-13s",
    floatClass: "animate-float-diagonal",
    rotateClass: "animate-spin-slow",
    glowColor: "rgba(148, 163, 184, 0.3)",
  },
  {
    id: 20,
    top: "88%",
    left: "54%",
    size: 44,
    type: 4,
    opacity: 0.42,
    blur: 0.5,
    duration: "21s",
    delay: "-5s",
    floatClass: "animate-float-reverse",
    rotateClass: "animate-spin-reverse-slow",
    glowColor: "rgba(245, 185, 66, 0.3)",
  },
];

// Custom SVG Asteroid Graphics with craggy stone textures & amber energy core veins
function RenderAsteroidSVG({ type, size }: { type: number; size: number }) {
  if (type === 1) {
    // Type 1: Alpha Craggy Giant Asteroid with Glowing Amber Veins & Impact Craters
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`astGrad1_${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D3242" />
            <stop offset="45%" stopColor="#1C202C" />
            <stop offset="85%" stopColor="#12151F" />
            <stop offset="100%" stopColor="#0B0D14" />
          </linearGradient>
          <radialGradient id={`astVein1_${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7D6" stopOpacity="1" />
            <stop offset="40%" stopColor="#F5B942" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#E5A320" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5B942" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Shadow & Atmospheric Rim */}
        <polygon
          points="50,5 78,14 92,38 88,68 70,92 38,95 12,76 8,42 24,16"
          fill={`url(#astGrad1_${size})`}
          stroke="#3A4054"
          strokeWidth="1.8"
        />

        {/* Craters & Surface Fractures */}
        <circle cx="36" cy="32" r="9" fill="#141722" stroke="#282E40" strokeWidth="1.2" />
        <circle cx="34" cy="30" r="7" fill="#0C0E14" />

        <circle cx="68" cy="58" r="13" fill="#141722" stroke="#282E40" strokeWidth="1.4" />
        <circle cx="65" cy="56" r="10" fill="#0C0E14" />

        <circle cx="58" cy="24" r="6" fill="#141722" stroke="#232733" strokeWidth="1" />
        <circle cx="30" cy="72" r="8" fill="#141722" stroke="#232733" strokeWidth="1" />

        {/* Glowing Amber Energy Core Fissures */}
        <path d="M 36 32 Q 48 44 58 58 T 70 82" fill="none" stroke="#F5B942" strokeWidth="2" opacity="0.85" />
        <path d="M 58 24 L 50 42 L 30 72" fill="none" stroke="#F8CB68" strokeWidth="1.5" opacity="0.75" />
        <circle cx="50" cy="42" r="3.5" fill={`url(#astVein1_${size})`} />
        <circle cx="58" cy="58" r="2.5" fill="#FFF" />

        {/* Edge Highlights */}
        <path d="M 50 5 L 78 14 L 92 38" fill="none" stroke="#F5B942" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }

  if (type === 2) {
    // Type 2: Beta Crystalline Angular Fragment
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`astGrad2_${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E2332" />
            <stop offset="50%" stopColor="#282E40" />
            <stop offset="100%" stopColor="#3A4054" />
          </linearGradient>
        </defs>

        {/* Sharp Angular Polygon */}
        <polygon
          points="45,4 85,22 96,62 64,96 22,88 4,52 18,18"
          fill={`url(#astGrad2_${size})`}
          stroke="#4A526A"
          strokeWidth="1.8"
        />

        {/* Facet Lines */}
        <line x1="45" y1="4" x2="48" y2="50" stroke="#141722" strokeWidth="1.5" />
        <line x1="85" y1="22" x2="48" y2="50" stroke="#141722" strokeWidth="1.5" />
        <line x1="96" y1="62" x2="48" y2="50" stroke="#141722" strokeWidth="1.5" />
        <line x1="64" y1="96" x2="48" y2="50" stroke="#141722" strokeWidth="1.5" />
        <line x1="22" y1="88" x2="48" y2="50" stroke="#141722" strokeWidth="1.5" />
        <line x1="4" y1="52" x2="48" y2="50" stroke="#141722" strokeWidth="1.5" />

        {/* Facet Glowing Energy Edges */}
        <path d="M 45 4 L 48 50 L 85 22" fill="none" stroke="#F5B942" strokeWidth="1.5" opacity="0.8" />
        <path d="M 48 50 L 64 96" fill="none" stroke="#F8CB68" strokeWidth="1.2" opacity="0.6" />
        <circle cx="48" cy="50" r="3" fill="#F5B942" />
      </svg>
    );
  }

  if (type === 3) {
    // Type 3: Gamma Meteor Rock with Particle Dust Trail
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id={`meteorGlow_${size}`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="30%" stopColor="#F5B942" />
            <stop offset="70%" stopColor="#E5A320" />
            <stop offset="100%" stopColor="#1E2332" />
          </radialGradient>
        </defs>

        {/* Trailing Energy Arc Dust */}
        <path
          d="M 20 80 Q 40 60 75 25"
          fill="none"
          stroke="url(#meteorGlow_)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Rock Polygon */}
        <polygon
          points="68,8 92,26 82,54 58,74 32,68 18,44 38,18"
          fill="#1C2130"
          stroke="#F5B942"
          strokeWidth="1.5"
        />

        {/* Surface Craters */}
        <circle cx="56" cy="38" r="8" fill="#0C0E14" stroke="#F5B942" strokeWidth="1" />
        <circle cx="72" cy="24" r="4" fill="#0C0E14" stroke="#3A4054" strokeWidth="0.8" />
        <circle cx="38" cy="48" r="5" fill="#0C0E14" stroke="#3A4054" strokeWidth="0.8" />

        {/* Molten Glow Point */}
        <circle cx="56" cy="38" r="3" fill="#F5B942" />
      </svg>
    );
  }

  // Type 4: Delta Rock Cluster
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {/* Main Center Rock */}
      <polygon points="40,15 70,22 80,55 60,82 30,78 15,48" fill="#232733" stroke="#3A4054" strokeWidth="1.5" />
      <path d="M 40 15 L 60 82" stroke="#0C0E14" strokeWidth="1.2" />
      <path d="M 40 15 L 80 55" stroke="#F5B942" strokeWidth="1.2" opacity="0.7" />

      {/* Orbiting Micro Fragment 1 */}
      <polygon points="85,10 95,15 92,28 80,24" fill="#1C2130" stroke="#F5B942" strokeWidth="1" />

      {/* Orbiting Micro Fragment 2 */}
      <polygon points="5,70 18,75 14,88 2,82" fill="#1C2130" stroke="#3A4054" strokeWidth="1" />

      {/* Orbiting Micro Fragment 3 */}
      <circle cx="88" cy="78" r="3" fill="#F8CB68" />
      <circle cx="12" cy="18" r="2.5" fill="#F5B942" />
    </svg>
  );
}

export function BackgroundAsteroids() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full h-full"
      aria-hidden="true"
    >
      {/* Ambient website-wide soft cosmic lighting highlights */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#F5B942]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#3A4054]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[75%] left-[-5%] w-[550px] h-[550px] bg-[#F5B942]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating & Rotating Space Asteroids */}
      {ASTEROIDS_DATA.map((ast) => (
        <div
          key={ast.id}
          className={`absolute transition-transform duration-1000 ${ast.floatClass}`}
          style={{
            top: ast.top,
            left: ast.left,
            width: `${ast.size}px`,
            height: `${ast.size}px`,
            opacity: ast.opacity,
            filter: ast.blur > 0 ? `blur(${ast.blur}px)` : undefined,
            ["--float-duration" as string]: ast.duration,
            ["--float-delay" as string]: ast.delay,
          }}
        >
          {/* Glowing Aura Shadow around each asteroid to highlight the background */}
          <div
            className="w-full h-full relative"
            style={{
              filter: `drop-shadow(0 0 ${Math.round(ast.size / 3)}px ${ast.glowColor})`,
            }}
          >
            <div className={`w-full h-full ${ast.rotateClass}`}>
              <RenderAsteroidSVG type={ast.type} size={ast.size} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
