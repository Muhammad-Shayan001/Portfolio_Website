"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles, FolderGit2, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 1. Full-bleed Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90 contrast-110"
      >
        <source src="/introVideo.mp4" type="video/mp4" />
      </video>

      {/* 2. Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#08080A] z-10" />

      {/* Radial red glow overlay */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none z-10" />

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl mb-8 shadow-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E10600] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF2C2C]"></span>
          </span>
          <span className="text-xs font-mono tracking-wider uppercase text-zinc-300">
            Available for Full-Stack & Engineering Roles
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#F5D577]" />
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-metallic drop-shadow-2xl leading-[1.05]"
        >
          Muhammad Shayan
        </motion.h1>

        {/* Hero Role (Animated Gold Gradient) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gold"
        >
          Full Stack Developer
        </motion.div>

        {/* Hero Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed drop-shadow"
        >
          Passionate developer crafting clean, efficient code to solve real-world problems.
          Enthusiast of open-source collaboration and continuous learning.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-5"
        >
          <button
            onClick={() => handleScrollTo("projects")}
            className="btn-red-gradient px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center gap-3 group cursor-pointer shadow-xl shadow-red-900/50"
          >
            <FolderGit2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleScrollTo("contact")}
            className="btn-gold-outline px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center gap-3 cursor-pointer"
          >
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Social Links Quick Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex items-center gap-6 text-zinc-400"
        >
          <a
            href="https://github.com/Muhammad-Shayan001"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F5D577] transition-colors p-2 hover:bg-white/5 rounded-full"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-shayan-98113a260/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF2C2C] transition-colors p-2 hover:bg-white/5 rounded-full"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/@studywithmuhammadshayan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF2C2C] transition-colors p-2 hover:bg-white/5 rounded-full"
            aria-label="YouTube Channel"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => handleScrollTo("about")}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-[#F5D577] transition-colors">
            Scroll Down
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5 group-hover:border-[#F5D577] transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-2.5 rounded-full bg-[#E10600]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
