import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';
import BloomEffect from './effects/BloomEffect';
import SoftParticles from './effects/SoftParticles';
import { usePerformanceMode } from '@/contexts/PerformanceContext';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Detect mobile and low-end devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowEndDevice = navigator.hardwareConcurrency <= 4;

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isPerformanceMode } = usePerformanceMode();
  
  // Optimize sphere complexity based on device
  const segments = isPerformanceMode ? 16 : isMobile ? 24 : 32;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smoother rotation with easing
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.5;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (meshRef.current) {
        if (meshRef.current.geometry) meshRef.current.geometry.dispose();
        if (meshRef.current.material) {
          const material = meshRef.current.material as THREE.Material;
          material.dispose();
        }
      }
    };
  }, []);

  return (
    <Float speed={isPerformanceMode ? 1 : 2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, segments, segments]} scale={2.5}>
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

function SceneCleanup() {
  const { scene, gl } = useThree();

  useEffect(() => {
    return () => {
      // Cleanup Three.js resources on unmount
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      // Dispose renderer resources
      gl.dispose();
    };
  }, [scene, gl]);

  return null;
}

function MouseReactiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetPosRef.current = { x, y };

      // Determine quadrant color with smooth transitions
      if (lightRef.current) {
        let color: number;
        if (x > 0 && y > 0) color = 0xa855f7; // Purple
        else if (x < 0 && y > 0) color = 0x06b6d4; // Blue
        else if (x < 0 && y < 0) color = 0x22d3ee; // Cyan
        else color = 0xec4899; // Pink
        
        lightRef.current.color.setHex(color);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      // Smoother lerp for buttery transitions
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        targetPosRef.current.x * 5,
        0.08
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        targetPosRef.current.y * 5,
        0.08
      );
    }
  });

  return <pointLight ref={lightRef} position={[0, 0, 5]} intensity={1.2} distance={10} decay={2} />;
}

export default function Hero3D() {
  const { isPerformanceMode } = usePerformanceMode();
  const [contextKey, setContextKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  usePerformanceMonitor();

  // Return null on low-end mobile devices (parent shows fallback)
  if (isMobile && isLowEndDevice) {
    return null;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    console.warn('WebGL context lost. Attempting to restore...');
  };

  const handleContextRestored = () => {
    console.log('WebGL context restored successfully.');
    // Force remount to recreate scene
    setContextKey(prev => prev + 1);
  };

  // Optimize particle count based on device
  const particleCount = isPerformanceMode ? 15 : isMobile ? 30 : 50;
  
  // Cap DPI to prevent GPU overload
  const maxDpr = Math.min(window.devicePixelRatio, 2);
  const dpr = isPerformanceMode ? 1 : isMobile ? 1 : maxDpr;

  return (
    <div className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas 
        key={contextKey}
        camera={{ position: [0, 0, 5], fov: 75 }}
        frameloop={isPerformanceMode || isMobile ? 'demand' : 'always'}
        dpr={dpr}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', handleContextLost);
          gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);
          // Mark as ready after first render
          setTimeout(() => setIsReady(true), 100);
        }}
        gl={{ 
          preserveDrawingBuffer: false,
          powerPreference: isPerformanceMode ? 'low-power' : 'high-performance',
          antialias: !isPerformanceMode && !isMobile,
          alpha: true,
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: false, // Don't fail on slower devices, just adapt
        }}
      >
        <ambientLight intensity={0.5} />
        <MouseReactiveLight />
        <AnimatedSphere />
        <SoftParticles count={particleCount} />
        {!isPerformanceMode && <BloomEffect />}
        <SceneCleanup />
      </Canvas>
    </div>
  );
}
