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
import BackgroundEffect from './components/BackgroundEffect';
import ReactLenis from 'lenis/react';

export default function App() {
  return (
    <ReactLenis root>
      <main className="relative min-h-screen bg-[#06070d] text-slate-200">
        <BackgroundEffect />
        
        <Navbar />
        
        <div className="relative z-10 px-3 py-4 sm:px-4 lg:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:gap-6">
            <Hero />
            <About />
            <TechKeyboard />
            <Projects />
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </ReactLenis>
  );
}
