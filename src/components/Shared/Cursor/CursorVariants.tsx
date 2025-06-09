// src/components/shared/Cursor/CursorVariants.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Variant 1: Minimal Dot
export function MinimalCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
  }, []);

  useEffect(() => {
    if (!isDesktop || !mounted) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, isDesktop, mounted]);

  if (!mounted || !isDesktop) return null;

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1024px) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  );
}

// Variant 2: Gradient Ring
export function GradientRingCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
  }, []);

  useEffect(() => {
    if (!isDesktop || !mounted) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isDesktop, mounted]);

  if (!mounted || !isDesktop) return null;

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1024px) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          animate={{ scale: isPointer ? 1.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-50" />
          <div className="absolute inset-[2px] rounded-full bg-black" />
        </motion.div>
      </motion.div>
      
      {/* Center dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[1000] w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  );
}

// Variant 3: Morphing Blob
export function MorphingBlobCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 10, stiffness: 100 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
  }, []);

  useEffect(() => {
    if (!isDesktop || !mounted) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isDesktop, mounted]);

  if (!mounted || !isDesktop) return null;

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1024px) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isPointer ? 1.2 : 1,
            borderRadius: isPointer ? '30%' : '50%',
          }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="w-6 h-6 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 backdrop-blur-sm"
            style={{
              filter: 'blur(2px)',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

// Variant 4: Text Cursor (shows "CLICK" on hover)
export function TextCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
  }, []);

  useEffect(() => {
    if (!isDesktop || !mounted) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isDesktop, mounted]);

  if (!mounted || !isDesktop) return null;

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1024px) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Dot */}
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{ scale: isPointer ? 0.5 : 1 }}
          />
          
          {/* Text */}
          {isPointer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: -25 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-cyan-400 whitespace-nowrap"
            >
              CLICK
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}