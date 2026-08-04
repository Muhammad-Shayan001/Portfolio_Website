"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoPlayBlocked, setAutoPlayBlocked] = useState(false);

  const tryPlayWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    try {
      await video.play();
      setIsMuted(false);
      setAutoPlayBlocked(false);
    } catch {
      video.muted = true;
      setIsMuted(true);
      setAutoPlayBlocked(true);
    }
  };

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      try {
        await video.play();
        setIsMuted(false);
        setAutoPlayBlocked(false);
      } catch {
        video.muted = true;
        setIsMuted(true);
        setAutoPlayBlocked(true);
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

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

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    tryPlayWithSound();
  }, []);


  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black">
      <div className="relative  h-screen w-full overflow-hidden">
        <motion.video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          loop={false}
          preload="auto"
          poster="/heroimage.png"
          onEnded={() => setShowHeroImage(true)}
          onTimeUpdate={() => {
            const video = videoRef.current;
            if (video && video.duration && video.currentTime >= video.duration - 0.15) {
              setShowHeroImage(true);
            }
          }}
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

        {/* Floating mute/unmute button (removed the large info card above the video) */}
        <button
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          onClick={toggleMute}
          className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 rounded-full bg-black/40 p-3 backdrop-blur-md border border-white/10 text-white hover:bg-black/60"
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-red-400" /> : <Volume2 className="h-5 w-5 text-emerald-400" />}
        </button>
      </div>
    </section>
  );
}
