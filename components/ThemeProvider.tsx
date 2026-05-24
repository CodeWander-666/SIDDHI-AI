'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'rich' | 'sunny';

interface ThemeContextType {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Load saved theme from localStorage
    const saved = localStorage.getItem('kalki-theme') as Theme;
    if (saved && ['dark', 'rich', 'sunny'].includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('kalki-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Make changeTheme available globally for backward compatibility with existing buttons
if (typeof window !== 'undefined') {
  (window as any).changeTheme = (theme: Theme) => {
    localStorage.setItem('kalki-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };
}
