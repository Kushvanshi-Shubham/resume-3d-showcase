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
    // Auto-detect based on hardware
    return navigator.hardwareConcurrency < 4;
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
