"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { Shield, Zap, Cpu, Sparkles, ArrowDown, Compass, HeartHandshake } from "lucide-react";

interface Manifest {
  frameCount: number;
  width: number;
  height: number;
  aspectRatio: number;
  framePattern: string;
}

export function VideoScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadedImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [totalFrameCount, setTotalFrameCount] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);

  // Framer Motion scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for buttery-smooth 60 FPS frame transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.0005,
  });

  // Render a specific frame index onto the HTML5 canvas
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgList = loadedImagesRef.current;
    if (imgList.length === 0) return;

    // Retrieve requested image, or fallback to the nearest loaded frame
    let img = imgList[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 100; offset++) {
        const prev = imgList[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imgList[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Object-cover aspect ratio math to fill screen seamlessly
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = displayWidth / displayHeight;

    let renderW = displayWidth;
    let renderH = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (containerRatio > imgRatio) {
      renderH = displayWidth / imgRatio;
      offsetY = (displayHeight - renderH) / 2;
    } else {
      renderW = displayHeight * imgRatio;
      offsetX = (displayWidth - renderW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }, []);

  // Direct native window scroll handler fallback to guarantee frame updates
  const handleNativeScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableHeight = rect.height - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const rawProgress = Math.min(Math.max(0, -rect.top / scrollableHeight), 1);
    const frameIndex = Math.min(
      Math.max(0, Math.floor(rawProgress * (totalFrameCount - 1))),
      totalFrameCount - 1
    );

    setCurrentFrameIdx(frameIndex);
    renderFrame(frameIndex);
  }, [totalFrameCount, renderFrame]);

  // Fetch manifest and preload image frames
  useEffect(() => {
    let isMounted = true;

    async function loadFrames() {
      try {
        const res = await fetch("/frames/manifest.json");
        if (!res.ok) throw new Error("Manifest file not found");
        const data: Manifest = await res.json();

        if (!isMounted) return;
        setTotalFrameCount(data.frameCount);
        loadedImagesRef.current = new Array(data.frameCount).fill(null);

        let count = 0;

        for (let i = 1; i <= data.frameCount; i++) {
          const img = new Image();
          const frameNum = String(i).padStart(4, "0");
          img.src = `/frames/frame_${frameNum}.webp`;

          img.onload = () => {
            if (!isMounted) return;
            loadedImagesRef.current[i - 1] = img;
            count++;
            setLoadProgress(Math.round((count / data.frameCount) * 100));

            if (i === 1 || count === 1) {
              renderFrame(0);
            }

            if (count === data.frameCount) {
              setIsLoading(false);
              renderFrame(0);
            }
          };

          img.onerror = () => {
            if (!isMounted) return;
            count++;
            setLoadProgress(Math.round((count / data.frameCount) * 100));
            if (count === data.frameCount) {
              setIsLoading(false);
            }
          };
        }
      } catch (err) {
        console.warn("Frame loading error:", err);
      }
    }

    loadFrames();

    return () => {
      isMounted = false;
    };
  }, [renderFrame]);

  // Listen to smooth spring motion updates
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.max(0, Math.floor(latest * (totalFrameCount - 1))),
      totalFrameCount - 1
    );
    setCurrentFrameIdx(frameIndex);
    renderFrame(frameIndex);
  });

  // Attach native window scroll & resize event listeners
  useEffect(() => {
    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("resize", handleNativeScroll, { passive: true });
    
    handleNativeScroll();

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("resize", handleNativeScroll);
    };
  }, [handleNativeScroll]);

  // Step overlay opacity & transform animations
  const heroOpacity = useTransform(smoothProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.18], [0, -30]);

  const step1Opacity = useTransform(smoothProgress, [0.18, 0.24, 0.38, 0.44], [0, 1, 1, 0]);
  const step1Y = useTransform(smoothProgress, [0.18, 0.24, 0.38, 0.44], [30, 0, 0, -30]);

  const step2Opacity = useTransform(smoothProgress, [0.46, 0.52, 0.66, 0.72], [0, 1, 1, 0]);
  const step2Y = useTransform(smoothProgress, [0.46, 0.52, 0.66, 0.72], [30, 0, 0, -30]);

  const step3Opacity = useTransform(smoothProgress, [0.74, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const step3Y = useTransform(smoothProgress, [0.74, 0.8, 0.95, 1], [30, 0, 0, 0]);

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-[#0C0E14] text-white">
      {/* Sticky Screen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0C0E14]">
        
        {/* Preloader Pill in Top Corner */}
        {isLoading && (
          <div className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141722]/80 backdrop-blur-md border border-[#3A4054] text-xs font-mono text-[#F0F4F8] shadow-lg">
            <div className="h-3 w-3 rounded-full border border-white border-t-transparent animate-spin" />
            <span>Loading Frames ({loadProgress}%)</span>
          </div>
        )}

        {/* HTML5 Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover pointer-events-none"
        />

        {/* Ambient Dark Vignette Overlay for Crisp Contrast */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0C0E14]/70 via-transparent to-[#0C0E14]/85" />

        {/* Synchronized Overlay Content */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center px-4 md:px-12 max-w-7xl mx-auto w-full">
          
          {/* Hero Start Overlay (0% - 16% scroll) */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="text-center max-w-3xl space-y-4 pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1C2130]/90 text-[#F0F4F8] border border-[#3A4054] backdrop-blur-md shadow-lg">
              <Zap className="w-3.5 h-3.5 text-white" /> Sovereign Sentinel
            </div>

            <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight font-heading text-white leading-tight drop-shadow-lg">
              RUDRA
            </h1>

            <p className="text-lg sm:text-2xl font-medium text-[#F0F4F8] font-heading tracking-wide italic">
              The Lightbringer • The calm in the storm
            </p>

            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
              Scroll down to trigger the quantum suit deployment sequence in real time.
            </p>

            <div className="pt-2 flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C2130]/90 text-[#F0F4F8] text-xs font-mono uppercase tracking-widest border border-[#3A4054] animate-bounce">
                Scroll to Begin <ArrowDown className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Phase 01: The Origin of Rudra (18% - 44% scroll) */}
          <motion.div
            style={{ opacity: step1Opacity, y: step1Y }}
            className="absolute left-6 md:left-16 max-w-md bg-[#141722]/90 backdrop-blur-xl border border-[#3A4054] p-6 md:p-8 rounded-2xl shadow-2xl glow-border-storm pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#232733] border border-[#3A4054] text-[#F0F4F8] text-xs font-mono uppercase mb-3">
              <Compass className="w-3.5 h-3.5" /> Phase 01 / Origin
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#F0F4F8]">
              The Origin of Rudra
            </h3>
            <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
              Born from the convergence of atmospheric tempest and ancient cosmic balance, Rudra emerged as a living sanctuary designed to withstand chaotic forces, anchor hope, and restore quiet harmony.
            </p>
          </motion.div>

          {/* Phase 02: Powers (46% - 72% scroll) */}
          <motion.div
            style={{ opacity: step2Opacity, y: step2Y }}
            className="absolute right-6 md:right-16 max-w-md bg-[#141722]/90 backdrop-blur-xl border border-[#3A4054] p-6 md:p-8 rounded-2xl shadow-2xl glow-border-storm pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#232733] border border-[#3A4054] text-[#F0F4F8] text-xs font-mono uppercase mb-3">
              <Zap className="w-3.5 h-3.5" /> Phase 02 / Powers
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#F0F4F8]">
              Cosmic & Tactical Powers
            </h3>
            <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
              Manipulates localized electromagnetic fields, atmospheric energy, and kinetic dampeners to generate impenetrable protective barriers and illuminate paths through any darkness.
            </p>
          </motion.div>

          {/* Phase 03: What Rudra Stands For (74% - 100% scroll) */}
          <motion.div
            style={{ opacity: step3Opacity, y: step3Y }}
            className="text-center max-w-lg bg-[#141722]/90 backdrop-blur-xl border border-[#3A4054] p-8 rounded-2xl shadow-2xl glow-border-storm pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#232733] border border-[#3A4054] text-[#F0F4F8] text-xs font-mono uppercase mb-3">
              <HeartHandshake className="w-3.5 h-3.5" /> Phase 03 / Mission & Purpose
            </div>
            <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-[#F0F4F8] tracking-tight">
              What Rudra Stands For
            </h3>
            <p className="mt-3 text-sm md:text-base text-[#94A3B8] leading-relaxed">
              To ensure no one has to carry their storm entirely alone. Rudra stands as an unwavering guardian of hope, dedicated to guiding, protecting, and empowering humanity through life’s darkest tempests.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
