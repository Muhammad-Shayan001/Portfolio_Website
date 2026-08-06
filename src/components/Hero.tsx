"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2 } from "lucide-react";

type PlaybackState = "idle" | "playing" | "ended";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Start in "idle" so the image + button are the first thing the user sees.
  // No autoplay attempt — the button is the explicit gate.
  const [state, setState] = useState<PlaybackState>("idle");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setState("ended");
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.15) {
        setState("ended");
      }
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const startVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    // Hint the browser to start downloading the optimized MP4 immediately
    // (preload="none" earlier meant nothing downloaded until now). Setting
    // preload="auto" here kicks off the fetch right away on this user gesture
    // so playback doesn't pause mid-stream on slower connections.
    video.preload = "auto";
    video.load();

    // This click handler IS the user gesture the browser is waiting for, so
    // audio plays right away alongside the video.
    try {
      video.muted = false;
      video.volume = 1;
      // Play as soon as the browser has enough buffered; the second play()
      // resumes naturally if the first starts paused on a slow network.
      const playPromise = video.play();
      if (playPromise) {
        await playPromise.catch(() => undefined);
      }
      setState("playing");
    } catch {
      // Extremely rare: play was rejected even from a click handler. Fall
      // back to muted so the video still runs visually.
      try {
        video.muted = true;
        await video.play();
        setState("playing");
      } catch {
        // Couldn't play at all — leave the button visible.
      }
    }
  };

  const imageVisible = state !== "playing";
  const videoVisible = state === "playing";
  const buttonVisible = state === "idle";

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-[16/9] h-auto max-h-screen w-full overflow-hidden sm:aspect-auto sm:h-screen">
        {/* Poster / final frame image — visible at idle and after the video ends. */}
        <motion.img
          src="/heroimage.png"
          alt="Muhammad Shayan hero visual"
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: imageVisible ? 1 : 0,
            // When the video finishes, the image scales up from a slightly
            // smaller size — a subtle Ken Burns "push in" that gives the cut
            // weight and makes the transition feel intentional.
            scale: imageVisible ? 1 : 0.97,
          }}
          transition={{
            opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: imageVisible ? 0 : 0.2 },
            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: imageVisible ? 0 : 0.2 },
          }}
          // Explicit width/height prevent layout shift while the lighter JPG
          // downloads; loading=eager keeps it as the LCP image.
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Video — hidden until the user clicks Start. */}
        <motion.video
          ref={videoRef}
          playsInline
          muted
          loop={false}
          preload="metadata"
          poster="/hero-poster.jpg"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: videoVisible ? 1 : 0,
            scale: videoVisible ? 1 : 1.04,
          }}
          transition={{
            opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* Use the smaller optimized MP4 (≈11MB vs 50MB) — same source, much
              faster to download when the user clicks Start, so the video
              doesn't buffer or pause mid-play on slow networks. */}
          <source src="/introVideo-optimized.mp4" type="video/mp4" />
        </motion.video>

        {/* Cinematic flash that fires exactly at the swap moment — a quick
            gold light leak so the eye registers the transition. */}
        <AnimatePresence>
          {state === "ended" && (
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0] }}
              transition={{ duration: 0.85, times: [0, 0.35, 1], ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(245,213,119,0.55) 0%, rgba(245,213,119,0.18) 35%, rgba(0,0,0,0) 70%)",
                mixBlendMode: "screen",
              }}
              aria-hidden
            />
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.92))]" />

        {/* "Start Intro" button — themed to the site's gold/navy aesthetic. */}
        <AnimatePresence>
          {buttonVisible && (
            <motion.div
              key="start-button"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
            >
              {/* Eyebrow label */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-[#F5D577]/90 sm:text-sm"
              >
                Welcome to my portfolio
              </motion.p>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">
                  Muhammad Shayan
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-4 max-w-xl text-base text-zinc-300 sm:text-lg"
              >
                Full Stack Developer crafting clean, high-performance web
                applications.
              </motion.p>

              {/* The themed button */}
              <motion.button
                type="button"
                onClick={startVideo}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-2xl shadow-[#F5D577]/30 sm:px-10 sm:text-base"
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #F5D577 50%, #B8860B 100%)",
                }}
                aria-label="Play intro video with sound"
              >
                {/* Shimmer overlay */}
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden
                />
                <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/15">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <span className="relative z-10">Start Intro</span>
                <Volume2
                  className="relative z-10 h-4 w-4 opacity-80"
                  aria-hidden
                />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-5 text-[11px] uppercase tracking-[0.35em] text-zinc-400"
              >
                Video plays with sound
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}