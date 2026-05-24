'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, TorusKnot, Environment } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
    }
  });
  return (
    <group ref={groupRef}>
      <TorusKnot args={[2.2, 0.5, 140, 18]} position={[-3, 1.5, 0]} scale={0.9}>
        <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.15} emissive="#D4AF37" emissiveIntensity={0.25} />
      </TorusKnot>
      <Sphere args={[1.3, 72, 72]} position={[3.5, -1, -2]}>
        <meshStandardMaterial color="#06B6D4" metalness={0.7} roughness={0.25} emissive="#06B6D4" emissiveIntensity={0.15} />
      </Sphere>
      <TorusKnot args={[1.6, 0.35, 130, 10]} position={[0, 2.2, -1.2]}>
        <meshStandardMaterial color="#7C3AED" metalness={0.75} roughness={0.35} />
      </TorusKnot>
    </group>
  );
}

export function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10 opacity-25 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[12, 12, 12]} intensity={1.2} color="#D4AF37" />
        <pointLight position={[-12, -6, 8]} intensity={0.9} color="#06B6D4" />
        <Suspense fallback={null}>
          <AnimatedShapes />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
