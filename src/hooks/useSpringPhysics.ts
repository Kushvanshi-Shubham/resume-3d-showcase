import { useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function useSpringPhysics(initialValue = 0, config?: SpringConfig) {
  const prefersReducedMotion = useReducedMotion();
  
  const defaultConfig = {
    stiffness: 260,
    damping: 20,
    mass: 1,
  };

  const springConfig = { ...defaultConfig, ...config };
  
  const motionValue = useMotionValue(initialValue);
  const spring = useSpring(motionValue, prefersReducedMotion ? { duration: 0 } : springConfig);
  
  return { motionValue, spring };
}

export function useSpringTransform(
  value: number,
  inputRange: number[],
  outputRange: number[],
  config?: SpringConfig
) {
  const { motionValue, spring } = useSpringPhysics(value, config);
  const transform = useTransform(spring, inputRange, outputRange);
  
  return { motionValue, transform };
}
