"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column - 7 cols */}
        <div className="md:col-span-7 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--line)] text-[var(--signal)] font-mono text-xs w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--signal)] animate-pulse"></span>
              Available for Full-Stack & Engineering Roles
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[var(--paper)]">
              Muhammad Shayan
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--steel)] max-w-2xl font-light leading-relaxed">
              Full-Stack Developer & Software Engineer based in Karachi. I build production-ready web apps with React, Next.js, Node.js, and MongoDB.
            </p>

            {/* Quick Stats / Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--line)] text-sm font-mono">
              <div>
                <span className="block text-[var(--paper)] font-semibold text-lg">17+</span>
                <span className="text-[var(--steel)] text-xs">Kaggle Certifications</span>
              </div>
              <div>
                <span className="block text-[var(--paper)] font-semibold text-lg">Full-Stack</span>
                <span className="text-[var(--steel)] text-xs">MERN & Next.js</span>
              </div>
              <div>
                <span className="block text-[var(--paper)] font-semibold text-lg">SMIT</span>
                <span className="text-[var(--steel)] text-xs">Web Dev Certified</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-4 items-center">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[var(--signal)] text-white font-medium hover:bg-opacity-90 transition-colors text-sm"
              >
                Explore Projects
              </a>
              <a 
                href="https://resume-amber-eight.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-[var(--steel)] text-[var(--paper)] font-medium hover:border-[var(--paper)] transition-colors text-sm"
              >
                View Live Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact & Credentials Card */}
        <div className="md:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 bg-[var(--line)] border border-[var(--steel)]/30 flex flex-col gap-6"
          >
            <h3 className="text-xl font-medium text-[var(--paper)] border-b border-[var(--steel)]/20 pb-4">
              Direct Contact & Links
            </h3>

            <div className="flex flex-col gap-4 text-sm font-mono text-[var(--steel)]">
              <a 
                href="mailto:shayan.javed091@gmail.com" 
                className="flex items-center gap-3 text-[var(--paper)] hover:text-[var(--signal)] transition-colors"
              >
                <Mail className="w-4 h-4 text-[var(--signal)] shrink-0" />
                <span className="truncate">shayan.javed091@gmail.com</span>
              </a>

              <a 
                href="tel:+923171027397" 
                className="flex items-center gap-3 text-[var(--paper)] hover:text-[var(--signal)] transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--signal)] shrink-0" />
                <span>+92 317-1027397</span>
              </a>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[var(--signal)] shrink-0" />
                <span>Karachi, Pakistan</span>
              </div>

              <a 
                href="https://github.com/Muhammad-Shayan001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--paper)] hover:text-[var(--signal)] transition-colors pt-2 border-t border-[var(--steel)]/20"
              >
                <svg className="w-4 h-4 text-[var(--signal)] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>github.com/Muhammad-Shayan001</span>
              </a>

              <a 
                href="https://drive.google.com/file/d/1jnnItxeZ08YMamkRjWKgTCQm3zXhfUbh/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--paper)] hover:text-[var(--signal)] transition-colors"
              >
                <Award className="w-4 h-4 text-[var(--signal)] shrink-0" />
                <span>17x Kaggle Certificates Drive</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
