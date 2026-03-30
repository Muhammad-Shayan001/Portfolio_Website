import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare, Sparkles, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'shayan.javed091@gmail.com', href: 'mailto:shayan.javed091@gmail.com', color: '#8b5cf6' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+92 3XX XXXXXXX', href: 'tel:+923XXXXXXXXX', color: '#3b82f6' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Karachi, Pakistan', href: '#', color: '#f472b6' },
  ];

  const socials = [
    { icon: <Github size={22} />, href: 'https://github.com/Muhammad-Shayan001', label: 'GitHub', color: '#fff' },
    { icon: <Linkedin size={22} />, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: <Twitter size={22} />, href: '#', label: 'Twitter', color: '#1DA1F2' },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          
          {/* Left: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6"
            >
              <MessageSquare size={14} />
              <span className="glow-text">Get In Touch</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-8 leading-[1.05]"
            >
              Let's Build<br />
              Something <br className="hidden sm:block" />
              <span className="text-gradient">Extraordinary</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg mb-10 leading-relaxed max-w-lg"
            >
              Have a project in mind or just want to say hi? 
              I'm always open to discussing new opportunities, creative ideas, or partnerships.
            </motion.p>
            
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="flex items-center gap-5 group p-4 rounded-2xl transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500"
                    style={{
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}20`,
                      color: item.color,
                      boxShadow: `0 0 15px ${item.color}10`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{item.label}</span>
                    <p className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center gap-4"
            >
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-400 transition-all duration-500 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = `${social.color}20`;
                    el.style.borderColor = `${social.color}40`;
                    el.style.color = social.color;
                    el.style.boxShadow = `0 0 25px ${social.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'rgba(255,255,255,0.06)';
                    el.style.color = '#94a3b8';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute -inset-8 -z-10">
              <div className="absolute inset-0 bg-primary/5 blur-[80px] animate-pulse-slow" />
              <div className="absolute inset-[30%] bg-secondary/5 blur-[60px] animate-aurora" />
            </div>
            
            <div 
              className="relative p-8 sm:p-10 lg:p-12 rounded-[40px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Gradient corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/8 blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/8 blur-3xl -z-10" />
              
              <div className="flex items-center gap-3 mb-10">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-primary"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
                  }}
                >
                  <Sparkles size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Send a Message</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">I'll respond within 24h</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Muhammad Shayan"
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-300 outline-none text-white placeholder:text-slate-600/60 font-medium text-sm"
                      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="hello@example.com"
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-300 outline-none text-white placeholder:text-slate-600/60 font-medium text-sm"
                      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Subject</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Let's discuss a project..."
                    className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-300 outline-none text-white placeholder:text-slate-600/60 font-medium text-sm"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Message</label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-300 outline-none text-white placeholder:text-slate-600/60 resize-none font-medium text-sm"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }}
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-3 group relative overflow-hidden"
                  style={{
                    background: isSubmitted 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    boxShadow: isSubmitted
                      ? '0 8px 30px rgba(16, 185, 129, 0.3)'
                      : '0 8px 30px rgba(139, 92, 246, 0.3)',
                  }}
                >
                  {!isSubmitted && (
                    <motion.div 
                      className="absolute inset-0 bg-white/15"
                      initial={{ x: '-100%', skewX: '-15deg' }}
                      whileHover={{ x: '150%' }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm">
                    {isSubmitted ? (
                      <>
                        <Check size={18} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
