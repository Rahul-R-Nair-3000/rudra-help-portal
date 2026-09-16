"use client";

import React from "react";
import { Shield, Zap, Sparkles, MessageSquare, Send, Check, Layers, Type, Palette, Cpu } from "lucide-react";

export function ThemePreview() {
  return (
    <div className="min-h-screen bg-[#0C0E14] text-[#F0F4F8] p-4 md:p-10 font-sans selection:bg-[#F5B942] selection:text-[#0C0E14]">
      {/* Header / Brand Banner */}
      <header className="max-w-6xl mx-auto mb-12 rudra-card p-6 md:p-8 border border-[#232838] relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#F5B942]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#232733]/50 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F5B942]/15 text-[#F5B942] border border-[#F5B942]/30">
                <Zap className="w-3.5 h-3.5 fill-[#F5B942]" /> Superhero Brand Tokens
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">v1.0.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white flex items-center gap-3">
              RUDRA <span className="text-[#F5B942]">DESIGN SYSTEM</span>
            </h1>
            <p className="mt-2 text-[#94A3B8] text-base md:text-lg max-w-2xl">
              Charcoal-grey storm energy grounded by warm amber gold. Engineered for high-performance AI interfaces & superhero experiences.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">
              <Shield className="w-4 h-4" /> Primary Action
            </button>
            <button className="btn-secondary">
              <Cpu className="w-4 h-4" /> Secondary Action
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* SECTION 1: COLOR TOKEN SYSTEM */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-[#F5B942]">
            <Palette className="w-5 h-5" />
            <h2 className="text-2xl font-bold font-heading text-white tracking-wide uppercase">
              1. Color Token System
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Palette */}
            <div className="rudra-card p-6 space-y-4">
              <div className="border-b border-[#232838] pb-3">
                <h3 className="text-lg font-bold font-heading text-white">Primary: Storm-Blue / Charcoal</h3>
                <p className="text-xs text-[#94A3B8]">Main brand structure & dark armor (#232733 range)</p>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#161923] border border-[#232838] flex justify-between items-center">
                  <span>Storm Deep (#161923)</span>
                  <span className="text-[#94A3B8]">Deep Dark</span>
                </div>
                <div className="p-3 rounded-lg bg-[#232733] text-white flex justify-between items-center glow-border-storm">
                  <span className="font-bold text-[#F5B942]">Storm Base (#232733)</span>
                  <span className="text-[#F5B942]">PRIMARY</span>
                </div>
                <div className="p-3 rounded-lg bg-[#2D3242] text-white flex justify-between items-center">
                  <span>Storm Light (#2D3242)</span>
                  <span className="text-[#94A3B8]">Surface</span>
                </div>
                <div className="p-3 rounded-lg bg-[#3A4054] text-white flex justify-between items-center">
                  <span>Storm Border (#3A4054)</span>
                  <span className="text-[#94A3B8]">Borders</span>
                </div>
              </div>
            </div>

            {/* Accent Palette */}
            <div className="rudra-card p-6 space-y-4">
              <div className="border-b border-[#232838] pb-3">
                <h3 className="text-lg font-bold font-heading text-white">Accent: Warm Amber-Gold</h3>
                <p className="text-xs text-[#94A3B8]">"Calm at the center" energy (#F5B942 range)</p>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#E5A320] text-[#0C0E14] font-bold flex justify-between items-center">
                  <span>Amber Hover (#E5A320)</span>
                  <span>Hover</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F5B942] text-[#0C0E14] font-bold flex justify-between items-center glow-border-amber">
                  <span>Amber Gold (#F5B942)</span>
                  <span>ACCENT</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F8CB68] text-[#0C0E14] font-bold flex justify-between items-center">
                  <span>Amber Light (#F8CB68)</span>
                  <span>Highlight</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F5B942]/15 text-[#F5B942] border border-[#F5B942]/30 flex justify-between items-center">
                  <span>Amber Dim (15% Opacity)</span>
                  <span>Glow</span>
                </div>
              </div>
            </div>

            {/* Neutral Background Palette */}
            <div className="rudra-card p-6 space-y-4">
              <div className="border-b border-[#232838] pb-3">
                <h3 className="text-lg font-bold font-heading text-white">Neutral: Near-Black Cool Tint</h3>
                <p className="text-xs text-[#94A3B8]">Cool blue-grey background hierarchy</p>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#0C0E14] border border-[#232838] flex justify-between items-center">
                  <span>Background (#0C0E14)</span>
                  <span className="text-[#94A3B8]">Canvas</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141722] border border-[#232838] flex justify-between items-center">
                  <span>Card Surface (#141722)</span>
                  <span className="text-[#94A3B8]">Card</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1C2130] border border-[#232838] flex justify-between items-center">
                  <span>Surface Elev (#1C2130)</span>
                  <span className="text-[#94A3B8]">Interactive</span>
                </div>
                <div className="p-3 rounded-lg bg-[#232838] flex justify-between items-center">
                  <span>Border Token (#232838)</span>
                  <span className="text-[#94A3B8]">Dividers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TYPOGRAPHY SYSTEM */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-[#F5B942]">
            <Type className="w-5 h-5" />
            <h2 className="text-2xl font-bold font-heading text-white tracking-wide uppercase">
              2. Typography System
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Headings Font */}
            <div className="rudra-card p-6 space-y-4">
              <div className="border-b border-[#232838] pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">Headings: Space Grotesk</h3>
                  <p className="text-xs text-[#94A3B8]">Modern Geometric Sans (`font-heading` / `var(--font-space-grotesk)`)</p>
                </div>
                <span className="px-2.5 py-1 text-xs rounded bg-[#232733] text-[#F5B942] font-mono">Space Grotesk</span>
              </div>
              <div className="space-y-3 font-heading">
                <h1 className="text-3xl font-extrabold text-white">H1: Heroic Power Unleashed</h1>
                <h2 className="text-2xl font-bold text-white">H2: Storm Guardian Protocol</h2>
                <h3 className="text-xl font-semibold text-[#F5B942]">H3: Amber Core Stabilization</h3>
                <h4 className="text-lg font-medium text-[#94A3B8]">H4: System Diagnostics Operational</h4>
              </div>
            </div>

            {/* Body Font */}
            <div className="rudra-card p-6 space-y-4">
              <div className="border-b border-[#232838] pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">Body: Inter</h3>
                  <p className="text-xs text-[#94A3B8]">Clean Readable Sans (`font-sans` / `var(--font-inter)`)</p>
                </div>
                <span className="px-2.5 py-1 text-xs rounded bg-[#232733] text-[#94A3B8] font-mono">Inter</span>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-base text-[#F0F4F8] leading-relaxed">
                  <strong className="text-[#F5B942]">Lead Paragraph:</strong> RUDRA stands as the sovereign defender, balancing chaotic cosmic forces with structured intelligence.
                </p>
                <p className="text-[#94A3B8] leading-relaxed">
                  Regular body text maintains ultra-clear legibility across complex data dashboards, terminal outputs, and conversational assistant feeds.
                </p>
                <p className="text-xs text-[#64748B] font-mono">
                  CAPTION / MONO: TIMESTAMP 2026-09-15 01:54:00 Z | ENCRYPTION ACTIVE
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: REUSABLE UTILITY CLASSES & UI COMPONENTS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-[#F5B942]">
            <Layers className="w-5 h-5" />
            <h2 className="text-2xl font-bold font-heading text-white tracking-wide uppercase">
              3. Reusable Utility Classes & Component Tokens
            </h2>
          </div>

          {/* Button Styles */}
          <div className="rudra-card p-6 space-y-4">
            <h3 className="text-lg font-bold font-heading text-white border-b border-[#232838] pb-3">
              Button Utilities (`btn-primary`, `btn-secondary`)
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-primary">
                <Zap className="w-4 h-4 fill-[#0C0E14]" /> `.btn-primary` (Amber-Gold)
              </button>

              <button className="btn-secondary">
                <Shield className="w-4 h-4" /> `.btn-secondary` (Storm-Blue)
              </button>

              <button className="px-4 py-2 rounded.lg text-xs font-semibold uppercase tracking-wider border border-[#F5B942]/40 text-[#F5B942] hover:bg-[#F5B942]/10 transition-colors">
                Outline Amber
              </button>

              <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
                Disabled State
              </button>
            </div>
          </div>

          {/* Cards & Glow Borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subtle Shadow Card */}
            <div className="rudra-card p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#94A3B8]">`.rudra-card`</span>
                <Sparkles className="w-4 h-4 text-[#94A3B8]" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">Subtle Card Shadow</h4>
              <p className="text-xs text-[#94A3B8]">
                Uses `.rudra-card` with dark glassmorphism blur and smooth 1px border.
              </p>
            </div>

            {/* Amber Glow Border Card */}
            <div className="rudra-card p-6 space-y-3 glow-border-amber">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#F5B942]">`.glow-border-amber`</span>
                <Zap className="w-4 h-4 text-[#F5B942]" />
              </div>
              <h4 className="text-base font-bold font-heading text-[#F5B942]">Amber Glow Border</h4>
              <p className="text-xs text-[#F0F4F8]">
                Radiates warm amber aura for active states, highlighted focus cards, or hero elements.
              </p>
            </div>

            {/* Storm Glow Border Card */}
            <div className="rudra-card p-6 space-y-3 glow-border-storm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#94A3B8]">`.glow-border-storm`</span>
                <Shield className="w-4 h-4 text-[#3A4054]" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">Storm Glow Border</h4>
              <p className="text-xs text-[#94A3B8]">
                Cool charcoal-blue ambient aura for secondary panels and defense shields.
              </p>
            </div>
          </div>

          {/* Chat Bubbles Showcase */}
          <div className="rudra-card p-6 space-y-6">
            <h3 className="text-lg font-bold font-heading text-white border-b border-[#232838] pb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#F5B942]" />
              Chat Bubble Variants (`chat-bubble-visitor` vs `chat-bubble-rudra`)
            </h3>

            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Visitor Bubble */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-mono text-[#94A3B8] pr-2">Visitor Message (`.chat-bubble-visitor`)</span>
                <div className="chat-bubble-visitor max-w-md">
                  Hello Rudra, can you brief me on the storm defense shield status?
                </div>
              </div>

              {/* Rudra Superhero Bubble */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5B942] text-[#0C0E14] font-bold font-heading flex items-center justify-center shadow-[0_0_15px_rgba(245,185,66,0.5)] shrink-0">
                  R
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-mono text-[#F5B942] pl-2 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> RUDRA AI (`.chat-bubble-rudra`)
                  </span>
                  <div className="chat-bubble-rudra max-w-md">
                    Shield status is <strong className="text-[#F5B942]">OPTIMAL (100%)</strong>. Amber core frequency is stabilized at 432 Hz. Ready to deploy defense response on your command.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Input & Badge System */}
          <div className="rudra-card p-6 space-y-4">
            <h3 className="text-lg font-bold font-heading text-white border-b border-[#232838] pb-3">
              Interactive Form Inputs & Badges
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8]">RUDRA Interactive Input</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter command or message..."
                    className="w-full bg-[#1E2332] text-white px-4 py-2.5 rounded-lg border border-[#3A4054] focus:outline-none focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942] transition-colors pr-10 text-sm"
                    defaultValue="Initiate security scan"
                  />
                  <button className="absolute right-2 top-2 p-1 text-[#F5B942] hover:text-white transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#232733] text-[#F0F4F8] border border-[#3A4054]">
                  Primary Tag
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5B942] text-[#0C0E14]">
                  Amber Tag
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5B942]/10 text-[#F5B942] border border-[#F5B942]/40">
                  Glow Tag
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1">
                  <Check className="w-3 h-3" /> System Ready
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#232838] text-center text-xs text-[#64748B] font-mono">
        RUDRA BRAND DESIGN TOKEN SYSTEM • STYLING & THEME CONFIGURED
      </footer>
    </div>
  );
}
