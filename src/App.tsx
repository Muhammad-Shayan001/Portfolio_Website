/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechKeyboard from './components/TechKeyboard';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import BackgroundEffect from './components/BackgroundEffect';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#030014] text-slate-200">
      <Preloader />
      <CustomCursor />
      <BackgroundEffect />
      
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <TechKeyboard />
        <Projects />
        <Contact />
        <Footer />
      </div>
      
      {/* Global Ambient Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[50%] h-[50%] bg-primary/[0.03] blur-[180px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[50%] h-[50%] bg-secondary/[0.03] blur-[180px] -z-10 pointer-events-none" />
    </main>
  );
}
