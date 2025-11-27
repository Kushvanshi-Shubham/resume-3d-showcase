import { useRef } from 'react';
import { Text3D, Center, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceMode } from '@/contexts/PerformanceContext';

export default function Text3DEffect() {
  const textRef = useRef<THREE.Mesh>(null);
  const { isPerformanceMode } = usePerformanceMode();

  useFrame((state) => {
    if (textRef.current) {
      // Subtle floating animation
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  if (isPerformanceMode) {
    return null; // Skip 3D text in performance mode
  }

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Center position={[-3.5, 0.5, 0]}>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.6}
          height={0.15}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelSegments={5}
        >
          Shubham
          <meshPhysicalMaterial
            color="#06b6d4"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#0ea5e9"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
}
