import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useCallback, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 4 + 2,
    })),
  []);

  return (
    <div className="absolute inset-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          animate={{
            opacity: [star.opacity, star.opacity * 2, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  const particles: Particle[] = useMemo(() => {
    const colors = [
      'rgba(139, 92, 246, 0.6)',
      'rgba(59, 130, 246, 0.5)',
      'rgba(34, 211, 238, 0.4)',
      'rgba(244, 114, 182, 0.5)',
      'rgba(167, 139, 250, 0.5)',
    ];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  return (
    <div className="absolute inset-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default function BackgroundEffect() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise z-50" />
      
      {/* Star Field */}
      <StarField />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Base Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      
      {/* Mouse Following Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full -z-10"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 70%)',
        }}
      />

      {/* Animated Aurora Blobs */}
      <motion.div
        animate={{
          x: [0, 150, -100, 50, 0],
          y: [0, 80, -50, 120, 0],
          scale: [1, 1.3, 0.9, 1.2, 1],
          rotate: [0, 45, 90, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{
          x: [0, -120, 80, -60, 0],
          y: [0, 100, -80, 50, 0],
          scale: [1, 0.8, 1.4, 1.1, 1],
          rotate: [0, -90, -180, -270, -360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(34, 211, 238, 0.06) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <motion.div
        animate={{
          x: [0, 80, -120, 0],
          y: [0, -100, 60, 0],
          scale: [1, 1.5, 0.7, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, rgba(244, 114, 182, 0.03) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      
      {/* Grid Pattern - Subtle */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      {/* Orbiting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-primary/30 blur-sm" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[20%]"
        >
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-secondary/30 blur-sm" />
        </motion.div>
      </div>
    </div>
  );
}
