import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Float, Environment, Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import BloomEffect from './effects/BloomEffect';
import SoftParticles from './effects/SoftParticles';
import InternalParticles from './effects/InternalParticles';
import { usePerformanceMode } from '@/contexts/PerformanceContext';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowEndDevice = navigator.hardwareConcurrency <= 4;

// Glass Bubble with realistic materials
function GlassBubble() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.15) * 0.3;
      meshRef.current.rotation.y = time * 0.2;
    }
  });

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
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={4.5} position={[4, 0, 0]}>
        <meshPhysicalMaterial
          color="#0ea5e9"
          transmission={0.92}
          thickness={2}
          roughness={0.05}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
          ior={1.45}
          transparent
          opacity={0.95}
        />
      </Sphere>
      {/* Add visible glow ring */}
      <Sphere args={[1, 32, 32]} scale={4.8} position={[4, 0, 0]}>
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

// Simplified bubble for performance mode
function SimpleGlassBubble() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={4} position={[4, 0, 0]}>
      <meshStandardMaterial
        color="#0ea5e9"
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.8}
        emissive="#0ea5e9"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

// 3D Text Component
function Text3DEffect() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

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

function SceneCleanup() {
  const { scene, gl } = useThree();

  useEffect(() => {
    return () => {
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
      gl.dispose();
    };
  }, [scene, gl]);

  return null;
}

function MouseReactiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const targetPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetPosRef.current = { x, y };

      if (lightRef.current) {
        let color: number;
        if (x > 0 && y > 0) color = 0x06b6d4;
        else if (x < 0 && y > 0) color = 0x0ea5e9;
        else if (x < 0 && y < 0) color = 0x22d3ee;
        else color = 0x38bdf8;
        
        lightRef.current.color.setHex(color);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
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

  return <pointLight ref={lightRef} position={[0, 0, 5]} intensity={1.5} distance={12} decay={2} />;
}

export default function Hero3D() {
  const { isPerformanceMode } = usePerformanceMode();
  const [contextKey, setContextKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  usePerformanceMonitor();

  const shouldSimplify = isMobile && isLowEndDevice;

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    console.warn('WebGL context lost. Attempting to restore...');
  };

  const handleContextRestored = () => {
    console.log('WebGL context restored successfully.');
    setContextKey(prev => prev + 1);
  };

  const particleCount = isPerformanceMode ? 15 : isMobile ? 30 : 50;
  const maxDpr = Math.min(window.devicePixelRatio, 1.5);
  const dpr = isPerformanceMode ? 1 : isMobile ? 1 : maxDpr;

  return (
    <div className="absolute inset-0 -z-10">
      {/* Always visible gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* 3D Canvas */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas 
          key={contextKey}
          camera={{ position: [0, 0, 10], fov: 60 }}
          frameloop={isPerformanceMode || isMobile ? 'demand' : 'always'}
          dpr={dpr}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', handleContextLost);
            gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);
            requestAnimationFrame(() => setIsReady(true));
          }}
          gl={{ 
            preserveDrawingBuffer: false,
            powerPreference: isPerformanceMode ? 'low-power' : 'default',
            antialias: !isPerformanceMode && !isMobile,
            alpha: true,
            stencil: false,
            depth: true,
            failIfMajorPerformanceCaveat: false,
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
          <pointLight position={[-5, 3, -5]} intensity={0.8} color="#22d3ee" />
          <pointLight position={[4, 0, 0]} intensity={3} color="#38bdf8" distance={10} />
          <pointLight position={[4, 2, 2]} intensity={1.5} color="#0ea5e9" distance={8} />
          <MouseReactiveLight />
          
          {/* Main Glass Bubble */}
          {shouldSimplify ? <SimpleGlassBubble /> : <GlassBubble />}
          
          {/* 3D Text */}
          {!isPerformanceMode && !shouldSimplify && <Text3DEffect />}
          
          {/* Particles */}
          <SoftParticles count={particleCount} />
          {!isPerformanceMode && <InternalParticles count={shouldSimplify ? 40 : 80} spherePosition={[4, 0, 0]} sphereRadius={4.5} />}
          
          {/* Environment & Effects */}
          {!isPerformanceMode && <Environment preset="night" />}
          {!isPerformanceMode && <BloomEffect />}
          
          <SceneCleanup />
        </Canvas>
      </div>
    </div>
  );
}
