import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  isPerformanceMode: boolean;
  togglePerformanceMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [isPerformanceMode, setIsPerformanceMode] = useState(() => {
    const saved = localStorage.getItem('performanceMode');
    if (saved !== null) {
      return saved === 'true';
    }
    
    // Intelligent auto-detection based on multiple factors
    const hardware = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Enable performance mode if:
    // - Low CPU cores (< 4) OR
    // - Low memory (< 4GB) OR
    // - Mobile device with low specs OR
    // - User prefers reduced motion
    return hardware < 4 || memory < 4 || (isMobile && hardware <= 4) || reducedMotion;
  });

  useEffect(() => {
    localStorage.setItem('performanceMode', isPerformanceMode.toString());
  }, [isPerformanceMode]);

  const togglePerformanceMode = () => {
    setIsPerformanceMode(prev => !prev);
  };

  return (
    <PerformanceContext.Provider value={{ isPerformanceMode, togglePerformanceMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceMode() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceMode must be used within PerformanceProvider');
  }
  return context;
}
