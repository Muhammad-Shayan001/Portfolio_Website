import { motion } from 'motion/react';

const crystalStyles = [
  { top: '8%', left: '6%', rotate: 12, color: 'rgba(236,72,153,0.4)' },
  { top: '12%', right: '8%', rotate: -18, color: 'rgba(34,211,238,0.35)' },
  { bottom: '16%', left: '8%', rotate: 22, color: 'rgba(16,185,129,0.34)' },
  { bottom: '10%', right: '6%', rotate: -12, color: 'rgba(139,92,246,0.38)' },
];

export default function BackgroundEffect() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 noise z-50" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

      <motion.div
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-10%] top-[-15%] h-[40%] w-[40%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] right-[-8%] h-[45%] w-[45%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(34, 211, 238, 0.05) 50%, transparent 75%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 600 600"
          className="absolute left-[-10%] top-[8%] h-[680px] w-[680px] -rotate-12 opacity-[0.18] blur-3xl"
          aria-hidden="true"
        >
          <path
            d="M300 70C380 90 424 142 434 208C443 267 421 332 377 372C337 410 277 430 234 408C186 382 161 324 162 267C163 199 200 139 259 104C271 94 285 80 300 70Z"
            fill="rgba(255,255,255,0.65)"
            filter="url(#blur)"
          />
          <path
            d="M290 120C346 138 379 178 384 229C389 284 368 336 325 364C280 394 220 393 183 360C146 328 128 278 138 225C148 171 202 124 255 118C267 117 279 117 290 120Z"
            fill="rgba(255,255,255,0.35)"
          />
          <path
            d="M282 154C325 168 352 206 355 244C358 282 338 316 304 333C269 351 222 347 193 321C164 295 152 249 160 211C168 171 223 145 258 145C266 145 274 148 282 154Z"
            fill="rgba(255,255,255,0.18)"
          />
        </svg>

        <div className="absolute left-[7%] top-[14%] h-[250px] w-[250px] rounded-full border border-white/10" />
        <div className="absolute bottom-[11%] right-[8%] h-[320px] w-[320px] rounded-full border border-white/10" />
        <div className="absolute right-[16%] top-[24%] h-[180px] w-[180px] rounded-full border border-white/10" />

        {crystalStyles.map((item, index) => (
          <motion.div
            key={index}
            animate={{ opacity: [0.35, 0.8, 0.35], y: [0, -12, 0], rotate: [item.rotate, item.rotate + 8, item.rotate] }}
            transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-12 w-12 rounded-[18px] shadow-[0_0_25px_rgba(255,255,255,0.12)]"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              background: `linear-gradient(135deg, ${item.color}, rgba(255,255,255,0.08))`,
              clipPath: 'polygon(50% 0%, 100% 35%, 70% 100%, 30% 100%, 0% 35%)',
              filter: 'blur(0.3px)',
              transform: `rotate(${item.rotate}deg)`,
            }}
          />
        ))}
      </div>

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
