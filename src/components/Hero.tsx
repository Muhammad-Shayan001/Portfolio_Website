"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video
      .play()
      .catch(() => {
        if (!isMuted) {
          setIsMuted(true);
          video.muted = true;
        }
      });
  }, [isMuted]);

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

        <div className="absolute inset-0 z-10 flex items-end pb-16 px-6 md:px-12">
          <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-black/65 p-8 backdrop-blur-2xl shadow-2xl shadow-black/50">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Full Stack Developer</p>
            <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-white">
              I build premium web experiences with clarity, performance, and polish.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-300 max-w-2xl">
              Modern portfolio and product interfaces designed to look sharp and feel seamless on every screen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D577] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-xl shadow-[#D4AF3740] transition hover:brightness-110"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setIsMuted((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/20 hover:bg-white/10"
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
