"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeroImage, setShowHeroImage] = useState(false);
  // Start unmuted when we can; browsers that block autoplay-with-audio will
  // fall back to muted and we'll unmute on the first user gesture.
  const [muted, setMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioUnlockedRef = useRef(false);

  // Try unmuted autoplay first; if the browser refuses, fall back to muted.
  // Either way we end up with the video running.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setShowHeroImage(true);
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.15) {
        setShowHeroImage(true);
      }
    };
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    const startPlayback = async (withAudio: boolean) => {
      try {
        video.muted = !withAudio;
        video.volume = 1;
        await video.play();
        if (withAudio) {
          setMuted(false);
          setAudioReady(true);
        } else {
          setMuted(true);
        }
      } catch {
        // Couldn't even play muted; leave the poster visible.
        setMuted(true);
      }
    };

    startPlayback(true); // request audio with autoplay
    // Safety net: if audio autoplay was blocked, start muted so the video
    // still runs visually.
    const safetyTimer = window.setTimeout(() => {
      if (!audioUnlockedRef.current && video.paused) {
        startPlayback(false);
      }
    }, 600);

    return () => {
      window.clearTimeout(safetyTimer);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  // The moment the user does ANYTHING — scroll, click, move the mouse,
  // touch, press a key — browsers count that as a user gesture and we can
  // unmute the video. This is how every autoplay-with-audio site works.
  useEffect(() => {
    const unlockAudio = async () => {
      if (audioUnlockedRef.current) return;
      const video = videoRef.current;
      if (!video) return;
      audioUnlockedRef.current = true;

      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
        setMuted(false);
        setAudioReady(true);
      } catch {
        // Still blocked. Leave muted so the page isn't broken.
        video.muted = true;
        setMuted(true);
      }
    };

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "pointerup",
      "mousedown",
      "mouseup",
      "mousemove",
      "click",
      "touchstart",
      "touchend",
      "keydown",
      "scroll",
      "wheel",
    ];

    const opts = { once: true, passive: true } as AddEventListenerOptions;
    events.forEach((name) => window.addEventListener(name, unlockAudio, opts));

    return () => {
      events.forEach((name) => window.removeEventListener(name, unlockAudio));
    };
  }, []);

  const toggleMute = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    audioUnlockedRef.current = true;

    if (muted) {
      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
        setMuted(false);
        setAudioReady(true);
      } catch {
        video.muted = true;
        setMuted(true);
      }
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black">
      <div className="relative h-screen w-full overflow-hidden">
        <motion.video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
          loop={false}
          preload="auto"
          poster="/heroimage.png"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHeroImage ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/introVideo.mp4" type="video/mp4" />
        </motion.video>

        <motion.img
          src="/heroimage.png"
          alt="Muhammad Shayan hero visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHeroImage ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.92))]" />

        {/* Mute / unmute control — visible always so the user can override. */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition hover:scale-105 hover:border-[#F5D577]/60 hover:bg-black/70"
        >
          {muted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5 text-[#F5D577]" />
          )}
        </button>

        {/* Subtle "sound on" indicator that fades out once audio is live. */}
        <AnimatePresence>
          {!audioReady && muted && (
            <motion.div
              key="sound-hint"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
            >
              <button
                type="button"
                onClick={toggleMute}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/55 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-md transition hover:border-[#F5D577]/60 hover:text-[#F5D577]"
              >
                <VolumeX className="h-4 w-4" />
                <span>Click anywhere for sound</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
