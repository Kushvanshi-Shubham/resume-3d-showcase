import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DepthLayerProps {
  level?: 'background' | 'base' | 'elevated' | 'floating' | 'overlay' | 'top';
  parallax?: boolean;
  children: ReactNode;
  className?: string;
}

const levelStyles = {
  background: 'z-0 shadow-sm',
  base: 'z-10 shadow-md',
  elevated: 'z-20 shadow-lg',
  floating: 'z-30 shadow-xl',
  overlay: 'z-40 shadow-2xl',
  top: 'z-50 shadow-2xl',
};

export default function DepthLayer({
  level = 'base',
  parallax = false,
  children,
  className,
}: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!parallax || prefersReducedMotion || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      const depth = {
        background: 0.1,
        base: 0.05,
        elevated: 0.03,
        floating: 0.02,
        overlay: 0.01,
        top: 0,
      }[level];
      
      ref.current.style.transform = `translateY(${scrolled * depth}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax, level, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative transition-shadow duration-300',
        levelStyles[level],
        className
      )}
    >
      {children}
    </div>
  );
}
