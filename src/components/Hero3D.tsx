import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';
import BloomEffect from './effects/BloomEffect';
import SoftParticles from './effects/SoftParticles';
import { usePerformanceMode } from '@/contexts/PerformanceContext';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isPerformanceMode } = usePerformanceMode();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={isPerformanceMode ? 0.1 : 0.4}
          speed={isPerformanceMode ? 1 : 2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function MouseReactiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });

      // Determine quadrant color
      if (lightRef.current) {
        let color: number;
        if (x > 0 && y > 0) color = 0xa855f7; // Purple
        else if (x < 0 && y > 0) color = 0x06b6d4; // Blue
        else if (x < 0 && y < 0) color = 0x22d3ee; // Cyan
        else color = 0xec4899; // Pink
        
        lightRef.current.color.setHex(color);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        mousePos.x * 5,
        0.05
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        mousePos.y * 5,
        0.05
      );
    }
  });

  return <pointLight ref={lightRef} position={[0, 0, 5]} intensity={1} />;
}

export default function Hero3D() {
  const { isPerformanceMode } = usePerformanceMode();

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    console.warn('WebGL context lost. Attempting to restore...');
  };

  const handleContextRestored = () => {
    console.log('WebGL context restored successfully.');
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        frameloop={isPerformanceMode ? 'demand' : 'always'}
        dpr={isPerformanceMode ? 1 : [1, 2]}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', handleContextLost);
          gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);
        }}
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          antialias: !isPerformanceMode,
          alpha: true
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <MouseReactiveLight />
        <AnimatedSphere />
        <SoftParticles count={100} />
        <BloomEffect />
      </Canvas>
    </div>
  );
}
