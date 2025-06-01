// src/components/sections/Projects/ProjectsCanvas.tsx
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
        <mesh ref={glowRef} scale={scale * 1.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1} 
            depthWrite={false}
          />
        </mesh>
        
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
  const count = 800;
  const particles = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      // Purple to cyan gradient
      const t = i / count;
      colors[i * 3] = 0.5 + t * 0.5;
      colors[i * 3 + 1] = 0.2 + t * 0.3;
      colors[i * 3 + 2] = 1;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.elapsedTime * 0.015;
      particles.current.rotation.y = state.clock.elapsedTime * 0.008;
      
      // Gentle pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
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
        size={0.025}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ProjectsCanvas() {
  return (
    <Scene className="absolute inset-0">
      <ambientLight intensity={0.15} />
      <pointLight position={[15, 15, 15]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[-15, -15, -15]} intensity={0.3} color="#00d9ff" />
      
      {/* Glass orbs - Different arrangement for Projects section */}
      <GlassOrb position={[6, -3, -5]} scale={0.9} speed={0.4} color="#8b5cf6" />
      <GlassOrb position={[-4, 4, -4]} scale={0.7} speed={0.6} color="#00d9ff" />
      <GlassOrb position={[3, 3, -3]} scale={0.5} speed={0.8} color="#a855f7" />
      <GlassOrb position={[-6, -2, -4]} scale={0.8} speed={0.5} color="#06b6d4" />
      <GlassOrb position={[0, -4, -6]} scale={0.6} speed={0.7} color="#8b5cf6" />
      
      {/* Animated particles */}
      <AnimatedParticles />
      
      {/* Stars in the background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1500} 
        factor={3} 
        saturation={0} 
        fade 
        speed={0.3}
      />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </Scene>
  );
}