import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  variant?: 'frosted' | 'translucent' | 'opaque';
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  children: ReactNode;
  className?: string;
}

const variants = {
  frosted: 'glass-frosted',
  translucent: 'glass-translucent',
  opaque: 'glass-opaque',
};

const intensityClasses = {
  low: 'backdrop-blur-sm',
  medium: 'backdrop-blur-md',
  high: 'backdrop-blur-xl',
};

export default function GlassCard({
  variant = 'frosted',
  glowColor,
  intensity = 'medium',
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-xl p-6 transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        variants[variant],
        intensityClasses[intensity],
        'noise-texture',
        'glass-glow',
        className
      )}
      style={glowColor ? { '--glow-color': glowColor } as React.CSSProperties : undefined}
    >
      {children}
    </div>
  );
}
