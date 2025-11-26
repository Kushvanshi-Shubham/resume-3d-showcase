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
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
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
  const [contextKey, setContextKey] = useState(0);
  usePerformanceMonitor();

  // Return fallback on low-end mobile devices
  if (isMobile && isLowEndDevice) {
    return null; // Parent will show fallback
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
    <div className="absolute inset-0 -z-10">
      <Canvas 
        key={contextKey}
        camera={{ position: [0, 0, 5], fov: 75 }}
        frameloop={isPerformanceMode || isMobile ? 'demand' : 'always'}
        dpr={dpr}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', handleContextLost);
          gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);
        }}
        gl={{ 
          preserveDrawingBuffer: false, // Changed to false to save memory
          powerPreference: 'high-performance',
          antialias: !isPerformanceMode && !isMobile,
          alpha: true,
          stencil: false, // Disable stencil buffer to save memory
          depth: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <MouseReactiveLight />
        <AnimatedSphere />
        <SoftParticles count={particleCount} />
        <BloomEffect />
        <SceneCleanup />
      </Canvas>
    </div>
  );
}
