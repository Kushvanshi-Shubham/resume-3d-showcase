import { useEffect, useRef, useState } from 'react';
import { usePerformanceMode } from '@/contexts/PerformanceContext';

const FPS_THRESHOLD = 30;
const CHECK_INTERVAL = 2000; // Check every 2 seconds

export function usePerformanceMonitor() {
  const { isPerformanceMode, togglePerformanceMode } = usePerformanceMode();
  const [fps, setFps] = useState(60);
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(performance.now());
  const lowFpsCountRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let intervalId: NodeJS.Timeout;

    const measureFps = () => {
      const now = performance.now();
      const delta = now - lastFrameTimeRef.current;
      
      if (delta > 0) {
        const currentFps = 1000 / delta;
        frameTimesRef.current.push(currentFps);
        
        // Keep only last 60 frames
        if (frameTimesRef.current.length > 60) {
          frameTimesRef.current.shift();
        }
      }
      
      lastFrameTimeRef.current = now;
      animationFrameId = requestAnimationFrame(measureFps);
    };

    const checkPerformance = () => {
      if (frameTimesRef.current.length === 0) return;

      const avgFps = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
      setFps(Math.round(avgFps));

      // Auto-enable performance mode if FPS is consistently low
      if (avgFps < FPS_THRESHOLD && !isPerformanceMode) {
        lowFpsCountRef.current++;
        if (lowFpsCountRef.current >= 3) {
          console.log(`Low FPS detected (${Math.round(avgFps)}fps). Enabling performance mode.`);
          togglePerformanceMode();
          lowFpsCountRef.current = 0;
        }
      } else {
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
