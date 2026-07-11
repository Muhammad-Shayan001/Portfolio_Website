import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Github, Sparkles, Download } from 'lucide-react';
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
          className="inline-block w-0.75 h-[0.85em] ml-1 align-middle rounded-full"
          style={{ background: 'linear-gradient(180deg, #8b5cf6, #3b82f6)' }}
        />
    </span>
  );
};

function DecorativeShape({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={className} style={style} />;
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
    <section id="home" ref={containerRef} className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#090b10] px-5 py-8 shadow-[0_40px_140px_rgba(0,0,0,0.55)] sm:px-8 lg:px-10 lg:py-10">
      <div className="absolute inset-0 overflow-hidden rounded-[36px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(108,79,224,0.2),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.12),transparent_30%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full border border-white/10" />
        <div className="absolute left-10 top-12 h-16 w-16 rounded-full border border-white/10" />
        <div className="absolute bottom-8 left-8 h-24 w-24 rounded-full border border-white/10" />
        <motion.div animate={{ y: [0, -16, 0], x: [0, 18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-10 top-16 h-20 w-20 rounded-[28px] border border-fuchsia-400/25 bg-fuchsia-500/10 shadow-[0_0_30px_rgba(244,114,182,0.14)]" />
        <motion.div animate={{ y: [0, 16, 0], x: [0, -12, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-14 left-12 h-16 w-16 rounded-[20px] border border-cyan-400/20 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.13)]" />
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-24 top-[45%] h-12 w-12 rounded-full border border-emerald-400/20 bg-emerald-500/10" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div style={{ y, opacity, scale }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-xl"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2.5 w-2.5 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 8px rgba(52, 211, 153, 0.6)' }}
            />
            <span className="text-slate-300">Available for new projects</span>
            <Sparkles size={14} className="text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="mb-6 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="mb-2 block text-white/90">Muhammad</span>
            <span className="mb-2 block bg-gradient-to-r from-[#b39cff] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
              <Typewriter texts={['Shayan', 'Full-Stack', 'Creative', 'Modern']} delay={1.3} />
            </span>
            <span className="block text-white/90">Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            Bringing visionary digital projects to life — I design and develop robust web solutions that are intuitive for users and efficient for businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            {['React', 'Next.js', 'TypeScript', 'UI/UX'].map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300 backdrop-blur-xl">
                {tool}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #6C4FE0, #9B7BFF)',
                boxShadow: '0 10px 30px rgba(108, 79, 224, 0.28)',
              }}
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="https://github.com/Muhammad-Shayan001"
              target="_blank"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-slate-200 backdrop-blur-xl transition-all hover:border-white/20"
            >
              <Github size={18} />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="mailto:shayan.javed091@gmail.com"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-slate-200 backdrop-blur-xl transition-all hover:border-white/20"
            >
              <Download size={18} />
              <span>Download CV</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            {[
              { value: '20+', label: 'Projects' },
              { value: '2+', label: 'Years Exp' },
              { value: '17', label: 'Certifications' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
                className="flex flex-col"
              >
                <span className="text-2xl font-black text-white font-display sm:text-3xl">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative hidden min-h-[420px] md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -12 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
            className="relative mx-auto h-full max-w-[520px]"
            style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
          >
            <div className="absolute inset-0 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl" />
            <div className="relative flex h-full flex-col items-center justify-center rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 shadow-[0_25px_90px_rgba(0,0,0,0.35)]">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 blur-3xl" />
              <div className="absolute bottom-6 right-10 h-28 w-28 rounded-full border border-cyan-400/20 bg-cyan-500/10 blur-3xl" />
              <div className="mb-6 rounded-full border border-white/10 bg-black/30 p-2 shadow-[0_0_60px_rgba(108,79,224,0.2)]">
                <img src="/avatar.svg" alt="Stylized avatar" className="h-56 w-56 rounded-full" />
              </div>
              <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-xl">Full-Stack Developer • UI/UX Focus</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}