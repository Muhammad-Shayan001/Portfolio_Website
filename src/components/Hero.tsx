import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Github, Code2, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const Typewriter = ({ texts, delay = 0 }: { texts: string[]; delay?: number }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    const text = texts[currentTextIndex];
    const speed = isDeleting ? 50 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText.length === text.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, started, currentTextIndex, texts]);

  return (
    <span className="relative">
      <span className="text-gradient">{currentText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-full"
        style={{ background: 'linear-gradient(180deg, #8b5cf6, #3b82f6)' }}
      />
    </span>
  );
};

function FloatingOrb({ delay, size, color, x, y }: { delay: number; size: number; color: string; x: string; y: string }) {
  return (
    <motion.div
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      className="absolute rounded-full blur-xl"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: x,
        top: y,
        opacity: 0.15,
      }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Floating decorative orbs */}
      <FloatingOrb delay={0} size={300} color="#8b5cf6" x="10%" y="20%" />
      <FloatingOrb delay={2} size={200} color="#3b82f6" x="70%" y="60%" />
      <FloatingOrb delay={4} size={150} color="#f472b6" x="80%" y="15%" />
      <FloatingOrb delay={1} size={180} color="#22d3ee" x="5%" y="70%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Content */}
        <motion.div style={{ y, opacity, scale }} className="relative z-10">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium mb-8 group"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.08))',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
            }}
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 8px rgba(52, 211, 153, 0.6)' }}
            />
            <span className="text-slate-300">Available for new projects</span>
            <Sparkles size={14} className="text-primary" />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tight leading-[1.05] mb-6"
          >
            <motion.span 
              className="block text-white/90"
              style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
            >
              Crafting
            </motion.span>
            <motion.span
              className="block"
              style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
            >
              <Typewriter texts={['Digital', 'Modern', 'Scalable', 'Beautiful']} delay={1.5} />
            </motion.span>
            <motion.span 
              className="block text-white/90"
              style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
            >
              Experiences
            </motion.span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 max-w-lg mb-10 leading-relaxed"
          >
            Hi, I'm <span className="text-white font-semibold">Muhammad Shayan</span>. 
            A passionate developer crafting clean, efficient code to solve real-world problems. 
            Specializing in <span className="text-primary/80">modern web technologies</span> and futuristic UI/UX.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 rounded-2xl text-white font-bold flex items-center gap-2.5 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                boxShadow: '0 8px 30px rgba(139, 92, 246, 0.35)',
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%', skewX: '-15deg' }}
                whileHover={{ x: '150%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Explore Work</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="https://github.com/Muhammad-Shayan001"
              target="_blank"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-2xl font-bold flex items-center gap-2.5 glass-strong hover:border-white/20 transition-all"
            >
              <Github size={18} className="group-hover:rotate-12 transition-transform" />
              <span>GitHub</span>
            </motion.a>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-14 flex items-center gap-8"
          >
            {[
              { value: '20+', label: 'Projects' },
              { value: '2+', label: 'Years Exp' },
              { value: '100%', label: 'Dedication' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
                className="flex flex-col"
              >
                <span className="text-2xl sm:text-3xl font-black text-white glow-text font-display">{stat.value}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right Visual */}
        <div className="relative hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10"
          >
            <div 
              className="relative w-full aspect-square max-w-[520px] mx-auto perspective-1000"
              style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateY: [-3, 3, -3],
                  rotateX: [3, -3, 3]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[40px] overflow-hidden group"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Animated gradient border */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-[1px] rounded-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-700 z-30"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, #8b5cf6, transparent, #3b82f6, transparent)',
                  }}
                />

                {/* Background Image */}
                <img
                  src="/hero-dev.png"
                  alt="Modern software development"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                
                {/* Gradient overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/60 to-[#030014]/20 z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content overlay */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary backdrop-blur-md"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15))',
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
                        border: '1px solid rgba(139, 92, 246, 0.15)',
                      }}
                    >
                      <Code2 size={24} />
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
                      style={{
                        background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(52, 211, 153, 0.08))',
                        border: '1px solid rgba(52, 211, 153, 0.25)',
                        color: '#34d399',
                        boxShadow: '0 0 12px rgba(52, 211, 153, 0.15)',
                      }}
                    >
                      ● LIVE
                    </motion.div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-display font-black mb-2 text-white drop-shadow-lg">Modern Architecture</h3>
                    <p className="text-sm text-slate-300/90 mb-5 drop-shadow-md">Building scalable systems with React & Node.js</p>
                    
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '92%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                          className="h-full rounded-full relative overflow-hidden"
                          style={{ background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #22d3ee)' }}
                        >
                          <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-slate-400">Performance</span>
                        <span className="text-primary">98%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Element - Top Right */}
              <motion.div
                animate={{ y: [0, 15, 0], x: [0, 8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-8 -right-8 w-36 h-36 rounded-3xl p-6 flex flex-col justify-center items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
              >
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-cyan"
                  style={{ background: 'rgba(34, 211, 238, 0.15)', boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)' }}
                >
                  <Zap size={18} />
                </motion.div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Innovation</span>
              </motion.div>
              
              {/* Floating Element - Bottom Left */}
              <motion.div
                animate={{ y: [0, -12, 0], x: [0, -8, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-6 w-52 h-24 rounded-3xl p-5 flex items-center gap-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div className="flex -space-x-3">
                  {['#8b5cf6', '#3b82f6', '#22d3ee'].map((color, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                      className="w-9 h-9 rounded-full border-2 border-[#030014]"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
                    />
                  ))}
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 leading-tight uppercase tracking-widest">Trusted by</span>
                  <div className="text-sm font-bold text-white">10+ Clients</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] -z-10">
            <div className="absolute inset-0 bg-primary/8 blur-[150px] animate-aurora" />
            <div className="absolute inset-[20%] bg-secondary/6 blur-[120px] animate-aurora" style={{ animationDelay: '5s' }} />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span 
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold font-mono"
        >
          Scroll Down
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-12 rounded-full border border-white/10 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
