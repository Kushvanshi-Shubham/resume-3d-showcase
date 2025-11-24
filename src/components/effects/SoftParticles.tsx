import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceMode } from '@/contexts/PerformanceContext';

interface SoftParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export default function SoftParticles({
  count = 100,
  color = '#06b6d4',
  size = 0.05,
  speed = 0.05,
}: SoftParticlesProps) {
  const { isPerformanceMode } = usePerformanceMode();
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = isPerformanceMode ? 20 : count;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={size} 
        color={color} 
        transparent 
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
