// src/components/sections/Skills/SkillsCanvas.tsx
'use client';

import { useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import {  Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Scene from '@/components/three/Scene';



function AnimatedParticles() {
  const count = 1200;
  const particles = useRef<THREE.Points>(null);
  
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.elapsedTime * 0.01;
      particles.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SkillsCanvas() {
  return (
    <Scene className="absolute inset-0">
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#00d9ff" />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, -10, 0]} intensity={0.3} color="#f59e0b" />
      

      {/* Animated particles forming a sphere */}
      <AnimatedParticles />
      
      {/* Stars in the background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.2}
      />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </Scene>
  );
}