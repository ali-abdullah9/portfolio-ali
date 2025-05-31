// src/components/three/Scene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload } from '@react-three/drei';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}
export default function Scene({ children, className }: SceneProps) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(' ');
    }

  return (
    <div className={cn('absolute inset-0', className)}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}