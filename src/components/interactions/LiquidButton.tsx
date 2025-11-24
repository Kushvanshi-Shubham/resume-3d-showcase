import { motion } from 'framer-motion';
import { ReactNode, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LiquidButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  children: ReactNode;
}

const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ children, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
      return (
        <button ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
          {children}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-full"
          initial={{ scale: 0, x: '-50%', y: '-50%' }}
          animate={
            isHovered
              ? { scale: 2.5, x: '-50%', y: '-50%' }
              : { scale: 0, x: '-50%', y: '-50%' }
          }
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          style={{
            left: '50%',
            top: '50%',
            filter: 'blur(20px)',
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';

export default LiquidButton;
