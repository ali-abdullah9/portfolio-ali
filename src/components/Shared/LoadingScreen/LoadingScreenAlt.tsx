// src/components/shared/LoadingScreen/LoadingScreenAlt.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Alternative 1: Code Terminal Loading
export function CodeTerminalLoading() {
  const [lines, setLines] = useState<string[]>([]);
  const codeLines = [
    '> Initializing portfolio...',
    '> Loading awesome projects...',
    '> Compiling experiences...',
    '> Rendering creativity...',
    '> Almost there...',
    '> Welcome to my world!'
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setLines(prev => [...prev, codeLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // codeLines is constant, so we can safely ignore it

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative max-w-2xl w-full mx-auto px-6">
        {/* Terminal Window */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs text-gray-400 font-mono">ali@portfolio ~ %</span>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2"
              >
                <span className="text-cyan-400">{line}</span>
                {index === lines.length - 1 && (
                  <motion.span
                    className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Alternative 2: Geometric Shapes Loading
export function GeometricLoading() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Rotating Shapes */}
        <div className="relative w-40 h-40">
          {/* Outer Square */}
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle Triangle */}
          <motion.div
            className="absolute inset-4"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 border-l-[60px] border-r-[60px] border-b-[104px] border-l-transparent border-r-transparent border-b-purple-400" />
            </div>
          </motion.div>
          
          {/* Inner Circle */}
          <motion.div
            className="absolute inset-8 border-2 border-white rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        
        {/* Text */}
        <motion.p
          className="mt-8 text-center font-mono text-sm text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Creating magic...
        </motion.p>
      </div>
    </motion.div>
  );
}

// Alternative 3: Particle Wave Loading
export function ParticleWaveLoading() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Wave Particles */}
        <div className="flex items-center gap-2">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-t from-cyan-400 to-purple-400"
              animate={{
                y: [-20, 20, -20],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Loading Text */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Loading Portfolio
          </h3>
          <motion.div
            className="mt-2 text-xs text-gray-500"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Please wait...
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Alternative 4: Glitch Text Loading
export function GlitchTextLoading() {
  const [glitchText, setGlitchText] = useState('LOADING');
  const originalText = 'LOADING';
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    const interval = setInterval(() => {
      const newText = originalText
        .split('')
        .map((char) => {
          if (Math.random() > 0.7) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        })
        .join('');
      setGlitchText(newText);
      
      // Reset to original occasionally
      setTimeout(() => setGlitchText(originalText), 100);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Glitch Text */}
        <div className="relative">
          <h1 className="text-7xl font-bold font-mono">
            {/* Main Text */}
            <span className="relative z-10 text-white">{glitchText}</span>
            
            {/* Glitch Layers */}
            <span className="absolute inset-0 text-cyan-400 opacity-70" style={{ transform: 'translate(2px, -2px)' }}>
              {glitchText}
            </span>
            <span className="absolute inset-0 text-purple-400 opacity-70" style={{ transform: 'translate(-2px, 2px)' }}>
              {glitchText}
            </span>
          </h1>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 w-64 h-1 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}