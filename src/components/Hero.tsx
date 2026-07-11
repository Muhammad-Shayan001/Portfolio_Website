import { motion } from 'motion/react';

const highlights = ['React', 'TypeScript', 'UI Systems', 'Performance'];

export default function Hero() {
  return (
    <div className="bg-black px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
      <section
        id="home"
        className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-[#07070d] px-5 py-6 shadow-[0_25px_90px_rgba(0,0,0,0.65)] sm:px-7 sm:py-8 lg:px-10 lg:py-10"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[32px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute left-[-8%] top-[8%] h-44 w-44 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute bottom-[6%] right-[-5%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[8%] top-[14%] h-[180px] w-[180px] rounded-full border border-white/10" />
          <div className="absolute right-[18%] top-[24%] h-[240px] w-[240px] rounded-full border border-white/10" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-5 flex items-center gap-2"
            >
              <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Available for select opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mb-4 text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
            >
              I build polished digital experiences with <span className="text-gradient">clarity</span> and <span className="text-gradient">purpose</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="mb-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
            >
              I’m Muhammad Shayan, a full-stack developer focused on modern interfaces, seamless interaction, and reliable product delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mb-8 flex flex-wrap gap-2"
            >
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-slate-300">
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:text-white"
              >
                Let’s Talk
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mx-auto w-full max-w-[420px]"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent p-2">
                <div className="relative overflow-hidden rounded-[20px]">
                  <img
                    src="/professional-dev.png"
                    alt="Professional developer portrait"
                    className="h-[420px] w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-black/50 px-3.5 py-2 text-sm font-medium text-slate-200 backdrop-blur">
                      Senior Frontend Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}