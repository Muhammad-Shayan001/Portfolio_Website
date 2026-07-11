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
            className="lg:w-1/2 relative group"
          >
            <TiltCard className="relative z-10">
              <div 
                className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
              >
                <img
                  src="/avatar.svg"
                  alt="Muhammad Shayan - Web Developer"
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-[1.02]"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/30 to-transparent opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Floating Stats on Image */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 left-6 right-6 glass-strong px-6 py-4 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-primary"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))',
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.15)',
                      }}
                    >
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">Full Stack Developer</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Expertise Level</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TiltCard>
            
            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/8 blur-[120px] -z-10 animate-pulse-slow" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/8 blur-[120px] -z-10 animate-pulse-slow" />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-36 h-36 border border-dashed border-white/[0.06] rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -left-8 w-28 h-28 border border-dashed border-primary/10 rounded-full"
            />
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
              Building the<br />
              Future with <br />
              <span className="text-gradient">Modern Tech</span>
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
              I am a dedicated developer with a strong focus on creating high-performance web applications. 
              My journey started with a curiosity for how things work on the web, which evolved into a career 
              of building complex {' '}
              <span className="text-white/70 font-medium">digital experiences</span>. I believe in the power of technology to transform 
              lives and businesses.
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
