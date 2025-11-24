import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { usePerformanceMode } from '@/contexts/PerformanceContext';

export default function BloomEffect() {
  const { isPerformanceMode } = usePerformanceMode();

  if (isPerformanceMode) {
    return null;
  }

  return (
    <EffectComposer>
      <Bloom 
        intensity={0.3} 
        luminanceThreshold={0.8} 
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}
