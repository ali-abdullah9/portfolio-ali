// src/app/page.tsx or src/app/(root)/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/Shared/LoadingScreen';
import Cursor from '@/components/Shared/Cursor';
import Navigation from '@/components/Shared/Navigation';

// Smooth scroll behavior
const smoothScroll = () => {
  document.documentElement.style.scrollBehavior = 'smooth';
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    smoothScroll();
    
    // Simulate loading of assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <Cursor />
      <Navigation />
      
      <main className="relative bg-black">
        <Hero />
        <About />
        
        {/* Projects Section with slide animation */}
        <motion.section 
          id="projects" 
          className="min-h-screen bg-black relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-900/10 to-black" />
          <motion.div 
            className="relative z-10 flex items-center justify-center min-h-screen p-20"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects Section
            </h2>
          </motion.div>
        </motion.section>
        
        {/* Skills Section with slide animation */}
        <motion.section 
          id="skills" 
          className="min-h-screen bg-black relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900/10 to-black" />
          <motion.div 
            className="relative z-10 flex items-center justify-center min-h-screen p-20"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills Section
            </h2>
          </motion.div>
        </motion.section>
        
        {/* Contact Section with slide animation */}
        <motion.section 
          id="contact" 
          className="min-h-screen bg-black relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/10 to-black" />
          <motion.div 
            className="relative z-10 flex items-center justify-center min-h-screen p-20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contact Section
            </h2>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}