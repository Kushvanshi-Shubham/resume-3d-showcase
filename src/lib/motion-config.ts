import { Transition, Variants } from "framer-motion";

// Natural easing curves
export const easings = {
  smooth: [0.4, 0.0, 0.2, 1],
  snappy: [0.4, 0.0, 0.1, 1],
  gentle: [0.25, 0.1, 0.25, 1],
} as const;

// Spring physics configurations
export const springs = {
  soft: {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  },
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  },
} as const;

// Standard transitions
export const transitions: Record<string, Transition> = {
  default: {
    duration: 0.3,
    ease: easings.smooth,
  },
  fast: {
    duration: 0.15,
    ease: easings.snappy,
  },
  slow: {
    duration: 0.5,
    ease: easings.gentle,
  },
  spring: springs.soft,
};

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitions.default,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springs.soft,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springs.soft,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springs.soft,
  },
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: easings.snappy,
    },
  },
};
