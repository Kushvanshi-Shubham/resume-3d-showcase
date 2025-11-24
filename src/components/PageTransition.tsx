import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { pageTransition } from '@/lib/motion-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
