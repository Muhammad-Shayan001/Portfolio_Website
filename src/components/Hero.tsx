"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [muted, setMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);

  // Start muted (browsers allow autoplay when muted). Once the user interacts
  // with the page we unlock audio and switch the <video> into un-muted playback
  // — this is the only reliable way to get sound playing.
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

    // Attempt muted autoplay as soon as the video can play.
    const tryStart = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        // Autoplay blocked entirely (very rare); user must click play manually.
      }
    };
    tryStart();

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  // Promote any user gesture (click, key, touch, scroll) into an unmute.
  const unlockAudio = async () => {
    const video = videoRef.current;
    if (!video || audioReady) return;
    try {
      video.muted = false;
      video.volume = 1;
      await video.play();
      setMuted(false);
      setAudioReady(true);
      setPromptDismissed(true);
    } catch {
      // Still blocked; keep muted state so the prompt remains visible.
      video.muted = true;
      setMuted(true);
    }
  };

  useEffect(() => {
    const opts = { once: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", unlockAudio, opts);
    window.addEventListener("keydown", unlockAudio, opts);
    window.addEventListener("touchstart", unlockAudio, opts);
    window.addEventListener("scroll", unlockAudio, opts);
    return () => {
      window.removeEventListener("pointerdown", unlockAudio, opts);
      window.removeEventListener("keydown", unlockAudio, opts);
      window.removeEventListener("touchstart", unlockAudio, opts);
      window.removeEventListener("scroll", unlockAudio, opts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioReady]);

  const toggleMute = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (muted) {
      try {
        video.muted = false;
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

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.92))]" />

        {/* Mute / unmute control */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition hover:scale-105 hover:border-[#F5D577]/60 hover:bg-black/70"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5 text-[#F5D577]" />}
        </button>

        {/* "Tap to enable sound" hint — fades away after first interaction. */}
        <AnimatePresence>
          {!audioReady && !promptDismissed && (
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
                onClick={unlockAudio}
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#F5D577]/40 bg-black/55 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#F5D577] backdrop-blur-md transition hover:border-[#F5D577] hover:bg-black/75"
              >
                <VolumeX className="h-4 w-4" />
                <span>Tap to enable sound</span>
                <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-[#F5D577]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
