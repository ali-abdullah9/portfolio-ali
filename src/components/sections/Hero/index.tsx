// src/components/sections/Hero/index.tsx
'use client';

import { useRef } from 'react';
import HeroContent from './HeroContent';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Simple animated gradient background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-tl from-purple-500/20 via-transparent to-transparent blur-3xl animate-pulse animation-delay-2000" />
      </div>
      
      {/* Main Content */}
      <HeroContent />
    </section>
  );
}