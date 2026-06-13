import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 sm:py-20 relative overflow-hidden border-t border-white/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10 sm:gap-12 mb-16 sm:mb-20">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="text-3xl font-display font-black tracking-tighter inline-block mb-6 group">
              <motion.span 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                }}
              >
                <img src="/logo.png" alt="MS Logo" className="w-full h-full object-contain" />
              </motion.span>
              <span>
                <span className="shimmer-text">Shayan</span>
                <span className="text-primary">.</span>
              </span>
            </a>
            <p className="text-slate-400 max-w-sm text-base sm:text-lg leading-relaxed mb-8">
              Crafting high-performance digital experiences with a focus on modern UI/UX and scalable architecture.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Github size={18} />, href: 'https://github.com/Muhammad-Shayan001', color: '#fff' },
                { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/muhammad-shayan-98113a260/', color: '#0A66C2' },
                { icon: <Twitter size={18} />, href: '#', color: '#1DA1F2' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${social.color}40`;
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.background = `${social.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Tech Stack', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${link.toLowerCase().replace(' ', '-')}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-500 hover:text-primary transition-all text-sm font-medium hover:translate-x-1 inline-block duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Get notified about my latest projects and tech insights.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/3 border border-white/6 focus:border-primary/40 transition-all outline-none text-sm text-white placeholder:text-slate-600/60"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl text-white"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25)',
                }}
              >
                <Heart size={18} />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 text-sm font-medium flex items-center gap-1.5">
            © {currentYear} Muhammad Shayan. Built with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={14} className="text-primary fill-primary" />
            </motion.span>
          </p>
          
          <div className="flex items-center gap-6 sm:gap-8">
            <a href="#" className="text-slate-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">Privacy</a>
            <a href="#" className="text-slate-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">Terms</a>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-primary/3 blur-[120px] -z-10" />
    </footer>
  );
}
