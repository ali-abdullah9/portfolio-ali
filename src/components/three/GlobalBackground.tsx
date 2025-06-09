// src/components/three/GlobalBackground.tsx
'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Scene from '@/components/three/Scene';


// Detect if device is mobile or low-performance
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const isLowPerf = typeof window !== 'undefined' && navigator.hardwareConcurrency < 4;

// Simple glass material instead of expensive MeshTransmissionMaterial
function SimpleGlassOrb({
  position,
  scale = 1,
  speed = 1,
  color = "#00d9ff"
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  // Skip rendering on mobile
  if (isMobile) return null;

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, isLowPerf ? 16 : 32, isLowPerf ? 16 : 32]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.1}
        roughness={0.1}
        transmission={0.9}
        thickness={0.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function OptimizedParticles() {
  const particles = useRef<THREE.Points>(null);
  // Reduce particle count based on device
  const count = isMobile ? 200 : isLowPerf ? 500 : 800;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      const t = i / count;
      colors[i * 3] = t;
      colors[i * 3 + 1] = 0.5 + t * 0.5;
      colors[i * 3 + 2] = 1;
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (particles.current && !isMobile) {
      particles.current.rotation.x = state.clock.elapsedTime * 0.005;
      particles.current.rotation.y = state.clock.elapsedTime * 0.003;
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
        size={isMobile ? 0.05 : 0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-10 bg-black" />;

  return (
    <div className="fixed inset-0 -z-10">
      <Scene className="absolute inset-0">
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00d9ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#8b5cf6" />
        
        {/* Only render orbs on desktop */}
        {!isMobile && (
          <>
            <SimpleGlassOrb position={[-4, 2, -3]} scale={0.8} speed={0.3} color="#06b6d4" />
            <SimpleGlassOrb position={[3, -2, -3]} scale={0.6} speed={0.4} color="#8b5cf6" />
            <SimpleGlassOrb position={[0, 0, -5]} scale={0.7} speed={0.5} color="#00d9ff" />
          </>
        )}
        
        {/* Optimized particles */}
        <OptimizedParticles />
        
        {/* Reduced stars on mobile */}
        <Stars 
          radius={100} 
          depth={50} 
          count={isMobile ? 500 : 1000} 
          factor={2} 
          saturation={0} 
          fade 
          speed={0.2}
        />
        
        {/* Simpler environment on mobile */}
        {!isMobile && <Environment preset="night" />}
      </Scene>
    </div>
  );
}