import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import type { ThemeColors } from './colors.types';
import { darkColors } from './dark/colors';
import { lightColors } from './light/colors';

export type { ThemeColors } from './colors.types';

export type ThemeId = 'light' | 'dark';

interface ThemeContextValue {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  colors: ThemeColors;
  isDark: boolean;
  /** Light theme → dark status bar icons */
  usesLightStatusBarContent: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('dark');

  useLayoutEffect(() => {
    Appearance.setColorScheme(themeId === 'dark' ? 'dark' : 'light');
  }, [themeId]);

  const value = useMemo<ThemeContextValue>(() => {
    const colors: ThemeColors =
      themeId === 'light' ? lightColors : darkColors;

    return {
      themeId,
      setThemeId,
      colors,
      isDark: themeId === 'dark',
      usesLightStatusBarContent: themeId === 'light',
    };
  }, [themeId, setThemeId]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
