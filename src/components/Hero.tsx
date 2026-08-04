"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16">
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Text Column - Asymmetric ~60% */}
        <div className="md:col-span-7 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[var(--paper)]">
              Muhammad Shayan
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--steel)] max-w-2xl font-light">
              Full-Stack Developer & Founder of FJ NEXUS. I build web apps and school/business systems that ship.
            </p>

            <div className="mt-8 flex gap-4">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[var(--signal)] text-white font-medium hover:bg-opacity-90 transition-colors"
              >
                View Work
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-[var(--steel)] text-[var(--paper)] font-medium hover:border-[var(--paper)] transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Image Column - Bleeding to edge conceptually */}
        <div className="md:col-span-5 h-[500px] relative mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full h-full relative grayscale hover:grayscale-0 transition-all duration-700"
          >
            {/* The user needs to provide a real photo in public/images/about-photo.jpg */}
            {/* Using a placeholder div if image fails to load, but assuming the user will add it */}
            <div className="absolute inset-0 bg-[var(--line)] border border-[var(--steel)] flex items-center justify-center text-[var(--steel)] text-sm overflow-hidden">
              <span className="font-mono z-10 px-4 text-center">Add real photo to public/images/hero-photo.jpg</span>
              <Image 
                src="/images/hero-photo.jpg"
                alt="Muhammad Shayan"
                fill
                className="object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
