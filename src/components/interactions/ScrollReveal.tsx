import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeInUp, fadeIn, scaleIn, slideInLeft, slideInRight } from '@/lib/motion-config';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  threshold?: number;
  className?: string;
}

const variants = {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
};

export default function ScrollReveal({
  children,
  variant = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  className,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref as any}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
