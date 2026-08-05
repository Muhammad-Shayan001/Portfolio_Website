"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [muted, setMuted] = useState(true);

  const tryPlayVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setMuted(true);
    video.volume = 1;

    try {
      await video.play();
    } catch {
      return;
    }

    try {
      setMuted(false);
      video.muted = false;
      await video.play();
    } catch {
      setMuted(true);
      video.muted = true;
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
    tryPlayVideo();
  }, []);

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black">
      <div className="relative  h-screen w-full overflow-hidden">
        <motion.video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
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
      </div>
    </section>
  );
}
