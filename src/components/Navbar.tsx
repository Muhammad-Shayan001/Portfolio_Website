import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#tech-stack' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 sm:px-6',
        isScrolled ? 'py-2' : 'py-4'
      )}
    >
      {/* Navbar Background */}
      <motion.div
        initial={false}
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: isScrolled ? 0 : -10,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-[#030014]/70 backdrop-blur-2xl border-b border-white/[0.06]"
        style={{
          boxShadow: isScrolled ? '0 10px 40px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2.5 group"
        >
          <motion.span 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden relative"
            style={{
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
            }}
          >
            <img src="/logo.png" alt="MS Logo" className="w-full h-full object-contain" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </motion.span>
          <span className="hidden sm:block">
            <span className="shimmer-text">Shayan</span>
            <span className="text-primary">.</span>
          </span>
        </motion.a>

        {/* Desktop Nav - Pill Style */}
        <div className="hidden md:flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-full glass-strong"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  "relative text-[11px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-colors duration-300 group",
                  activeSection === link.href.substring(1) ? "text-white" : "text-slate-500 hover:text-slate-200"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 rounded-full -z-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15))',
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-2/3 opacity-0 group-hover:opacity-100 rounded-full" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            href="https://github.com/Muhammad-Shayan001"
            target="_blank"
            className="p-2.5 rounded-xl glass border-white/5 hover:border-white/20 transition-all text-slate-400 hover:text-white group"
          >
            <Github size={18} className="group-hover:rotate-12 transition-transform" />
          </motion.a>
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 text-white">Let's Talk</span>
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden w-11 h-11 rounded-xl glass border-white/10 flex items-center justify-center text-slate-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="md:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-[#030014]/95 z-40 flex flex-col items-center justify-center"
          >
            {/* Decorative blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 blur-[120px]" />
            
            <div className="flex flex-col items-center gap-6 w-full px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className={cn(
                    "text-4xl font-display font-black tracking-tighter transition-colors relative group",
                    activeSection === link.href.substring(1) ? "text-gradient" : "text-white/70 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {activeSection === link.href.substring(1) && (
                    <motion.div 
                      layoutId="mobileActive"
                      className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full bg-primary"
                    />
                  )}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 pt-8 mt-4 border-t border-white/5 w-full justify-center"
              >
                <a href="https://github.com/Muhammad-Shayan001" target="_blank" className="p-4 rounded-2xl glass text-slate-400 hover:text-white transition-colors hover:scale-110">
                  <Github size={24} />
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
                  className="px-8 py-4 rounded-2xl text-white font-bold uppercase tracking-widest text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                  }}
                >
                  Let's Talk
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
