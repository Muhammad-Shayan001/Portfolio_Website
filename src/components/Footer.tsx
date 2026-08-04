"use client";

import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa6";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-[#D4AF37]/20 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand / Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg tracking-tight">
              Muhammad Shayan
            </span>
            <span className="text-xs font-mono text-[#F5D577]">// Full Stack Dev</span>
          </div>
          <p className="text-xs text-zinc-500 font-mono">
            © {new Date().getFullYear()} Muhammad Shayan. All rights reserved. Karachi, Pakistan.
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Muhammad-Shayan001"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#8B0000]/40 text-zinc-300 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-shayan-98113a260/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#8B0000]/40 text-zinc-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.youtube.com/@studywithmuhammadshayan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#8B0000]/40 text-zinc-300 hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/muhammadshayan001"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#8B0000]/40 text-zinc-300 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/muhammad.shayan.150815"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#8B0000]/40 text-zinc-300 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#F5D577] text-zinc-300 hover:text-[#F5D577] transition-all cursor-pointer flex items-center gap-2 text-xs font-mono"
        >
          <span>TOP</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
