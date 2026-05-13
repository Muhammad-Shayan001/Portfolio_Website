import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function Scene() {
  const sphereRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1.5} />
      <directionalLight position={[-2, -5, -2]} intensity={0.5} color="#8b5cf6" />
      <Sphere ref={sphereRef} args={[1.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          wireframe={true}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

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
        
        {/* Right Visual - 3D Sphere */}
        <div className="relative hidden md:block w-full h-full min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 z-10"
          >
            <div 
              className="relative w-full h-full max-w-[500px] mx-auto perspective-1000"
              style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full animate-float">
                <Scene />
              </Canvas>
              
              {/* Decorative Glow behind 3D object */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}