import { useEffect, useRef, useState } from 'react';
import { usePerformanceMode } from '@/contexts/PerformanceContext';

const FPS_THRESHOLD = 30;
const CHECK_INTERVAL = 3000; // Check every 3 seconds for smoother detection
const SAMPLE_SIZE = 90; // Larger sample for more accurate FPS

export function usePerformanceMonitor() {
  const { isPerformanceMode, togglePerformanceMode } = usePerformanceMode();
  const [fps, setFps] = useState(60);
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(performance.now());
  const lowFpsCountRef = useRef(0);
  const hasAutoEnabledRef = useRef(false); // Prevent multiple auto-enables

  useEffect(() => {
    let animationFrameId: number;
    let intervalId: NodeJS.Timeout;

    const measureFps = () => {
      const now = performance.now();
      const delta = now - lastFrameTimeRef.current;
      
      if (delta > 0) {
        const currentFps = Math.min(1000 / delta, 144); // Cap at 144fps for accurate measurement
        frameTimesRef.current.push(currentFps);
        
        // Keep larger sample for better accuracy
        if (frameTimesRef.current.length > SAMPLE_SIZE) {
          frameTimesRef.current.shift();
        }
      }
      
      lastFrameTimeRef.current = now;
      animationFrameId = requestAnimationFrame(measureFps);
    };

    const checkPerformance = () => {
      if (frameTimesRef.current.length < 30) return; // Wait for enough samples

      // Calculate median FPS for more reliable measurement
      const sorted = [...frameTimesRef.current].sort((a, b) => a - b);
      const medianFps = sorted[Math.floor(sorted.length / 2)];
      setFps(Math.round(medianFps));

      // Auto-enable performance mode if FPS is consistently low
      if (medianFps < FPS_THRESHOLD && !isPerformanceMode && !hasAutoEnabledRef.current) {
        lowFpsCountRef.current++;
        if (lowFpsCountRef.current >= 2) { // Reduced from 3 to 2 for faster response
          console.log(`Low FPS detected (${Math.round(medianFps)}fps). Enabling performance mode for smoother experience.`);
          togglePerformanceMode();
          hasAutoEnabledRef.current = true; // Prevent re-enabling
          lowFpsCountRef.current = 0;
        }
      } else if (medianFps >= FPS_THRESHOLD) {
        lowFpsCountRef.current = 0;
      }
    };

    animationFrameId = requestAnimationFrame(measureFps);
    intervalId = setInterval(checkPerformance, CHECK_INTERVAL);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, [isPerformanceMode, togglePerformanceMode]);

  return { fps };
}
