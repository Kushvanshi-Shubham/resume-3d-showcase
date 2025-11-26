import { useRef, useMemo, useEffect } from 'react';
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
  count = 50,
  color = '#06b6d4',
  size = 0.05,
  speed = 0.03, // Reduced from 0.05 for smoother motion
}: SoftParticlesProps) {
  const { isPerformanceMode } = usePerformanceMode();
  const particlesRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      // Smoother rotation with sine wave
      const time = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = Math.sin(time * speed) * 2;
      particlesRef.current.rotation.x = Math.cos(time * speed * 0.5) * 0.5;
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (geometryRef.current) geometryRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();
    };
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        ref={materialRef}
        size={size} 
        color={color} 
        transparent 
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
