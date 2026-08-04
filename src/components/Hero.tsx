"use client";

import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Freeze on last frame when video ends
    const handleEnded = () => {
      video.pause();
      if (video.duration) {
        video.currentTime = video.duration - 0.05;
      }
    };

    // Robustness fallback: freeze near end via timeupdate
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.15) {
        video.pause();
        video.currentTime = video.duration - 0.05;
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
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#08080A]">
      {/* INTENTIONALLY MINIMAL — Hero is video-only, all content lives in About section below */}

      {/* Full-bleed background video — H.264 optimized fast-start video with poster fallback */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/introVideo-optimized.mp4" type="video/mp4" />
          <source src="/introVideo.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback background if video fails */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0E] via-[#0F0505] to-[#08080A] z-0 flex items-center justify-center">
          <img src="/hero-poster.jpg" alt="Muhammad Shayan Hero" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Very subtle bottom gradient to blend hero into the About section below */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-[#08080A] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
