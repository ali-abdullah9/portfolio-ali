// src/components/shared/SectionWrapper.tsx
'use client';

import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  gradient?: 'purple' | 'cyan' | 'mixed';
}

export default function SectionWrapper({ 
  children, 
  id, 
  className = '',
  gradient = 'mixed'
}: SectionWrapperProps) {
  const gradients = {
    purple: (
      <>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-500/20 via-transparent to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent blur-3xl animate-pulse animation-delay-2000" />
      </>
    ),
    cyan: (
      <>
        <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-bl from-cyan-500/20 via-transparent to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent blur-3xl animate-pulse animation-delay-2000" />
      </>
    ),
    mixed: (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 via-transparent to-transparent blur-3xl animate-pulse animation-delay-2000" />
      </>
    )
  };

  return (
    <section 
      id={id}
      className={`relative min-h-screen py-20 ${className}`}
    >
      {/* Section-specific gradient overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {gradients[gradient]}
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}