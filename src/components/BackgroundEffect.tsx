import { motion } from 'motion/react';

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise z-50" />
      
      {/* Base Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />


      {/* Subtle ambient blobs */}
      <motion.div
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-15%] left-[-10%] w-[40%] h-[40%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] right-[-8%] w-[45%] h-[45%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(34, 211, 238, 0.05) 50%, transparent 75%)',
          filter: 'blur(100px)',
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
    </div>
  );
}
