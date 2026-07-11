import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { User, Code, Rocket, BrainCircuit, Sparkles, Heart, Download } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import React, { useRef } from 'react';

const features = [
  {
    icon: <Code size={24} />,
    title: 'Clean Code',
    description: 'Maintainable, scalable, and efficient code with industry best practices.',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'rgba(139, 92, 246, 0.3)',
  },
  {
    icon: <Rocket size={24} />,
    title: 'Fast Delivery',
    description: 'Optimized workflows for high-quality results in record time.',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59, 130, 246, 0.3)',
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'Problem Solver',
    description: 'Turning complex challenges into elegant, lightweight solutions.',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'rgba(244, 114, 182, 0.3)',
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#090b10] px-5 py-8 shadow-[0_25px_110px_rgba(0,0,0,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div className="absolute inset-0 overflow-hidden rounded-[36px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(108,79,224,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.1),transparent_30%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
        <svg viewBox="0 0 600 600" className="absolute left-[-8%] top-[8%] h-[620px] w-[620px] -rotate-12 opacity-[0.16] blur-3xl" aria-hidden="true">
          <path d="M302 82C380 100 430 151 437 221C444 292 410 360 355 398C299 437 218 441 163 406C109 373 78 311 86 245C94 178 147 124 218 98C245 87 274 80 302 82Z" fill="rgba(255,255,255,0.72)" />
          <path d="M304 146C348 158 384 196 384 244C384 289 354 329 311 344C266 360 213 347 179 318C144 289 134 243 146 201C158 159 204 128 248 129C266 129 285 135 304 146Z" fill="rgba(255,255,255,0.34)" />
        </svg>
        <div className="absolute left-[12%] top-[14%] h-[220px] w-[220px] rounded-full border border-white/10" />
        <div className="absolute bottom-[10%] right-[8%] h-[280px] w-[280px] rounded-full border border-white/10" />
        <motion.div animate={{ opacity: [0.35, 0.75, 0.35], y: [0, -10, 0], rotate: [12, 20, 12] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[10%] top-[16%] h-14 w-14 rounded-[18px] shadow-[0_0_24px_rgba(244,114,182,0.16)]" style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.42), rgba(34,211,238,0.16))', clipPath: 'polygon(50% 0%, 100% 35%, 70% 100%, 30% 100%, 0% 35%)' }} />
        <motion.div animate={{ opacity: [0.35, 0.75, 0.35], y: [0, 10, 0], rotate: [-16, -6, -16] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[12%] right-[10%] h-12 w-12 rounded-[16px] shadow-[0_0_22px_rgba(16,185,129,0.16)]" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.38), rgba(139,92,246,0.16))', clipPath: 'polygon(50% 0%, 100% 35%, 70% 100%, 30% 100%, 0% 35%)' }} />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="group relative lg:w-1/2"
          >
            <TiltCard className="relative z-10">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-2 shadow-[0_25px_100px_rgba(0,0,0,0.35)]">
                <div className="relative overflow-hidden rounded-[28px]">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Professional developer portrait"
                    className="h-[460px] w-full object-cover object-center transition-all duration-1000 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-primary"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))',
                          boxShadow: '0 0 15px rgba(139, 92, 246, 0.15)',
                        }}
                      >
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <div className="text-lg font-black text-white">Full Stack Developer</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Product-focused engineer</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TiltCard>

            <div className="absolute -left-10 -top-10 h-56 w-56 -z-10 rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute -bottom-10 -right-8 h-56 w-56 -z-10 rounded-full bg-secondary/10 blur-[120px]" />
          </motion.div>
          
          {/* Right: Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary lg:justify-start"
            >
              <User size={14} />
              <span className="glow-text">About Me</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-center text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-left lg:text-6xl"
            >
              Designing thoughtful products<br />
              with <span className="text-gradient">precision</span> and <span className="text-gradient">care</span>
            </motion.h2>
            <svg viewBox="0 0 180 20" className="mx-auto mb-8 h-6 w-32 lg:mx-0" aria-hidden="true">
              <path d="M4 10C24 2 43 2 64 10C82 17 102 17 122 10C139 4 159 4 176 10" stroke="url(#squiggle)" strokeWidth="2.7" strokeLinecap="round" fill="none" />
              <defs>
                <linearGradient id="squiggle" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-10 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg lg:text-left"
            >
              I combine solid engineering fundamentals with a design-minded approach to build fast, polished, and dependable products.
              Whether the goal is a marketing website, a SaaS platform, or a complex interaction layer, I focus on clarity, performance,
              and a premium experience from the first click to the last.
            </motion.p>

            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                { icon: <Heart size={14} />, text: 'Passionate' },
                { icon: <Download size={14} />, text: 'Open Source' },
                { icon: <Sparkles size={14} />, text: 'Creative' },
              ].map((tag) => (
                <span 
                  key={tag.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 backdrop-blur-xl"
                >
                  <span className="text-primary">{tag.icon}</span>
                  {tag.text}
                </span>
              ))}
            </motion.div>
            
            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(108,79,224,0.16)]"
                >
                  {/* Hover Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${feature.glow} 0%, transparent 60%)`,
                    }}
                  />
                  
                  <div 
                    className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg", feature.gradient)}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-sm font-black text-white mb-2 tracking-tight">{feature.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
