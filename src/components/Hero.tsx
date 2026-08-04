"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black">
      <div className="relative h-screen w-full overflow-hidden">
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

        <div className="absolute inset-0 bg-black/40" />

        <button
          type="button"
          onClick={() => {
            setIsMuted((prev) => !prev);
            if (videoRef.current) {
              videoRef.current.muted = !isMuted;
              videoRef.current.volume = isMuted ? 1 : 0;
            }
          }}
          className="absolute bottom-8 left-8 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-white shadow-xl shadow-black/40 backdrop-blur-md transition hover:bg-black/80"
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
          <span>{isMuted ? "Unmute" : "Mute"}</span>
        </button>
      </div>
    </section>
  );
}
