// src/components/sections/Hero/HeroCanvas.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Scene from '@/components/three/Scene';

function GlassOrb({
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
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        {/* Glow effect */}
        <mesh ref={glowRef} scale={scale * 1.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1} 
            depthWrite={false}
          />
        </mesh>
        
        {/* Glass orb */}
        <mesh ref={meshRef} scale={scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={0.3}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            color={color}
            attenuationDistance={0.5}
            attenuationColor={color}
          />
        </mesh>
      </group>
    </Float>
  );
}

function AnimatedParticles() {
  const count = 1500;
  const particles = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Cyan to purple gradient
      const t = i / count;
      colors[i * 3] = t;
      colors[i * 3 + 1] = 0.5 + t * 0.5;
      colors[i * 3 + 2] = 1;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.elapsedTime * 0.02;
      particles.current.rotation.y = state.clock.elapsedTime * 0.01;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1;
      particles.current.scale.setScalar(scale);
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
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Scene className="absolute inset-0">
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d9ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      
      {/* Glass orbs with glow - Left side */}
      <GlassOrb position={[-4, 2, -3]} scale={0.9} speed={0.7} color="#06b6d4" />
      <GlassOrb position={[-3, -1, -2]} scale={0.8} speed={0.8} color="#8b5cf6" />
      
      {/* Glass orbs with glow - Center */}
      <GlassOrb position={[2, -2, -4]} scale={0.6} speed={1} color="#00d9ff" />
      
      {/* Glass orbs with glow - Right side (new additions) */}
      <GlassOrb position={[4, 1, -3]} scale={1.2} speed={0.6} color="#00d9ff" />
      <GlassOrb position={[5, -0.5, -2.5]} scale={0.7} speed={0.9} color="#a855f7" />
      <GlassOrb position={[3.5, 2.5, -4]} scale={0.5} speed={1.1} color="#06b6d4" />
      
      {/* Animated particles */}
      <AnimatedParticles />
      
      {/* Stars in the background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={2} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </Scene>
  );
}