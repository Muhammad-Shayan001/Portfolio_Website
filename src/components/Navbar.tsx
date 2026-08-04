"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-black/90 backdrop-blur-md border-b border-white/10 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-900 p-[1px] flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5D577] text-base tracking-tighter">
                MS
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight group-hover:text-[#F5D577] transition-colors">
              Muhammad Shayan
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D577] animate-pulse"></span>
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                  isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10 shadow-lg shadow-black/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://linkedin.com/in/muhammad-shayan-98113a260/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-black/30"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF2C2C]" /> : <Menu className="w-6 h-6 text-[#F5D577]" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0E]/95 backdrop-blur-2xl border-b border-red-900/30 px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#8B0000]/40 to-[#E10600]/30 border-[#E10600]/50 text-white"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#FF2C2C] shadow-lg shadow-red-500"></span>}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="https://linkedin.com/in/muhammad-shayan-98113a260/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red-gradient w-full py-3 rounded-xl text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
