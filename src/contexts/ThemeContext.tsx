import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemePreset = 'minimal' | 'cyber-neon' | 'visionos' | 'dark-matte';

interface ThemeContextType {
  theme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<ThemePreset, Record<string, string>> = {
  minimal: {
    '--background': '220 20% 96%',
    '--foreground': '220 15% 15%',
    '--card': '220 15% 98%',
    '--card-foreground': '220 15% 15%',
    '--primary': '250 50% 55%',
    '--primary-foreground': '0 0% 100%',
    '--primary-glow': '250 60% 65%',
    '--primary-dark': '250 50% 40%',
    '--secondary': '220 15% 90%',
    '--secondary-foreground': '220 15% 20%',
    '--accent': '190 70% 50%',
    '--accent-foreground': '0 0% 100%',
    '--accent-glow': '190 70% 60%',
    '--muted': '220 15% 92%',
    '--muted-foreground': '220 10% 45%',
    '--border': '220 15% 85%',
    '--input': '220 15% 90%',
    '--ring': '250 50% 55%',
  },
  'cyber-neon': {
    '--background': '270 100% 3%',
    '--foreground': '180 100% 95%',
    '--card': '270 50% 8%',
    '--card-foreground': '180 100% 95%',
    '--primary': '180 100% 50%',
    '--primary-foreground': '270 100% 5%',
    '--primary-glow': '180 100% 60%',
    '--primary-dark': '180 100% 35%',
    '--secondary': '320 100% 50%',
    '--secondary-foreground': '270 100% 95%',
    '--accent': '320 100% 60%',
    '--accent-foreground': '270 100% 5%',
    '--accent-glow': '320 100% 70%',
    '--muted': '270 30% 15%',
    '--muted-foreground': '180 50% 60%',
    '--border': '180 80% 25%',
    '--input': '270 40% 12%',
    '--ring': '180 100% 50%',
  },
  visionos: {
    '--background': '220 25% 10%',
    '--foreground': '220 20% 98%',
    '--card': '220 20% 12%',
    '--card-foreground': '220 20% 98%',
    '--primary': '262 80% 60%',
    '--primary-foreground': '220 20% 98%',
    '--primary-glow': '262 80% 70%',
    '--primary-dark': '262 70% 45%',
    '--secondary': '220 20% 18%',
    '--secondary-foreground': '220 20% 98%',
    '--accent': '190 85% 55%',
    '--accent-foreground': '220 20% 98%',
    '--accent-glow': '190 85% 65%',
    '--muted': '220 20% 15%',
    '--muted-foreground': '220 15% 65%',
    '--border': '220 20% 20%',
    '--input': '220 20% 18%',
    '--ring': '262 80% 60%',
  },
  'dark-matte': {
    '--background': '0 0% 8%',
    '--foreground': '0 0% 98%',
    '--card': '0 0% 10%',
    '--card-foreground': '0 0% 98%',
    '--primary': '0 0% 95%',
    '--primary-foreground': '0 0% 10%',
    '--primary-glow': '0 0% 100%',
    '--primary-dark': '0 0% 75%',
    '--secondary': '0 0% 15%',
    '--secondary-foreground': '0 0% 98%',
    '--accent': '0 0% 85%',
    '--accent-foreground': '0 0% 10%',
    '--accent-glow': '0 0% 95%',
    '--muted': '0 0% 12%',
    '--muted-foreground': '0 0% 60%',
    '--border': '0 0% 18%',
    '--input': '0 0% 15%',
    '--ring': '0 0% 95%',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreset>(() => {
    const saved = localStorage.getItem('theme-preset');
    return (saved as ThemePreset) || 'visionos';
  });

  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[theme];
    
    // Apply theme colors with smooth transition
    root.style.transition = 'background-color 300ms ease, color 300ms ease';
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    localStorage.setItem('theme-preset', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemePreset) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
