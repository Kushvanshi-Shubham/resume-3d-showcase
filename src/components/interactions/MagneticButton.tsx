import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  children: ReactNode;
  strength?: number;
  range?: number;
}

const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  ({ children, className, strength = 0.3, range = 100, ...props }, forwardedRef) => {
    const { ref, x, y } = useMagneticEffect({ strength, range });

    return (
      <motion.div
        ref={(node: any) => {
          (ref as any).current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        style={{ x, y }}
        className={cn('relative', className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
