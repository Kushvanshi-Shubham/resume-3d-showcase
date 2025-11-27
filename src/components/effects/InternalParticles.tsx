import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InternalParticlesProps {
  count?: number;
  spherePosition?: [number, number, number];
  sphereRadius?: number;
}

export default function InternalParticles({
  count = 80,
  spherePosition = [2, 0, 0],
  sphereRadius = 4,
}: InternalParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Generate random position inside sphere
      const radius = Math.random() * (sphereRadius * 0.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      // Convert spherical to cartesian and offset to sphere position
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta) + spherePosition[0];
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + spherePosition[1];
      arr[i * 3 + 2] = radius * Math.cos(phi) + spherePosition[2];
    }
    return arr;
  }, [count, spherePosition, sphereRadius]);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = Math.sin(time * 0.1) * 0.5;
      particlesRef.current.rotation.x = Math.cos(time * 0.08) * 0.3;
    }
  });

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
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
