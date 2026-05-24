'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, TorusKnot, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCenterpiece() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <TorusKnot args={[2.5, 0.6, 200, 24, 3, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.4} />
      </TorusKnot>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4.2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle * 2) * 1.5, Math.sin(angle) * radius]} scale={0.25}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#06B6D4" metalness={0.8} roughness={0.2} emissive="#06B6D4" emissiveIntensity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (particlesRef.current) particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i*3] = (Math.random() - 0.5) * 80;
    positions[i*3+1] = (Math.random() - 0.5) * 40;
    positions[i*3+2] = (Math.random() - 0.5) * 80 - 20;
  }
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#D4AF37" size={0.1} transparent opacity={0.6} />
    </points>
  );
}

export function LuxuryThreeScene() {
  return (
    <div className="fixed inset-0 -z-10 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10,10,10]} intensity={1.5} color="#D4AF37" />
        <pointLight position={[-10,5,8]} intensity={1} color="#06B6D4" />
        <pointLight position={[0,-5,5]} intensity={0.8} color="#7C3AED" />
        <Suspense fallback={null}>
          <AnimatedCenterpiece />
          <ParticleField />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
