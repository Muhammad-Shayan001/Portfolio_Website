"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa6";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/Muhammad-Shayan001",
    icon: FaGithub,
    color: "#FFFFFF",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/muhammad-shayan-98113a260/",
    icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@studywithmuhammadshayan",
    icon: FaYoutube,
    color: "#FF0000",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/muhammadshayan001",
    icon: FaInstagram,
    color: "#E4405F",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/muhammad.shayan.150815",
    icon: FaFacebook,
    color: "#1877F2",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#08080A] border-t border-white/5 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-slate-900/30 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-8 bg-gradient-to-r from-[#E10600] to-transparent"></span>
          <span className="text-xs font-mono tracking-widest text-[#F5D577] uppercase">
            Get In Touch
          </span>
        </motion.div>

        {/* Headline in Gold Gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gold mb-16"
        >
          Let&apos;s Build Something Extraordinary Together
        </motion.h2>

        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-sm text-zinc-400 font-light mb-8">
              Have a project in mind or want to discuss full-stack opportunities? Reach out directly.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[#0B0B0F] border border-white/10 text-center flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#E10600]/20 flex items-center justify-center text-[#FF2C2C]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">Message Received!</h4>
                <p className="text-sm text-zinc-300 font-light max-w-md">
                  Thank you for reaching out. I have received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold-outline px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider mt-2 cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F5D577] focus:ring-1 focus:ring-[#F5D577] transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F5D577] focus:ring-1 focus:ring-[#F5D577] transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F5D577] focus:ring-1 focus:ring-[#F5D577] transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project goals or requirements..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#F5D577] focus:ring-1 focus:ring-[#F5D577] transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold-outline w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-black/25"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-t-white border-white/20 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Direct Contact Info & Glowing Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between gap-8"
          >
            <div className="glass-card rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white pb-4 border-b border-white/10">
                Direct Contact
              </h3>

              <div className="space-y-5">
                <a
                  href="mailto:shayan.javed091@gmail.com"
                  className="flex items-center gap-4 text-zinc-300 hover:text-[#F5D577] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF2C2C] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Email Me</span>
                    <span className="text-sm font-semibold text-white">shayan.javed091@gmail.com</span>
                  </div>
                </a>

                <a
                  href="tel:+923171027397"
                  className="flex items-center gap-4 text-zinc-300 hover:text-[#F5D577] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF2C2C] group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Phone / WhatsApp</span>
                    <span className="text-sm font-semibold text-white">+92 317-1027397</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-zinc-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5D577]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Location</span>
                    <span className="text-sm font-semibold text-white">Karachi, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Social Links Grid */}
            <div className="glass-card rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white pb-2">
                Connect Across Platforms
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Follow my open-source code repositories, video tutorials, and technical updates.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37] hover:bg-white/[0.05] hover:shadow-lg hover:shadow-red-950/40 flex flex-col items-center justify-center gap-2 group transition-all"
                    >
                      <Icon className="w-5 h-5 text-zinc-300 group-hover:scale-125 transition-transform" />
                      <span className="text-xs font-mono text-zinc-300 group-hover:text-[#F5D577]">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
