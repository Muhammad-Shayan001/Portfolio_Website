import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';



export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('reveal');
          setTimeout(() => setIsLoading(false), 1200);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'circle(0% at 50% 50%)',
            opacity: 0,
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                y: [0, -200],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-5%',
              }}
            />
          ))}

          {/* Logo Animation */}
          <div className="relative mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ 
                opacity: phase === 'reveal' ? [1, 0] : 1, 
                scale: phase === 'reveal' ? [1, 1.2] : 1, 
                rotateY: 0 
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
                rotateY: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
              }}
              className="relative"
            >
              <img 
                src="/logo.png" 
                alt="MS Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto drop-shadow-2xl"
              />
              {/* Glow behind logo */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full"
              />
            </motion.div>
            
            {/* Underline glow */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-4 max-w-[200px] mx-auto"
            />
          </div>
          
          {/* Progress Bar */}
          <div className="relative w-72 md:w-80">
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #22d3ee)',
                }}
              />
              {/* Shimmer effect on progress bar */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ left: 0 }}
              />
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-600 font-mono"
              >
                {progress < 30 ? 'Initializing...' : progress < 60 ? 'Loading Assets...' : progress < 90 ? 'Preparing UI...' : 'Ready'}
              </motion.span>
              <motion.span 
                className="text-[10px] uppercase tracking-[0.3em] font-bold font-mono"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Bottom branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-700 font-mono">
              Portfolio © {new Date().getFullYear()}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
