import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

interface MagneticConfig {
  strength?: number;
  range?: number;
}

export function useMagneticEffect(config: MagneticConfig = {}) {
  const { strength = 0.3, range = 100 } = config;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, prefersReducedMotion ? { duration: 0 } : springConfig);
  const springY = useSpring(y, prefersReducedMotion ? { duration: 0 } : springConfig);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < range) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, strength, range, prefersReducedMotion]);

  return { ref, x: springX, y: springY };
}
