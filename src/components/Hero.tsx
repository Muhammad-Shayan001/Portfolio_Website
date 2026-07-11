import { motion } from 'motion/react';

const crystalVariants = [
  { top: '8%', right: '10%', size: 'h-16 w-16', accent: 'linear-gradient(135deg, rgba(244,114,182,0.46), rgba(34,211,238,0.18))' },
  { top: '24%', right: '28%', size: 'h-12 w-12', accent: 'linear-gradient(135deg, rgba(34,211,238,0.42), rgba(16,185,129,0.18))' },
  { top: '44%', right: '16%', size: 'h-14 w-14', accent: 'linear-gradient(135deg, rgba(16,185,129,0.42), rgba(139,92,246,0.18))' },
];

function CrystalAccent({ className, accent }: { className?: string; accent: string }) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], x: [0, 10, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
      style={{
        background: accent,
        clipPath: 'polygon(50% 0%, 100% 35%, 70% 100%, 30% 100%, 0% 35%)',
        boxShadow: '0 0 28px rgba(255,255,255,0.12)',
      }}
    />
  );
}

export default function Hero() {
  return (
    <div className="bg-black px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
      <section id="home" className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b10] px-5 py-6 shadow-[0_25px_90px_rgba(0,0,0,0.65)] sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="absolute inset-0 overflow-hidden rounded-[30px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(108,79,224,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />

          <svg viewBox="0 0 700 700" className="absolute right-[-12%] top-[-8%] h-[82%] w-[82%] opacity-[0.2] sm:opacity-[0.24]" aria-hidden="true">
            <path d="M348 74C435 87 500 143 505 220C510 300 468 372 405 418C339 467 253 491 183 455C117 421 82 351 79 280C76 208 110 134 174 97C228 66 294 63 348 74Z" fill="rgba(255,255,255,0.76)" />
            <path d="M345 140C403 152 447 195 450 247C453 299 424 346 378 373C331 400 270 406 222 378C174 350 148 299 155 246C162 191 199 150 250 138C279 131 310 132 345 140Z" fill="rgba(255,255,255,0.36)" />
            <path d="M330 184C364 191 390 219 391 248C392 277 379 304 355 318C330 332 293 332 265 321C237 310 220 285 219 258C218 230 229 199 255 186C277 174 304 176 330 184Z" fill="rgba(255,255,255,0.18)" />
          </svg>

          <div className="absolute right-[8%] top-[12%] h-[180px] w-[180px] rounded-full border border-white/10" />
          <div className="absolute right-[24%] top-[20%] h-[260px] w-[260px] rounded-full border border-white/10" />
          <div className="absolute bottom-[10%] right-[14%] h-[220px] w-[220px] rounded-full border border-white/10" />

          {crystalVariants.map((item, index) => (
            <CrystalAccent
              key={index}
              className={`absolute ${item.size} ${item.top ? `top-[${item.top}]` : ''} ${item.right ? `right-[${item.right}]` : ''}`}
              accent={item.accent}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-6 flex w-full items-center justify-between gap-3">
            <a href="#home" className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
              <img src="/logo.png" alt="MS logo" className="h-8 w-8 rounded-lg object-contain" />
              <span>Shayan</span>
            </a>
            <div className="flex items-center gap-2">
              <a href="#about" className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 transition hover:border-white/20 hover:text-white">
                About Me
              </a>
              <a href="#contact" className="rounded-full bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-slate-100">
                Contact
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-[#e8e8ea] p-2 shadow-[0_0_60px_rgba(255,255,255,0.04)] sm:h-32 sm:w-32"
          >
            <img src="/hero-dev.png" alt="Illustrated developer avatar" className="h-full w-full rounded-full object-cover" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-3 text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            Muhammad Shayan!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-400 sm:text-base"
          >
            Full-stack developer crafting polished digital experiences <span className="text-white">🚀</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mb-8 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
          >
            I build modern, scalable web experiences with thoughtful UI and robust engineering.
          </motion.p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          >
            Contact Me
          </motion.a>
        </div>
      </section>
    </div>
  );
}